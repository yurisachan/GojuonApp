import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  Alert
} from 'react-native';
import { Audio } from 'expo-av';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../context/ThemeContext';
import AudioService from '../services/AudioService';
import StrokeOrderImage from '../components/StrokeOrderImage';
import { getHiraganaExamples } from '../data/hiraganaExamples';
import { getKatakanaExamples } from '../data/katakanaExamples';
import { ExampleWord } from '../data/hiraganaExamples';

type Props = NativeStackScreenProps<RootStackParamList, 'CharDetail'>;

const { width } = Dimensions.get('window');

const CharDetailScreen = ({ route, navigation }: Props) => {
  const { kana, romaji, audio, type } = route.params;
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
  }, [kana]);

  // Play sound function
  const playSound = async () => {
    if (isPlaying) return;
    
    try {
      // 显示正在尝试播放的音频信息
      console.log(`尝试播放音频: (${type}/${audio})`);
      
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

  // Memory cleanup
  useEffect(() => {
    return () => {
      audioService.unloadSound();
    };
  }, []);

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
              <Text style={[styles.kanaText, { color: theme.text }]}>{kana}</Text>
              <Text style={[styles.romajiText, { color: theme.subText }]}>{romaji}</Text>
              {isPlaying && (
                <View style={styles.playingIndicator}>
                  <Ionicons name="volume-high" size={24} color={type === 'hiragana' ? theme.hiraganaColor : theme.katakanaColor} />
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
          <View style={[styles.strokeOrderContainer, { backgroundColor: theme.card }]}>
            <StrokeOrderImage kana={kana} size={width * 0.7} />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>示例单词</Text>
          <View style={[styles.examplesContainer, { backgroundColor: theme.card }]}>
            {renderExamples()}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>相关信息</Text>
          <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.infoText, { color: theme.text }]}>
              「{kana}」是{type === 'hiragana' ? '平假名' : '片假名'}的一个字符，发音为 "{romaji}"。
            {type === 'hiragana' 
                ? '平假名主要用于表示日语的语法成分和本土日语词汇。' 
                : '片假名主要用于外来语和表示强调的词语。'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
  // 获取并显示示例单词
  function renderExamples() {
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
  }
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
    width: width * 0.5,
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
  },
  kanaText: {
    fontSize: 80,
    fontWeight: 'bold',
  },
  romajiText: {
    fontSize: 24,
    marginTop: 10,
  },
  tapHint: {
    fontSize: 16,
    marginTop: 10,
    opacity: 0.7,
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
  strokeOrderContainer: {
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
  },
  exampleRomaji: {
    fontSize: 14,
    marginVertical: 4,
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

export default CharDetailScreen; 