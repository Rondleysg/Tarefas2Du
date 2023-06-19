import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {Line} from '../../components/Line';

interface CardStatisticsProps {
  text: string;
  value: string;
}

export default function CardStatistics({text, value}: CardStatisticsProps) {
  return (
    <View style={styles.containerCard}>
      <Line style={styles.line} />
      <View style={styles.containerTexts}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}
