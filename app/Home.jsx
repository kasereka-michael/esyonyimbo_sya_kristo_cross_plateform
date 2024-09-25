import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HymnalData from '../assets/data/lyrics.json';
import Background from '../components/Background';
import { useSearch } from './../components/SearchContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const { searchText } = useSearch();
  const [filteredData, setFilteredData] = useState(HymnalData);

  useEffect(() => {
    const filtered = HymnalData.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.id.toString().includes(searchText)
    );
    setFilteredData(filtered);
  }, [searchText]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('FavoriteSongs');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  };

  const toggleFavorite = async (item) => {
    try {
      let updatedFavorites;
      if (favorites.some(fav => fav.id === item.id)) {
        updatedFavorites = favorites.filter(fav => fav.id !== item.id);
      } else {
        updatedFavorites = [...favorites, item];
      }
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('FavoriteSongs', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Failed to update favorites:', error);
    }
  };

  const handlePress = (item) => {
    navigation.navigate('songLyric', { item });
  };

  const Item = memo(({ item, onPress, isFavorite, onToggleFavorite }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={onPress} style={styles.itemContent}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{item.id}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onToggleFavorite}>
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={24} 
          color={isFavorite ? Colors.HEART_RED : Colors.ICON_COLOR} 
        />
      </TouchableOpacity>
    </View>
  ));

  const renderItem = useCallback(({ item }) => (
    <Item
      item={item}
      onPress={() => handlePress(item)}
      isFavorite={favorites.some(fav => fav.id === item.id)}
      onToggleFavorite={() => toggleFavorite(item)}
    />
  ), [favorites, handlePress, toggleFavorite]);

  return (
    <Background>
      
      <SafeAreaView style={styles.container}>
        <FlatList
          data={filteredData.length ? filteredData : HymnalData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          windowSize={13}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          getItemLayout={(data, index) => ({
            length: hp('8%'),
            offset: hp('8%') * index,
            index,
          })}
        />
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingHorizontal: wp('1%'),
    paddingTop:10,
  },
  list: {
    flexGrow: 1, 
    paddingTop:hp(9),
    padding:10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('2%'),
    backgroundColor: Colors.ITEM_BACKGROUND,
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
    flex: 1,
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
    color: Colors.TITLE_TEXT,
    fontWeight: '500',
    flex: 1,
  },
});

export default HomeScreen;
