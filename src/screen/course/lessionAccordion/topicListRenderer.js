/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View} from 'react-native';
import Typography from '../../../components/Typography';
import QuizListRenderer from './quizListRenderer';
import {GET_TOPIC_DETAIL} from '../../../store/types';
import {API_URL, REQUEST_METHOD} from '../../../api/constants';
import useCRUD from '../../../hooks/useCRUD';
import * as Animatable from 'react-native-animatable';
import {Icon} from '../../../components/icon';
import {verticalScale} from '../../../lib/utils';
import palette from '../../../theme/palette';
import AccordionSkeletonRenderer from './accordionSkeletonRenderer';
import {useNavigation} from '@react-navigation/native';
import {TouchableRipple} from 'react-native-paper';
import {UI_ROUTES} from '../../../lib/routeConstants';

const TopicListRenderer = ({
  topicId,
  topic,
  lessonId,
  courseId,
  isLessionLocked = true,
}) => {
  const navigation = useNavigation();
  const [
    topicDetail,
    ,
    topicDetailLoading,
    getTopicDetail,
    clearTopicDetailData,
  ] = useCRUD({
    id: `${GET_TOPIC_DETAIL}-${topicId}`,
    url: `${API_URL.topicDetail}/${topicId}`,
    type: REQUEST_METHOD.get,
  });
  useEffect(() => {
    getTopicDetail();
  }, []);

  if (topicDetailLoading && !topicDetail) {
    return (
      <View
        style={{marginTop: verticalScale(10), flexDirection: 'row', gap: 8}}>
        <Icon name="tasks" color={palette.background.main} />
        <View style={{flex: 1}}>
          <AccordionSkeletonRenderer />
        </View>
      </View>
    );
  }

  return (
    <Animatable.View>
      <TouchableRipple
        onPress={() => {
          if (!isLessionLocked) {
            navigation.navigate(UI_ROUTES.lessionDetail, {
              id: lessonId,
              courseId,
            });
          }
        }}>
        <Animatable.View
          duration={300}
          animation={'fadeIn'}
          easing="ease-out"
          style={{
            flexDirection: 'row',
            gap: 8,
            paddingVertical: verticalScale(5),
          }}>
          <Icon name="tasks" color={palette.background.main} />
          <Animatable.View
            duration={300}
            animation={'fadeIn'}
            easing="ease-out"
            style={{flexDirection: 'row', gap: 3}}>
            <Typography variant="bodySmall">
              {topicDetail?.title?.rendered}
            </Typography>
          </Animatable.View>
        </Animatable.View>
      </TouchableRipple>
      {Object.keys(topic['sfwd-quiz']).map(quizId => (
        <QuizListRenderer
          key={quizId}
          quizId={quizId}
          lessonId={lessonId}
          courseId={courseId}
          isLessionLocked={isLessionLocked}
        />
      ))}
    </Animatable.View>
  );
};

export default TopicListRenderer;
