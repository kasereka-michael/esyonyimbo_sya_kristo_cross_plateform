import { Colors } from '@/constants/Colors';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Background from './../../components/Background';
import SongHeader from './../../components/SongHeader';



const SongLyric = ({ route }) => {
  const { item } = route.params;

  const renderVerse = ({ item: verse, index }) => (
    <View style={styles.verseContainer}>
      <Text style={styles.lyricTitle} accessibilityRole="header">
        {verse.title}:
      </Text>
      <Text style={styles.lyrics}>{verse.content}</Text>
      {item.songLyric.chorus && (
        <View style={styles.verseContainer}>
          <Text style={styles.lyricTitle} accessibilityRole="header">
            Erisuba mo:
          </Text>
          <Text style={styles.lyrics}>{item.songLyric.chorus}</Text>
        </View>
      )}
    </View>
  );

  const verses = Object.entries(item.songLyric)
    .filter(([key]) => key.startsWith('verse'))
    .map(([key, content], index) => ({
      id: key,
      title: `Verse ${index + 1}`,
      content,
    }));

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <Text style={styles.id}>No: {item.id}</Text>
          <Text style={styles.title} accessibilityRole="header">
            {item.title}
          </Text>
          <Text style={styles.englishTitle}>"{item.englishTitle}"</Text>
          <Text style={styles.churchHymnalNumber}>
            Church Hymnal No: {item.churchHymnalNumber}
          </Text>
          <Text style={styles.musicKey}>Key: {item.musicKey}</Text>
        </View>
        <SongHeader item={item} />
        <FlatList
          data={verses}
          renderItem={renderVerse}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lyricsContainer}
        />
      </View>
    </Background>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    padding:10,
    backgroundColor: Colors.APP_BACKGROUND,
  },
  scrollContainer: {
    padding: 20,
  },
  headerContent: {
    marginBottom: 20,
    display:'flex',
    justifyContent:'center'
  },
  id: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'outfit-bold',
  },
  title: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    color: '#000',
    marginBottom: 10,
  },
  englishTitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  churchHymnalNumber: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  musicKey: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  lyricsContainer: {
    marginTop: 20,
  },
  verseContainer: {
    marginBottom: 15,
    fontWeight:600,
    marginTop:10,
    fontFamily:'outfit-bold'
  },
  lyricTitle: {
    fontSize: Colors.FONTSIZETITLE,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'outfit-medium',
  },
  lyrics: {
    fontSize: Colors.FONTSIZELYRIC,
    color: '#333',
    lineHeight: 24,
    fontFamily: 'outfit-regular',
  },
});

export default SongLyric;
