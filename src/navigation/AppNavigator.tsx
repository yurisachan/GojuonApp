import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import HiraganaChartScreen from '../screens/HiraganaChartScreen';
import KatakanaChartScreen from '../screens/KatakanaChartScreen';
import QuizScreen from '../screens/QuizScreen';
import CharDetailScreen from '../screens/CharDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  HiraganaChart: undefined;
  KatakanaChart: undefined;
  Quiz: { mode: 'hiragana' | 'katakana' | 'both' };
  CharDetail: { 
    kana: string; 
    romaji: string; 
    audio: string;
    type: 'hiragana' | 'katakana' 
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4A86E8',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: '五十音图学习' }} 
        />
        <Stack.Screen 
          name="HiraganaChart" 
          component={HiraganaChartScreen} 
          options={{ title: '平假名表' }} 
        />
        <Stack.Screen 
          name="KatakanaChart" 
          component={KatakanaChartScreen} 
          options={{ title: '片假名表' }} 
        />
        <Stack.Screen 
          name="Quiz" 
          component={QuizScreen} 
          options={{ title: '五十音测试' }} 
        />
        <Stack.Screen 
          name="CharDetail" 
          component={CharDetailScreen} 
          options={{ title: '假名详情' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 