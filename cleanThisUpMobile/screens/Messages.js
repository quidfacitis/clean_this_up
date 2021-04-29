import React, { useState, useCallback, useEffect } from 'react';
import {
  FlatList,
  TextInput,
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native';

const Messages = ({ route }) => {
  const [msg, setMsg] = useState('');
  const [updatedMsgs, setUpdatedMsgs] = useState([]);
  const { messages, id } = route.params;

  const submitMsg = useCallback(async () => {
    const result = await fetch('http://localhost:3000/api/assignments', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        content: msg,
        message_id: new Date().valueOf(),
        admin: false,
      }),
    });
    if (result.ok) {
      const res = await fetch(`http://localhost:3000/api/assignments/${id}`);
      if (res.ok) {
        let fetchedUpdatedMsgs = await res.json();
        fetchedUpdatedMsgs = fetchedUpdatedMsgs[0].messages;
        setUpdatedMsgs(fetchedUpdatedMsgs);
        setMsg('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg]);

  const fetchMsgs = useCallback(async () => {
    const result = await fetch(`http://localhost:3000/api/assignments/${id}`);
    if (result.ok) {
      let fetchedUpdatedMsgs = await result.json();
      fetchedUpdatedMsgs = fetchedUpdatedMsgs[0].messages;
      setUpdatedMsgs(fetchedUpdatedMsgs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMsgs();
    const fetchMsgsInterval = setInterval(fetchMsgs, 3000);
    return () => {
      clearInterval(fetchMsgsInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={updatedMsgs.length > 0 ? updatedMsgs : messages}
        keyExtractor={item => item.message_id}
        renderItem={({ item }) => {
          const date = new Date(item.message_id)
            .toLocaleString()
            .split(' ')
            .slice(0, 5)
            .join(' ');
          return (
            <View style={styles.chatMsg}>
              <Text style={item.admin ? styles.adminMsg : styles.staffMsg}>
                {item.content}
              </Text>
              <Text style={item.admin ? styles.adminDate : styles.staffDate}>
                {date}
              </Text>
            </View>
          );
        }}
      />
      <View style={styles.composeMessageContainer}>
        <TextInput
          style={styles.composeMessage}
          multiline={true}
          numberOfLines={3}
          placeholder="Your message here..."
          onChangeText={setMsg}
          value={msg}
        />
        <Button
          onPress={submitMsg}
          style={styles.composeMessageBtn}
          title="Send"
          accessibilityLabel="Send message"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  chatMsg: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  adminMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#737078',
    color: 'white',
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#737078',
    overflow: 'hidden',
    fontSize: 16,
    marginBottom: 5,
  },
  adminDate: {
    alignSelf: 'flex-start',
  },
  staffMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#4cac84',
    color: 'white',
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4cac84',
    overflow: 'hidden',
    fontSize: 16,
    marginBottom: 5,
  },
  staffDate: {
    alignSelf: 'flex-end',
  },
  composeMessageContainer: {
    flexDirection: 'row',
    // height: 100,
    alignItems: 'center',
  },
  composeMessage: {
    borderColor: '#737078',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    height: 55,
    fontSize: 16,
    width: '85%',
  },
  composeMessageBtn: {
    width: '15%',
  },
});

export default Messages;
