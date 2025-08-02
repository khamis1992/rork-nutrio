import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import createContextHook from '@nkzw/create-context-hook';
import { translations, Language, TranslationKey } from '@/constants/translations';

const LANGUAGE_STORAGE_KEY = 'app_language';

export const [LanguageProvider, useLanguage] = createContextHook(() => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved language on app start
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
          setLanguageState(savedLanguage as Language);
          
          // Set RTL for Arabic
          if (savedLanguage === 'ar') {
            I18nManager.allowRTL(true);
            I18nManager.forceRTL(true);
          } else {
            I18nManager.allowRTL(false);
            I18nManager.forceRTL(false);
          }
        }
      } catch (error) {
        console.error('Error loading language:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguage();
  }, []);

  const setLanguage = async (newLanguage: Language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
      setLanguageState(newLanguage);
      
      // Set RTL for Arabic
      if (newLanguage === 'ar') {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
      } else {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
      }
      
      // Note: App needs to be restarted for RTL changes to take full effect
      console.log('Language changed to:', newLanguage);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const isRTL = language === 'ar';

  return {
    language,
    setLanguage,
    t,
    isRTL,
    isLoading,
  };
});