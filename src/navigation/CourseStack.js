import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CourseList from '../screen/course/courseList';
import courseDetails from '../screen/course/courseDetails';
import {UI_ROUTES} from '../lib/routeConstants';
import CategoryWiseCourses from '../screen/categoryWiseCourses';
import FilterListingCourse from '../screen/filterListingCourse';
import TopicDetail from '../screen/topics/topicDetail';
import QuizStartPage from '../screen/quiz/quizStartPage';
import QuizPlay from '../screen/quiz';
import QuizSubmitPage from '../screen/quiz/quizSubmitPage';
import LessionDetail from '../screen/lesson/lessionDetail';
import QuizStaticticsScreen from '../screen/quiz/quizStaticticsScreen';

const Stack = createStackNavigator();

const CoursesStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CourseList" component={CourseList} />
      <Stack.Screen name="CourseDetail" component={courseDetails} />
      <Stack.Screen
        name={UI_ROUTES.categoryWiseCourses}
        component={CategoryWiseCourses}
      />
      <Stack.Screen
        name={UI_ROUTES.filterWiseCourses}
        component={FilterListingCourse}
      />
      <Stack.Screen
        name={UI_ROUTES.lessionWiseTopics}
        component={TopicDetail}
      />
      <Stack.Screen name={UI_ROUTES.quizStartPage} component={QuizStartPage} />
      <Stack.Screen name={UI_ROUTES.quizPlay} component={QuizPlay} />
      <Stack.Screen name={UI_ROUTES.quizSubmit} component={QuizSubmitPage} />
      <Stack.Screen name={UI_ROUTES.lessionDetail} component={LessionDetail} />
      <Stack.Screen
        name={UI_ROUTES.quizStatictics}
        component={QuizStaticticsScreen}
      />

      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

export default CoursesStack;
