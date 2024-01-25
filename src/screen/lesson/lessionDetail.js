/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo} from 'react';
import {ScrollView, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useSelector} from 'react-redux';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import Header from '../../components/Layout/header';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import Typography from '../../components/Typography';
import useCRUD from '../../hooks/useCRUD';
import {getLessionProgress, scale, verticalScale} from '../../lib/utils';
import {
  GET_COURSES_STEPS,
  GET_COURSES_STEPS_PROGRESS,
  GET_COURSE_PROGRESS,
  GET_COURSE_WISE_LESSONS,
  GET_LESSION_DETAIL,
  GET_QUIZ_LISTS,
  GET_TOPIC_LISTS,
} from '../../store/types';
import palette from '../../theme/palette';
import LessionWiseQuizItem from './lessionWiseQuizItem';
import LessionWiseTopicItem from './lessionWiseTopicItem';
import CustomButton from '../../components/CustomButton';
import RenderHtml from 'react-native-render-html';
import {courseStepsProgressModifier} from '../../api/helper';
import useAuthUser from '../../hooks/useAuthUser';
import {progressStatus} from '../../lib/constants';
import LessionItemSKeleton from './lessionItemSKeleton';
import {Icon} from '../../components/icon';
import FlatList from '../../components/FlatList/FlatList';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';

const QuizListEmpty = () => (
  <View style={{marginVertical: verticalScale(20)}}>
    <ListEmptyComponent emptyMessage={'No Quiz Added !'} />
  </View>
);
const TopicListEmpty = () => (
  <View style={{marginVertical: verticalScale(20)}}>
    <ListEmptyComponent emptyMessage={'No Topic Added !'} />
  </View>
);
const LoadingSkeleton = () => {
  return Array(5)
    .fill(null)
    .map(item => (
      <View
        style={{
          marginVertical: verticalScale(10),
          flexDirection: 'row',
          gap: 6,
        }}>
        <View>
          <LessionItemSKeleton style={{width: 20, borderRadius: 8}} />
        </View>
        <View style={{flex: 1}}>
          <LessionItemSKeleton style={{borderRadius: 5}} />
        </View>
      </View>
    ));
};
const LessionDetail = props => {
  const {route: {params = {}} = {}} = props || {};
  const {id: lessonId, courseId} = params || {};
  const [user] = useAuthUser();

  const allLessions = useSelector(state =>
    state?.crud
      ?.get(`${GET_COURSE_WISE_LESSONS}-${courseId}`)
      ?.get('read')
      ?.get('data'),
  );
  const lessionDetail = useMemo(() => {
    if (allLessions?.results?.length) {
      const selectedLession = allLessions.results.filter(
        item => item.id == lessonId,
      );
      return selectedLession?.[0] || {};
    } else {
      return {};
    }
  }, [allLessions, lessonId]);

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

  const courseSteps = useSelector(state =>
    state?.crud
      ?.get(`${GET_COURSES_STEPS}-${courseId}`)
      ?.get('read')
      ?.get('data'),
  );

  useEffect(() => {
    if (!courseStepsProgress) {
      courseStepsProgress();
    }
  }, [getCourseStepsProgress]);

  const {
    completedQuizzes,
    completedTopics,
    notStartedQuizzes,
    notStartedTopics,
    inProgressQuizzes,
    inProgressTopics,
  } = getLessionProgress({data: courseSteps, lessonId, courseStepsProgress});

  const [
    {results: quizzes} = {},
    ,
    lessonsQuizLoading,
    getLessonsQuiz,
    clearLessonsQuizList,
  ] = useCRUD({
    id: `${GET_QUIZ_LISTS}-${courseId}-${lessonId}`,
    url: `${API_URL.quizLists}`,
    type: REQUEST_METHOD.get,
  });

  const [
    {results: topics} = {},
    ,
    lessonsTopicsLoading,
    getLessonsTopics,
    clearLessonsTopicsList,
  ] = useCRUD({
    id: `${GET_TOPIC_LISTS}-${courseId}-${lessonId}`,
    url: `${'ldlms/v2/sfwd-topic'}`,
    type: REQUEST_METHOD.get,
  });
  useEffect(() => {
    getLessonsQuiz({course: courseId, lesson: lessonId});
    getLessonsTopics({course: courseId, lesson: lessonId});
  }, []);

  const lessionComplition = parseInt(
    ((Object.keys(completedQuizzes)?.length +
      Object.keys(completedTopics)?.length +
      Object.keys(inProgressQuizzes)?.length +
      Object.keys(inProgressTopics)?.length) /
      (Object.keys(completedQuizzes)?.length +
        Object.keys(completedTopics)?.length +
        Object.keys(inProgressQuizzes)?.length +
        Object.keys(inProgressTopics)?.length +
        Object.keys(notStartedQuizzes)?.length +
        Object.keys(notStartedTopics)?.length)) *
      100,
    10,
  );

  const isLessionCompleted = useMemo(
    () =>
      courseStepsProgress?.[lessonId]?.step_status === progressStatus.COMPLETED,
    [courseStepsProgress],
  );

  const {title, content: {rendered = ''} = {}} = lessionDetail || {};

  const content = rendered;
  const isContentHTML =
    content && typeof content === 'string' && content.startsWith('<');

  const htmlContent = isContentHTML
    ? {html: content}
    : {html: `<p>${content}</p>`};

  const isAllStepsCompleted =
    Object.keys(completedQuizzes)?.length +
      Object.keys(completedTopics)?.length ===
    Object.keys(completedQuizzes)?.length +
      Object.keys(completedTopics)?.length +
      Object.keys(inProgressQuizzes)?.length +
      Object.keys(inProgressTopics)?.length +
      Object.keys(notStartedQuizzes)?.length +
      Object.keys(notStartedTopics)?.length;
  console.log(
    '🚀 ~ LessionDetail ~ isAllStepsCompleted:',
    isAllStepsCompleted,
    isLessionCompleted,
  );

  return (
    <View style={{flex: 1, backgroundColor: palette.background.default}}>
      <ScrollView>
        <Header
          title={lessionDetail?.title?.rendered}
          rigthButtonProps={{
            action: () => {},
            title: isLessionCompleted ? 'Completed' : 'Mark Complete',
            buttonProps: {
              disabled: isLessionCompleted ? true : !isAllStepsCompleted,
              style: {paddingHorizontal: 10, borderRadius: 12},
            },
          }}
        />
        <View style={{...layoutPadding}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: verticalScale(10),
              backgroundColor: palette.background.offWhite,
              borderRadius: 12,
              padding: 10,
            }}>
            <View>
              <Typography variant="titleLarge">
                {isLessionCompleted ? 'Completed' : 'In Progress'}
              </Typography>
            </View>
            <View>
              <AnimatedCircularProgress
                size={80}
                width={8}
                fill={lessionComplition}
                backgroundColor={palette.background.gray}
                tintColor={palette.background.main}>
                {fill => (
                  <Typography variant="labelLarge">
                    {lessionComplition} %
                  </Typography>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
          <View style={{marginTop: verticalScale(10)}}>
            <RenderHtml
              source={htmlContent}
              contentWidth={30}
              tagsStyles={{
                p: {
                  color: palette.text.primary,
                  fontWeight: 400,
                  padding: 0,
                  margin: 0,
                  lineHeight: 20,
                },
                strong: {
                  color: palette.text.primary,
                  fontWeight: 800,
                  lineHeight: 20,
                },
                li: {
                  color: palette.text.primary,
                  fontWeight: 400,
                  lineHeight: 20,
                },
              }}
            />
          </View>
          <View style={{marginTop: verticalScale(20)}}>
            <View
              style={{
                backgroundColor: palette.background.gray,
                paddingHorizontal: scale(20),
                paddingVertical: verticalScale(4),
              }}>
              <Typography variant="titleLarge">Topics</Typography>
            </View>
            <View
              style={{
                paddingHorizontal: scale(26),
              }}>
              {lessonsTopicsLoading && !topics ? (
                <LoadingSkeleton />
              ) : (
                <FlatList
                  data={topics}
                  enableRefresh={false}
                  contentContainerStyle={{flex: 1}}
                  ListEmptyComponent={TopicListEmpty}
                  renderItem={({item, index}) => (
                    <LessionWiseTopicItem
                      key={item?.id}
                      topicId={item?.id}
                      topic={item}
                      lessonId={lessonId}
                      courseId={courseId}
                    />
                  )}
                />
              )}
            </View>
          </View>
          <View style={{marginVertical: verticalScale(10)}}>
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
                marginTop: verticalScale(6),
              }}>
              {lessonsQuizLoading && !quizzes ? (
                <LoadingSkeleton />
              ) : (
                <FlatList
                  data={quizzes}
                  enableRefresh={false}
                  contentContainerStyle={{flex: 1}}
                  ListEmptyComponent={QuizListEmpty}
                  renderItem={({item, index}) => (
                    <LessionWiseQuizItem
                      key={item?.id}
                      quizId={item?.id}
                      quiz={item}
                      lessonId={lessonId}
                      courseId={courseId}
                    />
                  )}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LessionDetail;
