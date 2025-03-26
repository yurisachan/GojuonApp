import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Ionicons
        name={isDark ? 'sunny-outline' : 'moon-outline'}
        size={24}
        color={theme.text}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginRight: 8,
  },
});

export default ThemeToggleButton; 