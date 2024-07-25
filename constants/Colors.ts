/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    APP_BACKGROUND: '#f0f0f0',  
    tint: tintColorLight,
    BACKGROUNDCOLOR: '#003663', 
    GRAY:'#8f8f8f',   
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    GRAY:'#8f8f8f',   
    APP_BACKGROUND: '#02020',  
    BACKGROUNDCOLOR: '#f0f0f0', 
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
   PRIMARY:'#3f60a0',
  GRAY:'#8f8f8f',           // Your primary color
  ACTIVE_ICON: '#3586df',       // Color for active tab icons and labels
  INACTIVE_ICON: '#001575',        // Color for inactive tab icons and labels
  TAB_BAR_BACKGROUND: '#fff',
  HEADER_BACKGROUND: '#6200EE',   // Background color of the tab bar
  APP_BACKGROUND: '#f0f0f0',  
  HEADER_TINT: '#3b3b3b',
  FONTSIZELYRIC: 18,
  FONTSIZETITLE: 18,
  BACKGROUNDCOLOR: '#003663', 
  BACKGROUND: '#F5F5F5',
  ITEM_BACKGROUND: '#FFFFFF',
  NUMBER_BACKGROUND: '#007AFF',
  TITLE_TEXT: '#333333',
  ICON_COLOR: '#6e6e6e',
  HEART_RED: '#FF3B30',
};
