import React, {useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  useWindowDimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {NavigationProp} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

interface LoginProps {
  navigation: NavigationProp<any, any>;
}

export function Login({navigation}: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldEmail, setFieldEmail] = useState('');
  const [fieldPassword, setFieldPassword] = useState('');
  const window = useWindowDimensions();

  function clearFields() {
    setFieldEmail('');
    setFieldPassword('');
  }

  function userLogin() {
    if (fieldEmail === '' || fieldPassword === '') {
      Alert.alert('Atenção', 'Todos os campos são obrigatórios.');
    } else {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(fieldEmail, fieldPassword)
        .then(_res => {
          clearFields();
          setIsLoading(false);
          navigation.navigate('Home');
        })
        .catch(error => {
          setIsLoading(false);
          Alert.alert(
            'Atenção',
            'Dados incorretos, por favor tente novamente com outros dados.',
          );
          console.log('login error --->', error);
        });
    }
  }

  if (isLoading) {
    if (isLoading) {
      // return <Loader />;
    }
  }

  const onFooterLinkPress = () => {
    navigation.navigate('Signup');
  };

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
          style={styles.logopt2}
          resizeMode="stretch"
          source={require('../../../assets/logopt2.png')}
        />
        <Text style={styles.textDesc}>
          A melhor maneira de se manter organizado.
        </Text>
        <View>
          <Text nativeID="labelEmail">Email</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#dadada"
            onChangeText={text => setFieldEmail(text)}
            value={fieldEmail}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text nativeID="labelEmail">Senha</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#dadada"
            secureTextEntry
            placeholder="Senha"
            onChangeText={text => setFieldPassword(text)}
            value={fieldPassword}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <View style={(styles.footerContainer, {width: window.width})}>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                Sign up
              </Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => userLogin()}>
            <Text style={styles.buttonTitle}>Log in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
