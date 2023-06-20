// ** React Imports
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';

// ** Icons Imports
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface FabButtonProps {
  onClick: () => void;
}

export default function FabButton({onClick}: FabButtonProps) {
  const window = useWindowDimensions();

  return (
    <View style={[styles.container, {right: window.width / 2 - 32}]}>
      <TouchableWithoutFeedback onPress={() => onClick()}>
        <MaterialCommunityIcons
          name="plus-circle-outline"
          color={'#4AC356'}
          size={64}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    bottom: -5,
    zIndex: 100,
  },
});
