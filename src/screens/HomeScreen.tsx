import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Platform
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
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.isDark ? "light-content" : "dark-content"} />
      <View style={[styles.background, { backgroundColor: theme.background }]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.title, { color: theme.text }]}>五十音图</Text>
          <Text style={[styles.subtitle, { color: theme.subText }]}>轻松掌握日语基础</Text>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[
              styles.button, 
              { 
                backgroundColor: theme.isDark 
                  ? theme.buttonBackground 
                  : theme.hiraganaColor 
              }
            ]} 
            onPress={() => navigation.navigate('HiraganaChart')}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>平假名表</Text>
            <Text style={[styles.buttonSubtext, { color: theme.isDark ? theme.subText : 'rgba(255, 255, 255, 0.8)' }]}>あ い う え お</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.button, 
              { 
                backgroundColor: theme.isDark 
                  ? theme.buttonBackground 
                  : theme.katakanaColor 
              }
            ]} 
            onPress={() => navigation.navigate('KatakanaChart')}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>片假名表</Text>
            <Text style={[styles.buttonSubtext, { color: theme.isDark ? theme.subText : 'rgba(255, 255, 255, 0.8)' }]}>ア イ ウ エ オ</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.button, 
              { 
                backgroundColor: theme.isDark 
                  ? theme.buttonBackground 
                  : theme.combinedColor 
              }
            ]} 
            onPress={() => navigation.navigate('CombinedKana')}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>平片假名对照</Text>
            <Text style={[styles.buttonSubtext, { color: theme.isDark ? theme.subText : 'rgba(255, 255, 255, 0.8)' }]}>あ/ア い/イ う/ウ</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.button, 
              { 
                backgroundColor: theme.isDark 
                  ? theme.buttonBackground 
                  : theme.quizColor 
              }
            ]} 
            onPress={() => navigation.navigate('Quiz', { mode: 'both' })}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>五十音测试</Text>
            <Text style={[styles.buttonSubtext, { color: theme.isDark ? theme.subText : 'rgba(255, 255, 255, 0.8)' }]}>测试你的记忆</Text>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.footer, { borderTopColor: theme.isDark ? theme.border : 'rgba(184, 196, 229, 0.2)' }]}>
          <Text style={[styles.footerText, { color: theme.subText }]}>
            五十音图是学习日语的基础，包含平假名和片假名两套音标系统
          </Text>
          
          <TouchableOpacity 
            style={[styles.aboutButton, { backgroundColor: theme.isDark ? 'rgba(100, 100, 100, 0.2)' : 'rgba(200, 200, 200, 0.3)' }]}
            onPress={() => navigation.navigate('About')}
          >
            <Ionicons name="information-circle-outline" size={18} color={theme.text} />
            <Text style={[styles.aboutButtonText, { color: theme.text }]}>关于应用</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  button: {
    width: '90%',
    height: 100,
    borderRadius: 14,
    marginVertical: 10,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonSubtext: {
    fontSize: 16,
    marginTop: 5,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 15,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  aboutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
  },
  aboutButtonText: {
    fontSize: 14,
    marginLeft: 5,
  },
});

export default HomeScreen; 