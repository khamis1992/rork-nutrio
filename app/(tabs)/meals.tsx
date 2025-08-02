import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, RefreshControl } from 'react-native';
import { theme } from '@/constants/theme';
import { useMealsStore } from '@/store/mealsStore';
import { CategoryFilter } from '@/components/CategoryFilter';
import { MealTimeSection } from '@/components/MealTimeSection';
import { Search } from 'lucide-react-native';

export default function MealsScreen() {
  const { 
    meals, 
    selectedCategory, 
    selectedMealTime,
    setSelectedCategory, 
    setSelectedMealTime,
    getMealsByTime,
    fetchMeals, 
    isLoading, 
    error 
  } = useMealsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  
  const mealTimes = ['breakfast', 'lunch', 'dinner'];

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

  // Get meals for each meal time and filter by category and search
  const getFilteredMealsForTime = (mealTime: string) => {
    const mealsForTime = getMealsByTime(mealTime);
    return mealsForTime.filter(meal => {
      const matchesCategory = selectedCategory === 'all' || 
        meal.category.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase());
      
      const matchesSearch = searchQuery === '' || 
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      return matchesCategory && matchesSearch;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={theme.colors.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="ابحث عن الوجبات أو المطاعم أو المكونات"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.colors.textLight}
        />
      </View>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <ScrollView 
        style={styles.mealsContainer}
        contentContainerStyle={styles.mealsContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
          mealTimes.map((mealTime) => {
            const mealsForTime = getFilteredMealsForTime(mealTime);
            return (
              <MealTimeSection
                key={mealTime}
                mealTime={mealTime}
                meals={mealsForTime}
                isSelected={selectedMealTime === mealTime}
                onPress={() => setSelectedMealTime(selectedMealTime === mealTime ? '' : mealTime)}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.full,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.text,
    textAlign: 'right',
  },
  mealsContainer: {
    flex: 1,
  },
  mealsContent: {
    padding: theme.spacing.md,
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
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  errorText: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.error,
    marginBottom: theme.spacing.xs,
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
  },
  emptyText: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  emptySubtext: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
});