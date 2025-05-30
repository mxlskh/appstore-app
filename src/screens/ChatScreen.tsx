// src/screens/ChatScreen.tsx
import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Colors, Spacing, BorderRadius, FontSizes } from '../theme';

type Message = { id: string; fromUser: boolean; text: string };

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const flatRef = useRef<FlatList>(null);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), fromUser: true, text: input }
    ]);
    setInput('');
    // Здесь ваш вызов API и добавление ответа ассистента
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.fromUser ? styles.userBubble : styles.assistantBubble
              ]}
            >
              <Text
                style={[
                  styles.bubbleText,
                  { color: item.fromUser ? '#fff' : Colors.text }
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}
          contentContainerStyle={{ padding: Spacing.md }}
          onContentSizeChange={() => flatRef.current?.scrollToEnd()}
          keyboardShouldPersistTaps="handled"
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Напишите сообщение..."
            placeholderTextColor={Colors.muted}
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={send}>
            <Text style={styles.sendText}>→</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  bubble: {
    maxWidth: '80%',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.xs
  },
  userBubble: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0
  },
  assistantBubble: {
    backgroundColor: Colors.card,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: Colors.border
  },
  bubbleText: {
    fontSize: FontSizes.md
  },
  inputRow: {
    flexDirection: 'row',
    padding: Spacing.sm,
    borderTopWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.md,
    marginRight: Spacing.sm
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendText: {
    color: '#fff',
    fontSize: FontSizes.lg
  }
});
