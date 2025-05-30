// src/screens/RoleSelectionScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { useAppTheme } from '../../App';
import { Spacing, BorderRadius, FontSizes } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'RoleSelection'>;

export default function RoleSelectionScreen({ navigation }: Props) {
  const { colors } = useAppTheme();

  const onChoose = (role: 'student' | 'teacher') =>
    navigation.replace('LanguageSelection', { role });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.logo, { color: colors.primary }]}>
        Lingro
      </Text>
      <Text style={[styles.title, { color: colors.text }]}>Кто вы?</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.accent }]}
          onPress={() => onChoose('teacher')}
        >
          <Text style={[styles.cardText, { color: '#fff' }]}>Преподаватель</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.primary }]}
          onPress={() => onChoose('student')}
        >
          <Text style={[styles.cardText, { color: '#fff' }]}>Ученик</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'center'
  },
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  card: {
    width: '40%',
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  cardText: {
    fontSize: FontSizes.md,
    fontWeight: '600'
  }
});
