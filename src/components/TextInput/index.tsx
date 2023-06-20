// ** React Imports
import React from 'react';

// ** Components Imports
import {TextInput} from 'react-native-paper';

// ** Styles Imports
import styles from './styles';

interface TextInputComponentProps {
  onChangeText: (text: string) => void;
  stylesProps: any;
  valueField: string;
  placeholder: string;
  textLabel: string;
  iconName: string;
  secureTextEntry?: boolean;
}

export default function TextInputComponent({
  onChangeText,
  stylesProps,
  valueField,
  placeholder,
  textLabel,
  iconName,
  secureTextEntry = false,
}: TextInputComponentProps) {
  return (
    <>
      <TextInput
        style={stylesProps}
        label={textLabel}
        mode="outlined"
        activeOutlineColor="#5DB075"
        placeholderTextColor="#aaaaaa"
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={text => onChangeText(text)}
        value={valueField}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        left={
          <TextInput.Icon
            icon={iconName}
            style={styles.icon}
            iconColor="#aaaaaa"
          />
        }
      />
    </>
  );
}
