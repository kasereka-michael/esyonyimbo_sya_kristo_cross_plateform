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
            tabBarIcon: ({ color }) => <Ionicons name="list" size={25} color={color} />,
            tabBarLabel:"OMUKYA",
            header: () => <CustomHeader />,
            lazy: true
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({ color }) => <Fontisto name="heart" size={22} color={color} />,
            tabBarLabel:"ESYANZIRWE",
            header: () => {},
            // <View style={styles.headerContainer}>
            //      <Text style={styles.headerTitle}>ESYANZIRWE</Text>
            // </View>,
            
            lazy: true

          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="settings" size={25} color={color} />,
            tabBarLabel:"EBIHOLHO",
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
    height: hp(6),
    paddingBottom: 0, 
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'outfit-medium',
    color:'#000',
    // display: 'none',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: hp(8),
    paddingHorizontal: 10,
  }
});

export default Tabs;
