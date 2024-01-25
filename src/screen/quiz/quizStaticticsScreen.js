import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Typography from '../../components/Typography';
import palette from '../../theme/palette';
import Header from '../../components/Layout/header';
import FlatList from '../../components/FlatList/FlatList';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import {Button, Card, Paragraph, ProgressBar, Title} from 'react-native-paper';

const statisticsData = [
  {
    id: 42,
    quiz: 55956,
    user: 2900,
    date: '2024-01-22T10:03:27',
    answers_correct: 0,
    answers_incorrect: 2,
    points_scored: 0,
    points_total: 2,
    _links: {
      collection: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics',
        },
      ],
      self: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/42',
        },
      ],
      questions: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/42/questions',
          embeddable: true,
        },
      ],
      quiz: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956',
          embeddable: true,
        },
      ],
      user: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/users/2900',
          embeddable: true,
        },
      ],
    },
  },
  {
    id: 41,
    quiz: 55956,
    user: 2900,
    date: '2024-01-22T07:55:16',
    answers_correct: 0,
    answers_incorrect: 2,
    points_scored: 0,
    points_total: 2,
    _links: {
      collection: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics',
        },
      ],
      self: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/41',
        },
      ],
      questions: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/41/questions',
          embeddable: true,
        },
      ],
      quiz: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956',
          embeddable: true,
        },
      ],
      user: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/users/2900',
          embeddable: true,
        },
      ],
    },
  },
  {
    id: 40,
    quiz: 55956,
    user: 2900,
    date: '2024-01-22T07:40:56',
    answers_correct: 0,
    answers_incorrect: 2,
    points_scored: 0,
    points_total: 2,
    _links: {
      collection: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics',
        },
      ],
      self: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/40',
        },
      ],
      questions: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/40/questions',
          embeddable: true,
        },
      ],
      quiz: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956',
          embeddable: true,
        },
      ],
      user: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/users/2900',
          embeddable: true,
        },
      ],
    },
  },
  {
    id: 39,
    quiz: 55956,
    user: 2900,
    date: '2024-01-22T07:34:57',
    answers_correct: 0,
    answers_incorrect: 2,
    points_scored: 0,
    points_total: 2,
    _links: {
      collection: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics',
        },
      ],
      self: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/39',
        },
      ],
      questions: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/39/questions',
          embeddable: true,
        },
      ],
      quiz: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956',
          embeddable: true,
        },
      ],
      user: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/users/2900',
          embeddable: true,
        },
      ],
    },
  },
  {
    id: 38,
    quiz: 55956,
    user: 2900,
    date: '2024-01-22T07:33:09',
    answers_correct: 0,
    answers_incorrect: 2,
    points_scored: 0,
    points_total: 2,
    _links: {
      collection: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics',
        },
      ],
      self: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/38',
        },
      ],
      questions: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/38/questions',
          embeddable: true,
        },
      ],
      quiz: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956',
          embeddable: true,
        },
      ],
      user: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/users/2900',
          embeddable: true,
        },
      ],
    },
  },
  {
    id: 37,
    quiz: 55956,
    user: 2900,
    date: '2024-01-22T07:33:04',
    answers_correct: 0,
    answers_incorrect: 2,
    points_scored: 0,
    points_total: 2,
    _links: {
      collection: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics',
        },
      ],
      self: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/37',
        },
      ],
      questions: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/37/questions',
          embeddable: true,
        },
      ],
      quiz: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956',
          embeddable: true,
        },
      ],
      user: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/users/2900',
          embeddable: true,
        },
      ],
    },
  },
  {
    id: 36,
    quiz: 55956,
    user: 2900,
    date: '2024-01-22T07:22:17',
    answers_correct: 0,
    answers_incorrect: 2,
    points_scored: 0,
    points_total: 2,
    _links: {
      collection: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics',
        },
      ],
      self: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/36',
        },
      ],
      questions: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/36/questions',
          embeddable: true,
        },
      ],
      quiz: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956',
          embeddable: true,
        },
      ],
      user: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/users/2900',
          embeddable: true,
        },
      ],
    },
  },
  {
    id: 35,
    quiz: 55956,
    user: 2900,
    date: '2024-01-19T11:34:49',
    answers_correct: 0,
    answers_incorrect: 2,
    points_scored: 0,
    points_total: 2,
    _links: {
      collection: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics',
        },
      ],
      self: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/35',
        },
      ],
      questions: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/35/questions',
          embeddable: true,
        },
      ],
      quiz: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956',
          embeddable: true,
        },
      ],
      user: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/users/2900',
          embeddable: true,
        },
      ],
    },
  },
  {
    id: 31,
    quiz: 55956,
    user: 2900,
    date: '2024-01-17T12:39:15',
    answers_correct: 1,
    answers_incorrect: 1,
    points_scored: 1,
    points_total: 2,
    _links: {
      collection: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics',
        },
      ],
      self: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/31',
        },
      ],
      questions: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/31/questions',
          embeddable: true,
        },
      ],
      quiz: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956',
          embeddable: true,
        },
      ],
      user: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/users/2900',
          embeddable: true,
        },
      ],
    },
  },
  {
    id: 30,
    quiz: 55956,
    user: 2900,
    date: '2024-01-17T11:52:40',
    answers_correct: 1,
    answers_incorrect: 1,
    points_scored: 1,
    points_total: 2,
    _links: {
      collection: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics',
        },
      ],
      self: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/30',
        },
      ],
      questions: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956/statistics/30/questions',
          embeddable: true,
        },
      ],
      quiz: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/ldlms/v2/sfwd-quiz/55956',
          embeddable: true,
        },
      ],
      user: [
        {
          href: 'https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/users/2900',
          embeddable: true,
        },
      ],
    },
  },
];
const renderItem = ({item, index}) => {
  return (
    <Card
      key={item.id}
      style={{marginBottom: 10, backgroundColor: palette.background.paper}}>
      <Card.Content>
        <Title>Date: {new Date(item.date).toLocaleDateString()}</Title>
        <Paragraph>Correct Answers: {item.answers_correct}</Paragraph>
        <ProgressBar
          progress={
            item.answers_correct /
            (item.answers_correct + item.answers_incorrect)
          }
          color={'#4CAF50'}
        />
        <Paragraph>Incorrect Answers: {item.answers_incorrect}</Paragraph>
        <Paragraph>
          Points Scored: {item.points_scored} / {item.points_total}
        </Paragraph>
        <ProgressBar
          progress={item.points_scored / item.points_total}
          color={'#4CAF50'}
        />
      </Card.Content>
      <Card.Actions>
        <Button icon="eye" mode="contained" onPress={() => {}}>
          View Questions
        </Button>
      </Card.Actions>
    </Card>
  );
};
const QuizStaticticsScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: palette.background.default}}>
      <Header />
      <FlatList
        data={statisticsData}
        renderItem={renderItem}
        onRefresh={() => {}}
      />
    </View>
  );
};

export default QuizStaticticsScreen;
