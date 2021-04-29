import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import AssignmentItem from '../components/AssignmentItem';

const AssignmentList = ({ assignments }) => {
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.cards}
      data={assignments}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View>
          <AssignmentItem assignment={item} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    // padding: 10,
    backgroundColor: '#edeeef',
  },
  cards: {
    // flexGrow: 1,
    alignItems: 'center',
    // marginVertical: 10,
  },
});

export default AssignmentList;
