import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { hiraganaData } from '../data/hiragana';
import { katakanaData } from '../data/katakana';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Question = {
  kana: string;
  romaji: string;
  options: string[];
  type: 'hiragana' | 'katakana';
};

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

const QuizScreen = ({ route }: Props) => {
  const { mode } = route.params;
  const [quizMode, setQuizMode] = useState<'hiragana' | 'katakana' | 'both' | null>(mode || null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  // 初始化时根据传入的模式生成问题
  useEffect(() => {
    if (quizMode) {
      generateQuestions(quizMode);
    }
  }, []);

  // 生成随机问题
  const generateQuestions = (mode: 'hiragana' | 'katakana' | 'both') => {
    setIsLoading(true);
    
    let allData: any[] = [];
    if (mode === 'hiragana' || mode === 'both') {
      allData = [...allData, ...hiraganaData.map(item => ({...item, type: 'hiragana'}))];
    }
    if (mode === 'katakana' || mode === 'both') {
      allData = [...allData, ...katakanaData.map(item => ({...item, type: 'katakana'}))];
    }
    
    // 随机选择10个问题
    const shuffled = [...allData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    
    // 为每个问题生成选项
    const quizQuestions = selected.map(item => {
      // 从所有数据中随机选择3个错误选项
      const otherOptions = allData
        .filter(other => other.romaji !== item.romaji)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(option => option.romaji);
      
      // 加入正确选项并打乱顺序
      const options = [...otherOptions, item.romaji].sort(() => 0.5 - Math.random());
      
      return {
        kana: item.kana,
        romaji: item.romaji,
        options,
        type: item.type
      };
    });
    
    setQuestions(quizQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsLoading(false);
  };

  const handleSelectOption = (option: string) => {
    if (selectedOption) return; // 防止重复选择
    
    setSelectedOption(option);
    
    // 检查答案是否正确
    const currentQuestion = questions[currentQuestionIndex];
    if (option === currentQuestion.romaji) {
      setScore(score + 1);
    }
    
    // 延迟切换到下一题或显示结果
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const renderQuizModeSelection = () => {
    return (
      <View style={styles.modeContainer}>
        <Text style={[styles.modeTitle, { color: theme.text }]}>选择测试模式</Text>
        
        <TouchableOpacity 
          style={[styles.modeButton, { backgroundColor: theme.hiraganaColor }]}
          onPress={() => {
            setQuizMode('hiragana');
            generateQuestions('hiragana');
          }}
        >
          <Ionicons name="book-outline" size={24} color="#FFFFFF" style={styles.modeIcon} />
          <Text style={styles.modeButtonText}>平假名测试</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.modeButton, { backgroundColor: theme.katakanaColor }]}
          onPress={() => {
            setQuizMode('katakana');
            generateQuestions('katakana');
          }}
        >
          <Ionicons name="book-outline" size={24} color="#FFFFFF" style={styles.modeIcon} />
          <Text style={styles.modeButtonText}>片假名测试</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.modeButton, { backgroundColor: theme.primary }]}
          onPress={() => {
            setQuizMode('both');
            generateQuestions('both');
          }}
        >
          <Ionicons name="school-outline" size={24} color="#FFFFFF" style={styles.modeIcon} />
          <Text style={styles.modeButtonText}>混合测试</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderQuestion = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.text }]}>加载中...</Text>
        </View>
      );
    }
    
    if (questions.length === 0) return null;
    
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <View style={styles.questionContainer}>
        <View style={styles.progressContainer}>
          <Text style={[styles.progressText, { color: theme.text }]}>
            问题 {currentQuestionIndex + 1} / {questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  backgroundColor: currentQuestion.type === 'hiragana' ? theme.hiraganaColor : theme.katakanaColor
                }
              ]} 
            />
          </View>
        </View>
        
        <View style={[styles.kanaCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.kanaText, { color: theme.text }]}>
            {currentQuestion.kana}
          </Text>
          <Text style={[styles.kanaType, { color: theme.subText }]}>
            {currentQuestion.type === 'hiragana' ? '平假名' : '片假名'}
          </Text>
        </View>
        
        <Text style={[styles.questionText, { color: theme.text }]}>这个假名的读音是？</Text>
        
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                { 
                  backgroundColor: theme.card,
                  borderColor: 
                    selectedOption === option 
                      ? option === currentQuestion.romaji
                        ? '#4CAF50'  // 正确答案
                        : '#F44336'  // 错误答案 
                      : theme.border
                },
                selectedOption && option === currentQuestion.romaji && styles.correctOption
              ]}
              onPress={() => handleSelectOption(option)}
              disabled={selectedOption !== null}
            >
              <Text style={[
                styles.optionText, 
                { color: selectedOption === option ? '#FFFFFF' : theme.text }
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderResult = () => {
    const percentage = (score / questions.length) * 100;
    let resultMessage = '';
    let resultIcon = '';
    
    if (percentage >= 90) {
      resultMessage = '太棒了！你是假名大师！';
      resultIcon = 'trophy-outline';
    } else if (percentage >= 70) {
      resultMessage = '很好！你掌握得不错！';
      resultIcon = 'thumbs-up-outline';
    } else if (percentage >= 50) {
      resultMessage = '加油！继续练习吧！';
      resultIcon = 'fitness-outline';
    } else {
      resultMessage = '需要更多练习，不要放弃！';
      resultIcon = 'heart-outline';
    }
    
    return (
      <View style={styles.resultContainer}>
        <View style={[styles.resultCard, { backgroundColor: theme.card }]}>
          <Ionicons name={resultIcon as any} size={60} color={theme.primary} style={styles.resultIcon} />
          
          <Text style={[styles.resultTitle, { color: theme.text }]}>测试完成！</Text>
          
          <View style={styles.scoreContainer}>
            <Text style={[styles.scoreText, { color: theme.text }]}>
              得分：{score} / {questions.length}
            </Text>
            <View style={styles.scoreBar}>
              <View 
                style={[
                  styles.scoreFill, 
                  { 
                    width: `${percentage}%`,
                    backgroundColor: 
                      percentage >= 70 ? '#4CAF50' : 
                      percentage >= 50 ? '#FFC107' : '#F44336'
                  }
                ]} 
              />
            </View>
            <Text style={[styles.percentageText, { color: theme.subText }]}>
              {percentage.toFixed(0)}%
            </Text>
          </View>
          
          <Text style={[styles.resultMessage, { color: theme.text }]}>{resultMessage}</Text>
          
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: theme.primary }]}
            onPress={() => {
              if (quizMode) {
                generateQuestions(quizMode);
              } else {
                setQuizMode(null);
              }
            }}
          >
            <Ionicons name="refresh-outline" size={20} color="#FFFFFF" style={styles.retryIcon} />
            <Text style={styles.retryButtonText}>再来一次</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.homeButton, { borderColor: theme.border }]}
            onPress={() => setQuizMode(null)}
          >
            <Text style={[styles.homeButtonText, { color: theme.text }]}>返回选择</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView}>
        {quizMode === null ? renderQuizModeSelection() : 
         showResult ? renderResult() : renderQuestion()}
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
  modeContainer: {
    padding: 20,
    alignItems: 'center',
  },
  modeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  modeIcon: {
    marginRight: 10,
  },
  modeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  questionContainer: {
    padding: 20,
    alignItems: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'right',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  kanaCard: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  kanaText: {
    fontSize: 70,
    fontWeight: 'bold',
  },
  kanaType: {
    fontSize: 14,
    marginTop: 5,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    alignItems: 'center',
  },
  correctOption: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    padding: 20,
    alignItems: 'center',
  },
  resultCard: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  resultIcon: {
    marginBottom: 15,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  scoreFill: {
    height: '100%',
  },
  percentageText: {
    fontSize: 16,
  },
  resultMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  retryIcon: {
    marginRight: 10,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizScreen; 