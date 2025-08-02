import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { theme } from '@/constants/theme';
import { Meal } from '@/store/mealsStore';
import { MealCard } from './MealCard';
import { Sunrise, Sun, Moon } from 'lucide-react-native';

interface MealTimeSectionProps {
  mealTime: string;
  meals: Meal[];
  isSelected: boolean;
  onPress: () => void;
}

const getMealTimeIcon = (mealTime: string) => {
  switch (mealTime.toLowerCase()) {
    case 'breakfast':
    case 'فطور':
      return <Sunrise size={20} color={theme.colors.primary} />;
    case 'lunch':
    case 'غداء':
      return <Sun size={20} color={theme.colors.primary} />;
    case 'dinner':
    case 'عشاء':
      return <Moon size={20} color={theme.colors.primary} />;
    default:
      return <Sun size={20} color={theme.colors.primary} />;
  }
};

const getMealTimeLabel = (mealTime: string) => {
  switch (mealTime.toLowerCase()) {
    case 'breakfast':
      return 'الفطور';
    case 'lunch':
      return 'الغداء';
    case 'dinner':
      return 'العشاء';
    default:
      return mealTime;
  }
};

export const MealTimeSection = ({ mealTime, meals, isSelected, onPress }: MealTimeSectionProps) => {
  return (
    <View style={styles.container}>
      <Pressable 
        style={[
          styles.header,
          isSelected && styles.selectedHeader
        ]}
        onPress={onPress}
      >
        <View style={styles.headerContent}>
          {getMealTimeIcon(mealTime)}
          <Text style={[
            styles.headerTitle,
            isSelected && styles.selectedHeaderTitle
          ]}>
            {getMealTimeLabel(mealTime)}
          </Text>
          <Text style={[
            styles.mealCount,
            isSelected && styles.selectedMealCount
          ]}>
            ({meals.length} وجبة)
          </Text>
        </View>
      </Pressable>
      
      {isSelected && (
        <View style={styles.mealsContainer}>
          {meals.length > 0 ? (
            meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>لا توجد وجبات متاحة</Text>
              <Text style={styles.emptySubtext}>سيتم إضافة وجبات جديدة قريباً</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  header: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    ...theme.shadows.sm,
  },
  selectedHeader: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text,
    flex: 1,
  },
  selectedHeaderTitle: {
    color: theme.colors.white,
  },
  mealCount: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textLight,
  },
  selectedMealCount: {
    color: theme.colors.white,
    opacity: 0.8,
  },
  mealsContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xl,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  },
  emptyText: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  emptySubtext: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
});