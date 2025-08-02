import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, RefreshControl, FlatList } from 'react-native';
import { theme } from '@/constants/theme';
import { useRestaurantsStore } from '@/store/restaurantsStore';
import { RestaurantCard } from '@/components/RestaurantCard';
import { Search } from 'lucide-react-native';
import { router } from 'expo-router';

export default function MealsScreen() {
  const { 
    restaurants, 
    fetchRestaurants, 
    toggleFavorite,
    isLoading, 
    error 
  } = useRestaurantsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Fetch restaurants when component mounts
    fetchRestaurants();
  }, [fetchRestaurants]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchRestaurants();
    } catch (error) {
      console.error('Error refreshing restaurants:', error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchRestaurants]);

  // Filter restaurants by search query
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = searchQuery === '' || 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (restaurant.cuisine_type && restaurant.cuisine_type.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  const handleRestaurantPress = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`);
  };

  const renderRestaurant = ({ item }: { item: typeof restaurants[0] }) => (
    <View style={styles.restaurantItem}>
      <RestaurantCard
        restaurant={item}
        onPress={() => handleRestaurantPress(item.id)}
        onToggleFavorite={() => toggleFavorite(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={theme.colors.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="ابحث عن المطاعم أو نوع المأكولات"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.colors.textLight}
        />
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>خطأ في تحميل المطاعم</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
        </View>
      )}

      {isLoading && restaurants.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>جاري تحميل المطاعم...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredRestaurants}
          renderItem={renderRestaurant}
          keyExtractor={(item) => item.id}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.restaurantsContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            !isLoading ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>لا توجد مطاعم</Text>
                <Text style={styles.emptySubtext}>جرب البحث بكلمات مختلفة</Text>
              </View>
            ) : null
          }
        />
      )}
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
  restaurantsContent: {
    padding: theme.spacing.md,
  },
  restaurantItem: {
    marginBottom: theme.spacing.md,
    alignItems: 'center',
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