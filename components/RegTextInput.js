import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const RegTextInput = ({placeholder, value, onChangeText}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={text => onChangeText(text)}
    />
  );
};

export default RegTextInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    borderRadius: 15,
    marginBottom: 10,
    paddingLeft: 20,
  },
});
