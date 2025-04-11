import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { 
  hiraganaDakutenData, 
  katakanaDakutenData, 
  groupedHiraganaDakutenData, 
  groupedKatakanaDakutenData,
  dakutenTypes,
  DakutenItem
} from '../data/dakutenData';
import AudioService from '../services/AudioService';

type Props = NativeStackScreenProps<RootStackParamList, 'DakutenChart'>;

const DakutenChartScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const [currentTab, setCurrentTab] = useState<'hiragana' | 'katakana'>('hiragana');
  
  // 音频服务单例
  const audioService = AudioService.getInstance();
  
  // 播放音频
  const playSound = async (romaji: string) => {
    await audioService.playSound(romaji);
  };
  
  // 跳转到字符详情
  const navigateToCharDetail = (item: DakutenItem) => {
    navigation.navigate('CharDetail', {
      kana: item.kana,
      romaji: item.romaji,
      audio: item.romaji,
      type: currentTab === 'hiragana' ? 'hiragana' : 'katakana'
    });
  };
  
  // 渲染表格标题
  const renderSectionTitle = (title: string, description: string) => (
    <View style={[styles.sectionTitle, { borderBottomColor: theme.border }]}>
      <Text style={[styles.sectionTitleText, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.sectionDescription, { color: theme.subText }]}>{description}</Text>
    </View>
  );
  
  // 渲染一行浊音/半浊音
  const renderDakutenRow = (
    rowItems: DakutenItem[], 
    rowTitle: string, 
    dakutenType: 'dakuten' | 'handakuten'
  ) => {
    const isHandakuten = dakutenType === 'handakuten';
    const rowColor = isHandakuten ? theme.dakutenColor : theme.dakutenColor;
    const rowColorDark = isHandakuten ? 'rgba(185, 119, 14, 0.3)' : 'rgba(119, 29, 138, 0.2)';
    
    return (
      <View style={styles.rowContainer}>
        <View style={[styles.rowHeader, { backgroundColor: theme.isDark ? rowColorDark : rowColor }]}>
          <Text style={[styles.rowHeaderText, { color: theme.text }]}>{rowTitle}</Text>
        </View>
        <View style={styles.row}>
          {rowItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.cell, 
                { 
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                }
              ]}
              onPress={() => navigateToCharDetail(item)}
              onLongPress={() => playSound(item.romaji)}
            >
              <Text style={[styles.kanaText, { color: theme.text }]}>{item.kana}</Text>
              <Text style={[styles.romajiText, { color: theme.subText }]}>{item.romaji}</Text>
              {item.original && (
                <Text style={[styles.originalText, { color: theme.subText }]}>
                  {`${item.original} → ${item.kana}`}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  
  // 渲染平假名浊音表
  const renderHiraganaChart = () => {
    return (
      <View style={styles.chart}>
        {renderSectionTitle("浊音", dakutenTypes.dakuten.description)}
        {renderDakutenRow(groupedHiraganaDakutenData["が行"], "が行", "dakuten")}
        {renderDakutenRow(groupedHiraganaDakutenData["ざ行"], "ざ行", "dakuten")}
        {renderDakutenRow(groupedHiraganaDakutenData["だ行"], "だ行", "dakuten")}
        {renderDakutenRow(groupedHiraganaDakutenData["ば行"], "ば行", "dakuten")}
        
        {renderSectionTitle("半浊音", dakutenTypes.handakuten.description)}
        {renderDakutenRow(groupedHiraganaDakutenData["ぱ行"], "ぱ行", "handakuten")}
      </View>
    );
  };
  
  // 渲染片假名浊音表
  const renderKatakanaChart = () => {
    return (
      <View style={styles.chart}>
        {renderSectionTitle("浊音", dakutenTypes.dakuten.description)}
        {renderDakutenRow(groupedKatakanaDakutenData["ガ行"], "ガ行", "dakuten")}
        {renderDakutenRow(groupedKatakanaDakutenData["ザ行"], "ザ行", "dakuten")}
        {renderDakutenRow(groupedKatakanaDakutenData["ダ行"], "ダ行", "dakuten")}
        {renderDakutenRow(groupedKatakanaDakutenData["バ行"], "バ行", "dakuten")}
        
        {renderSectionTitle("半浊音", dakutenTypes.handakuten.description)}
        {renderDakutenRow(groupedKatakanaDakutenData["パ行"], "パ行", "handakuten")}
      </View>
    );
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton, 
            currentTab === 'hiragana' && { 
              backgroundColor: theme.dakutenColor,
              borderColor: theme.dakutenColor
            }
          ]}
          onPress={() => setCurrentTab('hiragana')}
        >
          <Text 
            style={[
              styles.tabButtonText, 
              { color: currentTab === 'hiragana' ? '#FFF' : theme.dakutenColor }
            ]}
          >
            平假名浊音
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton, 
            currentTab === 'katakana' && { 
              backgroundColor: theme.dakutenColor,
              borderColor: theme.dakutenColor
            }
          ]}
          onPress={() => setCurrentTab('katakana')}
        >
          <Text 
            style={[
              styles.tabButtonText, 
              { color: currentTab === 'katakana' ? '#FFF' : theme.dakutenColor }
            ]}
          >
            片假名浊音
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {currentTab === 'hiragana' ? renderHiraganaChart() : renderKatakanaChart()}
        
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.subText }]}>
            浊音和半浊音是在日语五十音基础上，通过添加符号来表示不同发音的假名。
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 30,
    borderWidth: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chart: {
    padding: 10,
  },
  sectionTitle: {
    marginTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  sectionTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  rowContainer: {
    marginBottom: 20,
  },
  rowHeader: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  rowHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  cell: {
    width: '18%',
    aspectRatio: 1,
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    padding: 5,
  },
  kanaText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  romajiText: {
    fontSize: 12,
    marginTop: 4,
  },
  originalText: {
    fontSize: 10,
    marginTop: 2,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
  }
});

export default DakutenChartScreen; 