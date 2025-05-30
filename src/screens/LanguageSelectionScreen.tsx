import React from 'react';
import {
  SafeAreaView,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  View,
  Platform
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { useAppTheme } from '../../App';
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

export default function LanguageSelectionScreen({ route, navigation }: Props) {
  const { colors } = useAppTheme();
  const { role } = route.params;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.logo, { color: colors.primary }]}>Lingro</Text>
      <Text style={[styles.title, { color: colors.text }]}>Выберите язык</Text>
      <FlatList
        data={LANGUAGES}
        keyExtractor={item => item.code}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: Spacing.lg }}
        renderItem={({ item }) => (
          <Pressable
            android_ripple={{ color: '#0002' }}
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border
              },
              pressed && styles.pressed
            ]}
            onPress={() => navigation.replace('Chat', { role, language: item.code })}
          >
            <Text style={[styles.cardText, { color: colors.text }]}>{item.label}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.md },
  logo: {
    fontSize: FontSizes.xl * 1.5,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: Spacing.lg,
    ...Platform.select({
      ios:   { fontFamily: 'AvenirNext-Heavy' },
      android: { fontFamily: 'sans-serif-black' }
    })
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.lg
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: Spacing.sm
  },
  card: {
    width: '48%',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: Spacing.sm,
    // тень для iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // и для Android
    elevation: 3
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.8
  },
  cardText: {
    fontSize: FontSizes.md,
    fontWeight: '500'
  }
});
