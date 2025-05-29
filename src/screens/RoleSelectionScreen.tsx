// src/screens/RoleSelectionScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { Colors, Spacing, BorderRadius, FontSizes } from '../theme';

type RoleSelectionProps = NativeStackScreenProps<RootStackParamList, 'RoleSelection'>;

export default function RoleSelectionScreen({ navigation }: RoleSelectionProps) {
  const onChoose = (role: 'student' | 'teacher') =>
    navigation.replace('LanguageSelection', { role });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Кто вы?</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: Colors.accent }]}
          onPress={() => onChoose('teacher')}
        >
          <Text style={styles.cardText}>Преподаватель</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: Colors.primary }]}
          onPress={() => onChoose('student')}
        >
          <Text style={styles.cardText}>Ученик</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
    justifyContent: 'center'
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.lg
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  card: {
    width: '40%',
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  cardText: {
    color: '#fff',
    fontSize: FontSizes.md,
    fontWeight: '600'
  }
});
