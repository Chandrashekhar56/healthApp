/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {scale} from '../../../lib/utils';
import Typography from '../../../components/Typography';
import {Card} from 'react-native-paper';
import {View} from 'react-native';
import {Icon} from '../../../components/icon';
import palette from '../../../theme/palette';
import FastImage from 'react-native-fast-image';
import RenderHTML from 'react-native-render-html';

const SingleCourseItem = props => {
  const {onItemClick = () => {}, item} = props || {};
  const {
    title: {rendered: title},
    _embedded,
    content: {rendered = ''} = {},
  } = item;
  const duration = rendered.split(' ')[0] || '<p>1:04</p>';
  const isDurationHTML =
    duration && typeof duration === 'string' && duration.startsWith('<');

  const htmlSource = isDurationHTML
    ? {html: duration}
    : {html: `<p>${duration}</p>`};
  const imageUrl = _embedded?.['wp:featuredmedia']?.[0]?.source_url;
  return (
    <View>
      <Card
        onPress={() => {
          onItemClick({item});
        }}>
        <FastImage
          source={{uri: imageUrl}}
          style={{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            width: '100%',
            height: 200,
            borderRadius: 12,
          }}
        />

        <Card.Content
          style={{
            paddingTop: 8,
            backgroundColor: palette.background.default,
            borderRadius: 12,
            flexDirection: 'column',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}>
          <Typography
            variant="titleMedium"
            width={scale(800)}
            numberOfLines={1}>
            {title}
          </Typography>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginTop: 5,
            }}>
            <Icon name="clock-o" />
            <View style={{flexDirection: 'row', gap: 3}}>
              <RenderHTML
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
        </Card.Content>
      </Card>
    </View>
  );
};

export default SingleCourseItem;
