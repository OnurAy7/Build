import { StyleSheet, Image, Text, Button, View, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";


export default function Home({}) {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matched, setMatched] = useState(false);
  const currentUser = getAuth().currentUser;

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const db = getFirestore();
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);
        const fetchedUsers = [];
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          if (user.userId !== currentUser.uid) { // Exclude the logged-in user
            fetchedUsers.push({ ...user, docId: doc.id }); // Add document ID for future updates
          }
        });
        setUsers(fetchedUsers);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleMatch = async () => {
    // Handle match logic here
    const matchedUser = users[currentIndex];
    const matchedUserId = matchedUser.docId; // Get the document ID of the matched user
    // Update the matchedUsers field in the user's document
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { matchedUsers: matchedUserId });
      console.log('Matched with user:', matchedUser);
      setMatched(true);
    } catch (error) {
      console.log('Error updating matched user:', error);
    }
    // Move to the next user
    setCurrentIndex(currentIndex + 1);
  };

  const handleNotMatch = () => {
    // Handle not match logic here
    console.log('Skipped user:', users[currentIndex]);
    setMatched(false);
    // Move to the next user
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.send}>
          <Icon name="send" size={30} color="#0827F5" />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profile}>
          <Icon name="user" size={30} color="#0827F5" />
        </TouchableOpacity>
      </View>

      <View>
        {users.length > 0 && currentIndex < users.length ? (
          <View>
            <Image source={{ uri: users[currentIndex].profileImageUrl }} style={styles.profileImage} />
            <Text style={styles.username}>{users[currentIndex].username}</Text>
            <Text style={styles.aboutMe}>{users[currentIndex].aboutMe}</Text>
            <Text style={styles.favouriteGame}>{users[currentIndex].favoriteGame}</Text>
            <TouchableOpacity onPress={handleNotMatch} style={styles.notMatchButton}>
              <Text>Not Match</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleMatch} style={styles.matchButton}>
              <Text>Match</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>No more matches</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 150,
    marginHorizontal: 110,
    width: 200,
    borderRadius: 15,
    overflow: 'hidden',
  },
  send: {
    marginTop: 40,
    width: 40,
    marginHorizontal: 10,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  profile: {
    marginTop: 40,
    width: 30,
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    position: 'absolute',
  },
  notMatchButton: {
    width: '40%',
    height: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 130,
    marginVertical: 750,
    borderRadius: 10,
    position: 'absolute',
  },
  matchButton: {
    width: '40%',
    height: 40,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 130,
    marginVertical: 700,
    borderRadius: 10,
    position: 'absolute',
  },
  messageContainer: {
    position: 'absolute',
    bottom: '40%',
  },
  message: {
    fontSize: 25,
    textAlign: 'center',
    position: 'absolute',
    marginVertical: 400,
    marginHorizontal: 105,
  },
  username: {
    fontSize: 20,
    position: 'absolute',
    marginVertical: 300,
    marginHorizontal: 105,
  },
  aboutMe: {
    fontSize: 20,
    position: 'absolute',
    marginVertical: 350,
    marginHorizontal: 105,
  },
  favouriteGame: {
    fontSize: 20,
    position: 'absolute',
    marginVertical: 400,
    marginHorizontal: 105,
  },
});
