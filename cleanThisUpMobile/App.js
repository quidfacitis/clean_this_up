import 'react-native-gesture-handler';
import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import AssignmentList from './screens/AssignmentList';
import Messages from './screens/Messages';

const Stack = createStackNavigator();

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // assignments: [],
      employeeId: null,
      signedIn: false,
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
      const employeeId = await result.json();
      this.setState({
        employeeId: employeeId.employeeId,
        signedIn: true,
      });
    }
  }

  render() {
    const { employeeId, signedIn } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {!signedIn ? (
          <Login login={this.login} />
        ) : (
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Clean This Up">
                {props => <AssignmentList {...props} employeeId={employeeId} />}
              </Stack.Screen>
              <Stack.Screen
                name="Messages"
                component={Messages}
                // options={{ title: 'Messages' }}
                options={({ route }) => ({
                  title: route.params.task,
                  headerStyle: {
                    backgroundColor: 'white',
                  },
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        )}
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
