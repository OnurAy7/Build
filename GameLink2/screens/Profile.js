import { StyleSheet, Image, Text, Button, View, SafeAreaView, Alert, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker'; // Import Expo ImagePicker
import Icon from 'react-native-vector-icons/FontAwesome';

const Profile = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [favoriteGame, setFavoriteGame] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

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
        setProfileImageUrl(data.profileImageUrl);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const updateProfile = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getFirestore();
      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, { username, aboutMe, favoriteGame, profileImageUrl });
      console.log('Profile updated successfully');
      Alert.alert('Profile Updated');
      setIsEditing(false);
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  const handleChooseImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert('Permission to access camera roll is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!pickerResult.cancelled) {
        setProfileImage(pickerResult.uri);
      }
    } catch (error) {
      console.log('Error choosing image:', error);
    }
  };

  const handleUploadImage = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const storage = getStorage();
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      const response = await fetch(profileImage);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      setProfileImageUrl(downloadURL);
    } catch (error) {
      console.log('Error uploading profile image:', error);
    }
  };

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={handleEdit} style={styles.editIcon}>
          <Icon name="edit" size={30} color="#0827F5" />
        </TouchableOpacity>
        {profileImageUrl ? (
          <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
        ) : (
          <Text style={styles.noProfileImageText}>No profile image</Text>
        )}
        {isEditing && (
          <View>
            <TouchableOpacity onPress={handleChooseImage} style={styles.chooseImageButton}>
              <Text style={styles.buttonText}>Choose Image</Text>
            </TouchableOpacity>
            {profileImage && (
              <TouchableOpacity onPress={handleUploadImage} style={styles.uploadImageButton}>
                <Text style={styles.buttonText}>Upload Image</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Username:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          ) : (
            <Text style={styles.data}>{username}</Text>
          )}
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>About Me:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={aboutMe}
              onChangeText={(text) => setAboutMe(text)}
            />
          ) : (
            <Text style={styles.data}>{aboutMe}</Text>
          )}
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Favorite Game:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={favoriteGame}
              onChangeText={(text) => setFavoriteGame(text)}
            />
          ) : (
            <Text style={styles.data}>{favoriteGame}</Text>
          )}
        </View>
      </View>
      {isEditing ? (
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={updateProfile} color="#0827F5" />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Logout" onPress={logout} color="#0827F5" />
        </View>
      )}
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
  editIcon: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  noProfileImageText: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  chooseImageButton: {
    backgroundColor: '#0827F5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  uploadImageButton: {
    backgroundColor: '#FF0000',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  data: {
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
});
