import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Fitness Freak</Text>
      </View>
      <View style={styles.imageView}>
        <Image
          source={require('C:/Users/PMYLS/Desktop/softec/assets/images/gs.png')}
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LoginScreen', {userType: 'enthusiast'});
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Enthusiast</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('LoginScreen', {userType: 'professional'});
          }}>
          <Text style={styles.buttonText}>Professional</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  imageView: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#BE9FFD',
    borderWidth: 1.5,
    width: '80%',
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1.5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default SplashScreen;
