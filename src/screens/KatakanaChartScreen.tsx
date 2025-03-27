import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert
} from 'react-native';
import { Audio } from 'expo-av';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { katakanaData, katakanaRows, katakanaColumns } from '../data/katakana';
import { useTheme } from '../context/ThemeContext';
import AudioService from '../services/AudioService';

type KatakanaChartScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'KatakanaChart'>;
};

const KatakanaChartScreen = ({ navigation }: KatakanaChartScreenProps) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const audioService = AudioService.getInstance();
  const { theme } = useTheme();

  // 组件卸载时清理音频资源
  useEffect(() => {
    return () => {
      audioService.unloadSound();
    };
  }, []);

  const handleSelectRow = (row: string) => {
    setSelectedRow(row === selectedRow ? null : row);
  };

  // Play sound function
  const playSound = async (audio: string) => {
    try {
      await audioService.playSound(audio);
    } catch (error) {
      console.error('播放音频失败:', error);
    }
  };

  const handleKanaPress = (kana: string, romaji: string, audio: string) => {
    // Single tap - Play sound
    playSound(audio);
  };
  
  const handleKanaLongPress = (kana: string, romaji: string, audio: string) => {
    // Long press - Navigate to detail
    navigation.navigate('CharDetail', {
      kana,
      romaji,
      audio,
      type: 'katakana'
    });
  };

  const renderChartRow = (row: string) => {
    const rowChars = katakanaData.filter(char => char.row === row);
    return (
      <View key={row} style={[
        styles.chartRow,
        selectedRow === row && [styles.selectedRow, { backgroundColor: theme.isDark ? 'rgba(245, 54, 92, 0.1)' : 'rgba(245, 54, 92, 0.1)' }]
      ]}>
        {katakanaColumns.map(column => {
          const char = rowChars.find(c => c.column === column);
          if (!char) {
            return <View key={`${row}-${column}`} style={styles.emptyCell} />;
          }
          return (
            <TouchableOpacity
              key={`${row}-${column}`}
              style={[
                styles.kanaCell, 
                { 
                  backgroundColor: theme.background,
                  borderColor: theme.border
                }
              ]}
              onPress={() => handleKanaPress(char.kana, char.romaji, char.audio)}
              onLongPress={() => handleKanaLongPress(char.kana, char.romaji, char.audio)}
              delayLongPress={500}
            >
              <Text style={[styles.kanaText, { color: theme.text }]}>{char.kana}</Text>
              <Text style={[styles.romajiText, { color: theme.subText }]}>{char.romaji}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderSpecialRow = (row: string) => {
    // For ヤ行 and ワ行 which have special layout
    const rowChars = katakanaData.filter(char => char.row === row);
    
    return (
      <View key={row} style={[
        styles.chartRow,
        selectedRow === row && [styles.selectedRow, { backgroundColor: theme.isDark ? 'rgba(245, 54, 92, 0.1)' : 'rgba(245, 54, 92, 0.1)' }]
      ]}>
        {katakanaColumns.map(column => {
          const char = rowChars.find(c => c.column === column);
          if (!char) {
            return <View key={`${row}-${column}`} style={styles.emptyCell} />;
          }
          return (
            <TouchableOpacity
              key={`${row}-${char.column}`}
              style={[
                styles.kanaCell, 
                { 
                  backgroundColor: theme.background,
                  borderColor: theme.border
                }
              ]}
              onPress={() => handleKanaPress(char.kana, char.romaji, char.audio)}
              onLongPress={() => handleKanaLongPress(char.kana, char.romaji, char.audio)}
              delayLongPress={500}
            >
              <Text style={[styles.kanaText, { color: theme.text }]}>{char.kana}</Text>
              <Text style={[styles.romajiText, { color: theme.subText }]}>{char.romaji}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderNRow = () => {
    const nChar = katakanaData.find(char => char.kana === 'ン');
    if (!nChar) return null;
    
    return (
      <View key="ン" style={[
        styles.chartRow,
        selectedRow === 'ン' && [styles.selectedRow, { backgroundColor: theme.isDark ? 'rgba(245, 54, 92, 0.1)' : 'rgba(245, 54, 92, 0.1)' }]
      ]}>
        <TouchableOpacity
          style={[
            styles.kanaCell, 
            { 
              backgroundColor: theme.background,
              borderColor: theme.border
            }
          ]}
          onPress={() => handleKanaPress(nChar.kana, nChar.romaji, nChar.audio)}
          onLongPress={() => handleKanaLongPress(nChar.kana, nChar.romaji, nChar.audio)}
          delayLongPress={500}
        >
          <Text style={[styles.kanaText, { color: theme.text }]}>{nChar.kana}</Text>
          <Text style={[styles.romajiText, { color: theme.subText }]}>{nChar.romaji}</Text>
        </TouchableOpacity>
        
        {katakanaColumns.slice(1).map(column => (
          <View key={`ン-${column}`} style={styles.emptyCell} />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>片假名表</Text>
          <Text style={[styles.headerSubtitle, { color: theme.subText }]}>点击发音，长按查看详情</Text>
        </View>
        
        <View style={[styles.chartContainer, { backgroundColor: theme.card }]}>
          {katakanaRows.map(row => {
            if (row === 'ヤ' || row === 'ワ') {
              return renderSpecialRow(row);
            } else if (row === 'ン') {
              return renderNRow();
            } else {
              return renderChartRow(row);
            }
          })}
        </View>
        
        <View style={[styles.infoContainer, { backgroundColor: theme.card }]}>
          <Text style={[styles.infoText, { color: theme.text }]}>
            片假名是日语假名的一种，与平假名和汉字一起构成日语的书写系统。片假名主要用于标记外来语、拟声词、专业术语以及强调某些单词。
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  chartContainer: {
    margin: 10,
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  chartHeaderRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  emptyCell: {
    flex: 1,
    height: 60,
    margin: 2,
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    margin: 2,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chartRow: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  selectedRow: {
    borderRadius: 8,
  },
  rowHeaderCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    margin: 2,
    borderRadius: 8,
  },
  rowHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  kanaCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    margin: 2,
    borderWidth: 1,
    borderRadius: 8,
  },
  kanaText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  romajiText: {
    fontSize: 12,
  },
  infoContainer: {
    margin: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default KatakanaChartScreen; 