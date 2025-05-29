// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack';

import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import GetStartedScreen from './src/screens/GetStartedScreen';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';
import ChatScreen from './src/screens/ChatScreen';

// 1. Описываем параметры для всех экранов
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  GetStarted: undefined;
  RoleSelection: undefined;
  LanguageSelection: { role: 'student' | 'teacher' };
  Chat: { role: 'student' | 'teacher'; language: string };
};

// 2. (Опционально) экспорт типов пропсов экранов
export type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export type GetStartedProps = NativeStackScreenProps<RootStackParamList, 'GetStarted'>;
export type RoleSelectionProps = NativeStackScreenProps<RootStackParamList, 'RoleSelection'>;
export type LanguageSelectionProps = NativeStackScreenProps<RootStackParamList, 'LanguageSelection'>;
export type ChatProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;

// 3. Создаем стек навигации с типами
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: 'Войти' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: 'Регистрация' }}
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
          options={{ 
            headerShown: false,
            title: 'Выберите язык'
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ title: 'Чат с ИИ' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
