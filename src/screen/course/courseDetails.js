/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, ScrollView, TouchableOpacity, View} from 'react-native';
import {
  ActivityIndicator,
  ProgressBar,
  Surface,
  Text,
} from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import Accordion from '../../components/Accordion';
import FastImage from '../../components/Image';
import Header from '../../components/Layout/header';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import Typography from '../../components/Typography';
import {Icon, IconButton} from '../../components/icon';
import useCRUD from '../../hooks/useCRUD';
import {
  countQuizzesAndTopicsForLesson,
  dateFormatter,
  findLessonIdFromProgressStepId,
  scale,
  verticalScale,
} from '../../lib/utils';
import {
  GET_COURSES_STEPS,
  GET_COURSES_STEPS_PROGRESS,
  GET_COURSE_DETAIL,
  GET_COURSE_PROGRESS,
  GET_COURSE_WISE_LESSONS,
} from '../../store/types';
import palette from '../../theme/palette';
import CourseDetailsSkeleton from './courseDetailSkeleton';
import capitailize from 'lodash/capitalize';
import LoadingButton from '../../components/CustomButton/loadingButton';
import LessionAccordionItemRenderer from './lessionAccordion/accordionItemRenderer';
import {useNavigation} from '@react-navigation/native';
import {UI_ROUTES} from '../../lib/routeConstants';
import useAuthUser from '../../hooks/useAuthUser';
import {cloneDeep} from 'lodash';
import {courseStepsProgressModifier} from '../../api/helper';
import {progressStatus} from '../../lib/constants';
import LineSkeleton from '../../components/LineSkeleton';

const isEnrolled = true;

const CourseDetails = props => {
  const navigation = useNavigation();
  const [user] = useAuthUser();
  const translateY = useRef(new Animated.Value(100)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isFooterVisible, setFooterVisible] = useState(true);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );

  const {route: {params = {}} = {}} = props || {};
  const {id: courseId} = params || {};

  const [
    courseDetail = {},
    ,
    courseDetailLoading,
    getCourseDetail,
    clearCourseDetailData,
  ] = useCRUD({
    id: `${GET_COURSE_DETAIL}-${courseId}`,
    url: `${API_URL.coursesList}/${courseId}`,
    type: REQUEST_METHOD.get,
  });

  const [
    {results: [courseProgress] = []} = {},
    ,
    courseProgresslLoading,
    getCourseProgress,
    clearCourseProgressData,
  ] = useCRUD({
    id: `${GET_COURSE_PROGRESS}-${courseId}`,
    url: `${API_URL.customURL}/${user?.id}/${API_URL.courseProgress}/${courseId}`,
    type: REQUEST_METHOD.get,
  });

  // return null;

  const [
    {results: lessons} = {},
    ,
    lessonsLoading,
    getLessons,
    clearLessonsData,
  ] = useCRUD({
    id: `${GET_COURSE_WISE_LESSONS}-${courseId}`,
    url: `${API_URL.courseWiseLesson}`,
    type: REQUEST_METHOD.get,
  });

  const [
    courseSteps,
    ,
    courseStepsLoading,
    getCourseSteps,
    clearCourseStepsData,
  ] = useCRUD({
    id: `${GET_COURSES_STEPS}-${courseId}`,
    url: `${API_URL.courseSteps}`,
    type: REQUEST_METHOD.get,
  });

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
    getCourseDetail({_embed: true});
    getLessons({course: courseId});
    getCourseProgress();
    getCourseStepsProgress();
  }, []);
  useEffect(() => {
    getCourseSteps({}, `/${courseId}/steps`);
  }, []);

  useEffect(() => {
    scrollY.addListener(({value}) => {
      if (value > 0) {
        setFooterVisible(true);
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    });

    return () => {
      scrollY.removeAllListeners();
    };
  }, [scrollY, translateY]);

  const startLession = useCallback(({lessonId}) => {
    navigation.navigate(UI_ROUTES.lessionDetail, {
      id: lessonId,
      courseId,
    });
  }, []);

  const {content: {rendered = ''} = {}, _embedded} = courseDetail || {};
  const duration = rendered.split(' ')[0] || '<p>1:04</p>';
  const isDurationHTML =
    duration && typeof duration === 'string' && duration.startsWith('<');

  const htmlSource = isDurationHTML
    ? {html: duration}
    : {html: `<p>${duration}</p>`};

  const imageUrl = _embedded?.['wp:featuredmedia']?.[0]?.source_url;

  const lessonIdFromProgressStep = findLessonIdFromProgressStepId(
    courseSteps,
    (courseProgress?.last_step || '').toString(),
    courseStepsProgress,
    lessons,
  );

  const courseCompletionPercentage =
    courseProgress?.progress_status === progressStatus.COMPLETED
      ? 100
      : courseProgress
      ? parseInt(
          (courseProgress?.steps_completed / courseProgress?.steps_total) * 100,
          10,
        )
      : 0;
  return (
    <Surface
      style={{
        flex: 1,
        backgroundColor: palette.background.default,
        position: 'relative',
      }}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={
          isFooterVisible ? {paddingBottom: verticalScale(70)} : {}
        }>
        <Header containerStyle={{position: 'absolute', zIndex: 1}} />
        {courseDetailLoading && !courseDetail ? (
          <CourseDetailsSkeleton />
        ) : (
          <View>
            <FastImage
              source={{uri: imageUrl}}
              style={{
                width: '100%',
                height: verticalScale(400),
              }}
              resizeMode={'cover'}
            />
            <View style={{...layoutPadding, paddingTop: verticalScale(15)}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                <Typography variant="headlineMedium" style={{width: '80%'}}>
                  {courseDetail?.title?.rendered}
                </Typography>
                <Typography variant="headlineMedium">
                  <Icon name={'heart-o'} />
                </Typography>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: verticalScale(20),
                }}>
                <View style={{gap: verticalScale(5)}}>
                  <Typography variant="labelMedium">Duration</Typography>
                  <View style={{flexDirection: 'row', gap: 3}}>
                    <RenderHtml
                      source={htmlSource}
                      contentWidth={30}
                      tagsStyles={{
                        p: {
                          color: palette.text.primary,
                          fontWeight: 600,
                          padding: 0,
                          margin: 0,
                        },
                      }}
                    />
                    <Typography variant="labelLarge">Min</Typography>
                  </View>
                </View>
                <View style={{gap: verticalScale(5)}}>
                  <Typography variant="labelMedium">Type</Typography>
                  {!courseDetail && courseDetailLoading ? (
                    <LineSkeleton
                      style={{width: '100%', borderRadius: 5, height: 15}}
                    />
                  ) : (
                    <Typography variant="labelLarge">
                      {capitailize(courseDetail?.course_price_type)}
                    </Typography>
                  )}
                </View>
                <View style={{gap: verticalScale(5)}}>
                  <Typography variant="labelMedium">Level</Typography>
                  {!courseDetail && courseDetailLoading ? (
                    <LineSkeleton
                      style={{width: '100%', borderRadius: 5, height: 15}}
                    />
                  ) : (
                    <Typography variant="labelLarge">Entry</Typography>
                  )}
                </View>
              </View>
              <View style={{paddingTop: verticalScale(30)}}>
                <Typography variant="bodyMedium">
                  This is a beginner level flowing Reformer workout is just what
                  you need to tone your core, hips, arms, and create length in
                  your entire body. hips, arms, and create length in your entire
                  body. hips, arms, and create length in your entire body.
                </Typography>
              </View>
              <View
                style={{
                  marginTop: verticalScale(26),
                  backgroundColor: palette.background.gray,
                  paddingVertical: verticalScale(10),
                  paddingHorizontal: scale(40),
                  borderRadius: 12,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    gap: 20,
                  }}>
                  <View style={{gap: 5}}>
                    <View>
                      <Typography variant={'bodyLarge'}>
                        {`${courseCompletionPercentage}% Completed`}
                      </Typography>
                    </View>
                    <View>
                      {courseProgress?.progress_status ===
                      progressStatus.COMPLETED ? (
                        <Typography>
                          {`Completed on ${dateFormatter(
                            courseProgress?.date_completed,
                          )}`}
                        </Typography>
                      ) : (
                        <Typography variant={'bodySmall'}>
                          {`Last Activity On ${
                            courseProgress?.date_started
                              ? dateFormatter(courseProgress?.date_started)
                              : '-N/A-'
                          }`}
                        </Typography>
                      )}
                    </View>
                  </View>
                  <View style={{flex: 1}}>
                    <ProgressBar
                      progress={courseCompletionPercentage / 100}
                      style={{height: 6}}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginTop: verticalScale(24),
                  marginBottom: verticalScale(20),
                }}>
                <View>
                  <View style={{marginBottom: verticalScale(8)}}>
                    <Typography variant="titleLarge">Lessons</Typography>
                  </View>
                  {lessonsLoading && !lessons && (
                    <View>
                      <ActivityIndicator size={'large'} />
                    </View>
                  )}
                  {lessons?.map((lesson, index) => {
                    const lessonId = lesson?.id;
                    const lessionProgress = courseStepsProgress?.[lessonId];
                    const isLessionCompleted =
                      lessionProgress?.step_status === progressStatus.COMPLETED;
                    const {
                      quizzes: quizzesCountForLesson,
                      topics: topicsCountForLesson,
                    } = countQuizzesAndTopicsForLesson(
                      courseSteps?.h,
                      lessonId,
                    );
                    const isLessionLocked =
                      lessonIdFromProgressStep?.toString() !==
                      lessonId?.toString();
                    return (
                      <Accordion
                        key={index}
                        title={lesson?.title?.rendered}
                        items={[lesson]}
                        itemRendere={() =>
                          LessionAccordionItemRenderer({
                            data: courseSteps,
                            lessonId,
                            quizzesCountForLesson,
                            topicsCountForLesson,
                            courseId,
                            isLessionLocked,
                          })
                        }
                        addOnIcon={
                          isLessionCompleted ? (
                            <IconButton
                              name={'check-circle-o'}
                              onPress={() => {
                                startLession({lessonId});
                              }}
                              color={palette.background.appleGreen}
                            />
                          ) : !isLessionLocked ? (
                            <View style={{paddingVertical: 30}} />
                          ) : (
                            <IconButton
                              name={'lock'}
                              onPress={() => {
                                // startLession({lessonId});
                              }}
                            />
                          )
                        }
                        rightAffix={
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 3,
                            }}>
                            {topicsCountForLesson ? (
                              <Typography variant="bodySmall">
                                {topicsCountForLesson} Topics
                              </Typography>
                            ) : null}
                            {topicsCountForLesson && quizzesCountForLesson ? (
                              <Typography variant="bodySmall">|</Typography>
                            ) : null}
                            {quizzesCountForLesson ? (
                              <Typography variant="bodySmall">
                                {quizzesCountForLesson} Quizs
                              </Typography>
                            ) : null}
                          </View>
                        }
                      />
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      <Animated.View
        style={[
          {
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 100], // Adjust the height of the footer
                }),
              },
            ],
          },
          {
            ...layoutPadding,
            paddingVertical: 16,
            backgroundColor: palette.background.default,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
        ]}>
        <View>
          <Typography variant="bodyMedium">
            {isEnrolled ? '' : 'Not Enrolled'}
          </Typography>
        </View>
        <LoadingButton
          style={{
            borderRadius: 8,
          }}
          onPress={() => {
            if (courseProgress?.progress_status !== progressStatus.COMPLETED) {
              navigation.navigate(UI_ROUTES.lessionDetail, {
                id: lessonIdFromProgressStep,
                courseId,
              });
            }
          }}
          label={
            isEnrolled
              ? courseProgress?.progress_status === progressStatus.IN_PROGRESS
                ? 'Continue'
                : courseProgress?.progress_status === progressStatus.COMPLETED
                ? 'Completed'
                : 'Start Course'
              : 'Get Started'
          }
        />
      </Animated.View>
    </Surface>
  );
};

export default CourseDetails;
