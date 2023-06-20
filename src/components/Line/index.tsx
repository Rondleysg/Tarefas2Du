// ** React Imports
import React from 'react';
import {View, StyleSheet} from 'react-native';

interface LineProps {
  style?: any;
}

export const Line = ({style = {}}: LineProps) => {
  return <View style={[styles.line, style]} />;
};

export const styles = StyleSheet.create({
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
  },
});
