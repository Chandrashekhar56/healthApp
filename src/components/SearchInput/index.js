import React, {useCallback, useMemo, useState} from 'react';
import {Searchbar} from 'react-native-paper';
import {isFunction, debounce} from '../../lib/lodash';
import palette from '../../theme/palette';

const SearchInput = props => {
  const {
    placeholder = 'Search',
    onChange,
    defaultValue = '',
    reduxValue,
    maxLength = 60,
    ...rest
  } = props;
  const [searchTerm, setSearchTerm] = useState(
    reduxValue === undefined ? defaultValue : reduxValue,
  );

  const onSearch = useCallback(
    searchValue => {
      if (isFunction(onChange)) {
        onChange(searchValue);
      }
    },
    [onChange],
  );

  const debounceValidation = useMemo(
    () => debounce(onSearch, 1000),
    [onSearch],
  );

  const handleSearchChange = useCallback(
    value => {
      setSearchTerm(value);
      debounceValidation(value);
    },
    [debounceValidation],
  );

  const handleOnClearSearch = useCallback(() => {
    setSearchTerm('');
    onChange(null);
  }, [onChange]);

  return (
    <Searchbar
      placeholder={placeholder}
      value={searchTerm}
      onChangeText={handleSearchChange}
      maxLength={maxLength}
      testID="searchInput_test"
      onIconPress={handleOnClearSearch}
      style={{borderRadius:0,borderBottomWidth:1,backgroundColor:palette.background.default,borderColor:palette.background.gray}}
      {...rest}
    />
  );
};

SearchInput.defaultProps = {
  placeholder: '',
  searchQuery: '',
  handleOnSearch: () => {},
};

export default React.memo(SearchInput);
