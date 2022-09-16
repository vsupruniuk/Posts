import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

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
  const [loginErrors, setLoginErrors] = useState({
    email: false,
    password: false,
  });

  const onLoginClick = () => {
    setLoginErrors({
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
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    <View style={styles.container}>
      <View>
        <Text>Email</Text>

        <TextInput value={email} onChangeText={setEmail} />

        {loginErrors.email && <Text>Incorrect email</Text>}
      </View>

      <View>
        <Text>Password</Text>

        <TextInput
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {loginErrors.password && (
          <Text>
            The password must contain at least 6 characters and include at least
            one capital letter or number
          </Text>
        )}
      </View>

      <Button
        title="Login"
        onPress={() => {
          onLoginClick();

          if (checkIfUserExist()) {
            navigation.navigate('Posts');
          }
        }}
        disabled={!email || !password}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
