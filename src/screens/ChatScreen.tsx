// src/screens/ChatScreen.tsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  KeyboardAvoidingView
} from 'react-native';

interface Message {
  id: string;
  userId: number;
  text?: string;
  imageUri?: string;
  createdAt: Date;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendText = useCallback(() => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      userId: 1,
      text: input.trim(),
      createdAt: new Date()
    };
    setMessages(prev => [newMsg, ...prev]);
    setInput('');
  }, [input]);

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.userId === 1;
    return (
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleBot]}>
        {item.text && <Text style={styles.text}>{item.text}</Text>}
        {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.image} />}
        <Text style={styles.time}>{item.createdAt.toLocaleTimeString()}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={60}
    >
      {/* FlatList — единственный скролл */}
      <FlatList
        data={messages}
        inverted
        keyExtractor={msg => msg.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {/* Строка ввода */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Введите сообщение..."
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendText}>
          <Text style={styles.sendTxt}>Отправить</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f5f9' },
  list: { padding: 8 },
  bubble: {
    marginVertical: 4,
    marginHorizontal: 12,
    padding: 10,
    borderRadius: 12,
    maxWidth: '80%'
  },
  bubbleMe: {
    backgroundColor: '#3478f6',
    alignSelf: 'flex-end'
  },
  bubbleBot: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start'
  },
  text: { color: '#000' },
  time: { fontSize: 10, color: '#666', alignSelf: 'flex-end', marginTop: 4 },
  image: { width: 150, height: 100, borderRadius: 8, marginTop: 8 },
  inputRow: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#fafafa'
  },
  sendBtn: { justifyContent: 'center', paddingHorizontal: 12 },
  sendTxt: { color: '#3478f6', fontWeight: '600' }
});
