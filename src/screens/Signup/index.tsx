// ** React Imports
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

// ** Styles Imports
import styles from './styles';

// ** Navigate Imports
import {NavigationProp} from '@react-navigation/native';

// ** Hooks Imports
import useUser from '../../hooks/useUser';

// ** Components Imports
import TextInputComponent from '../../components/TextInput';

// ** Services Imports
import {UserService} from '../../services/UserService';

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

  async function registerUser() {
    if (fieldName === '' || fieldEmail === '' || fieldPassword === '') {
      Alert.alert('Atenção', 'Todos os campos são obrigatórios.');
    } else {
      setIsLoading(true);
      const res = await UserService.createUser(
        fieldName,
        fieldEmail,
        fieldPassword,
      );
      if (typeof res === 'string') {
        Alert.alert('Atenção', res);
        return;
      }

      setIsLoading(false);
      clearFields();
      setUser(res);
      navigation.navigate('Home');
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
