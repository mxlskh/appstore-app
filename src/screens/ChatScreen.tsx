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
import { useAppTheme } from '../../App';
import { Spacing, BorderRadius, FontSizes } from '../theme';

type Message = { id: string; fromUser: boolean; text: string };

export default function ChatScreen() {
  const { colors } = useAppTheme();
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
    // здесь ваш вызов API и добавление ответа ассистента
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          ref={flatRef}
          data={messages}
          style={styles.messageList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                {
                  backgroundColor: item.fromUser ? colors.primary : colors.card,
                  alignSelf: item.fromUser ? 'flex-end' : 'flex-start',
                  borderBottomRightRadius: item.fromUser ? 0 : BorderRadius.md,
                  borderBottomLeftRadius: item.fromUser ? BorderRadius.md : 0,
                  borderColor: colors.border,
                  borderWidth: item.fromUser ? 0 : 1
                }
              ]}
            >
              <Text
                style={[
                  styles.bubbleText,
                  { color: item.fromUser ? colors.card : colors.text }
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

        <View
          style={[
            styles.inputRow,
            {
              backgroundColor: colors.card,
              borderTopColor: colors.border
            }
          ]}
        >
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.background,
                color: colors.text
              }
            ]}
            placeholder="Напишите сообщение..."
            placeholderTextColor={colors.muted!}
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: colors.primary }]}
            onPress={send}
          >
            <Text style={[styles.sendText, { color: colors.card }]}>→</Text>
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
    flex: 1
  },
  messageList: {
    flex: 1
  },
  bubble: {
    maxWidth: '80%',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.xs
  },
  bubbleText: {
    fontSize: FontSizes.md
  },
  inputRow: {
    flexDirection: 'row',
    padding: Spacing.sm,
    borderTopWidth: 1
  },
  input: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.md,
    marginRight: Spacing.sm
  },
  sendButton: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendText: {
    fontSize: FontSizes.lg
  }
});
