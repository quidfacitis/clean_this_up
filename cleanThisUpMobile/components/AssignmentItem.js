import React, { useState, useCallback } from 'react';
import { TouchableOpacity, View, Text, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AssignmentItem = ({ assignment, handlePress }) => {
  const [isEnabled, setIsEnabled] = useState(assignment.done);
  const toggleSwitch = () => {
    toggleDone();
  };

  const toggleDone = useCallback(async () => {
    const result = await fetch('http://localhost:3000/api/assignments', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: assignment.id,
        done: !isEnabled,
      }),
    });
    if (result.ok) {
      setIsEnabled(previousState => !previousState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled]);

  return (
    <TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.taskName}>{assignment.task}</Text>
        <Text style={styles.dueBy}>{assignment.dueBy}</Text>
        <Switch
          trackColor={{ false: '#737078', true: '#4cac84' }}
          thumbColor={isEnabled ? '#edeeef' : '#edeeef'}
          ios_backgroundColor="#737078"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <TouchableOpacity style={styles.chatIcon} onPress={handlePress}>
          <Icon name="comment-o" size={30} color="#4cac84" />
          <View style={styles.angleIcon}>
            <Icon name="angle-right" size={25} color="#4cac84" />
          </View>
        </TouchableOpacity>
        {assignment.urgent && (
          <View style={styles.urgentIcon}>
            <Icon name="exclamation" size={20} color="#4cac84" />
          </View>
        )}
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
    backgroundColor: 'white',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  angleIcon: {
    marginLeft: 5,
  },
  urgentIcon: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    height: 30,
    width: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4cac84',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default AssignmentItem;
