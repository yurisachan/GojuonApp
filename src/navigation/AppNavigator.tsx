import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';

import HomeScreen from '../screens/HomeScreen';
import HiraganaChartScreen from '../screens/HiraganaChartScreen';
import KatakanaChartScreen from '../screens/KatakanaChartScreen';
import QuizScreen from '../screens/QuizScreen';
import CharDetailScreen from '../screens/CharDetailScreen';
import AboutScreen from '../screens/AboutScreen';

export type RootStackParamList = {
  Home: undefined;
  HiraganaChart: undefined;
  KatakanaChart: undefined;
  CharDetail: {
    kana: string;
    romaji: string;
    audio: string;
    type: 'hiragana' | 'katakana';
  };
  Quiz: { mode: 'hiragana' | 'katakana' | 'both' };
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { theme, isDark } = useTheme();
  
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: theme.background
        },
        headerRight: () => <ThemeToggleButton />
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: '五十音图' }} 
      />
      <Stack.Screen 
        name="HiraganaChart" 
        component={HiraganaChartScreen} 
        options={{ title: '平假名' }} 
      />
      <Stack.Screen 
        name="KatakanaChart" 
        component={KatakanaChartScreen} 
        options={{ title: '片假名' }} 
      />
      <Stack.Screen 
        name="Quiz" 
        component={QuizScreen} 
        options={{ title: '假名测试' }} 
      />
      <Stack.Screen 
        name="CharDetail" 
        component={CharDetailScreen} 
        options={{ title: '假名详情' }} 
      />
      <Stack.Screen 
        name="About" 
        component={AboutScreen} 
        options={{ title: '关于' }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator; 