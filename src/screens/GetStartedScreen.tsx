// src/screens/GetStartedScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { Spacing, FontSizes, BorderRadius } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'GetStarted'>;

export default function GetStartedScreen({ navigation }: Props) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Начнём наше путешествие в мир языков!
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => navigation.replace('RoleSelection')}
      >
        <Text style={[styles.buttonText, { color: colors.card }]}>
          Давай по порядку
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.md
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.xl
  },
  button: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    width: '80%',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: FontSizes.md,
    fontWeight: '600'
  }
});
