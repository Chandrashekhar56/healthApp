/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Typography from '../../components/Typography';
import LoadingBar from '../../components/loadingBar';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, ProgressBar} from 'react-native-paper';
import Header from '../../components/Layout/header';
import palette from '../../theme/palette';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import {
  GET_QUIZ_DETAIL,
  GET_QUIZ_STATISTICS,
  START_QUIZ,
} from '../../store/types';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import useCRUD from '../../hooks/useCRUD';
import CustomButton from '../../components/CustomButton';
import {useSelector} from 'react-redux';

const QuizSubmitPage = props => {
  const navigation = useNavigation();
  const {route: {params = {}} = {}} = props || {};
  const {selectedAnswer, quizId, spentTime} = params || {};
  const [result, setResult] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setResult(true);
    }, 7000);
  }, []);
  const quizDetail = useSelector(state =>
    state?.crud?.get(`${GET_QUIZ_DETAIL}-${quizId}`)?.get('read')?.get('data'),
  );

  const allQuizData = useSelector(state =>
    state?.crud?.get(`${START_QUIZ}-${quizId}`)?.get('create')?.get('data'),
  );

  const [
    {results: [quizStatics] = []} = {},
    ,
    quizStaticsLoading,
    getQuizStatics,
    clearQuizStatics,
  ] = useCRUD({
    id: `${GET_QUIZ_STATISTICS}-${quizId}`,
    url: `${API_URL.quizStatistics}/${55956}`,
    type: REQUEST_METHOD.get,
  });
  console.log('🚀 ~ QuizSubmitPage ~ quizStatics:', quizStatics);

  const restartQuizHandler = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getQuizStatics({}, '/statistics');
  }, []);

  return (
    <View style={styles.container}>
      <Header title={quizDetail?.title?.rendered} />

      <View
        style={{
          ...layoutPadding,
          flex: 1,
          justifyContent: 'center',
          gap: 20,
        }}>
        <View
          style={{
            padding: 20,
            backgroundColor: palette.background.gray,
            borderRadius: 12,
            // alignItems: 'center',
            gap: 10,
          }}>
          <View style={{alignItems: 'center'}}>
            <Typography variant="titleLarge">Results</Typography>
          </View>
          {!result && (
            <View style={{gap: 10}}>
              <View style={{alignItems: 'center'}}>
                <Typography variant="bodyLarge">
                  Quiz complete. Results are being recorded.
                </Typography>
              </View>
              <ActivityIndicator size={'large'} />
              <View style={{flex: 1}}>
                <LoadingBar />
              </View>
            </View>
          )}
          {result && (
            <>
              <View style={{gap: 10}}>
                <View style={{alignItems: 'center'}}>
                  <Typography variant="bodyLarge">
                    {`${quizStatics?.answers_correct} of ${
                      allQuizData?.length || 0
                    } Questions answered correctly`}
                  </Typography>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Typography variant="labelLarge">YOUR TIME:</Typography>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Typography variant="bodyLarge">{spentTime}</Typography>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: palette.background.main,
                  padding: 20,
                  alignItems: 'center',
                  borderRadius: 12,
                }}>
                <Typography
                  variant={'bodyLarge'}
                  style={{color: palette.text.paper}}>
                  {`You have reached ${quizStatics?.points_scored} of ${quizStatics?.points_total} point(s), (0%)`}
                </Typography>
              </View>
            </>
          )}
        </View>
        {result && (
          <View style={{alignItems: 'center'}}>
            <CustomButton
              onPress={restartQuizHandler}
              label={'Restart Quiz'}
              style={{borderRadius: 12}}
              icon="repeat"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.background.default,
    flex: 1,
  },
});

export default QuizSubmitPage;
