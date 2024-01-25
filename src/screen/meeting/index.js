/* eslint-disable react-native/no-inline-styles */
import isEmpty from 'lodash/isEmpty';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Agenda} from 'react-native-calendars';
import Typography from '../../components/Typography';
import AddMeeting from './addMeeting';
import MeetingInfo from './meetingInfo';

const MeetingCalendar = () => {
  const [items, setItems] = useState({});
  const [meetingData, setMeetingData] = useState({});
  const [selectedMeeting, setSelectedMeeting] = useState({});

  const meetings = {
    '2024-01-02': [{time: '09:00 AM', title: 'Product Roadmap Review'}],
    '2024-01-03': [
      {time: '02:30 PM', title: 'Brainstorming Session'},
      {time: '05:00 PM', title: 'Client Presentation'},
    ],
    // Add more meetings as needed
  };

  const loadItems = day => {
    const updatedItems = {};

    // Simulate fetching data for the month
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);

      if (!updatedItems[strTime]) {
        updatedItems[strTime] = [];

        // Add meetings for the current day
        const meetingsForDay = meetings[strTime] || [];

        // Ensure items are in the format expected by the Agenda component
        if (meetingsForDay.length > 0) {
          updatedItems[strTime].push({
            date: strTime,
            meetings: meetingsForDay,
          });
        }
      }
    }

    setItems(updatedItems);
  };

  const renderItem = item => {
    return (
      <View>
        {item.meetings.map((meeting, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.item, {height: 50}]} // Adjust the height as needed
            onPress={() => handleMeetingInfo({meeting})}>
            <Typography style={{fontSize: 16, color: 'black'}}>
              {meeting.title}
            </Typography>
            <Typography style={{fontSize: 12, color: '#888'}}>
              {meeting.time}
            </Typography>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddMeeting({date: new Date(item.date)})}>
          <Typography style={{fontSize: 16, color: 'black'}}>
            Add Another Meeting
          </Typography>
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyDate = date => {
    // Render the "Add Meeting" button for days without meetings
    return (
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddMeeting({date})}>
        <Typography style={{fontSize: 14, color: 'black'}}>
          Add Meeting
        </Typography>
      </TouchableOpacity>
    );
  };

  const handleAddMeeting = ({date}) => {
    // Handle adding a meeting for the specified date
    // You can implement your meeting scheduling logic here
    setMeetingData({date: date});
  };

  const handleMeetingInfo = ({meeting}) => {
    // Handle adding a meeting for the specified date
    // You can implement your meeting scheduling logic here
    setSelectedMeeting(meeting);
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name || r1.title !== r2.title;
  };

  const timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2024-01-01'}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
      />
      {!isEmpty(meetingData) && (
        <AddMeeting
          visible={true}
          meetingData={meetingData}
          setMeetingData={setMeetingData}
        />
      )}
      {!isEmpty(selectedMeeting) && (
        <MeetingInfo
          visible={true}
          selectedMeeting={selectedMeeting}
          setSelectedMeeting={setSelectedMeeting}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  addButton: {
    backgroundColor: 'lightblue',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MeetingCalendar;
