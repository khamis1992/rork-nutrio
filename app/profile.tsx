import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable, Alert, ActionSheetIOS, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { useUserStore } from '@/store/userStore';
import { useSubscriptionStore } from '@/store/subscriptionStore';
import { useLanguage } from '@/store/languageStore';
import { Button } from '@/components/Button';
import { LogOut, Settings, CreditCard, Award, Bell, HelpCircle, Globe } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, error: userError } = useUserStore();
  const { subscription, cancelSubscription, error: subscriptionError } = useSubscriptionStore();
  const { t, language, setLanguage, isRTL } = useLanguage();

  const handleLanguageChange = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [t('cancel'), t('english'), t('arabic')],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            setLanguage('en');
          } else if (buttonIndex === 2) {
            setLanguage('ar');
          }
        }
      );
    } else {
      Alert.alert(
        t('language'),
        '',
        [
          { text: t('cancel'), style: 'cancel' },
          { text: t('english'), onPress: () => setLanguage('en') },
          { text: t('arabic'), onPress: () => setLanguage('ar') },
        ]
      );
    }
  };

  const handleLogout = () => {
    Alert.alert(
      t('logoutTitle'),
      t('logoutMessage'),
      [
        {
          text: t('cancel'),
          style: "cancel"
        },
        { 
          text: t('logout'), 
          onPress: () => {
            logout();
            router.replace('/login');
          }
        }
      ]
    );
  };

  const handleCancelSubscription = () => {
    Alert.alert(
      t('cancelSubscriptionTitle'),
      t('cancelSubscriptionMessage'),
      [
        {
          text: t('no'),
          style: "cancel"
        },
        { 
          text: t('yes'), 
          onPress: async () => {
            try {
              await cancelSubscription();
              Alert.alert(t('success'), t('subscriptionCanceled'));
            } catch (error: any) {
              const errorMessage = error?.message || t('failedToCancelSubscription');
              Alert.alert(t('error'), errorMessage);
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  if (!user) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>{t('notLoggedIn')}</Text>
        <Text style={styles.loginText}>
          {t('pleaseLogin')}
        </Text>
        <Button
          title={t('login')}
          onPress={() => router.push('/login')}
          style={styles.loginButton}
        />
        <Button
          title={t('signUp')}
          onPress={() => router.push('/signup')}
          variant="outline"
          style={styles.signupButton}
        />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {(userError || subscriptionError) && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {userError || subscriptionError}
          </Text>
        </View>
      )}

      <View style={styles.profileHeader}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>{t('subscription')}</Text>
        <View style={styles.card}>
          {subscription.active ? (
            <>
              <View style={styles.subscriptionInfo}>
                <Text style={styles.planName}>{subscription.plan?.name}</Text>
                <Text style={styles.planDates}>
                  {subscription.startDate} to {subscription.endDate}
                </Text>
                <View style={styles.planFeatures}>
                  <Text style={[styles.planFeature, isRTL && styles.rtlText]}>• {subscription.mealsRemaining} {t('mealsRemaining')}</Text>
                  <Text style={[styles.planFeature, isRTL && styles.rtlText]}>• {subscription.gymAccess ? t('gymAccessIncluded') : t('noGymAccess')}</Text>
                </View>
              </View>
              <View style={styles.subscriptionActions}>
                <Button
                  title={t('managePlan')}
                  onPress={() => router.push('/my-plan')}
                  size="small"
                  style={styles.manageButton}
                />
                <Button
                  title={t('cancel')}
                  onPress={handleCancelSubscription}
                  variant="outline"
                  size="small"
                  style={styles.cancelButton}
                />
              </View>
            </>
          ) : (
            <View style={styles.noSubscription}>
              <Text style={[styles.noSubscriptionText, isRTL && styles.rtlText]}>{t('noActiveSubscription')}</Text>
              <Button
                title={t('subscribeNow')}
                onPress={() => router.push('/subscription')}
                size="small"
                style={styles.subscribeButton}
              />
            </View>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>{t('settings')}</Text>
        <View style={styles.card}>
          <Pressable style={[styles.menuItem, isRTL && styles.rtlMenuItem]}>
            <Settings size={20} color={theme.colors.text} />
            <Text style={[styles.menuItemText, isRTL && styles.rtlText]}>{t('accountSettings')}</Text>
          </Pressable>
          <Pressable style={[styles.menuItem, isRTL && styles.rtlMenuItem]}>
            <CreditCard size={20} color={theme.colors.text} />
            <Text style={[styles.menuItemText, isRTL && styles.rtlText]}>{t('paymentMethods')}</Text>
          </Pressable>
          <Pressable style={[styles.menuItem, isRTL && styles.rtlMenuItem]}>
            <Bell size={20} color={theme.colors.text} />
            <Text style={[styles.menuItemText, isRTL && styles.rtlText]}>{t('notifications')}</Text>
          </Pressable>
          <Pressable style={[styles.menuItem, isRTL && styles.rtlMenuItem]}>
            <Award size={20} color={theme.colors.text} />
            <Text style={[styles.menuItemText, isRTL && styles.rtlText]}>{t('achievements')}</Text>
          </Pressable>
          <Pressable style={[styles.menuItem, isRTL && styles.rtlMenuItem]}>
            <HelpCircle size={20} color={theme.colors.text} />
            <Text style={[styles.menuItemText, isRTL && styles.rtlText]}>{t('helpSupport')}</Text>
          </Pressable>
          <Pressable style={[styles.menuItem, isRTL && styles.rtlMenuItem]} onPress={handleLanguageChange}>
            <Globe size={20} color={theme.colors.text} />
            <Text style={[styles.menuItemText, isRTL && styles.rtlText]}>{t('language')}</Text>
            <Text style={[styles.languageValue, isRTL && styles.rtlText]}>
              {language === 'ar' ? t('arabic') : t('english')}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.logoutButtonContainer}>
        <Button
          title={t('logout')}
          onPress={handleLogout}
          variant="outline"
          style={[styles.logoutButton, isRTL && styles.rtlLogoutButton]}
          textStyle={styles.logoutButtonText}
        />
        <View style={[styles.logoutIcon, isRTL && styles.rtlLogoutIcon]}>
          <LogOut size={18} color={theme.colors.error} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  name: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  email: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textLight,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.md,
  },
  subscriptionInfo: {
    marginBottom: theme.spacing.md,
  },
  planName: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  planDates: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.sm,
  },
  planFeatures: {
    marginBottom: theme.spacing.sm,
  },
  planFeature: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subscriptionActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
  },
  manageButton: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  cancelButton: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  noSubscription: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  noSubscriptionText: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
  },
  subscribeButton: {
    minWidth: 150,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuItemText: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
  logoutButtonContainer: {
    position: 'relative',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xxl,
  },
  logoutButton: {
    borderColor: theme.colors.error,
    paddingRight: theme.spacing.xl,
  },
  logoutButtonText: {
    color: theme.colors.error,
  },
  logoutIcon: {
    position: 'absolute',
    right: theme.spacing.md,
    top: '50%',
    transform: [{ translateY: -9 }],
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  loginTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  loginText: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  loginButton: {
    minWidth: 200,
    marginBottom: theme.spacing.md,
  },
  signupButton: {
    minWidth: 200,
  },
  errorContainer: {
    backgroundColor: theme.colors.error + '20',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.fontSizes.sm,
    textAlign: 'center',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlMenuItem: {
    flexDirection: 'row-reverse',
  },
  languageValue: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textLight,
    marginLeft: 'auto',
  },
  rtlLogoutButton: {
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.md,
  },
  rtlLogoutIcon: {
    left: theme.spacing.md,
    right: 'auto',
  },
});