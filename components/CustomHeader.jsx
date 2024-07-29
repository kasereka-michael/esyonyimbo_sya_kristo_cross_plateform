import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from './../constants/Colors';
import { useSearch } from './SearchContext';

export default function CustomHeader() {
  const { searchText, setSearchText, isSearching, setIsSearching } = useSearch();

  const handleSearchPress = () => setIsSearching(true);
  const handleCancelPress = () => {
    setIsSearching(false);
    setSearchText('');
  };

  return (
    <BlurView intensity={80} style={styles.headerContainer}>
      <View style={styles.innerContainer}>
        <Ionicons name='menu' size={5} color={Colors.HEADER_TINT} style={{opacity:'hidden'}}/>
        {isSearching ? (
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search..."
            placeholderTextColor={Colors.APP_BACKGROUND}
          />
        ) : (
          <Text style={styles.headerTitle}>ESYONYIMBO SYA KRISTO</Text>
        )}
        <TouchableOpacity onPress={isSearching ? handleCancelPress : handleSearchPress} style={styles.searchBtn}>
          <Ionicons name={isSearching ? "close" : "search"} size={24} color={Colors.APP_BACKGROUND} style={styles.searchIcon}/>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: hp(8),
    paddingHorizontal: wp('4%'),
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    fontFamily: 'outfit-medium',
    color: Colors.APP_BACKGROUND,
  },
  searchInput: {
    flex: 1,
    fontSize: wp('4.5%'),
    color: Colors.APP_BACKGROUND,
    borderBottomWidth: 1,
    borderBottomColor: Colors.APP_BACKGROUND,
    marginHorizontal: wp('1%'),
    paddingVertical: hp('0.5%'),
  },
  searchBtn: {
    padding: wp('2%'),
    backgroundColor: '#011173',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    color: Colors.APP_BACKGROUND,
  },
});
