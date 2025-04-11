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
import { hiraganaDakutenData, katakanaDakutenData } from '../data/dakutenData';
import { hiraganaYoonData, katakanaYoonData } from '../data/yoonData';
import { vocabularyData } from '../data/vocabularyData';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type QuizType = 'hiragana' | 'katakana' | 'both' | 'dakuten' | 'yoon' | 'vocabulary' | null;

type Question = {
  kana: string;
  romaji: string;
  options: string[];
  type: 'hiragana' | 'katakana' | 'dakuten' | 'yoon' | 'vocabulary';
  subType?: 'hiragana' | 'katakana'; // 添加可选的子类型
  meaning?: string; // 词汇题目包含含义
};

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

const QuizScreen = ({ route }: Props) => {
  const { mode } = route.params || { mode: null };
  const [quizMode, setQuizMode] = useState<QuizType>(mode || null);
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

  // 从拗音数据中提取问题
  const extractYoonQuestions = () => {
    const hiraItems = hiraganaYoonData.flatMap(group => 
      group.items.map(item => ({ 
        ...item, 
        type: 'yoon' as const,
        subType: 'hiragana' as const 
      }))
    );
    
    const kataItems = katakanaYoonData.flatMap(group => 
      group.items.map(item => ({ 
        ...item, 
        type: 'yoon' as const,
        subType: 'katakana' as const 
      }))
    );
    
    return [...hiraItems, ...kataItems];
  };

  // 生成随机问题
  const generateQuestions = (mode: QuizType, maxCount?: number) => {
    if (!mode) return;
    
    setIsLoading(true);
    
    let allData: any[] = [];
    
    // 根据模式选择数据源
    switch (mode) {
      case 'hiragana':
        allData = [...hiraganaData.map(item => ({...item, type: 'hiragana'}))];
        break;
      case 'katakana':
        allData = [...katakanaData.map(item => ({...item, type: 'katakana'}))];
        break;
      case 'both':
        allData = [
          ...hiraganaData.map(item => ({...item, type: 'hiragana'})),
          ...katakanaData.map(item => ({...item, type: 'katakana'}))
        ];
        break;
      case 'dakuten':
        allData = [
          ...hiraganaDakutenData.map(item => ({...item, type: 'dakuten', subType: 'hiragana'})),
          ...katakanaDakutenData.map(item => ({...item, type: 'dakuten', subType: 'katakana'}))
        ];
        break;
      case 'yoon':
        allData = extractYoonQuestions();
        break;
      case 'vocabulary':
        allData = vocabularyData.map(item => ({
          kana: item.hiragana || item.katakana || '',
          romaji: item.romaji,
          meaning: item.meaning,
          type: 'vocabulary'
        }));
        break;
    }
    
    // 获取完整的测试数据，随机排序
    const shuffled = [...allData].sort(() => 0.5 - Math.random());
    
    // 如果指定了最大数量，则限制题目数量
    const selected = maxCount ? shuffled.slice(0, maxCount) : shuffled;
    
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
        type: item.type,
        subType: item.subType,
        meaning: item.meaning
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
      <ScrollView contentContainerStyle={styles.modeContainer}>
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
          style={[styles.modeButton, { backgroundColor: theme.combinedColor }]}
          onPress={() => {
            setQuizMode('both');
            generateQuestions('both');
          }}
        >
          <Ionicons name="school-outline" size={24} color="#FFFFFF" style={styles.modeIcon} />
          <Text style={styles.modeButtonText}>五十音混合测试</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.modeButton, { backgroundColor: theme.dakutenColor }]}
          onPress={() => {
            setQuizMode('dakuten');
            generateQuestions('dakuten');
          }}
        >
          <Ionicons name="grid-outline" size={24} color="#FFFFFF" style={styles.modeIcon} />
          <Text style={styles.modeButtonText}>浊音/半浊音测试</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.modeButton, { backgroundColor: theme.yoonColor }]}
          onPress={() => {
            setQuizMode('yoon');
            generateQuestions('yoon');
          }}
        >
          <Ionicons name="expand-outline" size={24} color="#FFFFFF" style={styles.modeIcon} />
          <Text style={styles.modeButtonText}>拗音测试</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.modeButton, { backgroundColor: theme.quizColor }]}
          onPress={() => {
            setQuizMode('vocabulary');
            generateQuestions('vocabulary');
          }}
        >
          <Ionicons name="chatbubbles-outline" size={24} color="#FFFFFF" style={styles.modeIcon} />
          <Text style={styles.modeButtonText}>词汇测试</Text>
        </TouchableOpacity>
      </ScrollView>
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
    
    // 根据题目类型确定颜色
    const getQuestionColor = () => {
      switch (currentQuestion.type) {
        case 'hiragana': return theme.hiraganaColor;
        case 'katakana': return theme.katakanaColor;
        case 'dakuten': return theme.dakutenColor;
        case 'yoon': return theme.yoonColor;
        case 'vocabulary': return theme.quizColor;
        default: return theme.primary;
      }
    };

    // 显示题目类型
    const getQuestionType = () => {
      switch (currentQuestion.type) {
        case 'hiragana': return '平假名';
        case 'katakana': return '片假名';
        case 'dakuten': 
          return currentQuestion.subType === 'hiragana' ? '平假名浊音/半浊音' : '片假名浊音/半浊音';
        case 'yoon': 
          return currentQuestion.subType === 'hiragana' ? '平假名拗音' : '片假名拗音';
        case 'vocabulary': return '词汇';
        default: return '';
      }
    };
    
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
                  backgroundColor: getQuestionColor()
                }
              ]} 
            />
          </View>
        </View>
        
        <View style={[styles.kanaCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.kanaText, { color: theme.text }]}>
            {currentQuestion.kana}
          </Text>
          {currentQuestion.meaning && (
            <Text style={[styles.meaningText, { color: theme.subText }]}>
              {currentQuestion.meaning}
            </Text>
          )}
          <Text style={[styles.kanaType, { color: theme.subText }]}>
            {getQuestionType()}
          </Text>
        </View>
        
        <Text style={[styles.questionText, { color: theme.text }]}>
          {currentQuestion.type === 'vocabulary' ? '这个词汇的读音是？' : '这个假名的读音是？'}
        </Text>
        
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
          <Ionicons name={resultIcon as any} size={64} color={theme.primary} style={styles.resultIcon} />
          <Text style={[styles.scoreText, { color: theme.text }]}>
            你的得分: {score} / {questions.length}
          </Text>
          <Text style={[styles.percentText, { color: theme.text }]}>
            {percentage.toFixed(0)}%
          </Text>
          <Text style={[styles.resultMessage, { color: theme.text }]}>
            {resultMessage}
          </Text>
          
          <TouchableOpacity 
            style={[styles.tryAgainButton, { backgroundColor: theme.primary }]}
            onPress={() => generateQuestions(quizMode!)}
          >
            <Text style={styles.tryAgainText}>再测试一次</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.changeModeButton, { borderColor: theme.border }]}
            onPress={() => setQuizMode(null)}
          >
            <Text style={[styles.changeModeText, { color: theme.text }]}>更改测试模式</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // 主渲染逻辑
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {!quizMode && renderQuizModeSelection()}
      {quizMode && !showResult && renderQuestion()}
      {showResult && renderResult()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modeContainer: {
    padding: 20,
    alignItems: 'stretch',
  },
  modeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modeIcon: {
    marginRight: 15,
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
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
  },
  questionContainer: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  kanaCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  kanaText: {
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  meaningText: {
    fontSize: 20,
    marginBottom: 10,
  },
  kanaType: {
    fontSize: 16,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
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
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultCard: {
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultIcon: {
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  percentText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  tryAgainButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  tryAgainText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  changeModeButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  changeModeText: {
    fontSize: 16,
  },
});

export default QuizScreen; 