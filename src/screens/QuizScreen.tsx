import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  Animated
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { hiraganaData } from '../data/hiragana';
import { katakanaData } from '../data/katakana';

type QuizScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Quiz'>;
  route: RouteProp<RootStackParamList, 'Quiz'>;
};

const QuizScreen = ({ navigation, route }: QuizScreenProps) => {
  const { mode } = route.params;
  
  const [quizData, setQuizData] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [quizType, setQuizType] = useState<'kana-to-romaji' | 'romaji-to-kana'>('kana-to-romaji');
  
  // Generate quiz data based on mode
  useEffect(() => {
    let data: any[] = [];
    
    if (mode === 'hiragana' || mode === 'both') {
      data = [...data, ...hiraganaData];
    }
    
    if (mode === 'katakana' || mode === 'both') {
      data = [...data, ...katakanaData];
    }
    
    // Shuffle and take 10 random characters
    const shuffled = data.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    
    setQuizData(selected);
    generateOptions(selected[0], quizType);
  }, [mode]);
  
  // Generate options for the current question
  const generateOptions = (question: any, type: 'kana-to-romaji' | 'romaji-to-kana') => {
    if (!question) return;
    
    const correct = type === 'kana-to-romaji' ? question.romaji : question.kana;
    const allOptions = type === 'kana-to-romaji' 
      ? [...hiraganaData, ...katakanaData].map(item => item.romaji)
      : [...hiraganaData, ...katakanaData].map(item => item.kana);
    
    // Filter out duplicates and the correct answer
    const uniqueOptions = [...new Set(allOptions)].filter(option => option !== correct);
    
    // Shuffle and take 3 random wrong options
    const shuffledOptions = uniqueOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Add the correct option and shuffle again
    const finalOptions = [...shuffledOptions, correct].sort(() => 0.5 - Math.random());
    
    setOptions(finalOptions);
  };
  
  // Handle option selection
  const handleOptionSelect = (option: string) => {
    const currentChar = quizData[currentQuestion];
    const correctAnswer = quizType === 'kana-to-romaji' ? currentChar.romaji : currentChar.kana;
    
    setSelectedOption(option);
    
    if (option === correctAnswer) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }
    
    // Wait a moment to show the result, then move to next question
    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        // Fade out animation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }).start(() => {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption(null);
          setIsCorrect(null);
          
          // Switch quiz type randomly
          const newType = Math.random() > 0.5 ? 'kana-to-romaji' : 'romaji-to-kana';
          setQuizType(newType);
          
          // Generate new options for next question
          generateOptions(quizData[currentQuestion + 1], newType);
          
          // Fade in animation
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
          }).start();
        });
      } else {
        setShowResult(true);
      }
    }, 1500);
  };
  
  // Restart the quiz
  const handleRestart = () => {
    // Shuffle the quiz data again
    const shuffled = [...hiraganaData, ...katakanaData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    
    setQuizData(selected);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setQuizType('kana-to-romaji');
    generateOptions(selected[0], 'kana-to-romaji');
  };
  
  // Change quiz type
  const handleChangeQuizType = () => {
    const newType = quizType === 'kana-to-romaji' ? 'romaji-to-kana' : 'kana-to-romaji';
    setQuizType(newType);
    generateOptions(quizData[currentQuestion], newType);
  };
  
  // Render the result screen
  if (showResult) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>测试完成!</Text>
          <Text style={styles.scoreText}>你的得分</Text>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreValue}>{score}/{quizData.length}</Text>
            <Text style={styles.scorePercent}>{Math.round((score / quizData.length) * 100)}%</Text>
          </View>
          
          <Text style={styles.resultMessage}>
            {score === quizData.length 
              ? '太棒了！你掌握得很好！' 
              : score >= quizData.length * 0.7 
                ? '做得不错！继续加油！' 
                : '再接再厉，多多练习！'}
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
              <Text style={styles.buttonText}>再测一次</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.homeButton} 
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>返回首页</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
  // Render the quiz
  const currentChar = quizData[currentQuestion];
  if (!currentChar) return null;
  
  const questionValue = quizType === 'kana-to-romaji' ? currentChar.kana : currentChar.romaji;
  const questionType = currentChar.kana.match(/[あ-ん]/) ? '平假名' : '片假名';
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionCount}>问题 {currentQuestion + 1}/{quizData.length}</Text>
        <Text style={styles.scoreHeader}>得分: {score}</Text>
      </View>
      
      <Animated.View 
        style={[
          styles.quizContainer,
          { opacity: fadeAnim }
        ]}
      >
        <View style={styles.quizTypeContainer}>
          <Text style={styles.quizTypeText}>
            {quizType === 'kana-to-romaji' ? '假名 → 罗马音' : '罗马音 → 假名'}
          </Text>
          <TouchableOpacity 
            style={styles.switchButton}
            onPress={handleChangeQuizType}
          >
            <Text style={styles.switchButtonText}>切换类型</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.questionContainer}>
          <Text style={styles.questionLabel}>
            {quizType === 'kana-to-romaji' 
              ? `这个${questionType}的读音是？` 
              : `这个罗马音对应的${questionType}是？`}
          </Text>
          <Text style={styles.questionValue}>{questionValue}</Text>
        </View>
        
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === option && (
                  option === (quizType === 'kana-to-romaji' ? currentChar.romaji : currentChar.kana)
                    ? styles.correctOption
                    : styles.wrongOption
                )
              ]}
              onPress={() => handleOptionSelect(option)}
              disabled={selectedOption !== null}
            >
              <Text style={[
                styles.optionText,
                selectedOption === option && (
                  option === (quizType === 'kana-to-romaji' ? currentChar.romaji : currentChar.kana)
                    ? styles.correctOptionText
                    : styles.wrongOptionText
                )
              ]}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {isCorrect !== null && (
          <View style={styles.feedbackContainer}>
            <Text style={[
              styles.feedbackText,
              isCorrect ? styles.correctFeedback : styles.wrongFeedback
            ]}>
              {isCorrect ? '回答正确！' : '回答错误！'}
            </Text>
            {!isCorrect && (
              <Text style={styles.correctAnswerText}>
                正确答案: {quizType === 'kana-to-romaji' ? currentChar.romaji : currentChar.kana}
              </Text>
            )}
          </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  questionCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  scoreHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A86E8',
  },
  quizContainer: {
    flex: 1,
    padding: 20,
  },
  quizTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quizTypeText: {
    fontSize: 16,
    color: '#666',
  },
  switchButton: {
    backgroundColor: '#4A86E8',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  switchButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  questionLabel: {
    fontSize: 18,
    color: '#555',
    marginBottom: 15,
  },
  questionValue: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#333',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  correctOption: {
    backgroundColor: '#4caf50',
  },
  wrongOption: {
    backgroundColor: '#f44336',
  },
  optionText: {
    fontSize: 20,
    color: '#333',
  },
  correctOptionText: {
    color: '#fff',
  },
  wrongOptionText: {
    color: '#fff',
  },
  feedbackContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  correctFeedback: {
    color: '#4caf50',
  },
  wrongFeedback: {
    color: '#f44336',
  },
  correctAnswerText: {
    fontSize: 16,
    color: '#555',
  },
  resultContainer: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#4A86E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  scorePercent: {
    fontSize: 18,
    color: '#fff',
  },
  resultMessage: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  restartButton: {
    backgroundColor: '#4A86E8',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#9E9E9E',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default QuizScreen; 