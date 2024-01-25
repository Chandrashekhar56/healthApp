import React, {useCallback, useEffect} from 'react';
import {GET_COURSES_LIST} from '../../store/types';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import useCRUD from '../../hooks/useCRUD';
import palette from '../../theme/palette';
import {View} from 'react-native';
import Typography from '../../components/Typography';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import SingleItemCourseList from '../course/singleCourseList/singleCoureList';
import useQuery from '../../hooks/useQuery';
const FilterListingCourse = props => {
  const {navigation, route: {params = {}} = {}} = props || {};
  const {
    title = 'New Courses',
    crudId = GET_COURSES_LIST,
    exrtaParams = {},
  } = params;
  const [
    courses,
    coursesError,
    coursesLoading,
    page,
    ,
    handlePageChange,
    resetCoursesList,
  ] = useQuery({
    listId: `${crudId}-filterWise`,
    url: API_URL.coursesList,
    type: REQUEST_METHOD.get,
    queryParams: {_embed: true, ...exrtaParams},
  });

  const onItemClick = useCallback(({item}) => {
    const {id} = item || {};
    navigation.navigate('CourseDetail', {
      id,
    });
  }, []);

  const onRefresh = () => {
    resetCoursesList();
  };

  return (
    <>
      <View
        style={{
          ...layoutPadding,
          backgroundColor: palette.background.default,
        }}>
        <View style={{marginBottom: 10, marginTop: 20}}>
          <Typography variant="titleMedium">{title}</Typography>
        </View>
      </View>
      <SingleItemCourseList
        courses={courses}
        coursesLoading={coursesLoading}
        onComponentRefresh={onRefresh}
        onItemClick={onItemClick}
        page={page}
        handlePageChange={handlePageChange}
        totalPages={courses?.totalPages}
        pagination={true}
        loading={coursesLoading}
      />
    </>
  );
};

export default FilterListingCourse;
