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

type Props = NativeStackScreenProps<RootStackParamList, 'CharDetail'>;

const { width } = Dimensions.get('window');

const CharDetailScreen = ({ route, navigation }: Props) => {
  const { kana, romaji, audio, type } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [strokeOrder, setStrokeOrder] = useState<string[]>([]);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { theme } = useTheme();
  const audioService = AudioService.getInstance();

  // For demo, just mocking stroke order images
  useEffect(() => {
    // This would normally fetch from an API or local assets
    setStrokeOrder([
      '../../assets/images/stroke1.png',
      '../../assets/images/stroke2.png',
      '../../assets/images/stroke3.png',
    ]);
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    
    // 清理音频
    return () => {
      audioService.unloadSound();
    };
  }, []);

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
            {strokeOrder.map((stroke, index) => (
              <View key={index} style={styles.strokeImageContainer}>
                <Text style={[styles.strokeNumber, { color: theme.subText }]}>{index + 1}</Text>
                <View style={[styles.strokeImageBox, { backgroundColor: theme.background, borderColor: theme.border }]}>
                  {/* In a real app, you'd load actual images */}
                  <Text style={[styles.strokeImagePlaceholder, { color: theme.subText }]}>
                    笔画 {index + 1}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>示例单词</Text>
          <View style={[styles.examplesContainer, { backgroundColor: theme.card }]}>
            <View style={[styles.exampleItem, { borderBottomColor: theme.border }]}>
              <Text style={[styles.exampleKana, { color: theme.text }]}>
                {type === 'hiragana' ? 'あい' : 'アイ'}{kana}
              </Text>
              <Text style={[styles.exampleRomaji, { color: theme.subText }]}>
                {romaji}i{romaji}a
              </Text>
              <Text style={[styles.exampleMeaning, { color: theme.text }]}>爱</Text>
            </View>
            
            <View style={[styles.exampleItem, { borderBottomColor: theme.border }]}>
              <Text style={[styles.exampleKana, { color: theme.text }]}>
                {kana}{type === 'hiragana' ? 'き' : 'キ'}
              </Text>
              <Text style={[styles.exampleRomaji, { color: theme.subText }]}>
                {romaji}aki
              </Text>
              <Text style={[styles.exampleMeaning, { color: theme.text }]}>秋天</Text>
          </View>
          
            <View style={styles.exampleItem}>
              <Text style={[styles.exampleKana, { color: theme.text }]}>
                {type === 'hiragana' ? 'いち' : 'イチ'}{kana}
              </Text>
              <Text style={[styles.exampleRomaji, { color: theme.subText }]}>
                ichi{romaji}
            </Text>
              <Text style={[styles.exampleMeaning, { color: theme.text }]}>一个</Text>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  strokeImageContainer: {
    alignItems: 'center',
  },
  strokeNumber: {
    fontSize: 14,
    marginBottom: 5,
  },
  strokeImageBox: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  strokeImagePlaceholder: {
    fontSize: 12,
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
    borderBottomWidth: 1,
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