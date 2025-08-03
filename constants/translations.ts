export const translations = {
  en: {
    // Navigation
    home: 'Home',
    restaurants: 'Restaurants',
    myPlan: 'My Plan',
    progress: 'Progress',
    profile: 'Profile',
    
    // Profile Screen
    notLoggedIn: 'Not Logged In',
    pleaseLogin: 'Please log in to access your profile',
    login: 'Login',
    signUp: 'Sign Up',
    subscription: 'Subscription',
    settings: 'Settings',
    logout: 'Logout',
    
    // Subscription
    mealsRemaining: 'meals remaining',
    gymAccessIncluded: 'Gym access included',
    noGymAccess: 'No gym access',
    managePlan: 'Manage Plan',
    noActiveSubscription: 'No active subscription',
    subscribeNow: 'Subscribe Now',
    
    // Settings Menu
    accountSettings: 'Account Settings',
    paymentMethods: 'Payment Methods',
    notifications: 'Notifications',
    achievements: 'Achievements',
    helpSupport: 'Help & Support',
    language: 'Language',
    
    // Language Options
    english: 'English',
    arabic: 'العربية',
    
    // Alerts
    logoutTitle: 'Logout',
    logoutMessage: 'Are you sure you want to logout?',
    cancelSubscriptionTitle: 'Cancel Subscription',
    cancelSubscriptionMessage: 'Are you sure you want to cancel your subscription?',
    yes: 'Yes',
    no: 'No',
    success: 'Success',
    error: 'Error',
    subscriptionCanceled: 'Your subscription has been canceled',
    failedToCancelSubscription: 'Failed to cancel subscription',
    
    // Restaurants
    searchRestaurants: 'Search restaurants or cuisine types',
    errorLoadingRestaurants: 'Error loading restaurants',
    loadingRestaurants: 'Loading restaurants...',
    noRestaurantsFound: 'No restaurants found',
    tryDifferentKeywords: 'Try searching with different keywords',
    loadingRestaurantDetails: 'Loading restaurant details...',
    restaurantNotFound: 'Restaurant not found',
    about: 'About',
    availableMeals: 'Available Meals',
    noMealsAvailable: 'No meals available at this restaurant.',
    locationAndHours: 'Location & Hours',
    openDaily: 'Open daily from 11:00 AM to 10:00 PM',
    deliveryAvailable: 'Delivery available in your area',
    averageDeliveryTime: 'Average delivery time:',
    back: 'Back',
    
    // Common
    loading: 'Loading...',
    retry: 'Retry',
    close: 'Close',
    cancel: 'Cancel',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    restaurants: 'المطاعم',
    myPlan: 'خطتي',
    progress: 'التقدم',
    profile: 'الملف الشخصي',
    
    // Profile Screen
    notLoggedIn: 'غير مسجل الدخول',
    pleaseLogin: 'يرجى تسجيل الدخول للوصول إلى ملفك الشخصي',
    login: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    subscription: 'الاشتراك',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    
    // Subscription
    mealsRemaining: 'وجبة متبقية',
    gymAccessIncluded: 'الوصول للنادي الرياضي متضمن',
    noGymAccess: 'لا يوجد وصول للنادي الرياضي',
    managePlan: 'إدارة الخطة',
    noActiveSubscription: 'لا يوجد اشتراك نشط',
    subscribeNow: 'اشترك الآن',
    
    // Settings Menu
    accountSettings: 'إعدادات الحساب',
    paymentMethods: 'طرق الدفع',
    notifications: 'الإشعارات',
    achievements: 'الإنجازات',
    helpSupport: 'المساعدة والدعم',
    language: 'اللغة',
    
    // Language Options
    english: 'English',
    arabic: 'العربية',
    
    // Alerts
    logoutTitle: 'تسجيل الخروج',
    logoutMessage: 'هل أنت متأكد من أنك تريد تسجيل الخروج؟',
    cancelSubscriptionTitle: 'إلغاء الاشتراك',
    cancelSubscriptionMessage: 'هل أنت متأكد من أنك تريد إلغاء اشتراكك؟',
    yes: 'نعم',
    no: 'لا',
    success: 'نجح',
    error: 'خطأ',
    subscriptionCanceled: 'تم إلغاء اشتراكك',
    failedToCancelSubscription: 'فشل في إلغاء الاشتراك',
    
    // Restaurants
    searchRestaurants: 'البحث في المطاعم أو أنواع المأكولات',
    errorLoadingRestaurants: 'خطأ في تحميل المطاعم',
    loadingRestaurants: 'جاري تحميل المطاعم...',
    noRestaurantsFound: 'لم يتم العثور على مطاعم',
    tryDifferentKeywords: 'جرب البحث بكلمات مختلفة',
    loadingRestaurantDetails: 'جاري تحميل تفاصيل المطعم...',
    restaurantNotFound: 'المطعم غير موجود',
    about: 'حول',
    availableMeals: 'الوجبات المتاحة',
    noMealsAvailable: 'لا توجد وجبات متاحة في هذا المطعم.',
    locationAndHours: 'الموقع وساعات العمل',
    openDaily: 'مفتوح يومياً من 11:00 صباحاً إلى 10:00 مساءً',
    deliveryAvailable: 'التوصيل متاح في منطقتك',
    averageDeliveryTime: 'متوسط وقت التوصيل:',
    back: 'رجوع',
    
    // Common
    loading: 'جاري التحميل...',
    retry: 'إعادة المحاولة',
    close: 'إغلاق',
    cancel: 'إلغاء',
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;