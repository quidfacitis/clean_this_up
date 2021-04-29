// import 'react-native-gesture-handler';
import React, { Component } from 'react';
// import { View, Text } from 'react-native';
import { StyleSheet, SafeAreaView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import AssignmentList from './screens/AssignmentList';

// const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [
        {
          messages: [],
          _id: '6088c29500ccd301358ddf8e',
          id: 1619575445308,
          employee_id: 1619562412676,
          name: 'Austin Chapman',
          task: 'Clean the Gorilla cage',
          urgent: false,
          __v: 0,
        },
        {
          messages: [],
          _id: '6088ccad9f836c033d52dcea',
          id: 1619578029960,
          employee_id: 1619562412676,
          name: 'Austin Chapman',
          task: 'Clean the pool',
          urgent: true,
          __v: 0,
        },
        {
          messages: [],
          _id: '6088ccb89f836c033d52dceb',
          id: 1619578040163,
          employee_id: 1619562412676,
          name: 'Austin Chapman',
          task: 'Burn incriminating evidence',
          urgent: true,
          __v: 0,
        },
      ],
      signedIn: true,
    };
    this.login = this.login.bind(this);
  }

  async login(email, password) {
    const result = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (result.ok) {
      const assignments = await result.json();
      this.setState({
        assignments,
        signedIn: true,
      });
    }
  }

  render() {
    const { assignments, signedIn } = this.state;
    return (
      // <NavigationContainer>
      //   <Stack.Navigator>
      //     <Stack.Screen name="AssignmentList" component={AssignmentList} />
      //   </Stack.Navigator>
      // </NavigationContainer>
      <SafeAreaView style={styles.container}>
        {!signedIn && <Login login={this.login} />}
        {signedIn && <AssignmentList assignments={assignments} />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});

export default App;
