// src/screens/SignUpScreen.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '../../App';
import type { RootStackParamList } from '../../App';
import { Spacing, BorderRadius, FontSizes } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const { colors } = useAppTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.logo, { color: colors.primary }]}>
          Lingro
        </Text>
        <Text style={[styles.title, { color: colors.text }]}>
          Новая учётная запись
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.text
            }
          ]}
          placeholder="Email"
          placeholderTextColor={colors.muted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.text
            }
          ]}
          placeholder="Пароль"
          placeholderTextColor={colors.muted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.accent }]}
          onPress={() => navigation.replace('GetStarted')}
        >
          <Text style={[styles.buttonText, { color: colors.card }]}>
            Зарегистрироваться
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.link, { color: colors.primary }]}>
            Уже есть аккаунт? Войти
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'center'
  },
  logo: {
    fontSize: FontSizes.xl * 1.5,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: Spacing.lg,
    ...Platform.select({
      ios: { fontFamily: 'AvenirNext-Heavy' },
      android: { fontFamily: 'sans-serif-black' }
    })
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.lg
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
    fontSize: FontSizes.md
  },
  button: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginBottom: Spacing.sm
  },
  buttonText: {
    fontSize: FontSizes.md,
    fontWeight: '600'
  },
  link: {
    fontSize: FontSizes.sm,
    textAlign: 'center'
  }
});
