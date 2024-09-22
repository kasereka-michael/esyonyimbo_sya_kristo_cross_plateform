import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font'; // Using * as Font for convenience
import React, { useEffect, useState } from 'react';
import Tabs from './Tabs';
import { FontSizeProvider } from './../components/FontSizeProvider';
import SongLyric from './screens/SongLyric';

const Stack = createStackNavigator();

const Index = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
        'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
        'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
<FontSizeProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="songLyric"
          component={SongLyric}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
  </FontSizeProvider>
  );
};

export default Index;
