import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SongHeader = ({ item }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setMute] = useState(false);
  const [likeIcon, setLikeIcon] = useState(false);
  const [sound, setSound] = useState(null);
  const [loading, setLoading] = useState(true);
  const [instrumentalExists, setInstrumentalExists] = useState(false);
  const [currentSoundId, setCurrentSoundId] = useState(null);

  const audioFiles = {
    
    'number100': require('../assets/instrumental/number100.m4a'),
    'number105': require('../assets/instrumental/number105.m4a'),
    'number107': require('../assets/instrumental/number107.m4a'),
    'number10': require('../assets/instrumental/number10.m4a'),
    'number111': require('../assets/instrumental/number111.m4a'),
    'number113': require('../assets/instrumental/number113.m4a'),
    'number115': require('../assets/instrumental/number115.m4a'),
    'number118': require('../assets/instrumental/number118.m4a'),
    'number11': require('../assets/instrumental/number11.m4a'),
    'number121': require('../assets/instrumental/number121.m4a'),
    'number12': require('../assets/instrumental/number12.m4a'),
    'number130': require('../assets/instrumental/number130.m4a'),
    'number132': require('../assets/instrumental/number132.m4a'),
    'number137': require('../assets/instrumental/number137.m4a'),
    'number139': require('../assets/instrumental/number139.m4a'),
    'number13': require('../assets/instrumental/number13.m4a'),
    'number144': require('../assets/instrumental/number144.m4a'),
    'number148': require('../assets/instrumental/number148.m4a'),
    'number15': require('../assets/instrumental/number15.m4a'),
    'number161': require('../assets/instrumental/number161.m4a'),
    'number162': require('../assets/instrumental/number162.m4a'),
    'number165': require('../assets/instrumental/number165.m4a'),
    'number166': require('../assets/instrumental/number166.m4a'),
    'number169': require('../assets/instrumental/number169.m4a'),
    'number170': require('../assets/instrumental/number170.m4a'),
    'number178': require('../assets/instrumental/number178.m4a'),
    'number182': require('../assets/instrumental/number182.m4a'),
    'number184': require('../assets/instrumental/number184.m4a'),
    'number188': require('../assets/instrumental/number188.m4a'),
    'number18': require('../assets/instrumental/number18.m4a'),
    'number191': require('../assets/instrumental/number191.m4a'),
    'number197': require('../assets/instrumental/number197.m4a'),
    'number199': require('../assets/instrumental/number199.m4a'),
    'number200': require('../assets/instrumental/number200.m4a'),
    'number20': require('../assets/instrumental/number20.m4a'),
    'number24': require('../assets/instrumental/number24.m4a'),
    'number25': require('../assets/instrumental/number25.m4a'),
    'number26': require('../assets/instrumental/number26.m4a'),
    'number27': require('../assets/instrumental/number27.m4a'),
    'number28': require('../assets/instrumental/number28.m4a'),
    'number29': require('../assets/instrumental/number29.m4a'),
    'number30': require('../assets/instrumental/number30.m4a'),
    'number33': require('../assets/instrumental/number33.m4a'),
    'number34': require('../assets/instrumental/number34.m4a'),
    'number35': require('../assets/instrumental/number35.m4a'),
    'number36': require('../assets/instrumental/number36.m4a'),
    'number37': require('../assets/instrumental/number37.m4a'),
    'number39': require('../assets/instrumental/number39.m4a'),
    'number40': require('../assets/instrumental/number40.m4a'),
    'number41': require('../assets/instrumental/number41.m4a'),
    'number45': require('../assets/instrumental/number45.m4a'),
    'number46': require('../assets/instrumental/number46.m4a'),
    'number47': require('../assets/instrumental/number47.m4a'),
    'number55': require('../assets/instrumental/number55.m4a'),
    'number56': require('../assets/instrumental/number56.m4a'),
    'number58': require('../assets/instrumental/number58.m4a'),
    'number60': require('../assets/instrumental/number60.m4a'),
    'number61': require('../assets/instrumental/number61.m4a'),
    'number62': require('../assets/instrumental/number62.m4a'),
    'number63': require('../assets/instrumental/number63.m4a'),
    'number65': require('../assets/instrumental/number65.m4a'),
    'number68': require('../assets/instrumental/number68.m4a'),
    'number76': require('../assets/instrumental/number76.m4a'),
    'number77': require('../assets/instrumental/number77.m4a'),
    'number78': require('../assets/instrumental/number78.m4a'),
    'number79': require('../assets/instrumental/number79.m4a'),
    'number82': require('../assets/instrumental/number82.m4a'),
    'number83': require('../assets/instrumental/number83.m4a'),
    'number84': require('../assets/instrumental/number84.m4a'),
    'number86': require('../assets/instrumental/number86.m4a'),
    'number88': require('../assets/instrumental/number88.m4a'),
    'number89': require('../assets/instrumental/number89.m4a'),
    'number8': require('../assets/instrumental/number8.m4a'),
    'number97': require('../assets/instrumental/number97.m4a'),
    'number9': require('../assets/instrumental/number9.m4a'),
    'number3': require('../assets/instrumental/number3.m4a'),
  };

  const loadSound = useCallback(async () => {
    try {
      const m4aSource = audioFiles[`number${item.id}`];
      if (!m4aSource) {
        setInstrumentalExists(false);
        console.error(`Audio file not found for id: ${item.id}`);
        throw new Error(`Audio file not found for id: ${item.id}`);
      }
      setInstrumentalExists(true);

      if (sound) {
        // Unload the previous sound before loading a new one
        await sound.unloadAsync();
      }

      // Load new sound
      const { sound: loadedSound } = await Audio.Sound.createAsync(m4aSource);
      setSound(loadedSound);
      setLoading(false);
      setCurrentSoundId(item.id);
      console.log('Sound loaded successfully');
    } catch (error) {
      console.error('Error loading sound:', error);
      setLoading(false);
    }
  }, [item.id]);

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync().then(() => console.log('Sound unloaded'));
      }
    };
  }, [item.id, loadSound]);

  useFocusEffect(
    useCallback(() => {
      const handleScreenFocus = async () => {
        if (sound && isPlaying) {
          await sound.playAsync();
          console.log('Audio resumed');
        }
      };

      handleScreenFocus();
      return () => {
        if (sound && isPlaying) {
          sound.pauseAsync().then(() => console.log('Audio paused'));
        }
      };
    }, [isPlaying, sound])
  );

  const playPauseAudio = useCallback(async () => {
    if (!sound) return;

    try {
      if (isPlaying) {
        await sound.pauseAsync();
        console.log('Audio paused');
      } else {
        await sound.playAsync();
        console.log('Audio playing');
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Failed to play/pause audio:', error);
    }
  }, [isPlaying, sound]);

  const toggleMute = useCallback(async () => {
    const newMuteState = !isMuted;
    setMute(newMuteState);

    try {
      if (sound) {
        await sound.setStatusAsync({ volume: newMuteState ? 0 : 1 });
      }
      await AsyncStorage.setItem('isMuted', JSON.stringify(newMuteState));
      console.log('Mute state updated:', newMuteState);
    } catch (error) {
      console.error('Failed to update mute state:', error);
    }
  }, [isMuted, sound]);

  const handlePressLikeButton = useCallback(async () => {
    try {
      const favorites = await AsyncStorage.getItem('FavoriteSongs');
      let favoriteSongs = favorites ? JSON.parse(favorites) : [];

      if (!likeIcon) {
        favoriteSongs = [...favoriteSongs, item ]; // to be changed
        console.log('Added to favorites:', item);
      } else {
        favoriteSongs = favoriteSongs.filter(song => song.id !== item.id);
        console.log('Removed from favorites:', item);
      }

      await AsyncStorage.setItem('FavoriteSongs', JSON.stringify(favoriteSongs));
      setLikeIcon(!likeIcon);
    } catch (error) {
      console.error('Failed to update favorite songs:', error);
    }
  }, [likeIcon, item]);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favorites = await AsyncStorage.getItem('FavoriteSongs');
        if (favorites) {
          const favoriteSongs = JSON.parse(favorites);
          setLikeIcon(favoriteSongs.some(song => song.id === item.id));
        }
      } catch (error) {
        console.error('Failed to check favorite status:', error);
      }
    };

    checkFavorite();
  }, [item.id]);

  useEffect(() => {
    const handleMuteState = async () => {
      try {
        const storedMuteState = await AsyncStorage.getItem('isMuted');
        if (storedMuteState !== null) {
          setMute(JSON.parse(storedMuteState));
          if (sound) {
            await sound.setStatusAsync({ volume: JSON.parse(storedMuteState) ? 0 : 1 });
          }
        }
      } catch (error) {
        console.error('Failed to retrieve mute state:', error);
      }
    };

    handleMuteState();
  }, [sound]);

  if (loading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (!instrumentalExists) {
    return (
      <View style={styles.centeredContainer}>
        <TouchableOpacity onPress={handlePressLikeButton}>
          <Ionicons
            name={likeIcon ? 'heart' : 'heart-outline'}
            size={25}
            color={'#fff'}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={playPauseAudio}>
        <Ionicons
          name={isPlaying ? 'pause-circle' : 'play-circle'}
          size={25}
          color={'#fff'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleMute}>
        <Ionicons
          name={isMuted ? 'volume-mute' : 'volume-high'}
          size={25}
          color={'#fff'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressLikeButton}>
        <Ionicons
          name={likeIcon ? 'heart' : 'heart-outline'}
          size={25}
          color={'#fff'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    backgroundColor: '#333'
  },
  centeredContainer: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
});

export default SongHeader;
