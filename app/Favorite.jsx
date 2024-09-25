import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import { FlatList, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Background from '../components/Background';

const Favorite = () => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const navigation = useNavigation();

  const fetchFavorites = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('FavoriteSongs');
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        if (Array.isArray(parsedFavorites)) {
          const validFavorites = parsedFavorites.filter(item => item && typeof item === 'object' && item.id);
          setFavoriteSongs(validFavorites);
        } else {
          setFavoriteSongs([]);
        }
      } else {
        setFavoriteSongs([]);
      }
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
      setFavoriteSongs([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [fetchFavorites])
  );

  const debouncedSyncFavorites = useCallback(
    debounce(async (favorites) => {
      try {
        await AsyncStorage.setItem('FavoriteSongs', JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to sync favorites:', error);
      }
    }, 500),
    []
  );

  const removeSongFromFavorites = useCallback((song) => {
    setFavoriteSongs((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((s) => s.id !== song.id);
      debouncedSyncFavorites(updatedFavorites);
      return updatedFavorites;
    });
  }, [debouncedSyncFavorites]);

  const handlePress = useCallback((item) => {
    console.log('Navigating to SongLyric with item:', item);
    navigation.navigate('songLyric', { item });
  }, [navigation]);

  const renderItem = useCallback(({ item }) => {
    if (!item || typeof item !== 'object' || !item.id) {
      console.warn('Invalid item:', item);
      return null;
    }

    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => handlePress(item)} style={styles.itemContent}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>{item.id}</Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeSongFromFavorites(item)}>
          <Ionicons name="close-circle" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  }, [handlePress, removeSongFromFavorites]);

  return (
    <Background>
     
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>ESYANZIRWE</Text>
          </View>
          {favoriteSongs.length === 0 ? (
            <Text style={styles.noDataText}>No favorite songs added yet.</Text>
          ) : (
            <FlatList
              data={favoriteSongs}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.list}
            />
          )}
        </View>
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    
  },
  list: {
    flexGrow: 1,
    padding:10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
    height: hp(8),
    color:"#000",
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    fontFamily: Platform.select({
      ios: 'Helvetica',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    // display: 'none',
    color:"#000",
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: hp('1%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    justifyContent: 'space-between',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberContainer: {
    backgroundColor: Colors.NUMBER_BACKGROUND,
    padding: wp('2%'),
    borderRadius: 20,
    marginRight: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: Colors.APP_BACKGROUND,
    fontSize: wp('3%'),
    fontWeight: '600',
  },
  title: {
    fontSize: wp('3.8%'),
    color: '#333',
    fontWeight: '500',
  },
  noDataText: {
    fontSize: wp('4%'),
    textAlign: 'center',
    marginTop: hp('5%'),
    color: '#888',
  },
});

export default Favorite;
