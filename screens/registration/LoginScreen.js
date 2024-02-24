import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (email !== '' && password !== '') {
      try {
        setIsLoading(true);
        const userCredential = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        setEmail('');
        setPassword('');
        navigation.replace('HomeScreen');
      } catch (error) {
        console.log(error);
        if (error.code === 'auth/invalid-email') {
          Alert.alert('The Email Address is Invalid!');
        }
        if (error.code === 'auth/invalid-credential') {
          Alert.alert('The Credentials are Incorrect');
        }
        if (error.code === 'auth/network-request-failed') {
          Alert.alert('A network error occurred!');
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert('Enter complete Details!');
    }
  };
  const handleSignUpPress = () => {
    navigation.navigate('SignupScreen');
  };

  return isLoading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        style={{
          width: '80%',
          height: 40,
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
        }}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={{
          width: '80%',
          height: 40,
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
        }}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleSignUpPress}>
        <Text style={{color: 'blue', marginVertical: 20}}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
