import {
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = () => {
    twoButtonAlert();
  };
  const twoButtonAlert = () =>
    Alert.alert('Logout', 'Are you sure you want to Logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: () => {
          setIsLoading(true);
          auth()
            .signOut()
            .then(() => {
              setIsLoading(false);
              navigation.replace('LoginScreen');
            });
        },
      },
    ]);
  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'}></ActivityIndicator>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>ProfileScreen</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
