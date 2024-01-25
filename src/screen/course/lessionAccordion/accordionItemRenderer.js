/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Typography from '../../../components/Typography';
import TopicListRenderer from './topicListRenderer';
import QuizListRenderer from './quizListRenderer';

const LessionAccordionItemRenderer = ({
  data,
  lessonId,
  topicsCountForLesson,
  quizzesCountForLesson,
  courseId,
  isLessionLocked,
}) => {
  const lesson = data?.h?.['sfwd-lessons']?.[lessonId];
  const topicsArray = Object.entries(lesson?.['sfwd-topic'] || {}) || [];
  const quizsArray = Object.keys(lesson?.['sfwd-quiz'] || {}) || [];

  if (!topicsCountForLesson && !quizzesCountForLesson) {
    return (
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <Typography>No Associated Topics</Typography>
      </View>
    );
  }
  return (
    <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
      {topicsArray.map(([topicId, topic]) => (
        <TopicListRenderer
          key={topicId}
          topicId={topicId}
          topic={topic}
          lessonId={lessonId}
          courseId={courseId}
          isLessionLocked={isLessionLocked}
        />
      ))}
      {quizsArray.map(quizId => (
        <QuizListRenderer
          key={quizId}
          quizId={quizId}
          lessonId={lessonId}
          courseId={courseId}
          isLessionLocked={isLessionLocked}
        />
      ))}
    </View>
  );
};

export default LessionAccordionItemRenderer;
