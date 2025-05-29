// src/screens/LanguageSelectionScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

export default function LanguageSelectionScreen({
  route,
  navigation
}: { route: { params: { role: 'student' | 'teacher' } }; navigation: any }) {
  const { role } = route.params;

  const languages = [
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

  const selectLanguage = (langCode: string) => {
    navigation.navigate('Chat', { role, language: langCode });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Выберите язык</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {languages.map(lang => (
          <TouchableOpacity key={lang.code} style={styles.item} onPress={() => selectLanguage(lang.code)}>
            <Text style={styles.itemText}>{lang.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '600', marginBottom: 16, textAlign: 'center' },
  list: { paddingVertical: 8 },
  item: { paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemText: { fontSize: 18 }
});
