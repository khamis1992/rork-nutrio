import React, { useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity, Image } from "react-native";
import { Home, Utensils, Calendar, BarChart2 } from "lucide-react-native";
import { theme } from "@/constants/theme";
import { useMealsStore } from "@/store/mealsStore";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { useUserStore } from "@/store/userStore";

export default function TabLayout() {
  const router = useRouter();
  const { fetchMeals } = useMealsStore();
  const { fetchPlans } = useSubscriptionStore();
  const { initializeUser, user } = useUserStore();

  useEffect(() => {
    // Initialize app data when tab layout mounts
    const initializeApp = async () => {
      try {
        await initializeUser();
        await fetchMeals();
        await fetchPlans();
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, [fetchMeals, fetchPlans, initializeUser]);

  const ProfileIcon = () => {
    if (!user) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={() => router.push('/profile')}
        style={{
          marginRight: 16,
          padding: 4,
        }}
      >
        <Image
          source={{ uri: user.avatar }}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: theme.colors.primary,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textLight,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: theme.colors.white,
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerShadowVisible: false,
        headerRight: () => <ProfileIcon />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: "Restaurants",
          tabBarIcon: ({ color }) => <Utensils size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-plan"
        options={{
          title: "My Plan",
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ color }) => <BarChart2 size={24} color={color} />,
        }}
      />

    </Tabs>
  );
}