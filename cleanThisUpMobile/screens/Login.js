import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
} from 'react-native';

const Login = ({ login }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // const login = useCallback(async () => {
  //   const result = await fetch('http://localhost:3000/api/auth', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   });
  //   if (result.ok) {
  //     const fetchedEmployeeId = await result.json();
  //     setEmployeeId(fetchedEmployeeId);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [email, password]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Clean This Up</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Password"
        keyboardType="default"
        autoCapitalize="none"
      />
      <Button
        onPress={() => login(email, password)}
        title="Sign In"
        color="white"
        accessibilityLabel="Sign in button"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 30,
    backgroundColor: 'white',
  },
  label: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 10,
    paddingBottom: 5,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 100,
    backgroundColor: '#4cac84',
  },
  titleText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: 20,
  },
});

export default Login;
