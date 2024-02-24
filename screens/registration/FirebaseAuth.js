import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

function FirebaseAuth({navigation}) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber();
  }, []);

  useEffect(() => {
    if (!initializing) {
      if (!user) {
        navigation.replace('LoginScreen');
        // navigation.navigate('FirebaseLogin');
      } else {
        navigation.replace('HomeScreen');

        // navigation.navigate("Crud1",{
        //   userId:user.uid
        // })
      }
    }
  }, [initializing, user, navigation]);
  return null;
}

export default FirebaseAuth;
