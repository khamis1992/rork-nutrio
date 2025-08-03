import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "@/lib/trpc";
import { useUserStore } from "@/store/userStore";
import { LanguageProvider, useLanguage } from "@/store/languageStore";
import { View, Text, ActivityIndicator } from "react-native";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <RootLayoutNav />
        </LanguageProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function RootLayoutNav() {
  const { initializeUser, isLoading } = useUserStore();
  const { t, isLoading: languageLoading } = useLanguage();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        console.log('Starting app initialization...');
        await initializeUser();
        console.log('App initialization completed');
      } catch (error) {
        console.error('Initialization error:', error);
        console.log('Continuing with offline mode due to initialization error');
      } finally {
        setIsInitialized(true);
      }
    };

    initApp();
  }, [initializeUser]);

  // Show loading screen while initializing
  if (languageLoading || (!isInitialized && isLoading)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#666' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="meal/[id]" 
          options={{ 
            title: "Meal Details",
            headerBackTitle: "Back",
          }} 
        />
        <Stack.Screen 
          name="restaurant/[id]" 
          options={{ 
            title: "Restaurant Details",
            headerBackTitle: "Back",
          }} 
        />
        <Stack.Screen 
          name="subscription" 
          options={{ 
            title: "Choose a Plan",
            headerBackTitle: "Back",
          }} 
        />
        <Stack.Screen 
          name="gyms" 
          options={{ 
            title: "Gym Access",
            headerBackTitle: "Back",
          }} 
        />
        <Stack.Screen 
          name="my-plan" 
          options={{ 
            title: "My Plan",
            headerBackTitle: "Back",
          }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ 
            title: "Login",
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="signup" 
          options={{ 
            title: "Sign Up",
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="restaurants" 
          options={{ 
            title: "Restaurants",
            headerBackTitle: "Back",
          }} 
        />
        <Stack.Screen 
          name="profile" 
          options={{ 
            title: t('profile'),
            headerBackTitle: "Back",
          }} 
        />
      </Stack>
    </>
  );
}