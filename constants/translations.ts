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
    
    // Common
    loading: 'جاري التحميل...',
    retry: 'إعادة المحاولة',
    close: 'إغلاق',
    cancel: 'إلغاء',
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;