import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { theme } from '@/constants/theme';
import { useMealsStore } from '@/store/mealsStore';
import { MealTimeSection } from '@/components/MealTimeSection';
import { Calendar } from 'lucide-react-native';

export default function MealsScreen() {
  const { 
    meals, 
    fetchMeals,
    isLoading, 
    error 
  } = useMealsStore();
  const [selectedMealTime, setSelectedMealTime] = useState<string>('breakfast');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Fetch meals when component mounts
    fetchMeals();
  }, [fetchMeals]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchMeals();
    } catch (error) {
      console.error('Error refreshing meals:', error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchMeals]);

  // Group meals by meal time
  const mealsByTime = {
    breakfast: meals.filter(meal => 
      meal.category?.some(cat => 
        cat.toLowerCase().includes('breakfast') || 
        cat.toLowerCase().includes('فطور')
      ) || Math.random() > 0.7 // Random assignment for demo
    ),
    lunch: meals.filter(meal => 
      meal.category?.some(cat => 
        cat.toLowerCase().includes('lunch') || 
        cat.toLowerCase().includes('غداء')
      ) || Math.random() > 0.5 // Random assignment for demo
    ),
    dinner: meals.filter(meal => 
      meal.category?.some(cat => 
        cat.toLowerCase().includes('dinner') || 
        cat.toLowerCase().includes('عشاء')
      ) || Math.random() > 0.3 // Random assignment for demo
    ),
  };

  // Ensure each meal time has at least some meals for demo
  if (mealsByTime.breakfast.length === 0 && meals.length > 0) {
    mealsByTime.breakfast = meals.slice(0, Math.ceil(meals.length / 3));
  }
  if (mealsByTime.lunch.length === 0 && meals.length > 0) {
    mealsByTime.lunch = meals.slice(Math.ceil(meals.length / 3), Math.ceil(2 * meals.length / 3));
  }
  if (mealsByTime.dinner.length === 0 && meals.length > 0) {
    mealsByTime.dinner = meals.slice(Math.ceil(2 * meals.length / 3));
  }

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Calendar size={20} color={theme.colors.primary} />
          <Text style={styles.dateText}>{getCurrentDate()}</Text>
        </View>
        <Text style={styles.title}>وجبات اليوم</Text>
        <Text style={styles.subtitle}>اختر وجباتك المفضلة لهذا اليوم</Text>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>خطأ في تحميل الوجبات</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
        </View>
      )}

      {isLoading && meals.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>جاري تحميل الوجبات...</Text>
        </View>
      ) : (
        <View style={styles.mealsContainer}>
          <MealTimeSection
            mealTime="breakfast"
            meals={mealsByTime.breakfast}
            isSelected={selectedMealTime === 'breakfast'}
            onPress={() => setSelectedMealTime(selectedMealTime === 'breakfast' ? '' : 'breakfast')}
          />
          
          <MealTimeSection
            mealTime="lunch"
            meals={mealsByTime.lunch}
            isSelected={selectedMealTime === 'lunch'}
            onPress={() => setSelectedMealTime(selectedMealTime === 'lunch' ? '' : 'lunch')}
          />
          
          <MealTimeSection
            mealTime="dinner"
            meals={mealsByTime.dinner}
            isSelected={selectedMealTime === 'dinner'}
            onPress={() => setSelectedMealTime(selectedMealTime === 'dinner' ? '' : 'dinner')}
          />
        </View>
      )}

      {!isLoading && meals.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>لا توجد وجبات متاحة</Text>
          <Text style={styles.emptySubtext}>سيتم إضافة وجبات جديدة قريباً</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  dateText: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textLight,
    textAlign: 'right',
  },
  title: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textLight,
    textAlign: 'right',
  },
  mealsContainer: {
    paddingBottom: theme.spacing.xl,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  loadingText: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textLight,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  errorText: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.error,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.md,
    ...theme.shadows.sm,
  },
  emptyText: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
});