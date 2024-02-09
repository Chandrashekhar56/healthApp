/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { ImageBackground, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import { API_URL, REQUEST_METHOD } from '../../api/constants';
import Typography from '../../components/Typography';
import { Icon } from '../../components/icon';
import useCRUD from '../../hooks/useCRUD';
import { horizontalScale, scale, verticalScale } from '../../lib/utils';
import { GET_COURSES_LIST, GET_COURSES_POPULAR_LIST } from '../../store/types';
import palette from '../../theme/palette';
import CourseItemSkeleton from './coureItemSkeleton';

import RenderHTML from 'react-native-render-html';
import Image from '../../components/Image';
import { layoutPadding } from '../../components/Layout/layoutStyle';
import { UI_ROUTES } from '../../lib/routeConstants';
import Categories from '../categories';
import { ListEmptyComponent } from '../../components/ListEmptyComponent';
import FlatList from '../../components/FlatList/FlatList';
import useQuery from '../../hooks/useQuery';
import { Path } from 'react-native-svg';
import LoadingButton from '../../components/CustomButton/loadingButton';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const headeImage = require('../../assets/images/chatFour1.png');
const PathImage = require('../../assets/images/Path/Path.png');

const CourseList = props => {
  const { navigation } = props || {};
  const [refreshing, setRefreshing] = useState(false);
  const [
    courses,
    coursesError,
    coursesLoading,
    page,
    ,
    handlePageChange,
    resetCoursesList,
  ] = useQuery({
    listId: GET_COURSES_LIST,
    url: API_URL.coursesList,
    type: REQUEST_METHOD.get,
    queryParams: { order: 'desc', _embed: true },
  });

  const [
    popularCourses,
    popularCoursesError,
    popularCoursesLoading,
    popularCoursesPage,
    ,
    handlePopularCoursesPageChange,
    resetPopularCoursesList,
  ] = useQuery({
    listId: GET_COURSES_POPULAR_LIST,
    url: `${API_URL.coursesList}`,
    type: REQUEST_METHOD.get,
    queryParams: { _embed: true },
  });

  useEffect(() => {
    setRefreshing(false);
  }, [courses, popularCourses]);

  const onRefresh = () => {
    resetCoursesList();
    resetPopularCoursesList();
    setRefreshing(true);
    // getCourses({_embed: true, order: 'desc'});
    // getPopularCourses({_embed: true});
  };

  const onItemClick = useCallback(({ item }) => {
    const { id } = item || {};
    navigation.navigate('CourseDetail', {
      id,
    });
  }, []);

  const onCategoryPress = ({ item }) => {
    const { id } = item;
    navigation.navigate(UI_ROUTES.categoryWiseCourses, { id });
  };

  const onNewCourseViewAllPress = () => {
    navigation.navigate(UI_ROUTES.filterWiseCourses, {
      title: 'New courses',
      crudId: GET_COURSES_LIST,
      exrtaParams: { order: 'desc' },
    });
  };

  const onPopularViewAllPress = () => {
    navigation.navigate(UI_ROUTES.filterWiseCourses, {
      title: 'Popular Course',
      crudId: GET_COURSES_POPULAR_LIST,
    });
  };

  const renderCourseSkeletonList = () => {
    const totalSkeletons = Array(10).fill(null);
    return (
      <FlatList
        style={{ flex: 1 }}
        ItemSeparatorComponent={() => <View style={{ height: verticalScale(20) }} />}
        renderItem={CourseItemSkeleton}
        keyExtractor={(item, index) => index}
        data={totalSkeletons || []}
        contentContainerStyle={{
          paddingTop: 30,
          paddingBottom: 30,
          gap: 20,
          ...layoutPadding,
        }}
        horizontal
      />
    );
  };

  const renderItem = useCallback(({ item }) => {
    const {
      title: { rendered: title } = {},
      _embedded,
      content: { rendered = '' } = {},
    } = item;
    const duration = rendered.split(' ')[0] || '<p>1:04</p>';
    const isDurationHTML =
      duration && typeof duration === 'string' && duration.startsWith('<');

    const htmlSource = isDurationHTML
      ? { html: duration }
      : { html: `<p>${duration}</p>` };
    const imageUrl = _embedded?.['wp:featuredmedia']?.[0]?.source_url;
    return (
      <View style={{
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.0917,
        shadowRadius: 14,
        elevation: 10,
        backgroundColor: palette.background.paper,
        borderRadius: 12,
      }}>
        <Card
          style={{
            width: scale(235),
            overflow: 'hidden',
          }}

          onPress={() => {
            onItemClick({ item });
          }}>
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: scale(235),
              height: verticalScale(135),
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
            <View style={{
              width: scale(200),
            }}>
              <Typography
                variant="titleMedium"
                numberOfLines={1}
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  lineHeight: verticalScale(20),
                  letterSpacing: -0.08,
                }}
              >
                {title}
              </Typography>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: verticalScale(5),
                }}>
                <Icon name="clock-o" />
                <View style={{ flexDirection: 'row', gap: 3 }}>
                  <RenderHTML
                    source={htmlSource}
                    contentWidth={30}
                    tagsStyles={{
                      p: {
                        color: '#96969B',
                        fontWeight: 600,
                        padding: 0,
                        margin: 0,
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: 16
                      },
                    }}
                  />
                  <Typography variant="labelLarge" style={{
                    fontWeight: 400,
                    fontSize: 12,
                    lineHeight: 16,
                    color: '#96969B',
                  }}>Min</Typography>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  }, []);

  const renderItemYourCourses = useCallback(({ item }) => {
    const {
      title: { rendered: title } = {},
      _embedded,
      content: { rendered = '' } = {},
    } = item;
    const duration = rendered.split(' ')[0] || '<p>1:04</p>';
    const isDurationHTML =
      duration && typeof duration === 'string' && duration.startsWith('<');

    const htmlSource = isDurationHTML
      ? { html: duration }
      : { html: `<p>${duration}</p>` };
    const imageUrl = _embedded?.['wp:featuredmedia']?.[0]?.source_url;
    return (
      <View style={{
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.0917,
        shadowRadius: 14,
        elevation: 10,
        backgroundColor: palette.background.paper,
        borderRadius: 12,
      }}>
        <Card
          style={{
            width: scale(292),
            overflow: 'hidden',
          }}

          onPress={() => {
            onItemClick({ item });
          }}>
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: scale(292),
              height: verticalScale(170),
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
            <View style={{
              width: scale(200),
            }}>
              <Typography
                variant="titleMedium"
                numberOfLines={1}
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  lineHeight: verticalScale(20),
                  letterSpacing: -0.08,
                }}
              >
                {title}
              </Typography>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: verticalScale(5),
                }}>
                <Icon name="clock-o" />
                <View style={{ flexDirection: 'row', gap: 3 }}>
                  <RenderHTML
                    source={htmlSource}
                    contentWidth={30}
                    tagsStyles={{
                      p: {
                        color: '#96969B',
                        fontWeight: 600,
                        padding: 0,
                        margin: 0,
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: 16
                      },
                    }}
                  />
                  <Typography variant="labelLarge" style={{
                    fontWeight: 400,
                    fontSize: 12,
                    lineHeight: 16,
                    color: '#96969B',
                  }}>Min</Typography>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  }, []);

  const NewCourses = useCallback(
    ({ data, loading, title, onPress = () => { }, ...rest }) => {
      return (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: verticalScale(28),
              ...layoutPadding,
              flex: 1,
            }}>
            <Typography variant="titleMedium" style={{
              fontWeight: 600,
              fontSize: 18,
              lineHeight: 26,
              letterSpacing: 0.37,
              color: '#252529',
            }}>{title}</Typography>
            <TouchableOpacity onPress={onPress}>
              <Typography style={{
                fontWeight: 400,
                fontSize: 13,
                lineHeight: 20,
                letterSpacing: -0.08,
                color: '#96969B'
              }}>View all</Typography>
            </TouchableOpacity>
          </View>
          {loading && !data ? (
            renderCourseSkeletonList()
          ) : (
            <FlatList
              style={{ flex: 1 }}
              ItemSeparatorComponent={() => <View style={{ width: scale(20) }} />}
              renderItem={renderItem}
              data={data?.results || []}
              contentContainerStyle={{
                paddingBottom: 25,
                paddingTop: 25,
                ...layoutPadding,
              }}
              horizontal={true}
              ListEmptyComponent={() => (
                <ListEmptyComponent emptyMessage={'No Items To Show'} />
              )}
              loading={loading}
              {...rest}
            />
          )}
        </>
      );
    },
    [renderItem],
  );

  const YourCourses = useCallback(
    ({ data, loading, title, onPress = () => { }, ...rest }) => {
      return (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: verticalScale(28),
              ...layoutPadding,
              flex: 1,
            }}>
            <Typography variant="titleMedium" style={{
              fontWeight: 600,
              fontSize: 18,
              lineHeight: 26,
              letterSpacing: 0.37,
              color: '#252529',
            }}>{title}</Typography>
            <TouchableOpacity onPress={onPress}>
              <Typography style={{
                fontWeight: 400,
                fontSize: 13,
                lineHeight: 20,
                letterSpacing: -0.08,
                color: '#96969B'
              }}>View all</Typography>
            </TouchableOpacity>
          </View>
          {loading && !data ? (
            renderCourseSkeletonList()
          ) : (
            <FlatList
              style={{ flex: 1 }}
              ItemSeparatorComponent={() => <View style={{ width: scale(20) }} />}
              renderItem={renderItemYourCourses}
              data={data?.results || []}
              contentContainerStyle={{
                paddingBottom: 25,
                paddingTop: 25,
                ...layoutPadding,
              }}
              horizontal={true}
              ListEmptyComponent={() => (
                <ListEmptyComponent emptyMessage={'No Items To Show'} />
              )}
              loading={loading}
              {...rest}
            />
          )}
        </>
      );
    },
    [renderItem],
  );


  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{
        flex: 1,
        backgroundColor: palette.background.default,
        // ...layoutPadding,
      }}>

      <View>
        <ImageBackground
          source={headeImage}
          resizeMode="cover"
          style={{
            width: '100%',
            height: verticalScale(433),
          }}
        >
          <View style={{ marginTop: verticalScale(13) }}>
            <Icon name="heart-o" style={{ marginLeft: verticalScale(27) }} />
          </View>
          <ImageBackground
            source={PathImage}
            style={{
              width: '100%',
              height: verticalScale(244),
              marginTop: verticalScale(160),
            }}
          >
            <View style={{
              marginTop: verticalScale(100),
            }}>
              <Typography
                style={{
                  width: horizontalScale(214),
                  marginLeft: horizontalScale(26),
                  fontSize: 28,
                  fontWeight: 600,
                  lineHeight: 38,
                  letterSpacing: -0.64,
                }}>10-minute Calming Yoga</Typography>
            </View>
            <View style={{ alignItems: 'flex-start' }} >
              <LoadingButton
                label="Start now"
                onPress={() => { }}
                style={{
                  marginLeft: horizontalScale(26),
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                }}
                labelStyle={{
                  fontWeight: 400,
                  fontSize: 11,
                  lineHeight: 18,
                  letterSpacing: 0.07,
                  color: '#252529',
                }} />
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>

      <View style={{ flex: 1, ...layoutPadding }}>
        <View
          style={{
            marginTop: verticalScale(28),
            width: '100%',
            display: 'flex',
            flexDirection: "row",
            justifyContent: 'space-around',
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor: palette.background.paper,
            borderRadius: 12,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.0849,
            shadowRadius: 14,
            elevation: 5,
          }}>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <Typography
              style={{
                marginLeft: horizontalScale(21),
                marginTop: verticalScale(19),
                fontWeight: 600,
                fontSize: 13,
                lineHeight: 20,
                letterSpacing: -0.08
              }}>This week’s yoga time</Typography>

            <Typography
              style={{
                marginLeft: horizontalScale(21),
                marginTop: verticalScale(5),
                color: palette.text.main,
                fontWeight: 600,
                fontSize: 28,
                lineHeight: 38,
                letterSpacing: -0.64
              }}>2h 20m</Typography>

            <Typography
              style={{
                marginLeft: horizontalScale(21),
                marginTop: verticalScale(1),
                fontWeight: 400,
                fontSize: 12,
                lineHeight: 16
              }}>Keep going!</Typography>

            <LoadingButton
              label="See details"
              style={{
                marginLeft: horizontalScale(19),
                marginTop: verticalScale(26),
                marginBottom: verticalScale(19),
                backgroundColor: '#F6F6F7',
              }}
              labelStyle={{
                fontWeight: 400,
                fontSize: 11,
                lineHeight: 18,
                letterSpacing: 0.07,
                textAlign: 'center',
                color: '#252529',
              }}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: verticalScale(17),
              marginBottom: verticalScale(19),
            }}>
            <AnimatedCircularProgress
              size={180}
              width={20}
              fill={40}
              tintColor={palette.text.main}
              backgroundColor={palette.background.accentBlue}
            >
              {fill => (
                <>
                  <Typography
                    style={{
                      fontWeight: 600,
                      fontSize: 20,
                      lineHeight: verticalScale(28),
                      letterSpacing: -0.5,
                      alignItems: 'Center'
                    }}
                  >40%</Typography>
                  <Typography
                    style={{
                      fontWeight: 400,
                      fontSize: 11,
                      lineHeight: 18,
                      letterSpacing: 0.07,
                      alignItems: 'Center'
                    }}
                  >of your goal</Typography>
                </>
              )}
            </AnimatedCircularProgress>
          </View>
        </View>
      </View>
      <YourCourses
        data={courses}
        title='Your courses'
        onPress={onNewCourseViewAllPress}
        loading={coursesLoading}
        pagination={true}
        page={page}
        totalPages={courses?.totalPages}
        handlePageChange={handlePageChange}
        error={coursesError}
      />
      <Categories
        onItemPress={onCategoryPress}
        refreshing={refreshing}
        showSelected={false}
        fetchIntial={true}
      />
      <NewCourses
        data={courses}
        title='New courses'
        onPress={onNewCourseViewAllPress}
        loading={coursesLoading}
        pagination={true}
        page={page}
        totalPages={courses?.totalPages}
        handlePageChange={handlePageChange}
        error={coursesError}
      />
      <NewCourses
        data={popularCourses}
        title={'Popular'}
        onPress={onPopularViewAllPress}
        loading={popularCoursesLoading}
        pagination={true}
        page={popularCoursesPage}
        totalPages={popularCourses?.totalPages}
        handlePageChange={handlePopularCoursesPageChange}
        error={popularCoursesError}
      />
    </ScrollView>
  );
};
export default CourseList;
