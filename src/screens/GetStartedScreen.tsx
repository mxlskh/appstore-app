// src/screens/GetStartedScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme';

type GetStartedProps = NativeStackScreenProps<RootStackParamList, 'GetStarted'>;

export default function GetStartedScreen({ navigation }: GetStartedProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Начнём наше путешествие в мир языков!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('RoleSelection')}
      >
        <Text style={styles.buttonText}>Давай по порядку</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.md
  },
  title: {
    color: '#fff',
    fontSize: FontSizes.lg,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.xl
  },
  button: {
    backgroundColor: '#fff',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    width: '80%',
    alignItems: 'center'
  },
  buttonText: {
    color: Colors.primary,
    fontSize: FontSizes.md,
    fontWeight: '600'
  }
});
