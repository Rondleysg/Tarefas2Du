import React from 'react';
import {View} from 'react-native';
import styles from './styles';

interface LineProps {
  style?: any;
}

export const Line = ({style = {}}: LineProps) => {
  return <View style={[styles.line, style]} />;
};
