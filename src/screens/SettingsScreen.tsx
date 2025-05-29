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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type SettingsProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({ route, navigation }: SettingsProps) {
  const { role } = route.params;
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Переключатель уведомлений */}
        <View style={styles.row}>
          <Text style={styles.label}>Уведомления</Text>
          <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
        </View>
        {/* Переключатель темы */}
        <View style={styles.row}>
          <Text style={styles.label}>Тёмная тема</Text>
          <Switch value={darkTheme} onValueChange={setDarkTheme} />
        </View>
        {/* Кнопка изменить роль */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('RoleSelection')}
        >
          <Text style={styles.buttonText}>Изменить роль</Text>
        </TouchableOpacity>
        {/* Кнопка изменить язык */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('LanguageSelection', { role })}
        >
          <Text style={styles.buttonText}>Изменить язык</Text>
        </TouchableOpacity>
        {/* Кнопка «О разработчиках» */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            /* сюда можно добавить navigation.navigate('About') */
          }}
        >
          <Text style={styles.buttonText}>О разработчиках</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  label: { fontSize: 18 },
  button: {
    backgroundColor: '#f2f5f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16
  },
  buttonText: { fontSize: 16 }
});
