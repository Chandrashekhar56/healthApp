/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
import {Card} from 'react-native-paper';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import Typography from '../../components/Typography';
import {Icon} from '../../components/icon';
import useCRUD from '../../hooks/useCRUD';
import {scale} from '../../lib/utils';
import {GET_COURSES_LIST, GET_COURSES_POPULAR_LIST} from '../../store/types';
import palette from '../../theme/palette';
import CourseItemSkeleton from './coureItemSkeleton';

import RenderHTML from 'react-native-render-html';
import Image from '../../components/Image';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import {UI_ROUTES} from '../../lib/routeConstants';
import Categories from '../categories';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import FlatList from '../../components/FlatList/FlatList';
import useQuery from '../../hooks/useQuery';

const CourseList = props => {
  const {navigation} = props || {};
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
    queryParams: {order: 'desc', _embed: true},
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
    queryParams: {_embed: true},
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

  const onItemClick = useCallback(({item}) => {
    const {id} = item || {};
    navigation.navigate('CourseDetail', {
      id,
    });
  }, []);

  const onCategoryPress = ({item}) => {
    const {id} = item;
    navigation.navigate(UI_ROUTES.categoryWiseCourses, {id});
  };

  const onNewCourseViewAllPress = () => {
    navigation.navigate(UI_ROUTES.filterWiseCourses, {
      title: 'New Courses',
      crudId: GET_COURSES_LIST,
      exrtaParams: {order: 'desc'},
    });
  };

  const onPopularViewAllPress = () => {
    navigation.navigate(UI_ROUTES.filterWiseCourses, {
      title: 'Popular',
      crudId: GET_COURSES_POPULAR_LIST,
    });
  };

  const renderCourseSkeletonList = () => {
    const totalSkeletons = Array(10).fill(null);
    return (
      <FlatList
        style={{flex: 1}}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
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

  const renderItem = useCallback(({item}) => {
    const {
      title: {rendered: title} = {},
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
          <Image
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
                justifyContent: 'space-between',
              }}>
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
              <View>
                <Icon name="heart-o" />
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  }, []);

  const NewCourses = useCallback(
    ({data, loading, title = 'New Courses', onPress = () => {}, ...rest}) => {
      return (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              ...layoutPadding,
              flex: 1,
            }}>
            <Typography variant="titleMedium">{title}</Typography>
            <TouchableOpacity onPress={onPress}>
              <Typography>View All</Typography>
            </TouchableOpacity>
          </View>
          {loading && !data ? (
            renderCourseSkeletonList()
          ) : (
            <FlatList
              style={{flex: 1}}
              ItemSeparatorComponent={() => <View style={{width: 20}} />}
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
      <Categories
        onItemPress={onCategoryPress}
        refreshing={refreshing}
        showSelected={false}
        fetchIntial={true}
      />
      <NewCourses
        data={courses}
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
