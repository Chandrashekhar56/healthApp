/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo} from 'react';
import {View} from 'react-native';
import {Icon, IconButton} from '../../components/icon';
import Typography from '../../components/Typography';
import {verticalScale} from '../../lib/utils';
import {GET_COURSES_STEPS_PROGRESS, GET_TOPIC_DETAIL} from '../../store/types';
import palette from '../../theme/palette';
import useCRUD from '../../hooks/useCRUD';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import LessionItemSKeleton from './lessionItemSKeleton';
import AccordionSkeletonRenderer from '../course/lessionAccordion/accordionSkeletonRenderer';
import {useNavigation} from '@react-navigation/native';
import {UI_ROUTES} from '../../lib/routeConstants';
import {courseStepsProgressModifier} from '../../api/helper';
import useAuthUser from '../../hooks/useAuthUser';
import {progressStatus} from '../../lib/constants';

const LessionWiseTopicItem = ({
  topicId,
  courseId,
  lessonId,
  topic: topicDetail,
} = {}) => {
  const navigation = useNavigation();
  const [user] = useAuthUser();

  const [
    courseStepsProgress,
    ,
    courseStepsProgressLoading,
    getCourseStepsProgress,
    clearCourseStepsProgressData,
  ] = useCRUD({
    id: `${GET_COURSES_STEPS_PROGRESS}-${courseId}`,
    url: `${API_URL.customURL}/${user?.id}/${API_URL.courseProgress}/${courseId}/steps`,
    type: REQUEST_METHOD.get,
    responseModifier: courseStepsProgressModifier,
  });
  const topicProgress = courseStepsProgress?.[topicId];
  const isTopicCompleted =
    topicProgress?.step_status === progressStatus.COMPLETED;


  useEffect(() => {
    if (!courseStepsProgress) {
      getCourseStepsProgress();
    }
  }, [courseStepsProgress]);

  const handleTopicRead = useCallback(() => {
    navigation.navigate(UI_ROUTES.lessionWiseTopics, {
      id: topicId,
      courseId,
      lessonId,
    });
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        // marginVertical: verticalScale(5),
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        // backgroundColor:'red',
      }}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
          <Icon name="tasks" />
            <Typography variant="bodyMedium">
              {topicDetail?.title?.rendered}
            </Typography>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <IconButton
          name={isTopicCompleted ? 'check-circle-o' : 'arrow-right'}
          color={
            isTopicCompleted
              ? palette.background.appleGreen
              : palette.background.main
          }
          onPress={handleTopicRead}
          // style={{height: 26, width: 26}}
        />
      </View>
    </View>
  );
};

export default LessionWiseTopicItem;
