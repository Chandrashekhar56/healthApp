/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo} from 'react';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import Typography from '../../components/Typography';
import useCRUD from '../../hooks/useCRUD';
import {
  GET_COURSES_STEPS,
  GET_COURSES_STEPS_PROGRESS,
  GET_QUIZ_LISTS,
  GET_TOPIC_DETAIL,
} from '../../store/types';
import RenderHTML from 'react-native-render-html';
import palette from '../../theme/palette';
import {ScrollView, View} from 'react-native';
import Header from '../../components/Layout/header';
import {scale, verticalScale} from '../../lib/utils';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import {useSelector} from 'react-redux';
import LessionWiseQuizItem from '../lesson/lessionWiseQuizItem';
import CustomButton from '../../components/CustomButton';
import {courseStepsProgressModifier} from '../../api/helper';
import useAuthUser from '../../hooks/useAuthUser';
import {progressStatus} from '../../lib/constants';

const TopicDetail = props => {
  const {route: {params = {}} = {}} = props || {};
  const {id: topicId, courseId, lessonId} = params || {};
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

  const [
    {results: topicQuizzes = []} = {},
    ,
    topicQuizLoading,
    getTopicQuiz,
    clearTopicQuizList,
  ] = useCRUD({
    id: `${GET_QUIZ_LISTS}-${courseId}-${lessonId}-${topicId}`,
    url: `${API_URL.quizLists}`,
    type: REQUEST_METHOD.get,
  });
  const [
    topicDetail,
    ,
    topicDetailLoading,
    getTopicDetail,
    clearTopicDetailData,
  ] = useCRUD({
    id: `${GET_TOPIC_DETAIL}-${topicId}`,
    url: `${API_URL.topicDetail}`,
    type: REQUEST_METHOD.get,
  });

  useEffect(() => {
    getTopicDetail({}, `/${topicId}`);
    getTopicQuiz({course: courseId, lesson: lessonId, topic: topicId});
  }, []);

  useEffect(() => {
    if (!courseStepsProgress) {
      getCourseStepsProgress();
    }
  }, [courseStepsProgress]);

  const isTopicCompleted =
    courseStepsProgress?.[topicId]?.step_status === progressStatus.COMPLETED;

  const isAllQuizCompleted = useMemo(() => {
    return topicQuizzes.every(
      ({id: quizId}) =>
        courseStepsProgress?.[quizId]?.step_status === progressStatus.COMPLETED,
    );
  }, [courseStepsProgress, topicQuizzes]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: palette.background.default,
      }}>
      <Header
        title={topicDetail.title.rendered}
        rigthButtonProps={{
          action: () => {},
          title: isTopicCompleted ? 'Completed' : 'Mark Complete',
          buttonProps: {
            disabled: isTopicCompleted ? true : !isAllQuizCompleted,
            style: {paddingHorizontal: 10, borderRadius: 12},
          },
        }}
      />
      <View
        style={{
          backgroundColor: palette.background.default,
          marginTop: verticalScale(30),
          justifyContent: 'center',
          alignItems: 'center',
          ...layoutPadding,
        }}>
        <View>
          <RenderHTML
            source={{
              html: topicDetail.content.rendered || '<p>1:04</p>',
            }}
            contentWidth={300}
            tagsStyles={{
              p: {
                color: palette.text.primary,
                fontWeight: 400,
                padding: 0,
                margin: 0,
                fontSize: 14,
                lineHeight: 24,
              },
            }}
          />
        </View>
        {topicQuizzes?.length ? (
          <View style={{width: '100%'}}>
            <View style={{marginVertical: verticalScale(30)}}>
              <View
                style={{
                  backgroundColor: palette.background.gray,
                  paddingHorizontal: scale(20),
                  paddingVertical: verticalScale(4),
                }}>
                <Typography variant="titleLarge">Quizes </Typography>
              </View>
              <View
                style={{
                  paddingHorizontal: scale(26),
                }}>
                {topicQuizzes.map(quiz => (
                  <LessionWiseQuizItem
                    key={quiz?.id}
                    quizId={quiz?.id}
                    quiz={quiz}
                    lessonId={lessonId}
                    courseId={courseId}
                  />
                ))}
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default TopicDetail;
