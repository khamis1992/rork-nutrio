import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Stack } from 'expo-router';
import { Search } from 'lucide-react-native';
import { useLanguage } from '@/store/languageStore';
import { useRestaurantsStore } from '@/store/restaurantsStore';
import { RestaurantCard } from '@/components/RestaurantCard';
import { colors } from '@/constants/colors';

export default function RestaurantsScreen() {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const { restaurants, isLoading, fetchRestaurants, toggleFavorite } = useRestaurantsStore();

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const filteredRestaurants = useMemo(() => {
    if (!searchQuery.trim()) {
      return restaurants;
    }
    
    const query = searchQuery.toLowerCase();
    return restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(query) ||
        (restaurant.cuisine_type && restaurant.cuisine_type.toLowerCase().includes(query))
    );
  }, [searchQuery, restaurants]);

  const renderRestaurant = ({ item }: { item: typeof restaurants[0] }) => (
    <RestaurantCard 
      restaurant={item} 
      onToggleFavorite={() => toggleFavorite(item.id)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>{t('noRestaurantsFound')}</Text>
      <Text style={styles.emptyStateSubtitle}>{t('tryDifferentKeywords')}</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={[styles.searchContainer, isRTL && styles.searchContainerRTL]}>
        <Search 
          size={20} 
          color={colors.gray[400]} 
          style={[styles.searchIcon, isRTL && styles.searchIconRTL]} 
        />
        <TextInput
          style={[styles.searchInput, isRTL && styles.searchInputRTL]}
          placeholder={t('searchRestaurants')}
          placeholderTextColor={colors.gray[400]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          textAlign={isRTL ? 'right' : 'left'}
        />
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: t('restaurants') }} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
          <Text style={styles.loadingText}>{t('loadingRestaurants')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: t('restaurants') }} />
      
      <FlatList
        data={filteredRestaurants}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: colors.gray[600],
    fontWeight: '500' as const,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchContainerRTL: {
    flexDirection: 'row-reverse',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchIconRTL: {
    marginRight: 0,
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.gray[900],
    paddingVertical: 0,
  },
  searchInputRTL: {
    textAlign: 'right',
  },
  listContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.gray[900],
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: colors.gray[500],
    textAlign: 'center',
    lineHeight: 20,
  },
});