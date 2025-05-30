// src/screens/SettingsScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { useAppTheme } from '../../App';                  // ← правильный хук
import { Spacing, BorderRadius, FontSizes } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation, route }: Props) {
  const { isDark, toggleTheme, colors } = useAppTheme();  // ← берём colors из контекста
  const { role } = route.params;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.text }]}>Тёмная тема</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ true: colors.primary }}
            thumbColor={isDark ? colors.accent : undefined}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { borderColor: colors.border }]}
          onPress={() => navigation.replace('RoleSelection')}
        >
          <Text style={[styles.buttonText, { color: colors.text }]}>
            Изменить роль
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { borderColor: colors.border }]}
          onPress={() => navigation.replace('LanguageSelection', { role })}
        >
          <Text style={[styles.buttonText, { color: colors.text }]}>
            Изменить язык
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { borderColor: colors.border }]}>
          <Text style={[styles.buttonText, { color: colors.text }]}>
            О разработчиках
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: Spacing.md
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Spacing.sm
  },
  label: {
    fontSize: FontSizes.md
  },
  button: {
    backgroundColor: 'transparent',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.sm,
    borderWidth: 1
  },
  buttonText: {
    fontSize: FontSizes.md
  }
});
