import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import AssignmentItem from '../components/AssignmentItem';

const AssignmentList = ({ employeeId, navigation }) => {
  const [assignments, setAssignments] = useState([]);
  const fetchAssignments = useCallback(async () => {
    const result = await fetch(`http://localhost:3000/api/auth/${employeeId}`);
    if (result.ok) {
      let fetchedAssignments = await result.json();
      setAssignments(fetchedAssignments);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAssignments();
    const fetchAssignmentsInterval = setInterval(fetchAssignments, 3000);
    return () => {
      clearInterval(fetchAssignmentsInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.cards}
      data={assignments}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View>
          <AssignmentItem
            assignment={item}
            handlePress={() => {
              navigation.navigate('Messages', item);
            }}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#4cac84',
    paddingTop: 25,
  },
  cards: {
    alignItems: 'center',
  },
});

export default AssignmentList;
