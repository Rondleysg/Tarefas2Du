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
import {auth, db} from '../../libs/firebase/config';
import {User} from '../../types/user';
import useUser from '../../hooks/useUser';

interface SignupProps {
  navigation: NavigationProp<any, any>;
}

export function Signup({navigation}: SignupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldName, setFieldName] = useState('');
  const [fieldEmail, setFieldEmail] = useState('');
  const [fieldPassword, setFieldPassword] = useState('');
  const [_user, setUser] = useUser();

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

      auth
        .createUserWithEmailAndPassword(fieldEmail, fieldPassword)
        .then(res => {
          const uid = res.user.uid;
          const user: User = {
            id: uid,
            email: fieldEmail,
            name: fieldName,
          };
          const usersRef = db.collection('users');
          usersRef
            .doc(uid)
            .set(user)
            .then(() => {
              setIsLoading(false);
              clearFields();
              setUser(user);
              navigation.navigate('Home');
            })
            .catch(error => {
              Alert.alert(error);
            });
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
        <Image
          style={styles.logo2}
          resizeMode="stretch"
          source={require('../../../assets/logopt2.png')}
        />
        <View style={styles.formContainer}>
          <Text nativeID="labelNome">Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#aaaaaa"
            onChangeText={text => setFieldName(text)}
            value={fieldName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Text nativeID="labelEmail">Email</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#aaaaaa"
            onChangeText={text => setFieldEmail(text)}
            value={fieldEmail}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Text nativeID="labelSenha">Senha</Text>
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
        </View>
        <View style={styles.footerContainer}>
          <Text onPress={onFooterLinkPress} style={styles.signupText}>
            Ir para o login
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => registerUser()}>
            <Text style={styles.buttonTitle}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
