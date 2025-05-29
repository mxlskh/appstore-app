// src/screens/SettingsScreen.tsx
import React, { useState } from 'react';
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
import { Colors, Spacing, BorderRadius, FontSizes } from '../theme';

type SettingsProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation, route }: SettingsProps) {
  const { role } = route.params;
  const [notifications, setNotifications] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Уведомления</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ true: Colors.primary }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Тёмная тема</Text>
          <Switch
            value={dark}
            onValueChange={setDark}
            trackColor={{ true: Colors.primary }}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('RoleSelection')}
        >
          <Text style={styles.buttonText}>Изменить роль</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('LanguageSelection', { role })}
        >
          <Text style={styles.buttonText}>Изменить язык</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>О разработчиках</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
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
    fontSize: FontSizes.md,
    color: Colors.text
  },
  button: {
    backgroundColor: Colors.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border
  },
  buttonText: {
    fontSize: FontSizes.md,
    color: Colors.text
  }
});
