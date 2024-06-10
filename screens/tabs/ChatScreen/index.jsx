import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
// import { auth, db } from '../firebase';
// import { signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';


const Chat = ({ navigation }) => {
  console.log('navigation: ', navigation)
  const [messages, setMessages] = useState([]);
  // const signOutNow = () => {
  //   signOut(auth).then(() => {
  //     // Sign-out successful.
  //     navigation.replace('Login');
  //   }).catch((error) => {
  //     // An error happened.
  //   });
  // }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerLeft: () => (
        <View style={{ marginLeft: 20, backgroundColor: 'red', width: 30, height: 30 }}>
          <Avatar
            rounded
            source={{
              // uri: auth?.currentUser?.photoURL,
              uri: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=1480&t=st=1715586717~exp=1715587317~hmac=e4757bed75a1508d9c15081d109da3b3972bfa329dd468f97c2f7365192de105'
            }}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity style={{
          marginRight: 10
        }}
          // onPress={signOutNow}
          onPress={() => { console.log('sign out') }}
        >
          <Text>logout</Text>
        </TouchableOpacity>
      )
    })

  }, [navigation]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=1480&t=st=1715586554~exp=1715587154~hmac=24b6f9dd4b9bc4c86248a7905ad91b136719e16c3edcd104ab6f4b515075befb',
        },
      },
    ])
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, []);
  console.log('messages: ', messages)
  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        // _id: auth?.currentUser?.email,
        // name: auth?.currentUser?.displayName,
        // avatar: auth?.currentUser?.photoURL
        _id: 'test@gmail.com',
        name: 'test namee',
        avatar: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=1480&t=st=1715586717~exp=1715587317~hmac=e4757bed75a1508d9c15081d109da3b3972bfa329dd468f97c2f7365192de105'
      }}
    />
  );
}

export default Chat;