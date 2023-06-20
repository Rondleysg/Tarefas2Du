// ** Firebase Imports
import {auth, db} from '../libs/firebase/config';

// ** Types Imports
import {User} from '../types/user';

export const UserService = {
  async getUserById(userId: string) {
    const usersRef = db.collection('users');
    const doc = await usersRef.doc(userId).get();
    const user = doc.data() as User;
    return user;
  },

  async getUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | string> {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      const uid = response.user.uid;
      const usersRef = db.collection('users');
      const doc = await usersRef.doc(uid).get();
      if (!doc.exists) {
        return 'Usuário não existe.';
      }
      const user = doc.data() as User;
      return user;
    } catch (_error) {
      return 'Dados incorretos, por favor tente novamente com outros dados.';
    }
  },

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User | string> {
    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      const uid = response.user.uid;
      const user: User = {
        id: uid,
        email: email,
        name: name,
        photoUrl:
          'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Pic.png',
      };
      const usersRef = db.collection('users');
      await usersRef.doc(uid).set(user);
      return user;
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        return 'Este e-mail já está em uso.';
      }

      if (error.code === 'auth/invalid-email') {
        return 'Este e-mail está inválido.';
      }

      if (error.code === 'auth/weak-password') {
        return 'Sua senha precisa possuir no mínimo 6 caracteres.';
      }

      return 'Um erro não mapeado aconteceu, verifique sua conexão com a internet ou altere seus dados de cadastro.';
    }
  },
};
