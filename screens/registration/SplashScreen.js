import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

const SplashScreen = () => (
  <View style={styles.container}>
    <ImageBackground
      source={require('C:/Users/PMYLS/Desktop/softec/assets/images/getting_started.png')}
      resizeMode="cover"
      style={styles.image}>
      <View>
        <Text style={{fontSize: 30}}>Fitness Freak</Text>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
