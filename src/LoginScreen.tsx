import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

type User = {
  email: string;
  password: string;
};

const users: User[] = [
  { email: 'elonmusk@gmail.com', password: 'SpaceX-TOP' },
  { email: 'tonystark.ironman@gmail.com', password: 'Thanos_killer' },
  { email: 'timkuk.apple@gmail.com', password: 'Iphone14ProMax1TB' },
  { email: 'PewDiePie@gmail.com', password: '100000M+Subscribers' },
  { email: 'google.google@gmail.com', password: 'NoPasswordNeeded' },
  { email: 'microsoft@gmail.com', password: 'Windows11' },
  { email: 'Anonymous.hack@gmail.com', password: 'pzH8HDO#PC9yHc2$WPxD' },
  { email: 'admin@gmail.com', password: 'password_Is_PASSWORD_in_UPPERCASE' },
];

export type Props = {
  navigation: any;
};

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegExp = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [noSuchUser, setNoSuchUser] = useState(false);
  const [loginErrors, setLoginErrors] = useState({
    email: false,
    password: false,
  });

  const onLoginClick = () => {
    setLoginErrors({
      ...loginErrors,
      email: !emailRegExp.test(email),
      password: !passwordRegExp.test(password),
    });
  };

  const checkIfUserExist = () => {
    return users.find(
      user => user.email === email && user.password === password,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputFieldName}>Email</Text>

        <TextInput value={email} onChangeText={setEmail} style={styles.input} />

        {loginErrors.email && <Text style={styles.error}>Incorrect email</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputFieldName}>Password</Text>

        <TextInput
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        {loginErrors.password && (
          <Text style={styles.error}>
            The password must contain at least 6 characters and include at least
            one capital letter or number
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={!email || !password ? styles.buttonDisabled : styles.button}
        onPress={() => {
          onLoginClick();

          if (checkIfUserExist()) {
            navigation.navigate('Posts');
          } else {
            setNoSuchUser(true);
          }
        }}
        disabled={!email || !password}
      >
        Login
      </TouchableOpacity>

      {!loginErrors.password && !loginErrors.email && noSuchUser && (
        <Text style={styles.error}>
          Incorrect password or user with this email does not exist
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  inputContainer: {
    marginBottom: 35,
  },

  inputFieldName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    borderRadius: 5,
    width: 250,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  error: {
    width: 250,
    color: '#f00',
  },

  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 35,
    backgroundColor: '#28c1fb',
    borderRadius: 5,
    fontWeight: '600',
    marginBottom: 10,
  },

  buttonDisabled: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 35,
    backgroundColor: '#cbcbcb',
    borderRadius: 5,
    fontWeight: '600',
    marginBottom: 10,
  },
});
