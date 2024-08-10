import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';

const EmailLink = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const handlePress = () => {
    Linking.openURL('mailto:esyonyimbosyakristo@gmail.com');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.subText, { color: isDarkMode ? '#000' : '#0b0' }]}>
        Email: esyonyimbosyakristo@gmail.com
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  subText: {
    fontSize: 16,
    marginBottom: 5,
    color:'#000',
    fontFamily:'outfit-medium',
  },
});

export default EmailLink;
