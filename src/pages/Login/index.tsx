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

interface LoginProps {
  navigation: NavigationProp<any, any>;
}

export function Login({navigation}: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldEmail, setFieldEmail] = useState('');
  const [fieldPassword, setFieldPassword] = useState('');
  const {setUser} = useUser();
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
      auth
        .signInWithEmailAndPassword(fieldEmail, fieldPassword)
        .then(res => {
          const uid = res.user.uid;
          const usersRef = db.collection('users');
          usersRef
            .doc(uid)
            .get()
            .then(firestoreDocument => {
              if (!firestoreDocument.exists) {
                Alert.alert('Usuário não existe.');
                return;
              }
              const user: User = firestoreDocument.data() as User;
              setUser(user);
              clearFields();
              setIsLoading(false);
              navigation.navigate('Home');
            })
            .catch(error => {
              Alert.alert(error);
            });
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
          style={styles.logo2}
          resizeMode="stretch"
          source={require('../../../assets/logopt2.png')}
        />
        <Text style={styles.title}>Fazer Login</Text>
        <Text style={styles.textDesc}>
          A melhor maneira de se manter organizado.
        </Text>
        <View style={styles.formContainer}>
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
            onChangeText={text => setFieldPassword(text)}
            valueField={fieldPassword}
            iconName="lock"
            secureTextEntry
          />
        </View>
        <View style={[styles.footerContainer, {marginTop: window.height / 8}]}>
          <Text onPress={onFooterLinkPress} style={styles.signupText}>
            Ir para o registro
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => userLogin()}>
            <Text style={styles.buttonTitle}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
