import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Share, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Background from '../components/Background';
import EmailLink from '../components/MailTo';

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
  const [submissionStatus, setSubmissionStatus] = useState('');

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
    console.log("this is the value "+ Colors.FONTSIZELYRIC);
    try {
      await AsyncStorage.setItem('fontSize', value.toString());
    } catch (error) {
      console.error('Error saving font size:', error);
    }
  };

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    Colors.BACKGROUND = isDarkMode ? Colors.APP_BACKGROUND : Colors.BACKGROUNDCOLOR;
   console.log(Colors.BACKGROUND);
    setIsDarkMode(newMode);
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('message', message);

    try {
      const response = await fetch('https://formspree.io/f/xeojewpv', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        setSubmissionStatus('Thanks for your message!');
        setMessage('');
        setTimeout(() => {
          setSubmissionStatus('');
        }, 5000);
      } else {
        setSubmissionStatus('Oops! There was a problem submitting your form.');
        setTimeout(() => {
          setSubmissionStatus('');
        }, 5000);
      }
    } catch (error) {
      setSubmissionStatus('Oops! There was a problem submitting your form.');
      setTimeout(() => {
        setSubmissionStatus('');
      }, 5000);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out the ESYONYIMBO SYA KRISTO app!',
      });
    } catch (error) {
      console.error('Error sharing the app:', error);
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
            <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.DARK_BACKGROUND : Colors.APP_BACKGROUND }]}>
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
                <View style={styles.buttonContainer}> 
                      <TouchableOpacity
                        style={[styles.modeButton, isDarkMode && styles.modeButtonActive]}
                        onPress={toggleDarkMode}
                      >
                        <Text style={styles.modeButtonText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                      <Text style={styles.shareButtonText}>Share This App</Text>
                    </TouchableOpacity>
              </View>
              </View>

              <View style={styles.card}>
                <Text style={[styles.cardTitle, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT }]}>About</Text>
                <Text style={[styles.subText, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT }]}>Developer: MUHINDO MBAVULIKIRA HERITIER</Text>
                <Text style={[styles.subText, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT }]}>Phone: +243 829 267 467</Text>
                <Text style={[styles.subText, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT }]}>Lyrics: KAKULE VIVALYA</Text>
                <EmailLink/>

                <ExpandableSection 
                  title="Special Thanks"
                  content="
                  • MZEE LUVATSUNGANA DIEUDONNE 
                  • KAVUHO MUNYOMI OPRAH 
                  • Dr OSEE MASIVI 
                  • GLOIRE NDUNGO VAGHENI 
                  • OSEE KAMBALE KYAVU 
                  • TRESOR NZALAMINGI 
                  • GIDEON MAHILI 
                  • VERDA MBAVULIKIRA 
                  • GUY KALETU 
                  • WILSON MUHASA 
                  • VENAH KISUNZU 
                  • HON. NZANGI BUTONDO 
                  • DANIEL MUTHAVALY 
                  • BIENFAIT KAVATSI 
                  • Dr NATHANIEL MUMBERE WALEMBA 
                  • FISTON SAHIKA 
                  • MAPENDO SIVIHWA 
                  • ESDRAS KABUNDA 
                  • Dr MUNAKENYA 
                  • PASCANET STUDIOZ 
                  • ISAAC MWENDAMBIYO"
                />
              </View>
              <View style={styles.card}>
                <Text style={[styles.cardTitle, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT }]}>Feedback</Text>
                <TextInput
                  style={[styles.input, { color: isDarkMode ? Colors.LIGHT_TEXT : Colors.DARK_TEXT, backgroundColor: isDarkMode ? Colors.DARK_INPUT : Colors.LIGHT_INPUT }]}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Your message here"
                  placeholderTextColor={isDarkMode ? Colors.APP_BACKGROUND : Colors.GRAY}
                  multiline
                />
                <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON }]} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Send Message</Text>
                </TouchableOpacity>
                {submissionStatus !== '' && (
                  <Text style={styles.successMessage}>{submissionStatus}</Text>
                )}
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
    backgroundColor:Colors.APP_BACKGROUND,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily:'outfit-medium',
  },
  settings: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily:'outfit-medium',
  },
  card: {
    backgroundColor: Colors.APP_BACKGROUND,
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
    fontFamily:'outfit-bold',
  },
  settingItem: {
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily:'outfit-medium',
  },
  subText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily:'outfit-medium',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 100,
    fontSize:Colors.FONTSIZETITLE,
    color:Colors.GRAY,
    fontFamily:'outfit-medium',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20,
    
  },
  buttonText: {
    marginTop: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY,
    fontFamily:'outfit-medium',
    alignItems: 'center',
    justifyContent: 'center',
    color:Colors.APP_BACKGROUND,
    borderRadius:20,
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
    fontFamily:'outfit-medium',
  },
  modeButton: {
    marginTop: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    display:'none',
  },
  modeButtonActive: {
    backgroundColor: Colors.BACKGROUND,
  },
  modeButtonText: {
    fontWeight: '600',
    color:Colors.APP_BACKGROUND,
  },
  expandableContainer: {
    marginTop: 10,
  },
  expandableTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily:'outfit-medium',
  },
  expandableContent: {
    marginTop: 5,
    fontSize: 14,
  },
  buttonContainer:{
    display:'flex',
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    gap:30,
  },
  shareButton: {
    marginTop: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    fontSize: 16,
    fontFamily:'outfit-medium',
    color: Colors.APP_BACKGROUND,
    fontWeight: '',
  },
});

export default Settings;
