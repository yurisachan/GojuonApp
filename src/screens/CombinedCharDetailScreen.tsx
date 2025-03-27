import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../context/ThemeContext';
import AudioService from '../services/AudioService';
import StrokeOrderImage from '../components/StrokeOrderImage';
import { getHiraganaExamples } from '../data/hiraganaExamples';
import { getKatakanaExamples } from '../data/katakanaExamples';
import { ExampleWord } from '../data/hiraganaExamples';

type Props = NativeStackScreenProps<RootStackParamList, 'CombinedCharDetail'>;

const { width } = Dimensions.get('window');

const CombinedCharDetailScreen = ({ route, navigation }: Props) => {
  const { hiragana, katakana, romaji, audio } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { theme } = useTheme();
  const audioService = AudioService.getInstance();
  
  // 动画展示效果
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    
    // 清理音频
    return () => {
      audioService.unloadSound();
    };
  }, [hiragana, katakana]);

  // 播放音频
  const playSound = async () => {
    if (isPlaying) return;
    
    try {
      console.log(`尝试播放音频: ${audio}`);
      
      setIsPlaying(true);
      
      // 执行缩放动画
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        })
      ]).start();
      
      // 使用AudioService播放音频
      await audioService.playSound(audio);
      
      // 音频播放完成后重置状态
      setTimeout(() => {
        setIsPlaying(false);
      }, 2000); // 假设音频时长为2秒左右
    } catch (error) {
      console.error('播放音频时出错:', error);
      setIsPlaying(false);
    }
  };

  // 内存清理
  useEffect(() => {
    return () => {
      audioService.unloadSound();
    };
  }, []);

  // 渲染示例单词
  const renderExamples = (type: 'hiragana' | 'katakana') => {
    const kana = type === 'hiragana' ? hiragana : katakana;
    const examples: ExampleWord[] = type === 'hiragana' 
      ? getHiraganaExamples(kana) 
      : getKatakanaExamples(kana);
    
    if (examples.length === 0) {
      return (
        <View style={styles.exampleItem}>
          <Text style={[styles.exampleKana, { color: theme.text }]}>
            暂无示例
          </Text>
        </View>
      );
    }
    
    return examples.map((example, index) => (
      <View 
        key={index} 
        style={[
          styles.exampleItem, 
          index < examples.length - 1 && { borderBottomColor: theme.border, borderBottomWidth: 1 }
        ]}
      >
        <Text style={[styles.exampleKana, { color: theme.text }]}>
          {example.kana}
        </Text>
        <Text style={[styles.exampleRomaji, { color: theme.subText }]}>
          {example.romaji}
        </Text>
        <Text style={[styles.exampleMeaning, { color: theme.text }]}>
          {example.meaning}
        </Text>
      </View>
    ));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView}>
        <Animated.View style={{ ...styles.header, opacity: fadeAnim }}>
          <TouchableOpacity 
            activeOpacity={0.7} 
            onPress={playSound}
            disabled={isPlaying}
          >
            <Animated.View 
              style={[
                styles.kanaCard, 
                { 
                  backgroundColor: theme.card, 
                  borderColor: theme.border,
                  borderWidth: 2,
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              <View style={styles.kanaContainer}>
                <View style={styles.kanaWrapper}>
                  <Text style={[styles.kanaText, { color: theme.text }]}>
                    {hiragana}
                  </Text>
                  <Text style={[styles.kanaTypeText, { color: theme.subText }]}>
                    平假名
                  </Text>
                </View>
                
                <View style={styles.kanaWrapper}>
                  <Text style={[styles.kanaText, { color: theme.text }]}>
                    {katakana}
                  </Text>
                  <Text style={[styles.kanaTypeText, { color: theme.subText }]}>
                    片假名
                  </Text>
                </View>
              </View>
              
              <Text style={[styles.romajiText, { color: theme.subText }]}>
                {romaji}
              </Text>

              {isPlaying && (
                <View style={styles.playingIndicator}>
                  <Ionicons name="volume-high" size={24} color={theme.text} />
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
          <Text style={[styles.tapHint, { color: theme.subText }]}>
            点击卡片播放发音
          </Text>
        </Animated.View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>笔画顺序</Text>
          <View style={styles.strokeOrderRow}>
            <View style={[styles.strokeOrderContainer, { backgroundColor: theme.card }]}>
              <Text style={[styles.strokeOrderTitle, { color: theme.subText }]}>
                平假名
              </Text>
              <StrokeOrderImage kana={hiragana} size={width * 0.4} />
            </View>
            
            <View style={[styles.strokeOrderContainer, { backgroundColor: theme.card }]}>
              <Text style={[styles.strokeOrderTitle, { color: theme.subText }]}>
                片假名
              </Text>
              <StrokeOrderImage kana={katakana} size={width * 0.4} />
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>平假名示例单词</Text>
          <View style={[styles.examplesContainer, { backgroundColor: theme.card }]}>
            {renderExamples('hiragana')}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>片假名示例单词</Text>
          <View style={[styles.examplesContainer, { backgroundColor: theme.card }]}>
            {renderExamples('katakana')}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>相关信息</Text>
          <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.infoText, { color: theme.text }]}>
              「{hiragana}」是平假名，「{katakana}」是片假名，两者发音相同，为 "{romaji}"。
              平假名主要用于表示日语的语法成分和本土日语词汇，而片假名主要用于外来语和特殊强调的词语。
            </Text>
          </View>
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
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  kanaCard: {
    width: width * 0.8,
    height: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    position: 'relative',
    padding: 10,
  },
  kanaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  kanaWrapper: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 10,
  },
  kanaText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  kanaTypeText: {
    fontSize: 12,
    marginTop: 4,
  },
  romajiText: {
    fontSize: 24,
    marginTop: 10,
  },
  tapHint: {
    fontSize: 16,
    marginTop: 10,
    opacity: 0.7,
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  strokeOrderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  strokeOrderContainer: {
    width: width * 0.43,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  strokeOrderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  examplesContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  exampleItem: {
    padding: 15,
  },
  exampleKana: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exampleRomaji: {
    fontSize: 14,
    marginBottom: 5,
  },
  exampleMeaning: {
    fontSize: 16,
  },
  infoCard: {
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
  },
  playingIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default CombinedCharDetailScreen; 