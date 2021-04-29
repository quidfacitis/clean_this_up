import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import AssignmentItem from '../components/AssignmentItem';

const AssignmentList = ({ assignments, navigation }) => {
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
