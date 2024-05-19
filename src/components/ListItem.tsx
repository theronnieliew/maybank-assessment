import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface ListItemProps {
  name: string;
}

export const ListItem = ({name}: ListItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: '#81D8D0',
    borderRadius: 50,
    height: 38,
    justifyContent: 'center',
    marginBottom: 5,
  },
  text: {
    color: 'black',
    fontSize: 16,
    marginHorizontal: 20,
  },
});
