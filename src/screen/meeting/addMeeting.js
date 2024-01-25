/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */

import {useForm} from 'react-hook-form';
import {ScrollView, View} from 'react-native';
import Typography from 'src/components/Typography';
import CustomForm from 'src/components/form';
import LoadingButton from '../../components/CustomButton/loadingButton';
import Header from '../../components/Layout/header';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import {requiredField} from '../../lib/constants';
import {verticalScale} from '../../lib/utils';
import palette from '../../theme/palette';
import Modal from '../../components/modal';
import {useMemo} from 'react';
import {
  WiredGroupField,
  WiredMemberField,
} from '../../../src/wiredComponent/Form/FormFields';

const membersCalc = (data,form) => {
  const{ setValue} = form;
  if (data?.groups?.length) {
    const groupData = data.groups[0]?._id;
    if (groupData) {
      setValue('members',[])
      return {
        reFetch: true,
        reFetchData: `${groupData}/members`,
        restValue:true,
      };
    }
  }
  return {reFetch: false};
};

export const loginFormGroups = [
  {
    inputType: 'text',
    type: 'text',
    name: 'Name',
    textLabel: 'Name',
    required: requiredField,
    containerStyle: {marginBottom: 30},
  },
  {
    inputType: 'date',
    name: 'date',
    textLabel: 'When',
    required: requiredField,
  },
  {
    inputType: 'timePicker',
    type: 'text',
    name: 'time',
    textLabel: 'Time',
    required: requiredField,
    inputStyle: {marginTop: 20},
  },
  {
    ...WiredGroupField({
      required: requiredField,
      filter: {limit: 300},
      textLabel: 'Group',
    }),
  },
  {
    ...WiredMemberField({
      required: requiredField,
      filter: {limit: 300},
      textLabel: 'Members',
      dependencies: {
        keys: ['groups'],
        calc: membersCalc,
      },
    }),
  },
  {
    inputType: 'textArea',
    type: 'text',
    name: 'description',
    textLabel: 'Description',
    required: requiredField,
    containerStyle: {marginBottom: 30},
  },
];

const AddMeeting = ({visible, meetingData, setMeetingData = () => {}} = {}) => {
  const form = useForm({mode: 'onChange'});
  const {handleSubmit} = form;
  const handleClose = () => {
    setMeetingData({});
  };

  const handleAddMeeting = data => {
    console.log('🚀 ~ file: addMeeting.js:74 ~ handleAddMeeting ~ data:', data);
  };
  const footer = useMemo(
    () => ({
      leftActions: [
        {
          label: 'Cancel',
          variant: 'text',
          action: handleClose,
          style: {backgroundColor: palette.background.gray},
        },
      ],
      rightActions: [
        {
          label: 'Schedule',
          action: handleSubmit(handleAddMeeting),
        },
      ],
    }),
    [],
  );

  return (
    <Modal
      header={{closeIconAction: handleClose, showCloseIcon: false}}
      footer={footer}
      visible={visible}>
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Typography variant="headlineLarge">Add Meeting</Typography>
        </View>
        <View style={{marginTop: verticalScale(16)}}>
          <CustomForm
            formGroups={loginFormGroups}
            columnsPerRow={1}
            form={form}
            defaultValue={meetingData}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddMeeting;
