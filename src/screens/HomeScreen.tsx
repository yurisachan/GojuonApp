import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Image,
  StatusBar,
  ImageBackground
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground 
        source={{ uri: 'https://i.imgur.com/8JnZlIm.jpg' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>五十音图学习</Text>
            <Text style={styles.subtitle}>轻松掌握日语基础</Text>
          </View>
          
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.hiraganaButton]} 
              onPress={() => navigation.navigate('HiraganaChart')}
            >
              <Text style={styles.buttonText}>平假名表</Text>
              <Text style={styles.buttonSubtext}>あ い う え お</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.katakanaButton]} 
              onPress={() => navigation.navigate('KatakanaChart')}
            >
              <Text style={styles.buttonText}>片假名表</Text>
              <Text style={styles.buttonSubtext}>ア イ ウ エ オ</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.quizButton]} 
              onPress={() => navigation.navigate('Quiz', { mode: 'both' })}
            >
              <Text style={styles.buttonText}>五十音测试</Text>
              <Text style={styles.buttonSubtext}>测试你的记忆</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              五十音图是学习日语的基础，包含平假名和片假名两套音标系统
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#eee',
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
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hiraganaButton: {
    backgroundColor: '#4A86E8',
  },
  katakanaButton: {
    backgroundColor: '#E67C73',
  },
  quizButton: {
    backgroundColor: '#57BB8A',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonSubtext: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
  },
});

export default HomeScreen; 