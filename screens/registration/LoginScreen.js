import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import RegTextInput from '../../components/RegTextInput';

const LoginScreen = ({route}) => {
  const navigation = useNavigation();
  const {userType} = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  console.log(userType);

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

  return isLoading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Image source={require('../../assets/images/loginPic.png')} />
        <Text style={styles.headerText2}>Welcome Back</Text>
      </View>
      <View style={styles.inputsView}>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Don't Have An Account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignupScreen', {userType: userType});
            }}>
            <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomView} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainView: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headerView: {
    flex: 4,
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
  bottomView: {
    flex: 3,
  },
});
