import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Animated,
  Dimensions
} from 'react-native';
import { Audio } from 'expo-av';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type CharDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CharDetail'>;
  route: RouteProp<RootStackParamList, 'CharDetail'>;
};

const { width, height } = Dimensions.get('window');

const CharDetailScreen = ({ navigation, route }: CharDetailScreenProps) => {
  const { kana, romaji, audio, type } = route.params;
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  
  // Example pronunciation words based on the kana character
  const getExampleWords = () => {
    const examples: {[key: string]: {word: string, meaning: string}} = {
      'あ': { word: 'あめ (ame)', meaning: '雨 - 雨' },
      'い': { word: 'いえ (ie)', meaning: '家 - 房子' },
      'う': { word: 'うみ (umi)', meaning: '海 - 海洋' },
      'か': { word: 'かばん (kaban)', meaning: '鞄 - 包' },
      'き': { word: 'きって (kitte)', meaning: '切手 - 邮票' },
      'さ': { word: 'さくら (sakura)', meaning: '桜 - 樱花' },
      'ア': { word: 'アイス (aisu)', meaning: '冰淇淋' },
      'イ': { word: 'イス (isu)', meaning: '椅子' },
      'ウ': { word: 'ウミ (umi)', meaning: '海 - 海洋' },
    };
    
    return examples[kana] || { word: '无示例', meaning: '无含义' };
  };
  
  // Placeholder for audio playback function
  const playSound = async () => {
    // In a real app, you would load the audio file here
    // For now, we'll just simulate the playback with animation
    setIsPlaying(true);
    
    // Create animation for the kana character
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(() => {
      setIsPlaying(false);
    });
    
    // Simulating audio loading and playing
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/placeholder.mp3') // You would need to add this file
    );
    setSound(sound);
    await sound.playAsync();
  };
  
  // Clean up the sound when the component unmounts
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  
  const exampleWord = getExampleWords();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={[
          styles.kanaContainer, 
          type === 'hiragana' ? styles.hiraganaContainer : styles.katakanaContainer
        ]}>
          <Animated.Text 
            style={[
              styles.kanaText,
              { transform: [{ scale: scaleAnim }] }
            ]}
          >
            {kana}
          </Animated.Text>
          <Text style={styles.romajiText}>{romaji}</Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.playButton,
            isPlaying ? styles.playingButton : null,
            type === 'hiragana' ? styles.hiraganaPlayButton : styles.katakanaPlayButton
          ]}
          onPress={playSound}
          disabled={isPlaying}
        >
          <Text style={styles.playButtonText}>
            {isPlaying ? '播放中...' : '点击播放发音'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>示例单词</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleWord}>{exampleWord.word}</Text>
            <Text style={styles.exampleMeaning}>{exampleWord.meaning}</Text>
          </View>
          
          <Text style={styles.infoTitle}>书写顺序</Text>
          <View style={styles.strokeOrderContainer}>
            <Text style={styles.strokeOrderText}>
              请按照箭头指示练习书写
            </Text>
            {/* Here would be a stroke order animation or image */}
            <View style={styles.strokeOrderPlaceholder}>
              <Text style={styles.placeholderText}>笔顺动画</Text>
            </View>
          </View>
          
          <Text style={styles.infoTitle}>发音提示</Text>
          <Text style={styles.pronunciationTip}>
            {type === 'hiragana' 
              ? '平假名的发音注重口型和舌头位置'
              : '片假名的发音与对应的平假名相同'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  kanaContainer: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  hiraganaContainer: {
    backgroundColor: '#E3F2FD',
    borderWidth: 3,
    borderColor: '#4A86E8',
  },
  katakanaContainer: {
    backgroundColor: '#FFF3E0',
    borderWidth: 3,
    borderColor: '#E67C73',
  },
  kanaText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#333',
  },
  romajiText: {
    fontSize: 24,
    color: '#666',
    marginTop: 10,
  },
  playButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hiraganaPlayButton: {
    backgroundColor: '#4A86E8',
  },
  katakanaPlayButton: {
    backgroundColor: '#E67C73',
  },
  playingButton: {
    opacity: 0.8,
  },
  playButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 15,
  },
  exampleContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 5,
  },
  exampleWord: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  exampleMeaning: {
    fontSize: 16,
    color: '#666',
  },
  strokeOrderContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  strokeOrderText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  strokeOrderPlaceholder: {
    width: width * 0.7,
    height: 100,
    backgroundColor: '#eee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  pronunciationTip: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
  },
});

export default CharDetailScreen; 