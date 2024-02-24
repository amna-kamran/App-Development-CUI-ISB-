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
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import RegTextInput from '../../components/RegTextInput';
import LoginScreen from './LoginScreen';
// import firestore from '@react-native-firebase/firestore';

const SignupScreen = ({route}) => {
  const {userType} = route.params;
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  console.log(userType);
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

  return isLoading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Image source={require('../../assets/images/signupPic.png')} />
        <Text style={styles.headerText2}>Let's Get You Signed Up</Text>
      </View>
      <View style={styles.inputsView}>
        <RegTextInput placeholder="Name" value={name} onChangeText={setName} />
        <RegTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <RegTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <RegTextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Already Have An Account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginScreen', {userType: userType});
            }}>
            <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonsView}></View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  mainView: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headerView: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText2: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputsView: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsView: {
    flex: 1.5,
  },
  button: {
    backgroundColor: '#BE9FFD',
    color: 'white',
    width: '80%',
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
{
  /* <TextInput
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
    </View> */
}
