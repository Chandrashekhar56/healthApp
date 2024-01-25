import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useZoom } from '@zoom/react-native-videosdk';

const JoinMeetingScreen = () => {
  const [meetingNumber, setMeetingNumber] = useState('');
  const [userName, setUserName] = useState('');

  const zoom = useZoom();

  const joinMeeting = async () => {
    try {
      await zoom.joinMeeting({
        meetingNumber,
        userName,
        // Other meeting options (optional)
        // Example: disableVideo: true, disableAudio: true
      });
    } catch (error) {
      console.error('Error joining meeting:', error);
    }
  };

  return (
    <View>
      <Text>Join Meeting</Text>
      <TextInput
        value={meetingNumber}
        onChangeText={setMeetingNumber}
        placeholder="Enter meeting number"
      />
      <TextInput
        value={userName}
        onChangeText={setUserName}
        placeholder="Enter your name"
      />
      <Button title="Join Meeting" onPress={joinMeeting} />
    </View>
  );
};

export default JoinMeetingScreen;