import React from 'react';
import {Text, View} from 'react-native';
import {User} from '../../types/user';

interface HomeProps {
  user: User;
}

export function Home({user}: HomeProps) {
  return (
    <View>
      <Text>{user.name}</Text>
    </View>
  );
}
