/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import SingleItemCourseList from '../course/singleCourseList/singleCoureList';
import {GET_COURSES_LIST_CATEGORY_WISE} from '../../store/types';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import useCRUD from '../../hooks/useCRUD';
import {View} from 'react-native';
import Typography from '../../components/Typography';
import palette from '../../theme/palette';
import {layoutPadding} from '../../components/Layout/layoutStyle';

const MyCourseList = props => {
  const {navigation, route: {params = {}} = {}} = props || {};
  const {id} = params || {};
  const [selectedCategory, setSelectedCategory] = useState({id});
  const [courses, , coursesLoading, getCourses, clearCoursesData] = useCRUD({
    id: `${GET_COURSES_LIST_CATEGORY_WISE}-${selectedCategory.id || 'default'}`,
    url: `${API_URL.coursesListCategoryWise}`,
    type: REQUEST_METHOD.get,
  });
  const onItemPress = ({item}) => {
    setSelectedCategory(item);
  };

  useEffect(() => {
    getCourses({
      _embed: true,
      mycourses: 1,
      ld_course_category: selectedCategory?.id,
    });
  }, [selectedCategory]);

  const onItemClick = ({item}) => {
    const {id} = item || {};
    navigation.navigate('CourseDetail', {
      id,
    });
  };
  const onRefresh = () => {
    getCourses({_embed: true, ld_course_category: selectedCategory?.id});
  };
  return (
    <View style={{backgroundColor: palette.background.default, flex: 1}}>
      <View
        style={{
          marginBottom: 10,
          marginTop: 20,
          ...layoutPadding,
        }}>
        <Typography variant="titleMedium">My Courses</Typography>
      </View>
      <SingleItemCourseList
        key={selectedCategory.id}
        courses={courses}
        coursesLoading={coursesLoading}
        onItemClick={onItemClick}
        onComponentRefresh={onRefresh}
        {...props}
      />
    </View>
  );
};

export default MyCourseList;
