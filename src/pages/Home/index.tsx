import React from 'react';
import {Text, View} from 'react-native';
import useUser from '../../hooks/useUser';

interface HomeProps {}

export function Home({}: HomeProps) {
  const {user} = useUser();
  console.log(user);
  if (!user) {
    console.log('user not found');

    return <></>;
  }
  return (
    <View>
      <Text>{user.name}</Text>
    </View>
  );
}
