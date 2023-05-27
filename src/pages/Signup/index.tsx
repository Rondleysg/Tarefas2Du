import React, {useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {NavigationProp} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

interface SignupProps {
  navigation: NavigationProp<any, any>;
}

export function Signup({navigation}: SignupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldName, setFieldName] = useState('');
  const [fieldEmail, setFieldEmail] = useState('');
  const [fieldPassword, setFieldPassword] = useState('');

  function clearFields() {
    setFieldName('');
    setFieldEmail('');
    setFieldPassword('');
  }

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  function registerUser() {
    if (fieldName === '' || fieldEmail === '' || fieldPassword === '') {
      Alert.alert('Atenção', 'Todos os campos são obrigatórios.');
    } else {
      setIsLoading(true);

      auth()
        .createUserWithEmailAndPassword(fieldEmail, fieldPassword)
        .then(res => {
          res.user.updateProfile({
            displayName: fieldName,
          });
          setIsLoading(false);
          clearFields();
          navigation.navigate('Login');
        })
        .catch(error => {
          setIsLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Atenção', 'Este e-mail já está em uso.');
            return;
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('Atenção', 'Este e-mail está inválido.');
            return;
          }

          if (error.code === 'auth/weak-password') {
            Alert.alert(
              'Atenção',
              'Sua senha precisa possuir no mínimo 6 caracteres.',
            );
            return;
          }

          Alert.alert(
            'Atenção',
            'Um erro não mapeado aconteceu, verifique sua contexão com a internet ou altere seus dados de cadastro.',
          );
        });
    }
  }

  if (isLoading) {
    //return <Loader />;
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.keyboard}
        keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={require('../../../assets/logo.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setFieldName(text)}
          value={fieldName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setFieldEmail(text)}
          value={fieldEmail}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Senha"
          onChangeText={text => setFieldPassword(text)}
          value={fieldPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => registerUser()}>
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Não possui uma conta?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
