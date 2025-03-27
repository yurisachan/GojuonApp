import React, { createContext, useState, useContext, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 定义主题类型接口
interface ThemeColors {
  isDark: boolean;
  background: string;
  text: string;
  subText: string;
  card: string;
  border: string;
  primary: string;
  hiraganaColor: string;
  katakanaColor: string;
  buttonBackground: string;
  quizColor: string;
  disabledButton: string;
  combinedColor: string;
}

// 定义主题上下文接口
interface ThemeContextType {
  theme: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

// 亮色主题配置
const lightTheme: ThemeColors = {
  isDark: false,
  background: '#F7F8FB',
  text: '#333333',
  subText: '#666666',
  card: '#FFFFFF',
  border: '#E0E0E0',
  primary: '#6B7DB3',
  hiraganaColor: 'rgb(240, 98, 128)',
  katakanaColor: 'rgb(91, 153, 139)',
  buttonBackground: '#E0E0E0',
  quizColor: 'rgb(242, 158, 76)',
  disabledButton: '#CCCCCC',
  combinedColor: 'rgb(88, 149, 222)',
};

// 暗色主题配置
const darkTheme: ThemeColors = {
  isDark: true,
  background: '#121212',
  text: '#FFFFFF',
  subText: '#AAAAAA',
  card: '#242424',
  border: '#333333',
  primary: '#4C6FFF',
  hiraganaColor: 'rgb(245, 54, 92)',
  katakanaColor: 'rgb(40, 124, 106)',
  buttonBackground: '#333333',
  quizColor: 'rgb(229, 115, 20)',
  disabledButton: '#4A5568',
  combinedColor: 'rgb(48, 116, 195)',
};

// 创建主题上下文
const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {}
});

// 主题提供者组件
export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  // 从系统获取默认主题
  useEffect(() => {
    const getStoredTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('appTheme');
        if (storedTheme) {
          setIsDark(storedTheme === 'dark');
        } else {
          const colorScheme = Appearance.getColorScheme();
          setIsDark(colorScheme === 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme from storage', error);
        const colorScheme = Appearance.getColorScheme();
        setIsDark(colorScheme === 'dark');
      } finally {
        setIsLoaded(true);
      }
    };
    
    getStoredTheme();
    
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === 'dark');
    });
    
    return () => {
      subscription.remove();
    };
  }, []);
  
  // 切换主题
  const toggleTheme = async () => {
    try {
      await AsyncStorage.setItem('appTheme', isDark ? 'light' : 'dark');
      setIsDark(!isDark);
    } catch (error) {
      console.error('Failed to save theme to storage', error);
    }
  };
  
  // 设置特定主题
  const setTheme = async (darkMode: boolean) => {
    try {
      await AsyncStorage.setItem('appTheme', darkMode ? 'dark' : 'light');
      setIsDark(darkMode);
    } catch (error) {
      console.error('Failed to save theme to storage', error);
    }
  };
  
  if (!isLoaded) {
    return null; // 或者显示加载指示器
  }
  
  const theme = isDark ? darkTheme : lightTheme;
  
  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 主题使用钩子
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext; 