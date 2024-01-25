/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {ScrollView, View} from 'react-native';
import Typography from 'src/components/Typography';
import LoadingButton from '../../components/CustomButton/loadingButton';
import {Icon, IconButton} from '../../components/icon';
import {verticalScale} from '../../lib/utils';
import palette from '../../theme/palette';
import ModalComponent from '../../components/modal';

const MeetingInfo = ({selectedMeeting, setSelectedMeeting = () => {}} = {}) => {
  const handleClose = () => {
    setSelectedMeeting({});
  };
  const footer = React.useMemo(
    () => ({
      leftActions: [
        {
          label: 'Delete',
          variant: 'text',
          action: handleClose,
          style: {backgroundColor: palette.background.gray},
        },
      ],
      rightActions: [
        {
          label: 'Edit',
          action: () => {},
        },
      ],
      containerStyle: {marginTop: verticalScale(30)},
    }),
    [],
  );

  const UserLists = [
    {
      icon: (
        <Icon
          name="user"
          style={{fontSize: 30, color: palette.background.main}}
        />
      ),
      name: 'Anna Peterson',
      Designation: 'Design',
    },
    {
      icon: (
        <Icon
          name="user"
          style={{fontSize: 30, color: palette.background.main}}
        />
      ),
      name: 'Jimmy Fallon',
      Designation: 'HR',
    },
    {
      icon: (
        <Icon
          name="user"
          style={{fontSize: 30, color: palette.background.main}}
        />
      ),
      name: 'Leslie Schneider',
      Designation: 'Engineer',
    },
  ];

  const aboutMeeting = [
    {
      icon: (
        <Icon
          name="clock-o"
          style={{fontSize: 30, color: palette.background.main}}
        />
      ),
      text: 'Monday, December 12:30 pm',
    },
    {
      icon: (
        <Icon
          name="video-camera"
          style={{fontSize: 25, color: palette.background.main}}
        />
      ),
      text: 'Join with video',
    },
    {
      icon: (
        <Icon
          name="file-text-o"
          style={{fontSize: 25, color: palette.background.main}}
        />
      ),
      text: 'Add meeting notes or attachments',
    },
  ];

  const headerComponent = () => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Typography variant="titleMedium">{selectedMeeting?.title}</Typography>
        <IconButton
          name="times"
          style={{fontSize: 20, color: palette.background.main}}
          onPress={handleClose}
        />
      </View>
    );
  };
  return (
    <ModalComponent
      visible={true}
      footer={footer}
      headerComponent={headerComponent}>
      <ScrollView>
        <View>
          <View
            style={{
              marginTop: verticalScale(20),
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          />

          <View
            style={{
              marginTop: verticalScale(20),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View>
              <Icon
                name="users"
                style={{fontSize: 30, color: palette.background.main}}
              />
            </View>
            <View>
              <Typography
                variant="titleMedium"
                style={{marginLeft: verticalScale(10)}}>
                3 guests
              </Typography>
            </View>
          </View>

          <View style={{marginTop: verticalScale(10)}}>
            {UserLists.map((item, index) => (
              <View
                style={{
                  justifyContent: 'space-between',
                  marginBottom: verticalScale(10),
                  flexDirection: 'row',
                  backgroundColor: palette.background.accentBlue,
                  borderRadius: 10,
                  padding: 10,
                  alignItems: 'center',
                }}
                key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <View>{item?.icon}</View>

                  <Typography>{item?.name}</Typography>
                </View>

                <View
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: palette.background.main,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Typography
                    style={{
                      color: palette.text.paper,
                    }}>
                    {item?.Designation}
                  </Typography>
                </View>
              </View>
            ))}
          </View>
          <View
            style={{
              marginTop: verticalScale(5),
            }}>
            {aboutMeeting.map((item, index) => (
              <View
                style={{
                  marginTop: verticalScale(10),
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                }}
                key={index}>
                <View>{item?.icon}</View>
                <View>
                  <Typography>{item?.text}</Typography>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ModalComponent>
  );
};

export default MeetingInfo;
