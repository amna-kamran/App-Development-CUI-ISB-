import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (
      name !== '' &&
      email !== '' &&
      password !== '' &&
      confirmPassword !== ''
    ) {
      try {
        setIsLoading(true);
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        await userCredential.user
          .sendEmailVerification()
          .then(() => {
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            navigation.navigate('HomeScreen');
          })
          .catch(err => {
            console.log(err);
          });
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('This Email Address is already in Use!');
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert('This Email Address is Invalid!');
        }
        if (error.code === 'auth/weak-password') {
          Alert.alert('This Password is too Weak!');
        }
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert('Enter complete Details!');
    }
  };
  const handleSignInPress = () => {
    navigation.goBack();
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
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
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
      <TextInput
        style={{
          width: '80%',
          height: 40,
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
        }}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <Button title="Sign Up" onPress={handleCreateAccount} />
      <TouchableOpacity onPress={handleSignInPress}>
        <Text style={{color: 'blue', marginTop: 20}}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const myStyle = StyleSheet.create({});
