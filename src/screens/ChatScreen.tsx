// src/screens/ChatScreen.tsx
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  Text
} from 'react-native';
import {
  GiftedChat,
  InputToolbar,
  IMessage,
  User
} from 'react-native-gifted-chat';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';

export default function ChatScreen({
  route,
  navigation
}: {
  route: { params: { role: 'student' | 'teacher'; language: string } };
  navigation: any;
}) {
  const { role, language } = route.params;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const welcomeText =
      role === 'teacher'
        ? '👩‍🏫 Привет, преподаватель! Готовы создавать задания?'
        : '👨‍🎓 Привет, ученик! Я помогу с практикой.';
    setMessages([
      {
        _id: 1,
        text: welcomeText,
        createdAt: new Date(),
        user: { _id: 2, name: 'ИИ' } as User
      }
    ]);
  }, [role]);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages(prev => GiftedChat.append(prev, newMessages));
    // TODO: отправить вместе с { role, language }
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7
    });
    if ((result as any).canceled) return;
    const asset = (result as any).assets?.[0];
    if (!asset) return;
    const msg: IMessage = {
      _id: Date.now(),
      text: '',
      createdAt: new Date(),
      user: { _id: 1 } as User,
      image: asset.uri
    };
    setMessages(prev => GiftedChat.append(prev, [msg]));
  };

  const pickDocument = async () => {
    const res: any = await DocumentPicker.getDocumentAsync({});
    if (res.type === 'cancel') return;
    const msg: IMessage = {
      _id: Date.now(),
      text: `📎 ${res.name}`,
      createdAt: new Date(),
      user: { _id: 1 } as User
    };
    setMessages(prev => GiftedChat.append(prev, [msg]));
  };

  const startRecording = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') return;
    const rec = new Audio.Recording();
    await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    await rec.startAsync();
    setRecording(rec);
  };
  const stopRecording = async () => {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);
    if (!uri) return;
    const msg: IMessage = {
      _id: Date.now(),
      text: '',
      createdAt: new Date(),
      user: { _id: 1 } as User,
      audio: uri
    };
    setMessages(prev => GiftedChat.append(prev, [msg]));
  };

  const renderActions = () => (
    <View style={styles.actions}>
      <Text onPress={pickImage} style={styles.action}>📷</Text>
      <Text onPress={pickDocument} style={styles.action}>📎</Text>
      {recording ? (
        <Text onPress={stopRecording} style={styles.action}>⏹️</Text>
      ) : (
        <Text onPress={startRecording} style={styles.action}>🎙️</Text>
      )}
    </View>
  );

  const renderInputToolbar = (props: any) => (
    <View>
      {sending && <ActivityIndicator style={{ margin: 8 }} />}
      <InputToolbar {...props} />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={60}
    >
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: 1 }}
        renderActions={renderActions}
        renderInputToolbar={renderInputToolbar}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginBottom: 4
  },
  action: {
    fontSize: 24,
    marginRight: 16
  }
});
