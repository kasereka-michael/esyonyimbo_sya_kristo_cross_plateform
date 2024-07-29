import { Colors } from '@/constants/Colors';
import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Background from './../../components/Background';
import { useFontSize } from './../../components/FontSizeProvider'; // Adjust path as necessary
import SongHeader from './../../components/SongHeader';

const SongLyric = ({ route }) => {
  const { item } = route.params;
  const { fontSize }  = useFontSize(); 

  const copyToClipboard = (content) => {
    Clipboard.setStringAsync(content);
    Alert.alert("Copied to Clipboard", "The verse has been copied to your clipboard.");
  };

  const renderVerse = ({ item: verse, index }) => (
    <TouchableOpacity 
      onLongPress={() => copyToClipboard(verse.content)}
      style={styles.verseContainer}
    >
      <Text style={[styles.lyricTitle, { fontSize: Colors.FONTSIZELYRIC + 2 }]}>
        {verse.title}:
      </Text>
      <Text style={[styles.lyrics, { fontSize: Colors.FONTSIZELYRIC }]}>{verse.content}</Text>
      {item.songLyric.chorus && (
        <View style={styles.chorusContainer}>
          <Text style={[styles.lyricTitle, { fontSize: Colors.FONTSIZELYRIC + 2 }]}>
            Chorus:
          </Text>
          <Text style={[styles.lyrics, { fontSize: Colors.FONTSIZELYRIC }]}>{item.songLyric.chorus}</Text>
        </View>
      )}
    </TouchableOpacity>
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
          <Text style={[styles.id, { fontSize: fontSize }]}>{`No: ${item.id}`}</Text>
          <Text style={[styles.title, { fontSize: fontSize + 4 }]}>
            {item.title}
          </Text>
          <Text style={[styles.englishTitle, { fontSize: fontSize }]}>
            “{item.englishTitle}”
          </Text>
          <Text style={[styles.churchHymnalNumber, { fontSize: fontSize }]}>
            Church Hymnal No: {item.churchHymnalNumber}
          </Text>
          <Text style={[styles.musicKey, { fontSize: fontSize }]}>
            Key: {item.musicKey}
          </Text>
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
    borderRadius: 12,
    padding: 16,
    backgroundColor: Colors.APP_BACKGROUND,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    marginBottom: 16,
    justifyContent: 'center',
  },
  id: {
    color: Colors.TEXT_PRIMARY,
    marginBottom: 8,
    fontFamily: 'outfit-bold',
  },
  title: {
    fontFamily: 'outfit-bold',
    color: Colors.TEXT_PRIMARY,
    marginBottom: 16,
  },
  englishTitle: {
    color: Colors.TEXT_SECONDARY,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  churchHymnalNumber: {
    color: Colors.TEXT_TERTIARY,
    marginBottom: 8,
  },
  musicKey: {
    color: Colors.TEXT_TERTIARY,
    marginBottom: 16,
  },
  lyricsContainer: {
    marginTop: 16,
  },
  verseContainer: {
    marginBottom: 16,
  },
  chorusContainer: {
    marginTop: 12,
    paddingTop: 12,
  },
  lyricTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'outfit-medium',
    color: Colors.TEXT_PRIMARY,
    fontSize: Colors.FONTSIZELYRIC,
  },
  lyrics: {
    color: Colors.TEXT_PRIMARY,
    lineHeight: 24,
    fontFamily: 'outfit-regular',
    fontSize: Colors.FONTSIZELYRIC,
  },
});

export default SongLyric;
