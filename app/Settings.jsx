import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Background from '../components/Background';

const ExpandableSection = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.expandableContainer}>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.expandableTitle}>{title} {isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <Text style={styles.expandableContent}>{content}</Text>
      )}
    </View>
  );
};

const Settings = () => {
  const [fontSize, setFontSize] = useState(Colors.FONTSIZELYRIC);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedFontSize = await AsyncStorage.getItem('fontSize');
        if (savedFontSize !== null) {
          const size = parseFloat(savedFontSize);
          setFontSize(size);
          Colors.FONTSIZELYRIC = size;
        }

        const savedDarkMode = await AsyncStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
          setIsDarkMode(JSON.parse(savedDarkMode));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  const handleFontSizeChange = async (value) => {
    setFontSize(value);
    Colors.FONTSIZELYRIC = value;
    try {
      await AsyncStorage.setItem('fontSize', value.toString());
    } catch (error) {
      console.error('Error saving font size:', error);
    }
  };

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };

  return (
    <Background>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.avoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.DARK_BACKGROUND : Colors.LIGHT_BACKGROUND }]}>
              <Text style={[styles.title, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT }]}>ESYONYIMBO SYAKRISTO</Text>
              <Text style={[styles.settings, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT }]}>Settings</Text>

              <View style={styles.card}>
                <Text style={[styles.cardTitle, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT }]}>Appearance</Text>
                <View style={styles.settingItem}>
                  <Text style={[styles.text, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT }]}>Lyrics Font Size: {fontSize.toFixed(1)}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={18}
                    maximumValue={24}
                    step={0.5}
                    value={fontSize}
                    onValueChange={handleFontSizeChange}
                    minimumTrackTintColor={Colors.PRIMARY}
                    maximumTrackTintColor={Colors.SECONDARY}
                    thumbTintColor={Colors.PRIMARY}
                  />
                </View>
                <TouchableOpacity
                  style={[styles.modeButton, isDarkMode && styles.modeButtonActive]}
                  onPress={toggleDarkMode}
                >
                  <Text style={styles.modeButtonText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.card}>
                <Text style={[styles.cardTitle, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT }]}>About</Text>
                <Text style={[styles.subText, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT }]}>Developed by Kasereka Michael</Text>
                <Text style={[styles.subText, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT }]}>Phone: +250 785 587 497</Text>
                <Text style={[styles.subText, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT }]}>Phone: +243 785 587 497</Text>
                <Text style={[styles.subText, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT }]}>Email: Kaserekamichael23526@gmail.com</Text>

                <ExpandableSection 
                  title="Special Thanks"
                  content="MZEE LUVATSUNGANA DIEUDONNE • KAVUHO MUNYOMI OPRAH • Dr OSEE MASIVI • MICHAEL JAZZIRY • GLOIRE NDUNGO VAGHENI • OSEE KAMBALE KYAVU • TRESOR NZALAMINGI • GIDEON MAHILI • VERDA MBAVULIKIRA • GUY KALETU • WILSON MUHASA • VENAH KISUNZU • HON. NZANGI BUTONDO • DANIEL MUTHAVALY • BIENFAIT KAVATSI • Dr NATHANIEL MUMBERE WALEMBA • FISTON SAHIKA • MAPENDO SIVIHWA • Dr MUNAKENYA • PASCANET STUDIOZ • ISAAC MWENDAMBIYO"
                />
              </View>

              <View style={styles.card}>
                <Text style={[styles.cardTitle, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT }]}>Feedback</Text>
                <TextInput
                  style={[styles.input, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT, backgroundColor: isDarkMode ? Colors.DARK_INPUT : Colors.LIGHT_INPUT }]}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Your message here"
                  placeholderTextColor={isDarkMode ? Colors.DARK_PLACEHOLDER : Colors.LIGHT_PLACEHOLDER}
                  multiline
                />
                <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON }]} onPress={() => {/* Implement send message functionality */}}>
                  <Text style={styles.buttonText}>Send Message</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
};

const styles = StyleSheet.create({
  avoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  settings: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  settingItem: {
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    marginBottom: 5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 100,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modeButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 20,
    width: 100,
    alignItems: 'center',
    marginVertical: 10,
  },
  modeButtonActive: {
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  modeButtonText: {
    fontWeight: '600',
  },
  expandableContainer: {
    marginTop: 10,
  },
  expandableTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  expandableContent: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default Settings;
