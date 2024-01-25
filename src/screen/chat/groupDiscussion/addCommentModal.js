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
import {ADD_COMMENT, ADD_GROUP_DISCUSSION} from '../../../store/types';
import {API_URL, REQUEST_METHOD} from '../../../api/constants';

const AddCommentModal = props => {
  const {topic_id, selectedReply = {}, handleClose = () => {}} = props || {};
  const [notifyMe, setNotifyMe] = useState(false);
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [
    addedCommentData,
    addCommentError,
    addCommentLoading,
    addCOmmentAPI,
    clearAddedCommentData,
  ] = useCRUD({
    id: ADD_COMMENT,
    url: `${API_URL.addComments}`,
    type: REQUEST_METHOD.post,
  });

  useEffect(() => {
    if (addedCommentData) {
      handleClose({refetch: true});
      clearAddedCommentData(true);
    }
  }, [addedCommentData]);

  const sendComment = () => {
    const payload = {
      topic_id,
      content,
      // tags,
    };
    addCOmmentAPI({data: payload});
    console.log(
      '🚀 ~ file: addCommentModal.js:25 ~ sendComment ~ payload:',
      payload,
    );
  };
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
          <Typography>Reply To: {selectedReply?.replyUserName}</Typography>
        </View>
        <View>
          <IconButton name="close" onPress={handleClose} />
        </View>
      </View>
      <View>
        <Typography style={{color: palette.text.secondary}}>
          {selectedReply?.tagLine}
        </Typography>
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
        {/* <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
          <Checkbox
            status={notifyMe ? 'checked' : 'unchecked'}
            onPress={() => {
              setNotifyMe(pre => !pre);
            }}
          />
          <Typography>Notify me of new replies</Typography>
        </View> */}
        <View>
          <CustomButton
            label={'Post'}
            onPress={sendComment}
            disabled={addCommentLoading}
            loading={addCommentLoading}
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
        <TextInput
          multiline
          placeholder="Type your reply here ..."
          value={content}
          onChangeText={text => setContent(text)}
          style={{minHeight: verticalScale(200)}}
        />
      </View>
      {/* <View>
        <TextInput
          placeholder="Type one or more tags, comma separated"
          value={tags}
          onChangeText={text => setTags(text)}
        />
      </View> */}
    </ModalComponent>
  );
};

export default AddCommentModal;
