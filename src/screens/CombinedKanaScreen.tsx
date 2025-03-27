import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../context/ThemeContext';
import { hiraganaData } from '../data/hiragana';
import { katakanaData } from '../data/katakana';
import AudioService from '../services/AudioService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { width } = Dimensions.get('window');

const CombinedKanaScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const [selectedRow, setSelectedRow] = useState<string>('');
  const audioService = AudioService.getInstance();
  
  // 构建配对数据
  const hiraganaRows = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ', 'ん'];
  const katakanaRows = ['ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ', 'ン'];
  const columns = ['あ', 'い', 'う', 'え', 'お'];
  const katakanaColumns = ['ア', 'イ', 'ウ', 'エ', 'オ'];
  
  // 配对的假名对象
  interface PairedKana {
    hiragana: string;
    katakana: string;
    romaji: string;
    audio: string;
  }
  
  // 构建配对数组
  const getPairedKana = (rowIndex: number, colIndex: number): PairedKana | null => {
    if (rowIndex >= hiraganaRows.length) return null;
    if (rowIndex === 7 || rowIndex === 9) { // や行和わ行特殊处理
      if (colIndex === 1 || colIndex === 3) return null;
    }
    
    if (rowIndex === 10) { // ん/ン 特殊处理
      if (colIndex > 0) return null;
      
      const hiraganaChar = hiraganaData.find(char => char.kana === 'ん');
      const katakanaChar = katakanaData.find(char => char.kana === 'ン');
      
      if (hiraganaChar && katakanaChar) {
        return {
          hiragana: hiraganaChar.kana,
          katakana: katakanaChar.kana,
          romaji: hiraganaChar.romaji,
          audio: hiraganaChar.audio
        };
      }
      return null;
    }
    
    const hiraganaRow = hiraganaRows[rowIndex];
    const katakanaRow = katakanaRows[rowIndex];
    const column = columns[colIndex];
    const katakanaColumn = katakanaColumns[colIndex];
    
    const hiraganaChar = hiraganaData.find(char => 
      char.row === hiraganaRow && char.column === column
    );
    
    const katakanaChar = katakanaData.find(char => 
      char.row === katakanaRow && char.column === katakanaColumn
    );
    
    if (hiraganaChar && katakanaChar) {
      return {
        hiragana: hiraganaChar.kana,
        katakana: katakanaChar.kana,
        romaji: hiraganaChar.romaji,
        audio: hiraganaChar.audio
      };
    }
    
    return null;
  };
  
  // 播放音频
  const playSound = async (audio: string) => {
    try {
      await audioService.playSound(audio);
    } catch (error) {
      console.error('播放音频失败:', error);
    }
  };
  
  // 点击假名处理
  const handleKanaPress = (kana: PairedKana) => {
    playSound(kana.audio);
  };
  
  // 长按假名处理 - 导航到详情页
  const handleHiraganaLongPress = (kana: PairedKana) => {
    navigation.navigate('CharDetail', {
      kana: kana.hiragana,
      romaji: kana.romaji,
      audio: kana.audio,
      type: 'hiragana'
    });
  };
  
  const handleKatakanaLongPress = (kana: PairedKana) => {
    navigation.navigate('CharDetail', {
      kana: kana.katakana,
      romaji: kana.romaji,
      audio: kana.audio,
      type: 'katakana'
    });
  };
  
  // 添加整合详情页导航
  const handleKanaLongPress = (kana: PairedKana) => {
    navigation.navigate('CombinedCharDetail', {
      hiragana: kana.hiragana,
      katakana: kana.katakana,
      romaji: kana.romaji,
      audio: kana.audio
    });
  };
  
  // 渲染配对单元格
  const renderKanaCell = (rowIndex: number, colIndex: number) => {
    const kana = getPairedKana(rowIndex, colIndex);
    
    if (!kana) {
      return <View key={`${rowIndex}-${colIndex}`} style={styles.emptyCell} />;
    }
    
    return (
      <TouchableOpacity
        key={`${rowIndex}-${colIndex}`}
        style={[
          styles.kanaCell, 
          { 
            backgroundColor: theme.background,
            borderColor: theme.border
          }
        ]}
        onPress={() => handleKanaPress(kana)}
        onLongPress={() => handleKanaLongPress(kana)}
        delayLongPress={500}
      >
        <View style={styles.kanaContainer}>
          <View style={styles.kanaWrapper}>
            <Text style={[styles.hiraganaText, { color: theme.text }]}>{kana.hiragana}</Text>
            <Text style={[styles.katakanaText, { color: theme.subText }]}>{kana.katakana}</Text>
          </View>
          <Text style={[styles.romajiText, { color: theme.subText }]}>{kana.romaji}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // 渲染行，跳过第一列
  const renderChartRow = (rowIndex: number) => {
    // 特殊行处理
    const columnsToRender = [];
    
    if (rowIndex === 7) { // や行
      columnsToRender.push(0, 2, 4); // あ, う, お列
    } else if (rowIndex === 9) { // わ行
      columnsToRender.push(0, 4); // あ, お列
    } else if (rowIndex === 10) { // ん行
      columnsToRender.push(0); // 只有ん
      
      // n行在最左边
      return (
        <View key={rowIndex} style={styles.chartRow}>
          {renderKanaCell(rowIndex, 0)}
          <View style={styles.emptyCell} />
          <View style={styles.emptyCell} />
          <View style={styles.emptyCell} />
          <View style={styles.emptyCell} />
        </View>
      );
    } else { // 普通行
      columnsToRender.push(0, 1, 2, 3, 4); // 所有列
    }
    
    // 添加空元素保持行对齐
    if (rowIndex === 7) { // や行
      return (
        <View key={rowIndex} style={styles.chartRow}>
          {renderKanaCell(rowIndex, 0)}
          <View style={styles.emptyCell} />
          {renderKanaCell(rowIndex, 2)}
          <View style={styles.emptyCell} />
          {renderKanaCell(rowIndex, 4)}
        </View>
      );
    } else if (rowIndex === 9) { // わ行
      return (
        <View key={rowIndex} style={styles.chartRow}>
          {renderKanaCell(rowIndex, 0)}
          <View style={styles.emptyCell} />
          <View style={styles.emptyCell} />
          <View style={styles.emptyCell} />
          {renderKanaCell(rowIndex, 4)}
        </View>
      );
    }
    
    return (
      <View key={rowIndex} style={styles.chartRow}>
        {columnsToRender.map(colIndex => renderKanaCell(rowIndex, colIndex))}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>平假名 / 片假名对照表</Text>
          <Text style={[styles.headerSubtitle, { color: theme.subText }]}>点击发音，长按查看详情</Text>
        </View>
        
        <View style={[styles.chartContainer, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          {/* 渲染假名行，跳过第一行 */}
          {hiraganaRows.map((_, rowIndex) => renderChartRow(rowIndex))}
        </View>
        
        <View style={[styles.infoContainer, { backgroundColor: theme.card }]}>
          <Text style={[styles.infoText, { color: theme.text }]}>
            平假名和片假名是日语的两种假名系统。平假名用于日语本土词汇和语法成分，而片假名主要用于外来语和特殊词汇。
          </Text>
          <Text style={[styles.infoText, { color: theme.subText, marginTop: 10 }]}>
            长按卡片可以查看平假名和片假名的详细对照信息。
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 5,
  },
  chartContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
    width: '100%',
  },
  lastRow: {
    alignItems: 'center',
    width: width,
  },
  nRow: {
    width: '100%',
    alignItems: 'center',
  },
  emptyCell: {
    width: width / 6,
    aspectRatio: 1,
    margin: 3,
  },
  kanaCell: {
    width: width / 6,
    aspectRatio: 1,
    margin: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  kanaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  kanaWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 4,
  },
  hiraganaText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 6,
  },
  katakanaText: {
    fontSize: 16,
    color: '#666',
  },
  romajiText: {
    fontSize: 14,
    marginTop: 0,
  },
  infoContainer: {
    marginHorizontal: 10,
    marginVertical: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  }
});

export default CombinedKanaScreen; 