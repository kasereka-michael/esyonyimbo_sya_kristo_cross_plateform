// components/Background.jsx
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default Background = ({ children }) => {
  return (
    <View style={styles.background}>
      <View style={styles.overlay}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width:'100%',
    height:'100%',
    resizeMode: 'cover', 
    backgroundColor:Colors.BACKGROUND,
  },
  overlay: {
    flex: 1,
  },
});


