/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import Layout from '../../components/Layout';
import CustomForm from '../../components/form';
import useAuthUser from '../../hooks/useAuthUser';
import {requiredField} from '../../lib/constants';

export const loginFormGroups = [
  {
    inputType: 'text',
    type: 'text',
    name: 'name',
    textLabel: 'Name',
    required: requiredField,
    containerStyle: {marginBottom: '1.875rem'},
    colSpan: 0.5,
  },
  {
    inputType: 'text',
    type: 'text',
    name: 'nicename',
    textLabel: 'Nice Name',
    required: requiredField,
    containerStyle: {marginBottom: '1.875rem'},
  },
  {
    inputType: 'text',
    type: 'text',
    name: 'user_email',
    textLabel: 'Email',
    required: requiredField,
    pattern: {
      value: '',
      message: '',
    },
    containerStyle: {marginBottom: '1.875rem'},
  },
];

function EditProfile() {
  const form = useForm({mode: 'onChange'});
  const [
    userData,
    userDataError,
    userDataLoading,
    callUserDataAPI,
    clearUserData,
  ] = useAuthUser();

  return (
    <Layout bigTitle={'Edit Profile'}>
      <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flex: 0.9}}>
            <CustomForm
              formGroups={loginFormGroups}
              columnsPerRow={1}
              form={form}
              defaultValue={userData}
            />
          </View>
          <View style={{flex: 0.1, marginBottom: 20}}>
            <CustomButton label={'Save Changes'} />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

export default EditProfile;
