import React, {useEffect, useState} from 'react';
import Categories from '../categories';
import SingleItemCourseList from '../course/singleCourseList/singleCoureList';
import {GET_COURSES_LIST_CATEGORY_WISE} from '../../store/types';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import useCRUD from '../../hooks/useCRUD';
const CategoryWiseCourses = props => {
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
    getCourses({_embed: true, ld_course_category: selectedCategory?.id});
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
    <>
      <Categories onItemPress={onItemPress} {...props} />
      <SingleItemCourseList
        key={selectedCategory.id}
        courses={courses}
        coursesLoading={coursesLoading}
        onItemClick={onItemClick}
        onComponentRefresh={onRefresh}
        {...props}
      />
    </>
  );
};

export default CategoryWiseCourses;
