import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
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
  background: '#F4F7FC',
  text: '#2D3748',
  subText: '#718096',
  card: '#FFFFFF',
  border: '#E2E8F0',
  primary: '#6B7DB3',
  hiraganaColor: '#7E91C9',
  katakanaColor: '#C37F95',
  buttonBackground: '#F4F7FC',
  quizColor: '#7FABC3'
};

// 暗色主题配置
const darkTheme: ThemeColors = {
  isDark: true,
  background: '#1A202C',
  text: '#F7FAFC',
  subText: '#A0AEC0',
  card: '#2D3748',
  border: '#4A5568',
  primary: '#4C6FFF',
  hiraganaColor: '#4C6FFF',
  katakanaColor: '#F5365C',
  buttonBackground: '#2D3748',
  quizColor: '#2DCE89'
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
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState<boolean>(systemColorScheme === 'dark');
  const [theme, setThemeColors] = useState<ThemeColors>(isDark ? darkTheme : lightTheme);
  
  // 读取保存的主题设置
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@theme_preference');
        if (savedTheme !== null) {
          const parsedTheme = JSON.parse(savedTheme);
          setIsDark(parsedTheme.isDark);
          setThemeColors(parsedTheme.isDark ? darkTheme : lightTheme);
        } else {
          // 如果没有保存的主题设置，则使用系统主题
          setIsDark(systemColorScheme === 'dark');
          setThemeColors(systemColorScheme === 'dark' ? darkTheme : lightTheme);
        }
      } catch (error) {
        console.error('无法加载主题设置', error);
      }
    };
    
    loadThemePreference();
  }, [systemColorScheme]);
  
  // 保存主题设置
  const saveThemePreference = async (isDarkMode: boolean) => {
    try {
      await AsyncStorage.setItem('@theme_preference', JSON.stringify({ isDark: isDarkMode }));
    } catch (error) {
      console.error('无法保存主题设置', error);
    }
  };
  
  // 切换主题函数
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    setThemeColors(newIsDark ? darkTheme : lightTheme);
    saveThemePreference(newIsDark);
  };
  
  // 设置特定主题
  const setTheme = (isDarkMode: boolean) => {
    setIsDark(isDarkMode);
    setThemeColors(isDarkMode ? darkTheme : lightTheme);
    saveThemePreference(isDarkMode);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 主题使用钩子
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext; 