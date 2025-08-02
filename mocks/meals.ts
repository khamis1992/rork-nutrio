export interface Meal {
  id: string;
  name: string;
  description: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  restaurant: string;
  restaurantLogo: string;
  category: string[];
  ingredients: string[];
  price: number;
  mealTime?: string;
}

export const categories = [
  { id: 'all', name: 'All' },
  { id: 'protein', name: 'Protein' },
  { id: 'vegan', name: 'Vegan' },
  { id: 'low-carb', name: 'Low-carb' },
  { id: 'keto', name: 'Keto' },
  { id: 'muscle', name: 'Muscle' },
  { id: 'vegetarian', name: 'Vegetarian' },
  { id: 'gluten-free', name: 'Gluten-free' },
  { id: 'healthy', name: 'Healthy' },
  { id: 'pescatarian', name: 'Pescatarian' },
  { id: 'plant-based', name: 'Plant-based' },
  { id: 'mediterranean', name: 'Mediterranean' },
  { id: 'balanced', name: 'Balanced' },
  { id: 'high-fat', name: 'High-fat' },
  { id: 'low-fat', name: 'Low-fat' },
];

export const restaurants = [
  {
    id: '1',
    name: 'Clean Eats',
    logo: 'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '2',
    name: 'Green Garden',
    logo: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '3',
    name: 'Muscle Kitchen',
    logo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '4',
    name: 'Keto Corner',
    logo: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '5',
    name: 'Mediterranean Delights',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
];

export const mockMeals: Meal[] = [
  // Breakfast meals
  {
    id: '1',
    name: 'Protein Pancakes',
    description: 'Fluffy protein-packed pancakes with fresh berries',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    calories: 320,
    protein: 25,
    carbs: 35,
    fat: 8,
    restaurant: 'Clean Eats',
    restaurantLogo: 'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    category: ['protein', 'breakfast'],
    ingredients: ['Protein powder', 'Oats', 'Eggs', 'Berries', 'Honey'],
    price: 45,
    mealTime: 'breakfast'
  },
  {
    id: '2',
    name: 'Avocado Toast Bowl',
    description: 'Nutritious avocado bowl with seeds and vegetables',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    calories: 280,
    protein: 12,
    carbs: 25,
    fat: 18,
    restaurant: 'Green Garden',
    restaurantLogo: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    category: ['vegan', 'healthy'],
    ingredients: ['Avocado', 'Whole grain bread', 'Seeds', 'Tomatoes'],
    price: 38,
    mealTime: 'breakfast'
  },
  {
    id: '3',
    name: 'Greek Yogurt Parfait',
    description: 'Creamy Greek yogurt with granola and fresh fruits',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    calories: 250,
    protein: 20,
    carbs: 30,
    fat: 6,
    restaurant: 'Mediterranean Delights',
    restaurantLogo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    category: ['protein', 'mediterranean'],
    ingredients: ['Greek yogurt', 'Granola', 'Berries', 'Honey', 'Nuts'],
    price: 32,
    mealTime: 'breakfast'
  },
  
  // Lunch meals
  {
    id: '4',
    name: 'Grilled Chicken Salad',
    description: 'Fresh mixed greens with grilled chicken and vegetables',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    calories: 420,
    protein: 35,
    carbs: 15,
    fat: 25,
    restaurant: 'Muscle Kitchen',
    restaurantLogo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    category: ['protein', 'low-carb'],
    ingredients: ['Chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Olive oil'],
    price: 55,
    mealTime: 'lunch'
  },
  {
    id: '5',
    name: 'Quinoa Buddha Bowl',
    description: 'Nutritious bowl with quinoa, vegetables, and tahini dressing',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    calories: 380,
    protein: 15,
    carbs: 45,
    fat: 16,
    restaurant: 'Green Garden',
    restaurantLogo: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    category: ['vegan', 'plant-based'],
    ingredients: ['Quinoa', 'Roasted vegetables', 'Chickpeas', 'Tahini', 'Spinach'],
    price: 48,
    mealTime: 'lunch'
  },
  {
    id: '6',
    name: 'Keto Salmon Bowl',
    description: 'Grilled salmon with cauliflower rice and avocado',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    calories: 520,
    protein: 40,
    carbs: 8,
    fat: 35,
    restaurant: 'Keto Corner',
    restaurantLogo: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    category: ['keto', 'high-fat'],
    ingredients: ['Salmon', 'Cauliflower rice', 'Avocado', 'Broccoli', 'Olive oil'],
    price: 68,
    mealTime: 'lunch'
  },
  
  // Dinner meals
  {
    id: '7',
    name: 'Mediterranean Chicken',
    description: 'Herb-crusted chicken with roasted vegetables',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    calories: 480,
    protein: 42,
    carbs: 20,
    fat: 28,
    restaurant: 'Mediterranean Delights',
    restaurantLogo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    category: ['mediterranean', 'protein'],
    ingredients: ['Chicken thigh', 'Zucchini', 'Bell peppers', 'Herbs', 'Olive oil'],
    price: 62,
    mealTime: 'dinner'
  },
  {
    id: '8',
    name: 'Beef Stir Fry',
    description: 'Tender beef with mixed vegetables in savory sauce',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    calories: 450,
    protein: 38,
    carbs: 25,
    fat: 22,
    restaurant: 'Muscle Kitchen',
    restaurantLogo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    category: ['protein', 'muscle'],
    ingredients: ['Beef strips', 'Mixed vegetables', 'Soy sauce', 'Ginger', 'Garlic'],
    price: 58,
    mealTime: 'dinner'
  },
  {
    id: '9',
    name: 'Vegan Curry Bowl',
    description: 'Spiced lentil curry with coconut rice',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    calories: 390,
    protein: 18,
    carbs: 55,
    fat: 12,
    restaurant: 'Green Garden',
    restaurantLogo: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    category: ['vegan', 'plant-based'],
    ingredients: ['Red lentils', 'Coconut milk', 'Rice', 'Spices', 'Vegetables'],
    price: 42,
    mealTime: 'dinner'
  }
];