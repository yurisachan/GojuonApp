import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const AboutScreen = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/icon.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <Text style={[styles.title, { color: theme.text }]}>五十音学习</Text>
          <Text style={[styles.version, { color: theme.subText }]}>版本 1.0.0</Text>
        </View>
        
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>关于应用</Text>
          <Text style={[styles.sectionText, { color: theme.text }]}>
            这是一个学习日语假名的应用程序，包括平假名和片假名。应用提供了假名表、详细发音、书写顺序和测试功能，帮助用户轻松掌握日语基础文字系统。
          </Text>
        </View>
        
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>功能特点</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="grid-outline" size={24} color={theme.hiraganaColor} style={styles.featureIcon} />
              <Text style={[styles.featureText, { color: theme.text }]}>完整的平假名和片假名表</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="musical-notes-outline" size={24} color={theme.hiraganaColor} style={styles.featureIcon} />
              <Text style={[styles.featureText, { color: theme.text }]}>假名发音</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="pencil-outline" size={24} color={theme.hiraganaColor} style={styles.featureIcon} />
              <Text style={[styles.featureText, { color: theme.text }]}>书写顺序演示</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="school-outline" size={24} color={theme.hiraganaColor} style={styles.featureIcon} />
              <Text style={[styles.featureText, { color: theme.text }]}>假名测试练习</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="moon-outline" size={24} color={theme.hiraganaColor} style={styles.featureIcon} />
              <Text style={[styles.featureText, { color: theme.text }]}>暗色/亮色主题</Text>
            </View>
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>联系我们</Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => Linking.openURL('mailto:support@example.com')}
          >
            <Ionicons name="mail-outline" size={20} color="#FFFFFF" style={styles.contactIcon} />
            <Text style={styles.contactButtonText}>发送邮件</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.copyright, { color: theme.subText }]}>
          © 2023 五十音学习应用 保留所有权利
        </Text>
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
    paddingVertical: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
  },
  section: {
    margin: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  featureList: {
    marginTop: 5,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5E72E4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  contactIcon: {
    marginRight: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  copyright: {
    textAlign: 'center',
    fontSize: 12,
    marginVertical: 20,
  },
});

export default AboutScreen; 