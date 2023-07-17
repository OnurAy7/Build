import React, { useState } from 'react';
import { getAuth } from "firebase/auth";
import { StyleSheet, Image, Text, Button, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import getMatchedUserInfo from '../functions/MatchedUserInfo.js'

const ChatRow = ({ matchDetails }) => {
    const navigation = useNavigation();
    const {user} = getAuth();
    const [getMatchedUserInfo, setMatchedUserInfo] = useState(null);
  
    useEffect(() => {
      setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
    }, [matchDetails, user]);
  
    return(
      <TouchableOpacity>
        <Image>
        source={{ uri: matchedUserInfo?.photoURL}}
        </Image>

        <View>
            <Text>
                {mactchedUserInfo?.username}
            </Text>
        </View>
      </TouchableOpacity>
    )
  };

  export default ChatRow;