/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import useCRUD from '../../hooks/useCRUD';
import {
  GET_COURSE_DETAIL,
  GET_QUIZ_DETAIL,
  START_QUIZ,
} from '../../store/types';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Layout/header';
import Typography from '../../components/Typography';
import RenderHtml from 'react-native-render-html';
import palette from '../../theme/palette';
import {verticalScale} from '../../lib/utils';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import LoadingButton from '../../components/CustomButton/loadingButton';
import {useNavigation} from '@react-navigation/native';
import {UI_ROUTES} from '../../lib/routeConstants';
import AppLoading from '../loading/appLoading';
import LoadingScreen from '../loading';
import CustomButton from '../../components/CustomButton';

const QuizStartPage = props => {
  const navigation = useNavigation();
  const {route: {params = {}} = {}} = props || {};
  const {id: quizId} = params || {};
  const [started, setStarted] = useState(false);
  const [quizDetail, , quizDetailLoading, getQuizDetail, clearQuizDetailData] =
    useCRUD({
      id: `${GET_QUIZ_DETAIL}-${quizId}`,
      url: `${API_URL.quizDetail}/${quizId}`,
      type: REQUEST_METHOD.get,
    });

  useEffect(() => {
    getQuizDetail({_embed: true});
  }, []);

  const [quizData = [], , quizLoading, getQuizAPI, clearQuizData] = useCRUD({
    id: `${START_QUIZ}-${quizId}`,
    url: `${API_URL.courseQuizDetail}/${quizId}`,
    type: REQUEST_METHOD.post,
  });

  const {title, content: {rendered = ''} = {}} = quizDetail || {};
  const content = rendered;
  const isContentHTML =
    content && typeof content === 'string' && content.startsWith('<');

  const htmlContent = isContentHTML
    ? {html: content}
    : {html: `<p>${content}</p>`};

  useEffect(() => {
    if (started && !quizLoading && quizData) {
      navigation.navigate(UI_ROUTES.quizPlay, {id: quizId});
    }
  }, [quizData, quizLoading, started]);

  console.log(
    '🚀 ~ useEffect ~ started && !quizLoading && quizData:',
    started,
    quizLoading,
    quizData,
  );
  const handleStartQuiz = () => {
    getQuizAPI({data: {}}, '/start');
    setStarted(true);
  };
  const handleStaticticsPress = () => {
    navigation.navigate(UI_ROUTES.quizStatictics, {id: quizId});
  };
  const QuizInfo = ({numQuestions, totalPoints, passingPercentage}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: '#f0f0f0',
          borderRadius: 10,
          gap: 10,
          alignItems: 'center',
        }}>
        <View>
          <View>
            <Typography variant="titleLarge">
              Total Points: {totalPoints}
            </Typography>
          </View>
          <View>
            <Typography variant="titleMedium">
              {`Passing Percentage: ${passingPercentage}%`}
            </Typography>
          </View>
          <View>
            <Typography variant="titleSmall">
              Questions: {numQuestions}
            </Typography>
          </View>
        </View>
        <View>
          <CustomButton
            style={{
              backgroundColor: palette.background.appleGreen,
              borderRadius: 5,
              paddingHorizontal: 0,
            }}
            onPress={handleStaticticsPress}
            label={'Previous Statistics'}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: palette.background.default, flex: 1}}>
      <LoadingScreen isVisible={quizLoading || quizDetailLoading} />
      <ScrollView>
        <Header title={title?.rendered} />
        <View>
          <View
            style={{
              marginTop: verticalScale(10),
              justifyContent: 'center',
              // alignItems: 'center',
              ...layoutPadding,
            }}>
            <View style={{marginBottom: verticalScale(10)}}>
              <QuizInfo
                numQuestions={10}
                totalPoints={100}
                passingPercentage={quizDetail?.passingpercentage || '100'}
              />
            </View>

            <RenderHtml
              source={htmlContent}
              // contentWidth={30}
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
        </View>
      </ScrollView>
      <View style={{alignItems: 'center', paddingVertical: verticalScale(16)}}>
        <LoadingButton
          label={'Start Quiz'}
          style={{width: '50%'}}
          onPress={handleStartQuiz}
        />
      </View>
    </View>
  );
};

export default QuizStartPage;
