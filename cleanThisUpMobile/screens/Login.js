import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
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
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text>Password</Text>
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
        accessibilityLabel="Sign in button"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 5,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 5,
  },
});

export default Login;
