import { Fontisto, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomHeader from '../components/CustomHeader';
import { Colors } from '../constants/Colors';
import { SearchProvider } from './../components/SearchContext';
import Favorites from './Favorite';
import HomeScreen from './Home';
import Settings from './Settings';
import { FontSizeProvider } from './../components/FontSizeProvider';


const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <SearchProvider>
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          lazy: false,
          headerShown: true,
          headerTransparent: true,
          headerBackground: () => null,
          tabBarActiveTintColor: Colors.BACKGROUNDCOLOR,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="songList"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="list" size={30} color={color} />,
            header: () => <CustomHeader />,
            lazy: true
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({ color }) => <Fontisto name="heart" size={30} color={color} />,
            tabBarLabel:"ESYANZIRWE",
            header: () => 
            <View style={styles.headerContainer}>
                 <Text style={styles.headerTitle}>ESYANZIRWE</Text>
            </View>,
            
            lazy: true

          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="settings" size={30} color={color} />,
            header: () =>null,
            lazy: true
          }}
        />
      </Tab.Navigator>
       </View>
    </SearchProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    height: hp(5),
    paddingBottom: 5, 
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    display: 'none',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'outfit-medium',
    color: Colors.APP_BACKGROUND,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: hp(8),
    paddingHorizontal: 10,
  }
});

export default Tabs;
