import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const SplashScreen = () => (
  <View style={styles.container}>
    <View>
      <Text>Fitness Freak</Text>
    </View>
    <View>
      <Image
        source={require('C:/Users/PMYLS/Desktop/softec/assets/images/gs.png')}
      />
    </View>
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
