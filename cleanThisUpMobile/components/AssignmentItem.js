import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AssignmentItem = ({ assignment }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.taskName}>{assignment.task}</Text>
        <Text style={styles.dueBy}>Mon, May 3 @ 5:00 p.m.</Text>
        <Switch
          trackColor={{ false: '#737078', true: '#4cac84' }}
          thumbColor={isEnabled ? '#edeeef' : '#edeeef'}
          ios_backgroundColor="#edeeef"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <TouchableOpacity style={styles.chatIcon}>
          <Icon name="comment-o" size={30} color="#4cac84" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#737078',
    paddingVertical: 10,
    width: 250,
    minHeight: 150,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  taskName: {
    fontSize: 20,
    marginBottom: 5,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#737078',
    textAlign: 'center',
  },
  dueBy: {
    fontSize: 14,
    color: '#4cac84',
    marginBottom: 15,
  },
  chatIcon: {
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
});

export default AssignmentItem;
