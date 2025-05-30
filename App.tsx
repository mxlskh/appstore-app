import React, { createContext, useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';

import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import GetStartedScreen from './src/screens/GetStartedScreen';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';
import ChatScreen from './src/screens/ChatScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import {
  LightNavTheme,
  DarkNavTheme,
  LightColors,
  DarkColors,
  AppColors
} from './src/theme';

// Контекст темы
export type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: AppColors;
};
export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
  colors: LightColors
});
export const useAppTheme = () => useContext(ThemeContext);

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  GetStarted: undefined;
  RoleSelection: undefined;
  LanguageSelection: { role: 'student' | 'teacher' };
  Chat: { role: 'student' | 'teacher'; language: string };
  Settings: { role: 'student' | 'teacher'; language: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((v) => !v);

  // Выбираем цвета и тему навигации
  const colors = isDark ? DarkColors : LightColors;
  const navTheme = isDark ? DarkNavTheme : LightNavTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ title: 'Войти', headerStyle: { backgroundColor: colors.card }, headerTitleStyle: { color: colors.text } }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ title: 'Регистрация', headerStyle: { backgroundColor: colors.card }, headerTitleStyle: { color: colors.text } }}
          />
          <Stack.Screen
            name="GetStarted"
            component={GetStartedScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RoleSelection"
            component={RoleSelectionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LanguageSelection"
            component={LanguageSelectionScreen}
            options={{ headerShown: false, title: 'Выберите язык' }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={({ navigation, route }) => ({
              title: 'Чат',
              headerBackVisible: false,
              gestureEnabled: false,
              headerStyle: { backgroundColor: colors.card },
              headerTitleStyle: { color: colors.text },
              headerRight: () => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Settings', {
                      role: route.params.role,
                      language: route.params.language
                    })
                  }
                  style={{ marginRight: 16 }}
                >
                  <Ionicons name="settings-outline" size={24} color={colors.text} />
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Настройки', headerStyle: { backgroundColor: colors.card }, headerTitleStyle: { color: colors.text } }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
