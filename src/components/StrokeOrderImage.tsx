import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// 本地笔顺动画映射
const getStrokeOrderImage = (kana: string) => {
  try {
    switch (kana) {
      // 平假名
      case 'あ': return require('../../assets/animations/hiragana_a.gif');
      case 'い': return require('../../assets/animations/hiragana_i.gif');
      case 'う': return require('../../assets/animations/hiragana_u.gif');
      case 'え': return require('../../assets/animations/hiragana_e.gif');
      case 'お': return require('../../assets/animations/hiragana_o.gif');
      case 'か': return require('../../assets/animations/hiragana_ka.gif');
      case 'き': return require('../../assets/animations/hiragana_ki.gif');
      case 'く': return require('../../assets/animations/hiragana_ku.gif');
      case 'け': return require('../../assets/animations/hiragana_ke.gif');
      case 'こ': return require('../../assets/animations/hiragana_ko.gif');
      case 'さ': return require('../../assets/animations/hiragana_sa.gif');
      case 'し': return require('../../assets/animations/hiragana_shi.gif');
      case 'す': return require('../../assets/animations/hiragana_su.gif');
      case 'せ': return require('../../assets/animations/hiragana_se.gif');
      case 'そ': return require('../../assets/animations/hiragana_so.gif');
      case 'た': return require('../../assets/animations/hiragana_ta.gif');
      case 'ち': return require('../../assets/animations/hiragana_chi.gif');
      case 'つ': return require('../../assets/animations/hiragana_tsu.gif');
      case 'て': return require('../../assets/animations/hiragana_te.gif');
      case 'と': return require('../../assets/animations/hiragana_to.gif');
      case 'な': return require('../../assets/animations/hiragana_na.gif');
      case 'に': return require('../../assets/animations/hiragana_ni.gif');
      case 'ぬ': return require('../../assets/animations/hiragana_nu.gif');
      case 'ね': return require('../../assets/animations/hiragana_ne.gif');
      case 'の': return require('../../assets/animations/hiragana_no.gif');
      case 'は': return require('../../assets/animations/hiragana_ha.gif');
      case 'ひ': return require('../../assets/animations/hiragana_hi.gif');
      case 'ふ': return require('../../assets/animations/hiragana_fu.gif');
      case 'へ': return require('../../assets/animations/hiragana_he.gif');
      case 'ほ': return require('../../assets/animations/hiragana_ho.gif');
      case 'ま': return require('../../assets/animations/hiragana_ma.gif');
      case 'み': return require('../../assets/animations/hiragana_mi.gif');
      case 'む': return require('../../assets/animations/hiragana_mu.gif');
      case 'め': return require('../../assets/animations/hiragana_me.gif');
      case 'も': return require('../../assets/animations/hiragana_mo.gif');
      case 'や': return require('../../assets/animations/hiragana_ya.gif');
      case 'ゆ': return require('../../assets/animations/hiragana_yu.gif');
      case 'よ': return require('../../assets/animations/hiragana_yo.gif');
      case 'ら': return require('../../assets/animations/hiragana_ra.gif');
      case 'り': return require('../../assets/animations/hiragana_ri.gif');
      case 'る': return require('../../assets/animations/hiragana_ru.gif');
      case 'れ': return require('../../assets/animations/hiragana_re.gif');
      case 'ろ': return require('../../assets/animations/hiragana_ro.gif');
      case 'わ': return require('../../assets/animations/hiragana_wa.gif');
      case 'を': return require('../../assets/animations/hiragana_wo.gif');
      case 'ん': return require('../../assets/animations/hiragana_n.gif');
      
      // 片假名
      case 'ア': return require('../../assets/animations/katakana_a.gif');
      case 'イ': return require('../../assets/animations/katakana_i.gif');
      case 'ウ': return require('../../assets/animations/katakana_u.gif');
      case 'エ': return require('../../assets/animations/katakana_e.gif');
      case 'オ': return require('../../assets/animations/katakana_o.gif');
      case 'カ': return require('../../assets/animations/katakana_ka.gif');
      case 'キ': return require('../../assets/animations/katakana_ki.gif');
      case 'ク': return require('../../assets/animations/katakana_ku.gif');
      case 'ケ': return require('../../assets/animations/katakana_ke.gif');
      case 'コ': return require('../../assets/animations/katakana_ko.gif');
      case 'サ': return require('../../assets/animations/katakana_sa.gif');
      case 'シ': return require('../../assets/animations/katakana_shi.gif');
      case 'ス': return require('../../assets/animations/katakana_su.gif');
      case 'セ': return require('../../assets/animations/katakana_se.gif');
      case 'ソ': return require('../../assets/animations/katakana_so.gif');
      case 'タ': return require('../../assets/animations/katakana_ta.gif');
      case 'チ': return require('../../assets/animations/katakana_chi.gif');
      case 'ツ': return require('../../assets/animations/katakana_tsu.gif');
      case 'テ': return require('../../assets/animations/katakana_te.gif');
      case 'ト': return require('../../assets/animations/katakana_to.gif');
      case 'ナ': return require('../../assets/animations/katakana_na.gif');
      case 'ニ': return require('../../assets/animations/katakana_ni.gif');
      case 'ヌ': return require('../../assets/animations/katakana_nu.gif');
      case 'ネ': return require('../../assets/animations/katakana_ne.gif');
      case 'ノ': return require('../../assets/animations/katakana_no.gif');
      case 'ハ': return require('../../assets/animations/katakana_ha.gif');
      case 'ヒ': return require('../../assets/animations/katakana_hi.gif');
      case 'フ': return require('../../assets/animations/katakana_fu.gif');
      case 'ヘ': return require('../../assets/animations/katakana_he.gif');
      case 'ホ': return require('../../assets/animations/katakana_ho.gif');
      case 'マ': return require('../../assets/animations/katakana_ma.gif');
      case 'ミ': return require('../../assets/animations/katakana_mi.gif');
      case 'ム': return require('../../assets/animations/katakana_mu.gif');
      case 'メ': return require('../../assets/animations/katakana_me.gif');
      case 'モ': return require('../../assets/animations/katakana_mo.gif');
      case 'ヤ': return require('../../assets/animations/katakana_ya.gif');
      case 'ユ': return require('../../assets/animations/katakana_yu.gif');
      case 'ヨ': return require('../../assets/animations/katakana_yo.gif');
      case 'ラ': return require('../../assets/animations/katakana_ra.gif');
      case 'リ': return require('../../assets/animations/katakana_ri.gif');
      case 'ル': return require('../../assets/animations/katakana_ru.gif');
      case 'レ': return require('../../assets/animations/katakana_re.gif');
      case 'ロ': return require('../../assets/animations/katakana_ro.gif');
      case 'ワ': return require('../../assets/animations/katakana_wa.gif');
      case 'ヲ': return require('../../assets/animations/katakana_wo.gif');
      case 'ン': return require('../../assets/animations/katakana_n.gif');
      
      default: 
        // 默认返回平假名"あ"的笔顺动画
        return require('../../assets/animations/hiragana_a.gif');
    }
  } catch (error) {
    // 如果加载失败，使用默认占位符
    console.warn(`无法加载${kana}的笔顺动画，使用默认占位符`);
    return require('../../assets/animations/hiragana_a.gif');
  }
};

interface StrokeOrderImageProps {
  kana: string;
  size?: number;
}

const StrokeOrderImage: React.FC<StrokeOrderImageProps> = ({ kana, size = 200 }) => {
  const { theme } = useTheme();
  const imageSource = getStrokeOrderImage(kana);
  
  return (
    <View style={styles.container}>
      <Image
        source={imageSource}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
  }
});

export default StrokeOrderImage; 