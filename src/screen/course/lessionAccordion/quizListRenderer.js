/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import Typography from '../../../components/Typography';
import useCRUD from '../../../hooks/useCRUD';
import {GET_COURSE_DETAIL, GET_QUIZ_DETAIL} from '../../../store/types';
import {API_URL, REQUEST_METHOD} from '../../../api/constants';
import * as Animatable from 'react-native-animatable';
import {verticalScale} from '../../../lib/utils';
import palette from '../../../theme/palette';
import {Icon} from '../../../components/icon';
import AccordionSkeletonRenderer from './accordionSkeletonRenderer';
import {View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {UI_ROUTES} from '../../../lib/routeConstants';

const QuizListRenderer = ({
  quizId,
  lessonId,
  courseId,
  isLessionLocked = true,
}) => {
  const navigation = useNavigation();

  const [quizDetail, , quizDetailLoading, getQuizDetail, clearQuizDetailData] =
    useCRUD({
      id: `${GET_QUIZ_DETAIL}-${quizId}`,
      url: `${API_URL.quizDetail}/${quizId}`,
      type: REQUEST_METHOD.get,
    });
  useEffect(() => {
    getQuizDetail();
  }, []);

  if (quizDetailLoading && !quizDetail) {
    return (
      <View
        style={{marginTop: verticalScale(10), flexDirection: 'row', gap: 8}}>
        <Icon name="question-circle" color={palette.background.main} />
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
          <Icon name="question-circle" color={palette.background.main} />
          <Animatable.View
            duration={300}
            animation={'fadeIn'}
            easing="ease-out"
            style={{flexDirection: 'row', gap: 3}}>
            <Typography variant="bodySmall">
              {quizDetail?.title?.rendered}
            </Typography>
          </Animatable.View>
        </Animatable.View>
      </TouchableRipple>
    </Animatable.View>
  );
};

export default QuizListRenderer;
