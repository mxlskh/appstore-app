// src/screens/LanguageSelectionScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';
import type { RootStackParamList } from '../../App';
import { Spacing, BorderRadius, FontSizes } from '../theme';

const LANGUAGES = [
  { code: 'en', label: '🇺🇸/🇬🇧 Английский' },
  { code: 'es', label: '🇪🇸 Испанский' },
  { code: 'zh', label: '🇨🇳 Китайский' },
  { code: 'fr', label: '🇫🇷 Французский' },
  { code: 'ar', label: '🇦🇪 Арабский' },
  { code: 'ru', label: '🇷🇺 Русский' },
  { code: 'de', label: '🇩🇪 Немецкий' },
  { code: 'pt', label: '🇵🇹 Португальский' },
  { code: 'ja', label: '🇯🇵 Японский' },
  { code: 'it', label: '🇮🇹 Итальянский' }
];

type Props = NativeStackScreenProps<RootStackParamList, 'LanguageSelection'>;

export default function LanguageSelectionScreen({
  route,
  navigation
}: Props) {
  const { colors } = useTheme();
  const { role } = route.params;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Выберите язык
      </Text>
      <FlatList
        data={LANGUAGES}
        keyExtractor={item => item.code}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border
              }
            ]}
            onPress={() =>
              navigation.replace('Chat', { role, language: item.code })
            }
          >
            <Text style={[styles.cardText, { color: colors.text }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: Spacing.lg }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.lg
  },
  card: {
    width: '48%',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    alignItems: 'center',
    borderWidth: 1
  },
  cardText: {
    fontSize: FontSizes.md,
    fontWeight: '500'
  }
});
