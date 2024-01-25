/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {FlatList as RNFlatList, View, Text, RefreshControl} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const keyExtractor = (item, index) => item?.id?.toString() || index;

const FlatList = ({
  data,
  pagination,
  rowsPerPage,
  page,
  totalPages,
  handlePageChange,
  loading,
  wrapperStyle,
  renderItem,
  onRefresh,
  error,
  horizontal,
  enableRefresh = true,
  ...rest
}) => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(false);
  }, [data]);

  useEffect(() => {
    setRefreshing(false);
  }, [error]);

  const defaultRenderItem = ({item}) => (
    // Render your FlatList item here
    <View>
      <Text>{item.title}</Text>
      {/* Add other item components as needed */}
    </View>
  );

  const handleLoadMore = () => {
    if (pagination && page < totalPages && !loading) {
      handlePageChange(page + 1);
    }
  };
  const _onRefresh = () => {
    setRefreshing(true);
    onRefresh();
  };
  const refreshControlProps = {
    refreshControl: (
      <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
    ),
  };
  return (
    <View
      style={
        horizontal
          ? {flexDirection: 'row', alignItems: 'center', flex: 1}
          : {justifyContent: 'center', flex: 1}
      }>
      <RNFlatList
        data={data}
        renderItem={renderItem || defaultRenderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.7}
        horizontal={horizontal}
        {...rest}
        {...(enableRefresh ? refreshControlProps : {})}
        // Other FlatList props
      />
      {!!(loading && data?.length && page > 1) && (
        <View>
          <ActivityIndicator animating={true} size={'large'} />
        </View>
      )}
    </View>
  );
};

export default FlatList;
