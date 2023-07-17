import { StyleSheet, Image, Text, Button, View, SafeAreaView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const Profile = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [favoriteGame, setFavoriteGame] = useState('');

  const fetchUserData = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getFirestore();
      const userDoc = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUsername(data.username);
        setAboutMe(data.aboutMe);
        setFavoriteGame(data.favoriteGame);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Logged out');
        Alert.alert('Logged Out');
        // Navigate to the login screen or any other desired screen
        navigation.navigate('SignIn');
      })
      .catch((error) => {
        console.log('Error logging out:', error);
      });
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Username:</Text>
          <Text style={styles.data}>{username}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>About Me:</Text>
          <Text style={styles.data}>{aboutMe}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Favorite Game:</Text>
          <Text style={styles.data}>{favoriteGame}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={logout} color="#0827F5" />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 20,
  },
  dataContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  dataLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  data: {
    fontSize: 16,
  },
});
