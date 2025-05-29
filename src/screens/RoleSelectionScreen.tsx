// src/screens/RoleSelectionScreen.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView
} from 'react-native';

export default function RoleSelectionScreen({ navigation }: { navigation: any }) {
  const [modalVisible, setModalVisible] = useState(false);
  const rolesInfo = `
👨‍🎓 Ученик:
  можешь изучать язык через тесты, задания, голосовые и текстовые упражнения,
  получая мгновенную обратную связь.

👩‍🏫 Преподаватель:
  можешь создавать задания, проверять ответы учеников и
  использовать бота как ассистента для планирования и обучения.
`;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Кто вы?</Text>
      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => navigation.navigate('LanguageSelection', { role: 'student' })}
      >
        <Text style={styles.roleText}>👨‍🎓 Ученик</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => navigation.navigate('LanguageSelection', { role: 'teacher' })}
      >
        <Text style={styles.roleText}>👩‍🏫 Преподаватель</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.aboutLink} onPress={() => setModalVisible(true)}>
        <Text style={styles.aboutText}>О ролях</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Описание ролей</Text>
              <Text style={styles.modalBody}>{rolesInfo}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const PRIMARY = '#3478f6';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24
  },
  roleButton: {
    backgroundColor: '#f2f5f9',
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 16,
    alignItems: 'center'
  },
  roleText: {
    fontSize: 20,
    color: '#333'
  },
  aboutLink: {
    position: 'absolute',
    bottom: 24,
    right: 24
  },
  aboutText: {
    color: PRIMARY,
    fontSize: 16
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: '80%',
    padding: 16
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center'
  },
  modalBody: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22
  },
  modalClose: {
    marginTop: 16,
    alignSelf: 'center'
  },
  modalCloseText: {
    color: PRIMARY,
    fontWeight: '500'
  }
});
