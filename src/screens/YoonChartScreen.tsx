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
  hiraganaYoonData, 
  katakanaYoonData
} from '../data/yoonData';
import AudioService from '../services/AudioService';

type Props = NativeStackScreenProps<RootStackParamList, 'YoonChart'>;

interface YoonItem {
  kana: string;
  romaji: string;
  description?: string;
}

interface YoonGroup {
  title: string;
  type: 'seion' | 'dakuon' | 'handakuon';
  items: YoonItem[];
}

const YoonChartScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const [currentTab, setCurrentTab] = useState<'hiragana' | 'katakana'>('hiragana');
  
  // 音频服务单例
  const audioService = AudioService.getInstance();
  
  // 播放音频
  const playSound = async (romaji: string) => {
    await audioService.playSound(romaji);
  };
  
  // 跳转到字符详情
  const navigateToCharDetail = (kana: string, romaji: string) => {
    navigation.navigate('CharDetail', {
      kana,
      romaji,
      audio: romaji,
      type: currentTab === 'hiragana' ? 'hiragana' : 'katakana'
    });
  };
  
  // 渲染表格标题
  const renderSectionTitle = (title: string, description: string = '') => (
    <View style={[styles.sectionTitle, { borderBottomColor: theme.border }]}>
      <Text style={[styles.sectionTitleText, { color: theme.text }]}>{title}</Text>
      {description && (
        <Text style={[styles.sectionDescription, { color: theme.subText }]}>{description}</Text>
      )}
    </View>
  );
  
  // 渲染一个拗音组
  const renderYoonGroup = (group: YoonGroup, isVoiced: boolean = false, isHalfVoiced: boolean = false) => {
    const bgColor = isHalfVoiced 
      ? theme.dakutenColor 
      : isVoiced 
        ? theme.dakutenColor 
        : theme.yoonColor;
        
    const darkBgColor = isHalfVoiced 
      ? 'rgba(185, 119, 14, 0.3)' 
      : isVoiced 
        ? 'rgba(119, 29, 138, 0.2)'
        : 'rgba(15, 119, 115, 0.2)';
    
    return (
      <View style={styles.groupContainer}>
        <View style={[styles.groupHeader, { backgroundColor: theme.isDark ? darkBgColor : bgColor }]}>
          <Text style={[styles.groupHeaderText, { color: theme.text }]}>{group.title}</Text>
        </View>
        <View style={styles.yoonGrid}>
          {group.items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.yoonCell, 
                { 
                  backgroundColor: theme.card,
                  borderColor: theme.border 
                }
              ]}
              onPress={() => navigateToCharDetail(item.kana, item.romaji)}
              onLongPress={() => playSound(item.romaji)}
            >
              <Text style={[styles.kanaText, { color: theme.text }]}>{item.kana}</Text>
              <Text style={[styles.romajiText, { color: theme.subText }]}>{item.romaji}</Text>
              {item.description && (
                <Text style={[styles.descriptionText, { color: theme.subText }]}>
                  {item.description}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  
  // 渲染平假名拗音表
  const renderHiraganaChart = () => {
    return (
      <View style={styles.chart}>
        {renderSectionTitle("清音拗音", "由「い」段假名与小写「や」「ゆ」「よ」组合而成")}
        {hiraganaYoonData.filter(group => group.type === 'seion').map((group, index) => (
          <React.Fragment key={index}>
            {renderYoonGroup(group)}
          </React.Fragment>
        ))}
        
        {renderSectionTitle("浊音拗音", "由浊音假名与小写「や」「ゆ」「よ」组合而成")}
        {hiraganaYoonData.filter(group => group.type === 'dakuon').map((group, index) => (
          <React.Fragment key={index}>
            {renderYoonGroup(group, true)}
          </React.Fragment>
        ))}
        
        {renderSectionTitle("半浊音拗音", "由半浊音假名与小写「や」「ゆ」「よ」组合而成")}
        {hiraganaYoonData.filter(group => group.type === 'handakuon').map((group, index) => (
          <React.Fragment key={index}>
            {renderYoonGroup(group, false, true)}
          </React.Fragment>
        ))}
      </View>
    );
  };
  
  // 渲染片假名拗音表
  const renderKatakanaChart = () => {
    return (
      <View style={styles.chart}>
        {renderSectionTitle("清音拗音", "由「イ」段假名与小写「ャ」「ュ」「ョ」组合而成")}
        {katakanaYoonData.filter(group => group.type === 'seion').map((group, index) => (
          <React.Fragment key={index}>
            {renderYoonGroup(group)}
          </React.Fragment>
        ))}
        
        {renderSectionTitle("浊音拗音", "由浊音假名与小写「ャ」「ュ」「ョ」组合而成")}
        {katakanaYoonData.filter(group => group.type === 'dakuon').map((group, index) => (
          <React.Fragment key={index}>
            {renderYoonGroup(group, true)}
          </React.Fragment>
        ))}
        
        {renderSectionTitle("半浊音拗音", "由半浊音假名与小写「ャ」「ュ」「ョ」组合而成")}
        {katakanaYoonData.filter(group => group.type === 'handakuon').map((group, index) => (
          <React.Fragment key={index}>
            {renderYoonGroup(group, false, true)}
          </React.Fragment>
        ))}
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
              backgroundColor: theme.yoonColor,
              borderColor: theme.yoonColor
            }
          ]}
          onPress={() => setCurrentTab('hiragana')}
        >
          <Text 
            style={[
              styles.tabButtonText, 
              { color: currentTab === 'hiragana' ? '#FFF' : theme.yoonColor }
            ]}
          >
            平假名拗音
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton, 
            currentTab === 'katakana' && { 
              backgroundColor: theme.yoonColor,
              borderColor: theme.yoonColor
            }
          ]}
          onPress={() => setCurrentTab('katakana')}
        >
          <Text 
            style={[
              styles.tabButtonText, 
              { color: currentTab === 'katakana' ? '#FFF' : theme.yoonColor }
            ]}
          >
            片假名拗音
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {currentTab === 'hiragana' ? renderHiraganaChart() : renderKatakanaChart()}
        
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.subText }]}>
            拗音是一个假名和缩小的「や」「ゆ」「よ」组合而成的特殊发音，在日语中非常常见。
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
  groupContainer: {
    marginBottom: 20,
  },
  groupHeader: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  groupHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  yoonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  yoonCell: {
    width: '30%',
    aspectRatio: 1.5,
    margin: '1.66%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    padding: 8,
  },
  kanaText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  romajiText: {
    fontSize: 12,
    marginTop: 4,
  },
  descriptionText: {
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
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

export default YoonChartScreen; 