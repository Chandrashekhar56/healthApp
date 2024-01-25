/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import ModalComponent from '../../../components/modal';
import Typography from '../../../components/Typography';
import {IconButton} from '../../../components/icon';
import {View} from 'react-native';
import palette from '../../../theme/palette';
import {Checkbox} from 'react-native-paper';
import {verticalScale} from '../../../lib/utils';
import CustomButton from '../../../components/CustomButton';
import TextInput from '../../../components/TextInput';
import useCRUD from '../../../hooks/useCRUD';
import {ADD_GROUP_DISCUSSION, SEND_CHAT_MESSAGE} from '../../../store/types';
import {API_URL, REQUEST_METHOD} from '../../../api/constants';
import Events from '../../../lib/events';

const AddDiscussionModal = props => {
  const {forum, handleClose = () => {}} = props || {};
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  const [
    addedDiscussion,
    addDiscussionError,
    addDiscussionLoading,
    addDiscussionAPI,
    clearAddedDiscussionData,
  ] = useCRUD({
    id: ADD_GROUP_DISCUSSION,
    url: `${API_URL.addDiscussion}`,
    type: REQUEST_METHOD.post,
  });

  const sendComment = () => {
    const payload = {
      content,
      title,
      // tags,
      parent: forum,
    };
    addDiscussionAPI({data: payload});
    console.log(
      '🚀 ~ file: addCommentModal.js:25 ~ sendComment ~ payload:',
      payload,
    );
  };
  useEffect(() => {
    if (addedDiscussion) {
      handleClose({refetch: true});
      clearAddedDiscussionData(true);
    }
  }, [addedDiscussion]);

  const headerComponent = () => (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: palette.background.gray,
        paddingBottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Typography variant="titleLarge">Add Discussion</Typography>
        </View>
        <View>
          <IconButton name="close" onPress={handleClose} />
        </View>
      </View>
    </View>
  );
  const footerComponent = () => {
    return (
      <View
        style={{
          marginTop: verticalScale(20),
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <View>
          <CustomButton
            label={'Post'}
            onPress={sendComment}
            disabled={addDiscussionLoading}
            loading={addDiscussionLoading}
          />
        </View>
      </View>
    );
  };
  return (
    <ModalComponent
      headerComponent={headerComponent}
      footerComponent={footerComponent}>
      <View style={{marginBottom: verticalScale(20)}}>
        <View style={{marginBottom: verticalScale(20)}}>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <TextInput
          multiline
          placeholder="Type your reply here ..."
          value={content}
          onChangeText={text => setContent(text)}
          style={{minHeight: verticalScale(200)}}
        />
        {/* <View>
          <TextInput
            placeholder="Type one or more tags, comma separated"
            value={tags}
            onChangeText={text => setTags(text)}
          />
        </View> */}
      </View>
    </ModalComponent>
  );
};

export default AddDiscussionModal;
