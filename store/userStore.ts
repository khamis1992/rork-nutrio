import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import { mockUser } from '@/mocks/user';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface ProgressEntry {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  dailyGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  progress: ProgressEntry[];
}

interface UserState {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  fetchNutritionProgress: () => Promise<void>;
  logNutrition: (nutrition: { calories: number; protein: number; carbs: number; fat: number }) => Promise<void>;
  initializeUser: () => Promise<void>;
}

// Helper function to get date 7 days ago
const get7DaysAgo = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - 6); // Include today, so -6 gives us 7 days total
  return date.toISOString().split('T')[0];
};

// Helper function to get today's date
const getToday = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      supabaseUser: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      initializeUser: async () => {
        set({ isLoading: true, error: null });
        try {
          console.log('Starting user initialization...');
          
          // Always start with mock user to ensure app functionality
          set({ user: mockUser });
          
          // Try to get session without timeout to avoid conflicts
          let session = null;
          try {
            const { data } = await supabase.auth.getSession();
            session = data?.session;
            console.log('Session check completed:', session ? 'authenticated' : 'not authenticated');
          } catch (sessionError) {
            console.log('Session check failed, continuing with offline mode:', sessionError);
            // Continue with offline mode - mock user already set
            return;
          }
          
          if (session?.user) {
            console.log('User authenticated, fetching profile...');
            set({ 
              supabaseUser: session.user, 
              isAuthenticated: true 
            });
            
            // Try to fetch profile data without timeout
            try {
              await Promise.all([
                get().fetchUserProfile(),
                get().fetchNutritionProgress()
              ]);
              console.log('Profile data loaded successfully');
            } catch (profileError) {
              console.log('Profile fetch failed, keeping mock data:', profileError);
              // Keep mock user data already set
            }
          } else {
            console.log('No authenticated user, using mock data');
            set({ isAuthenticated: false });
          }
          
          console.log('User initialization completed successfully');
        } catch (error: any) {
          console.error('Error initializing user:', error);
          
          // Ensure mock user is set and no error is shown
          set({ 
            user: mockUser,
            isAuthenticated: false,
            error: null
          });
          
          console.log('Continuing with mock user data due to connection issues');
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            set({ supabaseUser: data.user, isAuthenticated: true });
            await get().fetchUserProfile();
            await get().fetchNutritionProgress();
          }
        } catch (error: any) {
          let errorMessage = 'Login failed';
          if (typeof error === 'string') {
            errorMessage = error;
          } else if (error?.message) {
            errorMessage = error.message;
          } else if (error?.error_description) {
            errorMessage = error.error_description;
          } else if (error?.details) {
            errorMessage = error.details;
          }
          
          try {
            const errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error), 2);
            if (errorDetails && errorDetails !== '{}') {
              console.error('Login error details:', errorDetails);
            } else {
              console.error('Login error object is empty or has no enumerable properties');
            }
          } catch (stringifyError) {
            console.error('Could not stringify login error:', error);
          }
          
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
          console.log('Starting signup process for:', email);
          
          // First, try to sign up the user
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name: name,
              }
            }
          });

          console.log('Signup response:', { data, error });

          if (error) {
            console.error('Supabase auth signup error:', error);
            throw error;
          }

          if (data.user) {
            console.log('User created successfully:', data.user.id);
            
            // Try to create user profile, but don't fail if table doesn't exist
            try {
              const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                  id: data.user.id,
                  name,
                  email,
                  daily_calories_goal: 2200,
                  daily_protein_goal: 150,
                  daily_carbs_goal: 220,
                  daily_fat_goal: 70,
                });

              if (profileError) {
                console.error('Profile creation error:', profileError);
                // Don't throw error if table doesn't exist, just log it
                if (!profileError.message?.includes('relation "public.profiles" does not exist')) {
                  throw profileError;
                }
              } else {
                console.log('Profile created successfully');
              }
            } catch (profileError: any) {
              console.error('Profile creation failed:', profileError);
              // Continue with signup even if profile creation fails
            }

            // Don't set as authenticated immediately for email confirmation flow
            console.log('Signup completed successfully');
          } else {
            throw new Error('No user data returned from signup');
          }
        } catch (error: any) {
          let errorMessage = 'Signup failed';
          if (typeof error === 'string') {
            errorMessage = error;
          } else if (error?.message) {
            errorMessage = error.message;
          } else if (error?.error_description) {
            errorMessage = error.error_description;
          } else if (error?.details) {
            errorMessage = error.details;
          }
          
          try {
            const errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error), 2);
            if (errorDetails && errorDetails !== '{}') {
              console.error('Signup error details:', errorDetails);
            } else {
              console.error('Signup error object is empty or has no enumerable properties');
            }
          } catch (stringifyError) {
            console.error('Could not stringify signup error:', error);
          }
          
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await supabase.auth.signOut();
          set({ 
            user: mockUser, // Fall back to mock user
            supabaseUser: null, 
            isAuthenticated: false 
          });
        } catch (error: any) {
          console.error('Logout error:', error);
          let errorMessage = 'Logout failed';
          if (typeof error === 'string') {
            errorMessage = error;
          } else if (error?.message) {
            errorMessage = error.message;
          } else if (error?.error_description) {
            errorMessage = error.error_description;
          } else if (error?.details) {
            errorMessage = error.details;
          }
          
          try {
            const errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error), 2);
            if (errorDetails && errorDetails !== '{}') {
              console.error('Logout detailed error:', errorDetails);
            } else {
              console.error('Logout error object is empty or has no enumerable properties');
            }
          } catch (stringifyError) {
            console.error('Could not stringify logout error:', error);
          }
          
          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },

      updateUser: async (userData) => {
        const { supabaseUser } = get();
        if (!supabaseUser) return;

        set({ isLoading: true, error: null });
        try {
          const updateData: any = {};
          
          if (userData.name) updateData.name = userData.name;
          if (userData.dailyGoals) {
            updateData.daily_calories_goal = userData.dailyGoals.calories;
            updateData.daily_protein_goal = userData.dailyGoals.protein;
            updateData.daily_carbs_goal = userData.dailyGoals.carbs;
            updateData.daily_fat_goal = userData.dailyGoals.fat;
          }

          const { error } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', supabaseUser.id);

          if (error) throw error;

          await get().fetchUserProfile();
        } catch (error: any) {
          console.error('Update user error:', error);
          let errorMessage = 'Failed to update user';
          if (typeof error === 'string') {
            errorMessage = error;
          } else if (error?.message) {
            errorMessage = error.message;
          } else if (error?.error_description) {
            errorMessage = error.error_description;
          } else if (error?.details) {
            errorMessage = error.details;
          }
          
          try {
            const errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error), 2);
            if (errorDetails && errorDetails !== '{}') {
              console.error('Update user detailed error:', errorDetails);
            } else {
              console.error('Update user error object is empty or has no enumerable properties');
            }
          } catch (stringifyError) {
            console.error('Could not stringify update user error:', error);
          }
          
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchUserProfile: async () => {
        const { supabaseUser } = get();
        if (!supabaseUser) return;

        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', supabaseUser.id)
            .single();

          if (error) {
            // If profiles table doesn't exist, use mock user data
            if (error.message?.includes('relation "public.profiles" does not exist')) {
              console.log('profiles table does not exist, using mock data');
              set({ user: mockUser, error: null });
              return;
            }
            throw error;
          }

          if (data) {
            const user: User = {
              id: data.id,
              name: data.name,
              email: data.email,
              avatar: data.avatar_url || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
              dailyGoals: {
                calories: data.daily_calories_goal,
                protein: data.daily_protein_goal,
                carbs: data.daily_carbs_goal,
                fat: data.daily_fat_goal,
              },
              progress: get().user?.progress || [],
            };

            set({ user, error: null });
          }
        } catch (error: any) {
          console.error('Fetch user profile error:', error);
          // Use mock data as fallback
          set({ user: mockUser, error: null });
        }
      },

      fetchNutritionProgress: async () => {
        const { supabaseUser } = get();
        if (!supabaseUser) {
          // For demo purposes, keep mock data when not authenticated
          return;
        }

        try {
          const sevenDaysAgo = get7DaysAgo();
          
          const { data, error } = await supabase
            .from('nutrition_logs')
            .select('*')
            .eq('user_id', supabaseUser.id)
            .gte('date', sevenDaysAgo)
            .order('date', { ascending: true });

          if (error) {
            // If table doesn't exist, use mock data
            if (error.message?.includes('relation "public.nutrition_logs" does not exist')) {
              console.log('nutrition_logs table does not exist, using mock data');
              const mockProgress = mockUser.progress;
              set(state => ({
                user: state.user ? { ...state.user, progress: mockProgress } : null,
                error: null,
              }));
              return;
            }
            throw error;
          }

          // Create a complete 7-day array with zeros for missing days
          const last7Days: ProgressEntry[] = [];
          for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            
            const existingLog = data?.find(log => log.date === dateString);
            
            last7Days.push({
              date: dateString,
              calories: existingLog?.calories || 0,
              protein: existingLog?.protein || 0,
              carbs: existingLog?.carbs || 0,
              fat: existingLog?.fat || 0,
            });
          }

          set(state => ({
            user: state.user ? { ...state.user, progress: last7Days } : null,
            error: null,
          }));
        } catch (error: any) {
          console.error('Fetch nutrition progress error:', error);
          // Use mock data as fallback
          const mockProgress = mockUser.progress;
          set(state => ({
            user: state.user ? { ...state.user, progress: mockProgress } : null,
            error: null,
          }));
        }
      },

      logNutrition: async (nutrition) => {
        const { supabaseUser } = get();
        if (!supabaseUser) {
          console.log('User not authenticated, skipping nutrition log');
          return;
        }

        try {
          const today = getToday();

          // Check if log exists for today
          const { data: existingLog, error: selectError } = await supabase
            .from('nutrition_logs')
            .select('*')
            .eq('user_id', supabaseUser.id)
            .eq('date', today)
            .single();

          if (selectError && selectError.message?.includes('relation "public.nutrition_logs" does not exist')) {
            console.log('nutrition_logs table does not exist, skipping log');
            return;
          }

          if (existingLog) {
            // Update existing log by adding the new nutrition values
            const { error } = await supabase
              .from('nutrition_logs')
              .update({
                calories: existingLog.calories + nutrition.calories,
                protein: existingLog.protein + nutrition.protein,
                carbs: existingLog.carbs + nutrition.carbs,
                fat: existingLog.fat + nutrition.fat,
              })
              .eq('id', existingLog.id);

            if (error && !error.message?.includes('relation "public.nutrition_logs" does not exist')) {
              throw error;
            }
          } else {
            // Create new log
            const { error } = await supabase
              .from('nutrition_logs')
              .insert({
                user_id: supabaseUser.id,
                date: today,
                calories: nutrition.calories,
                protein: nutrition.protein,
                carbs: nutrition.carbs,
                fat: nutrition.fat,
              });

            if (error && !error.message?.includes('relation "public.nutrition_logs" does not exist')) {
              throw error;
            }
          }

          // Refresh nutrition progress to show updated data
          await get().fetchNutritionProgress();
        } catch (error: any) {
          console.error('Log nutrition error:', error);
          // Don't throw error for missing table, just log it
          if (!error.message?.includes('relation "public.nutrition_logs" does not exist')) {
            let errorMessage = 'Failed to log nutrition';
            if (typeof error === 'string') {
              errorMessage = error;
            } else if (error?.message) {
              errorMessage = error.message;
            } else if (error?.error_description) {
              errorMessage = error.error_description;
            } else if (error?.details) {
              errorMessage = error.details;
            }
            
            try {
              const errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error), 2);
              if (errorDetails && errorDetails !== '{}') {
                console.error('Log nutrition detailed error:', errorDetails);
              } else {
                console.error('Log nutrition error object is empty or has no enumerable properties');
              }
            } catch (stringifyError) {
              console.error('Could not stringify log nutrition error:', error);
            }
            
            throw new Error(errorMessage);
          }
        }
      },
    }),
    {
      name: 'nutrio-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        supabaseUser: state.supabaseUser,
      }),
    }
  )
);

// Initialize auth state
supabase.auth.onAuthStateChange((event, session) => {
  const { fetchUserProfile, fetchNutritionProgress } = useUserStore.getState();
  
  if (event === 'SIGNED_IN' && session?.user) {
    useUserStore.setState({ 
      supabaseUser: session.user, 
      isAuthenticated: true,
      error: null,
    });
    fetchUserProfile();
    fetchNutritionProgress();
  } else if (event === 'SIGNED_OUT') {
    useUserStore.setState({ 
      user: mockUser, // Fall back to mock user
      supabaseUser: null, 
      isAuthenticated: false,
      error: null,
    });
  }
});