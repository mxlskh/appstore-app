// src/screens/GetStartedScreen.tsx
import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function GetStartedScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Чат с ИИ</Text>
      <Text style={styles.subtitle}>
        Добро пожаловать! Здесь вы можете учиться или преподавать с помощью нашего бота.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RoleSelection')}
      >
        <Text style={styles.buttonText}>Давай начнём</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const PRIMARY = '#3478f6';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32
  },
  button: {
    backgroundColor: PRIMARY,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500'
  }
});
