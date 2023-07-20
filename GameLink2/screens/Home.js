import { StyleSheet, Image, Text, Button, View, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

// defining Home
export default function Home({}) {
  // setting up the state variables
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matched, setMatched] = useState(false);
  const currentUser = getAuth().currentUser;

  // Fetches users from Firestore database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const db = getFirestore();
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);
        const fetchedUsers = [];
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          if (user.userId !== currentUser.uid) { 
            fetchedUsers.push({ ...user, docId: doc.id }); 
          }
        });
        setUsers(fetchedUsers);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // function to handle matching with a user
  const handleMatch = async () => {
    const matchedUser = users[currentIndex];
    const matchedUserId = matchedUser.docId; 
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { matchedUsers: matchedUserId });
      console.log('Matched with user:', matchedUser);
      setMatched(true);
    } catch (error) {
      console.log('Error updating matched user:', error);
    }
    
    setCurrentIndex(currentIndex + 1);
  };

  // function to handle not matching with a user
  const handleNotMatch = () => {
    
    console.log('Skipped user:', users[currentIndex]);
    setMatched(false);
    
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.send}>
          <Icon name="send" size={30} color="#0827F5" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profile}>
          <Icon name="user" size={30} color="#0827F5" />
        </TouchableOpacity>

        {users.length > 0 && currentIndex < users.length ? (
          <View>
            <Image source={{ uri: users[currentIndex].profileImageUrl }} style={styles.profileImage} />
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.detail}>{users[currentIndex].username}</Text>
              <Text style={styles.label}>About Me:</Text>
              <Text style={styles.detail}>{users[currentIndex].aboutMe}</Text>
              <Text style={styles.label}>Favorite Game:</Text>
              <Text style={styles.detail}>{users[currentIndex].favoriteGame}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleMatch} style={styles.thumbUpButton}>
                <Icon name="thumbs-up" size={80} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNotMatch} style={styles.thumbDownButton}>
                <Icon name="thumbs-down" size={80} color="red" />
              </TouchableOpacity>
            </View>
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
  container: {
    position: 'relative',
  },
  send: {
    position: 'absolute',
    top: 40,
    right: 10,
    zIndex: 1,
  },
  profile: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginHorizontal: 80,
  },
  thumbUpButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
  },
  thumbDownButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
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
  profileImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: 10,
    borderRadius: 50,
  },
  detailsContainer: {
    backgroundColor: '#bab8b8',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginHorizontal: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 20,
    marginBottom: 10,
  },
});
