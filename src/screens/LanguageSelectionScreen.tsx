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
import type { RootStackParamList } from '../../App';
import { Colors, Spacing, BorderRadius, FontSizes } from '../theme';

const LANGUAGES = [
  { code: 'en', label: 'Английский' },
  { code: 'de', label: 'Немецкий' },
  { code: 'fr', label: 'Французский' },
  { code: 'zh', label: 'Китайский' },
  { code: 'es', label: 'Испанский' }
];

type Props = NativeStackScreenProps<RootStackParamList, 'LanguageSelection'>;

export default function LanguageSelectionScreen({
  route,
  navigation
}: Props) {
  const { role } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Выберите язык</Text>
      <FlatList
        data={LANGUAGES}
        keyExtractor={item => item.code}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.replace('Chat', { role, language: item.code })
            }
          >
            <Text style={styles.cardText}>{item.label}</Text>
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
    backgroundColor: Colors.background,
    padding: Spacing.md
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.lg
  },
  card: {
    backgroundColor: Colors.card,
    width: '48%',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border
  },
  cardText: {
    fontSize: FontSizes.md,
    color: Colors.text,
    fontWeight: '500'
  }
});
