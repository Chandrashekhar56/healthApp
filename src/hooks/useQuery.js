import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Events from 'src/lib/events';
import {setFilterData} from '../store/actions/crud';
import useFilterManager from './useFilterManager';
import useCRUD from './useCRUD';
import useAuthUser from './useAuthUser';

const useQuery = ({
  listId,
  url,
  type,
  rowsPerPage = 10,
  defaultFilters = {},
  validateQuery,
  queryParams = {},
  responseModifier,
  subscribeSocket,
}) => {
  const dispatch = useDispatch();
  const filtersData = useSelector(state =>
    state?.crud?.get(listId)?.get('readFilter'),
  )?.get('data');
  const [userData] = useAuthUser();
  const [page, setPage] = useState(1);

  const [dataList,dataListError , dataLoading, callDataListAPI, , , pagination] = useCRUD({
    id: listId,
    url,
    type,
    responseModifier,
    subscribeSocket,
    page,
  });

  const {parsedFilters, rawFilters, sort} = filtersData || {};

  const [handleFilters] = useFilterManager({
    filtersData,
    defaultFilters,
    rawFilters,
    listId,
    type,
    setPage,
  });

  const handleOnFetchDataList = useCallback(() => {
    const sortKey = sort && JSON.stringify(sort).replace(/[{}"]/g, '');
    const params = {
      sortBy: sortKey,
      page,
      limit: rowsPerPage,
      ...(rawFilters?.searchText && {searchText: rawFilters?.searchText}),
      ...queryParams,
      ...parsedFilters,
    };
    if (validateQuery) {
      const query = validateQuery({...params}, userData);
      if (query) {
        callDataListAPI({...query.params}, query?.extraURL);
      }
    } else {
      callDataListAPI({...params});
    }
  }, [
    callDataListAPI,
    page,
    parsedFilters,
    queryParams,
    rawFilters?.searchText,
    rowsPerPage,
    sort,
    userData,
    validateQuery,
  ]);

  const handleSort = useCallback(
    (dataKey, order) => {
      dispatch(
        setFilterData(
          listId,
          {
            ...filtersData,
            sort: {[dataKey]: order},
          },
          type,
        ),
      );
    },
    [dispatch, filtersData, listId, type],
  );

  useEffect(() => {
    handleOnFetchDataList({
      appliedFilters: parsedFilters,
      skip: page && (page - 1) * rowsPerPage,
      page,
    });
  }, [parsedFilters, sort, page, listId]);

  useEffect(() => {
    Events.on(`REFRESH-TABLE-${listId}`, listId, handleOnFetchDataList);
    return () => {
      Events.rm(`REFRESH-TABLE-${listId}`, listId);
    };
  }, [handleOnFetchDataList, listId]);

  const handlePageChange = useCallback(newPage => {
    setPage(newPage);
  }, []);

  const resetList = () => {
    if (page === 1) {
      handleOnFetchDataList();
    } else {
      setPage(1);
    }
  };
  return [
    dataList,
    dataListError,
    dataLoading,
    page,
    rowsPerPage,
    handlePageChange,
    resetList,
    filtersData,
    handleFilters,
    sort,
    handleSort,
    handleOnFetchDataList,
    callDataListAPI,
  ];
};

export default useQuery;
