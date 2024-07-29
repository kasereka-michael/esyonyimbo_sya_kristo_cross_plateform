import React from 'react';
import { Text, TouchableOpacity, Linking, StyleSheet, useColorScheme } from 'react-native';
import Colors from './../constants/Colors' // Adjust the import to your Colors file

const EmailLink = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const handlePress = () => {
    Linking.openURL('mailto:esyonyimbosyakristo@gmail.com');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.subText, { color: isDarkMode ? '#f2f2f' : '#0f0f' }]}>
        Email: esyonyimbosyakristo@gmail.com
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  subText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily:'outfit-medium',
  },
});

export default EmailLink;
