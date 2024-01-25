import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {Icon, IconButton} from '../../components/icon';
import Typography from '../../components/Typography';
import {verticalScale} from '../../lib/utils';
import {useSelector} from 'react-redux';
import {GET_COURSES_STEPS_PROGRESS, GET_QUIZ_DETAIL} from '../../store/types';
import palette from '../../theme/palette';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import useCRUD from '../../hooks/useCRUD';
import LessionItemSKeleton from './lessionItemSKeleton';
import {UI_ROUTES} from '../../lib/routeConstants';
import {useNavigation} from '@react-navigation/native';
import {courseStepsProgressModifier} from '../../api/helper';
import useAuthUser from '../../hooks/useAuthUser';
import {progressStatus} from '../../lib/constants';

const LessionWiseQuizItem = ({quizId, courseId, quiz: quizDetail} = {}) => {
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

  useEffect(() => {
    if (!courseStepsProgress) {
      getCourseStepsProgress();
    }
  }, [courseStepsProgress]);

  const handleQuizPlay = useCallback(() => {
    navigation.navigate(UI_ROUTES.quizStartPage, {id: quizDetail?.id});
  }, []);

  const quizProgress = courseStepsProgress?.[quizId];
  const isQuizCompleted =
    quizProgress?.step_status === progressStatus.COMPLETED;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          flex: 1,
        }}>
        <Icon name="question-circle" />

        <View style={{flex: 1}}>
          <Typography variant="bodyMedium" style={{flexWrap: 'wrap'}}>
            {quizDetail?.title?.rendered}
          </Typography>
        </View>
      </View>
      <View>
        <IconButton
          name={isQuizCompleted ? 'check-circle-o' : 'play-circle'}
          color={
            isQuizCompleted
              ? palette.background.appleGreen
              : palette.background.main
          }
          onPress={handleQuizPlay}
        />
      </View>
    </View>
  );
};

export default LessionWiseQuizItem;
