/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import cloneDeep from 'lodash/cloneDeep';
import React, {useState} from 'react';
import { ScrollView, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {TouchableRipple} from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import LoadingButton from '../../components/CustomButton/loadingButton';
import Header from '../../components/Layout/header';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import withTimeHOC from '../../components/TimerHOC';
import Typography from '../../components/Typography';
import useCRUD from '../../hooks/useCRUD';
import {quizQuestionTypes} from '../../lib/constants';
import {UI_ROUTES} from '../../lib/routeConstants';
import {verticalScale} from '../../lib/utils';
import {START_QUIZ} from '../../store/types';
import palette from '../../theme/palette';
import LoadingScreen from '../loading';

function QuizPlay(props) {
  const navigation = useNavigation();
  const {route: {params = {}} = {}, timer} = props || {};
  console.log('🚀 ~ QuizPlay ~ timer:', props);
  const {id: quizId} = params || {};

  const [currentStep, setCurrentStep] = useState(0);

  const [quizData = [], , quizLoading, getQuizAPI, clearQuizData] = useCRUD({
    id: `${START_QUIZ}-${quizId}`,
    url: `${API_URL.courseQuizDetail}/${quizId}`,
    type: REQUEST_METHOD.post,
  });

  const currentQuizz = quizData?.[currentStep];
  const DataLength = quizData?.length;

  // useEffect(() => {
  //   getQuizAPI({data: {}}, '/start');
  // }, []);

  const [selectedAnswer, setSelectedAnswer] = useState({});
  console.log(
    '>>>>>>>>>>>>>>>>🚀 ~ QuizPlay ~ selectedAnswer:',
    selectedAnswer,
  );
  const progress = ((currentStep + 1) / DataLength) * 100;

  const {
    title: {rendered = ''} = {},
    options = [],
    question_type,
  } = currentQuizz || {};
  console.log('🚀 ~ QuizPlay ~ rendered:', rendered);
  const question = rendered || '';
  const isQuestionHTML =
    question && typeof question === 'string' && question.startsWith('<');

  const htmlSourceQuestion = isQuestionHTML
    ? {html: question}
    : {html: `<p>${question}</p>`};

  const handelPress = ({item, isAnswerSelected}) => {
    if (isAnswerSelected) {
      setSelectedAnswer(pre => {
        const cloonedPre = cloneDeep(pre);
        let choosedQuizAnswers = cloonedPre?.[currentQuizz?.id];
        choosedQuizAnswers = choosedQuizAnswers?.filter(_item => {
          return _item !== item?.pos;
        });
        cloonedPre[currentQuizz?.id] = choosedQuizAnswers;
        return cloonedPre;
      });
    } else {
      if (question_type === quizQuestionTypes.SINGLE) {
        setSelectedAnswer(pre => ({...pre, [currentQuizz?.id]: [item.pos]}));
      } else if (question_type === quizQuestionTypes.MULTIPLE) {
        setSelectedAnswer(pre => {
          const cloonedPre = cloneDeep(pre);
          if (cloonedPre[currentQuizz?.id]?.length) {
            cloonedPre[currentQuizz?.id].push(item?.pos);
            return cloonedPre;
          } else {
            return {...pre, [currentQuizz?.id]: [item.pos]};
          }
        });
      }
    }
  };
  const handleNextClick = () => setCurrentStep(pre => pre + 1);
  const handlePrevClick = () => setCurrentStep(pre => pre - 1);
  const handleSubmit = () => {
    navigation.replace(UI_ROUTES.quizSubmit, {
      selectedAnswer,
      quizId,
      spentTime: timer,
    });
  };
  return (
    <ScrollView style={{backgroundColor: palette.background.default}}>
      <LoadingScreen isVisible={quizLoading} />
      <Header
        rigthButtonProps={{
          action: handleSubmit,
          title: 'Submit',
          style: {width: '40%'},
          buttonProps: {
            disabled:
              currentStep !== DataLength - 1 ||
              !selectedAnswer?.[currentQuizz?.id] ||
              selectedAnswer?.[currentQuizz?.id]?.length === 0,
          },
        }}
      />
      <View style={{marginBottom: verticalScale(40), ...layoutPadding}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: verticalScale(30),
          }}>
          <AnimatedCircularProgress
            size={150}
            width={8}
            fill={progress}
            tintColor={palette.text.main}>
            {fill => (
              <Typography>
                {currentStep + 1}/{DataLength} Questions
              </Typography>
            )}
          </AnimatedCircularProgress>
        </View>
        <View style={{marginTop: verticalScale(20)}}>
          <View style={{marginTop: verticalScale(10)}}>
            <Typography variant="titleMedium">
              Question {currentStep + 1} of {DataLength}
            </Typography>
          </View>
          <View style={{marginTop: verticalScale(10)}}>
            <RenderHtml
              source={htmlSourceQuestion}
              contentWidth={30}
              tagsStyles={{
                p: {
                  color: palette.text.primary,
                  fontWeight: 600,
                  padding: 0,
                  margin: 0,
                  fontSize: 20,
                },
              }}
            />
          </View>
          <View>
            {options.map((item, index) => {
              const isAnswerSelected = (
                selectedAnswer?.[currentQuizz?.id] || []
              ).some(_item => _item === item?.pos);
              return (
                <TouchableRipple
                  key={index}
                  onPress={() => handelPress({item, isAnswerSelected})}
                  style={{
                    marginTop: verticalScale(20),
                    borderWidth: 0.5,
                    padding: 20,
                    borderRadius: 30,
                    ...(isAnswerSelected
                      ? {
                          backgroundColor: palette.background.main,
                          borderColor: palette.background.main,
                        }
                      : {backgroundColor: 'transparent'}),
                  }}>
                  <Typography
                    variant="titleMedium"
                    style={isAnswerSelected ? {color: palette.text.paper} : {}}>
                    {item?.title}
                  </Typography>
                </TouchableRipple>
              );
            })}
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 30,
            marginTop: verticalScale(30),
          }}>
          <LoadingButton
            id="submit-button"
            size="medium"
            type="submit"
            disabled={currentStep === 0}
            label="Prev"
            onPress={handlePrevClick}
            style={{flex: 1}}
          />

          <LoadingButton
            id="submit-button"
            size="medium"
            type="submit"
            label="Next"
            disabled={
              currentStep === DataLength - 1 ||
              !selectedAnswer?.[currentQuizz?.id] ||
              selectedAnswer?.[currentQuizz?.id]?.length === 0
            }
            onPress={handleNextClick}
            style={{flex: 1}}
          />
        </View>
      </View>
    </ScrollView>
  );
}
export default withTimeHOC(QuizPlay);
