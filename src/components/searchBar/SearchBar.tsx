import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
} from 'react-native';
import { commonColors } from '@utility/appColors';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';

interface SearchBarProps {
  onSearch: (text: string) => void;
  style?: ViewStyle;
  value: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value = '',
  onSearch,
  style = {},
}) => {
  const theme = useSelector((state: RootState) => state.theme);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(value);
  }, []);

  // const handleDebounce = () => {
  //   let timer: any;
  //   return (text: string) => {
  //     if (timer) {
  //       clearTimeout(timer);
  //     }
  //     timer = setTimeout(() => {
  //       if (onSearch) {
  //         onSearch(text.trim());
  //       }
  //     }, 400);
  //   };
  // };

  // const debouncing = useMemo(handleDebounce, [onSearch]);

  const handleSearch = () => {
    onSearch && onSearch(search);
    // debouncing(text);
  };

  const clearSearch = () => {
    setSearch('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <View style={{ ...styles.row, ...style }}>
      <View style={{ ...styles.searchBox, backgroundColor: theme.card }}>
        <Feather name="search" size={20} color={commonColors.gray} />
        <TextInput
          value={search}
          placeholder="Search..."
          placeholderTextColor={`${theme.secondaryTextColor}`}
          style={{ ...styles.input, color: theme.secondaryTextColor }}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
        />
        {search && (
          <TouchableOpacity onPress={clearSearch}>
            <Text style={styles.clear}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },

  searchBox: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: commonColors.veryLightGray,
    borderRadius: 12,
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    marginLeft: 8,
  },

  clear: {
    color: commonColors.primaryTextColor,
  },
});
