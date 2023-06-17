import React, {useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  useWindowDimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {NavigationProp} from '@react-navigation/native';
import {auth, db} from '../../libs/firebase/config';
import {User} from '../../types/user';
import useUser from '../../hooks/useUser';
import TextInputComponent from '../../components/TextInput';

interface SignupProps {
  navigation: NavigationProp<any, any>;
}

export function Signup({navigation}: SignupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldName, setFieldName] = useState('');
  const [fieldEmail, setFieldEmail] = useState('');
  const [fieldPassword, setFieldPassword] = useState('');
  const {setUser} = useUser();
  const window = useWindowDimensions();

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
        <Text style={styles.title}>Criar uma conta</Text>
        <View style={styles.formContainer}>
          <TextInputComponent
            textLabel="Nome"
            stylesProps={styles.input}
            placeholder="Nome"
            onChangeText={text => setFieldName(text)}
            valueField={fieldName}
            iconName="account"
          />
          <TextInputComponent
            textLabel="Email"
            stylesProps={styles.input}
            placeholder="E-mail"
            onChangeText={text => setFieldEmail(text)}
            valueField={fieldEmail}
            iconName="email"
          />
          <TextInputComponent
            textLabel="Senha"
            stylesProps={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            onChangeText={text => setFieldPassword(text)}
            valueField={fieldPassword}
            iconName="lock"
          />
        </View>
        <View style={[styles.footerContainer, {marginTop: window.height / 18}]}>
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
