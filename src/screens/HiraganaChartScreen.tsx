import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  FlatList
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { hiraganaData, hiraganaRows, hiraganaColumns } from '../data/hiragana';

type HiraganaChartScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HiraganaChart'>;
};

const HiraganaChartScreen = ({ navigation }: HiraganaChartScreenProps) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const handleSelectRow = (row: string) => {
    setSelectedRow(row === selectedRow ? null : row);
  };

  const handleKanaPress = (kana: string, romaji: string, audio: string) => {
    navigation.navigate('CharDetail', {
      kana,
      romaji,
      audio,
      type: 'hiragana'
    });
  };

  const renderChartHeader = () => (
    <View style={styles.chartHeaderRow}>
      <View style={styles.emptyCell} />
      {hiraganaColumns.map((column) => (
        <View key={column} style={styles.headerCell}>
          <Text style={styles.headerText}>{column}</Text>
        </View>
      ))}
    </View>
  );

  const renderChartRow = (row: string) => {
    const rowChars = hiraganaData.filter(char => char.row === row);
    return (
      <View key={row} style={[
        styles.chartRow,
        selectedRow === row && styles.selectedRow
      ]}>
        <TouchableOpacity 
          style={styles.rowHeaderCell}
          onPress={() => handleSelectRow(row)}
        >
          <Text style={styles.rowHeaderText}>{row}</Text>
        </TouchableOpacity>
        
        {hiraganaColumns.map(column => {
          const char = rowChars.find(c => c.column === column);
          if (!char) {
            return <View key={`${row}-${column}`} style={styles.emptyCell} />;
          }
          return (
            <TouchableOpacity
              key={`${row}-${column}`}
              style={styles.kanaCell}
              onPress={() => handleKanaPress(char.kana, char.romaji, char.audio)}
            >
              <Text style={styles.kanaText}>{char.kana}</Text>
              <Text style={styles.romajiText}>{char.romaji}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderSpecialRow = (row: string) => {
    // For や行 and わ行 which have special layout
    const rowChars = hiraganaData.filter(char => char.row === row);
    
    return (
      <View key={row} style={[
        styles.chartRow,
        selectedRow === row && styles.selectedRow
      ]}>
        <TouchableOpacity 
          style={styles.rowHeaderCell}
          onPress={() => handleSelectRow(row)}
        >
          <Text style={styles.rowHeaderText}>{row}</Text>
        </TouchableOpacity>
        
        {hiraganaColumns.map(column => {
          const char = rowChars.find(c => c.column === column);
          if (!char) {
            return <View key={`${row}-${column}`} style={styles.emptyCell} />;
          }
          return (
            <TouchableOpacity
              key={`${row}-${char.column}`}
              style={styles.kanaCell}
              onPress={() => handleKanaPress(char.kana, char.romaji, char.audio)}
            >
              <Text style={styles.kanaText}>{char.kana}</Text>
              <Text style={styles.romajiText}>{char.romaji}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderNRow = () => {
    const nChar = hiraganaData.find(char => char.kana === 'ん');
    if (!nChar) return null;
    
    return (
      <View key="ん" style={[
        styles.chartRow,
        selectedRow === 'ん' && styles.selectedRow
      ]}>
        <TouchableOpacity 
          style={styles.rowHeaderCell}
          onPress={() => handleSelectRow('ん')}
        >
          <Text style={styles.rowHeaderText}>ん</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.kanaCell, styles.nCell]}
          onPress={() => handleKanaPress(nChar.kana, nChar.romaji, nChar.audio)}
        >
          <Text style={styles.kanaText}>{nChar.kana}</Text>
          <Text style={styles.romajiText}>{nChar.romaji}</Text>
        </TouchableOpacity>
        
        <View style={styles.emptyCell} />
        <View style={styles.emptyCell} />
        <View style={styles.emptyCell} />
        <View style={styles.emptyCell} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>平假名表</Text>
          <Text style={styles.headerSubtitle}>点击假名查看详情和听读音</Text>
        </View>
        
        <View style={styles.chartContainer}>
          {renderChartHeader()}
          
          {hiraganaRows.map(row => {
            if (row === 'や' || row === 'わ') {
              return renderSpecialRow(row);
            } else if (row === 'ん') {
              return renderNRow();
            } else {
              return renderChartRow(row);
            }
          })}
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            平假名是日语假名的一种，与片假名和汉字一起构成日语的书写系统。平假名主要用于表示日语单词的词尾变化、助词以及没有汉字表示的单词。
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  chartContainer: {
    margin: 10,
    backgroundColor: '#fff',
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
    marginBottom: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    height: 40,
    margin: 2,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  chartRow: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  selectedRow: {
    backgroundColor: 'rgba(74, 134, 232, 0.1)',
    borderRadius: 8,
  },
  rowHeaderCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    margin: 2,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  rowHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  kanaCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    margin: 2,
    backgroundColor: '#F4F8FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E9FA',
  },
  nCell: {
    flex: 2,
  },
  kanaText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  romajiText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  infoContainer: {
    padding: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
});

export default HiraganaChartScreen; 