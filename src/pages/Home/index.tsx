import React from 'react';
import {Text, View} from 'react-native';
import useUser from '../../hooks/useUser';

interface HomeProps {}

export function Home({}: HomeProps) {
  const [user] = useUser();
  console.log(user);
  return (
    <View>
      <Text>teste</Text>
    </View>
  );
}
