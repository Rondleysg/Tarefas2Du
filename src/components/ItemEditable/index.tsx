import React from 'react';
import {View, Text, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {useState} from 'react';

interface ItemEditableProps {
  text: string;
  style: any;
  onChangeText: (text: string) => void;
  onEdit: () => void;
}

export const ItemEditable = ({
  text,
  style,
  onChangeText,
  onEdit,
}: ItemEditableProps) => {
  const [textState, setTextState] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  const handleOnChangeText = (textEdit: string) => {
    setTextState(textEdit);
    onChangeText(textEdit);
  };

  const handleOnSendEdit = () => {
    onEdit();
    setIsEditing(false);
  };

  return (
    <View style={styles.flexField}>
      {isEditing ? (
        <TextInput
          style={styles.inputEdit}
          onChangeText={textEdit => handleOnChangeText(textEdit)}
          value={textState}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      ) : (
        <Text style={style}>{text}</Text>
      )}
      {isEditing ? (
        <View style={styles.containerIcons}>
          <MaterialCommunityIcons
            name={'send'}
            color="#a9a9a9"
            size={24}
            onPress={() => handleOnSendEdit()}
          />
          <MaterialCommunityIcons
            name={'close'}
            color="#a9a9a9"
            size={24}
            onPress={() => setIsEditing(false)}
          />
        </View>
      ) : (
        <MaterialCommunityIcons
          name={'pencil'}
          color="#a9a9a9"
          size={24}
          onPress={() => setIsEditing(true)}
        />
      )}
    </View>
  );
};
