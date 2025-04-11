import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Platform,
  Dimensions,
  ScaledSize,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../context/ThemeContext';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { theme } = useTheme();
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));
  
  // 监听屏幕尺寸变化
  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setScreenDimensions(window);
    };
    
    const subscription = Dimensions.addEventListener('change', onChange);
    
    return () => subscription.remove();
  }, []);
  
  // 根据屏幕尺寸计算响应式样式
  const getResponsiveStyles = () => {
    const { width, height } = screenDimensions;
    const isLandscape = width > height;
    
    // 计算按钮高度，根据屏幕适配
    const buttonHeight = Math.min(
      90, // 最大高度
      Math.max(70, height * 0.12) // 最小高度70，最大为屏幕高度的12%
    );
    
    // 计算按钮宽度
    const buttonWidth = isLandscape ? width * 0.7 : width * 0.85;
    
    // 根据屏幕宽度调整字体大小
    const titleFontSize = width < 360 ? 36 : width < 400 ? 38 : 42;
    const subtitleFontSize = width < 360 ? 16 : 18;
    const buttonTextFontSize = width < 360 ? 20 : 24;
    const buttonSubtextFontSize = width < 360 ? 14 : 16;
    
    // 根据屏幕高度调整垂直间距
    const marginVertical = Math.max(5, Math.min(8, height * 0.01));
    const marginTop = isLandscape ? 10 : 20;
    
    return {
      headerContainer: {
        alignItems: 'center' as const,
        marginTop,
        marginBottom: marginTop,
      },
      title: {
        fontSize: titleFontSize,
        fontWeight: 'bold' as const,
        marginBottom: marginVertical,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 3
      },
      subtitle: {
        fontSize: subtitleFontSize,
        marginBottom: marginVertical,
      },
      buttonsContainer: {
        alignItems: 'center' as const,
        paddingBottom: 10,
      },
      button: {
        width: buttonWidth,
        height: buttonHeight,
        borderRadius: 14,
        marginBottom: 10,
        padding: width < 360 ? 14 : 16,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 6,
      },
      buttonText: {
        fontSize: buttonTextFontSize,
        fontWeight: 'bold' as const,
        marginBottom: 2,
      },
      buttonSubtext: {
        fontSize: buttonSubtextFontSize,
        marginTop: 3,
      },
      footer: {
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        marginTop: marginVertical,
        marginBottom: marginVertical,
        paddingTop: marginVertical,
        borderTopWidth: 1,
      },
      footerTextContainer: {
        flex: isLandscape ? 1 : 0,
        marginRight: isLandscape ? 10 : 0,
      },
      footerText: {
        fontSize: width < 360 ? 12 : 14,
        textAlign: 'center' as const,
        marginBottom: isLandscape ? 0 : 15,
      },
      aboutButton: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
      },
      aboutButtonText: {
        fontSize: width < 360 ? 12 : 14,
        marginLeft: 5,
      },
    };
  };
  
  const responsiveStyles = getResponsiveStyles();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.isDark ? "light-content" : "dark-content"} />
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.background, { backgroundColor: theme.background }]}>
          <View style={responsiveStyles.headerContainer}>
            <Text style={[responsiveStyles.title, { color: theme.text }]}>五十音图</Text>
            <Text style={[responsiveStyles.subtitle, { color: theme.subText }]}>轻松掌握日语基础</Text>
          </View>
          
          <View style={responsiveStyles.buttonsContainer}>
            <TouchableOpacity 
              style={[
                responsiveStyles.button, 
                { 
                  backgroundColor: theme.isDark 
                    ? theme.buttonBackground 
                    : theme.hiraganaColor 
                }
              ]} 
              onPress={() => navigation.navigate('HiraganaChart')}
            >
              <Text style={[responsiveStyles.buttonText, { color: theme.text }]}>平假名表</Text>
              <Text style={[responsiveStyles.buttonSubtext, { color: theme.isDark ? theme.subText : 'rgba(255, 255, 255, 0.8)' }]}>あ い う え お</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                responsiveStyles.button, 
                { 
                  backgroundColor: theme.isDark 
                    ? theme.buttonBackground 
                    : theme.katakanaColor 
                }
              ]} 
              onPress={() => navigation.navigate('KatakanaChart')}
            >
              <Text style={[responsiveStyles.buttonText, { color: theme.text }]}>片假名表</Text>
              <Text style={[responsiveStyles.buttonSubtext, { color: theme.isDark ? theme.subText : 'rgba(255, 255, 255, 0.8)' }]}>ア イ ウ エ オ</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                responsiveStyles.button, 
                { 
                  backgroundColor: theme.isDark 
                    ? theme.buttonBackground 
                    : theme.combinedColor 
                }
              ]} 
              onPress={() => navigation.navigate('CombinedKana')}
            >
              <Text style={[responsiveStyles.buttonText, { color: theme.text }]}>平片假名对照</Text>
              <Text style={[responsiveStyles.buttonSubtext, { color: theme.isDark ? theme.subText : 'rgba(255, 255, 255, 0.8)' }]}>あ/ア い/イ う/ウ</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                responsiveStyles.button, 
                { 
                  backgroundColor: theme.isDark 
                    ? theme.buttonBackground 
                    : theme.dakutenColor 
                }
              ]} 
              onPress={() => navigation.navigate('DakutenChart')}
            >
              <Text style={[responsiveStyles.buttonText, { color: theme.text }]}>浊音/半浊音</Text>
              <Text style={[responsiveStyles.buttonSubtext, { color: theme.isDark ? theme.subText : 'rgba(255, 255, 255, 0.8)' }]}>が ざ だ ば ぱ</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                responsiveStyles.button, 
                { 
                  backgroundColor: theme.isDark 
                    ? theme.buttonBackground 
                    : theme.yoonColor 
                }
              ]} 
              onPress={() => navigation.navigate('YoonChart')}
            >
              <Text style={[responsiveStyles.buttonText, { color: theme.text }]}>拗音</Text>
              <Text style={[responsiveStyles.buttonSubtext, { color: theme.isDark ? theme.subText : 'rgba(255, 255, 255, 0.8)' }]}>きゃ しゅ ちょ</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                responsiveStyles.button, 
                { 
                  backgroundColor: theme.isDark 
                    ? theme.buttonBackground 
                    : theme.quizColor 
                }
              ]} 
              onPress={() => navigation.navigate('Quiz')}
            >
              <Text style={[responsiveStyles.buttonText, { color: theme.text }]}>五十音测试</Text>
              <Text style={[responsiveStyles.buttonSubtext, { color: theme.isDark ? theme.subText : 'rgba(255, 255, 255, 0.8)' }]}>测试你的记忆</Text>
            </TouchableOpacity>
          </View>
          
          <View style={[responsiveStyles.footer, { borderTopColor: theme.isDark ? theme.border : 'rgba(184, 196, 229, 0.2)' }]}>
            <TouchableOpacity 
              style={[responsiveStyles.aboutButton, { backgroundColor: theme.isDark ? 'rgba(100, 100, 100, 0.2)' : 'rgba(200, 200, 200, 0.3)' }]}
              onPress={() => navigation.navigate('About')}
            >
              <Ionicons name="information-circle-outline" size={18} color={theme.text} />
              <Text style={[responsiveStyles.aboutButtonText, { color: theme.text }]}>关于应用</Text>
            </TouchableOpacity>
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
  background: {
    padding: 20,
    paddingBottom: 10,
  },
});

export default HomeScreen; 