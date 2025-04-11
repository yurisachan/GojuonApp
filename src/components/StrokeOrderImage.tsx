import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Asset } from 'expo-asset';

// 本地笔顺动画映射 - 直接使用Asset.fromModule(require())
const getStrokeOrderImage = (kana: string): Asset => {
  try {
    switch (kana) {
      // 平假名
      case 'あ': return Asset.fromModule(require('../../assets/animations/hiragana_a.gif'));
      case 'い': return Asset.fromModule(require('../../assets/animations/hiragana_i.gif'));
      case 'う': return Asset.fromModule(require('../../assets/animations/hiragana_u.gif'));
      case 'え': return Asset.fromModule(require('../../assets/animations/hiragana_e.gif'));
      case 'お': return Asset.fromModule(require('../../assets/animations/hiragana_o.gif'));
      case 'か': return Asset.fromModule(require('../../assets/animations/hiragana_ka.gif'));
      case 'き': return Asset.fromModule(require('../../assets/animations/hiragana_ki.gif'));
      case 'く': return Asset.fromModule(require('../../assets/animations/hiragana_ku.gif'));
      case 'け': return Asset.fromModule(require('../../assets/animations/hiragana_ke.gif'));
      case 'こ': return Asset.fromModule(require('../../assets/animations/hiragana_ko.gif'));
      case 'さ': return Asset.fromModule(require('../../assets/animations/hiragana_sa.gif'));
      case 'し': return Asset.fromModule(require('../../assets/animations/hiragana_shi.gif'));
      case 'す': return Asset.fromModule(require('../../assets/animations/hiragana_su.gif'));
      case 'せ': return Asset.fromModule(require('../../assets/animations/hiragana_se.gif'));
      case 'そ': return Asset.fromModule(require('../../assets/animations/hiragana_so.gif'));
      case 'た': return Asset.fromModule(require('../../assets/animations/hiragana_ta.gif'));
      case 'ち': return Asset.fromModule(require('../../assets/animations/hiragana_chi.gif'));
      case 'つ': return Asset.fromModule(require('../../assets/animations/hiragana_tsu.gif'));
      case 'て': return Asset.fromModule(require('../../assets/animations/hiragana_te.gif'));
      case 'と': return Asset.fromModule(require('../../assets/animations/hiragana_to.gif'));
      case 'な': return Asset.fromModule(require('../../assets/animations/hiragana_na.gif'));
      case 'に': return Asset.fromModule(require('../../assets/animations/hiragana_ni.gif'));
      case 'ぬ': return Asset.fromModule(require('../../assets/animations/hiragana_nu.gif'));
      case 'ね': return Asset.fromModule(require('../../assets/animations/hiragana_ne.gif'));
      case 'の': return Asset.fromModule(require('../../assets/animations/hiragana_no.gif'));
      case 'は': return Asset.fromModule(require('../../assets/animations/hiragana_ha.gif'));
      case 'ひ': return Asset.fromModule(require('../../assets/animations/hiragana_hi.gif'));
      case 'ふ': return Asset.fromModule(require('../../assets/animations/hiragana_fu.gif'));
      case 'へ': return Asset.fromModule(require('../../assets/animations/hiragana_he.gif'));
      case 'ほ': return Asset.fromModule(require('../../assets/animations/hiragana_ho.gif'));
      case 'ま': return Asset.fromModule(require('../../assets/animations/hiragana_ma.gif'));
      case 'み': return Asset.fromModule(require('../../assets/animations/hiragana_mi.gif'));
      case 'む': return Asset.fromModule(require('../../assets/animations/hiragana_mu.gif'));
      case 'め': return Asset.fromModule(require('../../assets/animations/hiragana_me.gif'));
      case 'も': return Asset.fromModule(require('../../assets/animations/hiragana_mo.gif'));
      case 'や': return Asset.fromModule(require('../../assets/animations/hiragana_ya.gif'));
      case 'ゆ': return Asset.fromModule(require('../../assets/animations/hiragana_yu.gif'));
      case 'よ': return Asset.fromModule(require('../../assets/animations/hiragana_yo.gif'));
      case 'ら': return Asset.fromModule(require('../../assets/animations/hiragana_ra.gif'));
      case 'り': return Asset.fromModule(require('../../assets/animations/hiragana_ri.gif'));
      case 'る': return Asset.fromModule(require('../../assets/animations/hiragana_ru.gif'));
      case 'れ': return Asset.fromModule(require('../../assets/animations/hiragana_re.gif'));
      case 'ろ': return Asset.fromModule(require('../../assets/animations/hiragana_ro.gif'));
      case 'わ': return Asset.fromModule(require('../../assets/animations/hiragana_wa.gif'));
      case 'を': return Asset.fromModule(require('../../assets/animations/hiragana_wo.gif'));
      case 'ん': return Asset.fromModule(require('../../assets/animations/hiragana_n.gif'));
      
      // 片假名
      case 'ア': return Asset.fromModule(require('../../assets/animations/katakana_a.gif'));
      case 'イ': return Asset.fromModule(require('../../assets/animations/katakana_i.gif'));
      case 'ウ': return Asset.fromModule(require('../../assets/animations/katakana_u.gif'));
      case 'エ': return Asset.fromModule(require('../../assets/animations/katakana_e.gif'));
      case 'オ': return Asset.fromModule(require('../../assets/animations/katakana_o.gif'));
      case 'カ': return Asset.fromModule(require('../../assets/animations/katakana_ka.gif'));
      case 'キ': return Asset.fromModule(require('../../assets/animations/katakana_ki.gif'));
      case 'ク': return Asset.fromModule(require('../../assets/animations/katakana_ku.gif'));
      case 'ケ': return Asset.fromModule(require('../../assets/animations/katakana_ke.gif'));
      case 'コ': return Asset.fromModule(require('../../assets/animations/katakana_ko.gif'));
      case 'サ': return Asset.fromModule(require('../../assets/animations/katakana_sa.gif'));
      case 'シ': return Asset.fromModule(require('../../assets/animations/katakana_shi.gif'));
      case 'ス': return Asset.fromModule(require('../../assets/animations/katakana_su.gif'));
      case 'セ': return Asset.fromModule(require('../../assets/animations/katakana_se.gif'));
      case 'ソ': return Asset.fromModule(require('../../assets/animations/katakana_so.gif'));
      case 'タ': return Asset.fromModule(require('../../assets/animations/katakana_ta.gif'));
      case 'チ': return Asset.fromModule(require('../../assets/animations/katakana_chi.gif'));
      case 'ツ': return Asset.fromModule(require('../../assets/animations/katakana_tsu.gif'));
      case 'テ': return Asset.fromModule(require('../../assets/animations/katakana_te.gif'));
      case 'ト': return Asset.fromModule(require('../../assets/animations/katakana_to.gif'));
      case 'ナ': return Asset.fromModule(require('../../assets/animations/katakana_na.gif'));
      case 'ニ': return Asset.fromModule(require('../../assets/animations/katakana_ni.gif'));
      case 'ヌ': return Asset.fromModule(require('../../assets/animations/katakana_nu.gif'));
      case 'ネ': return Asset.fromModule(require('../../assets/animations/katakana_ne.gif'));
      case 'ノ': return Asset.fromModule(require('../../assets/animations/katakana_no.gif'));
      case 'ハ': return Asset.fromModule(require('../../assets/animations/katakana_ha.gif'));
      case 'ヒ': return Asset.fromModule(require('../../assets/animations/katakana_hi.gif'));
      case 'フ': return Asset.fromModule(require('../../assets/animations/katakana_fu.gif'));
      case 'ヘ': return Asset.fromModule(require('../../assets/animations/katakana_he.gif'));
      case 'ホ': return Asset.fromModule(require('../../assets/animations/katakana_ho.gif'));
      case 'マ': return Asset.fromModule(require('../../assets/animations/katakana_ma.gif'));
      case 'ミ': return Asset.fromModule(require('../../assets/animations/katakana_mi.gif'));
      case 'ム': return Asset.fromModule(require('../../assets/animations/katakana_mu.gif'));
      case 'メ': return Asset.fromModule(require('../../assets/animations/katakana_me.gif'));
      case 'モ': return Asset.fromModule(require('../../assets/animations/katakana_mo.gif'));
      case 'ヤ': return Asset.fromModule(require('../../assets/animations/katakana_ya.gif'));
      case 'ユ': return Asset.fromModule(require('../../assets/animations/katakana_yu.gif'));
      case 'ヨ': return Asset.fromModule(require('../../assets/animations/katakana_yo.gif'));
      case 'ラ': return Asset.fromModule(require('../../assets/animations/katakana_ra.gif'));
      case 'リ': return Asset.fromModule(require('../../assets/animations/katakana_ri.gif'));
      case 'ル': return Asset.fromModule(require('../../assets/animations/katakana_ru.gif'));
      case 'レ': return Asset.fromModule(require('../../assets/animations/katakana_re.gif'));
      case 'ロ': return Asset.fromModule(require('../../assets/animations/katakana_ro.gif'));
      case 'ワ': return Asset.fromModule(require('../../assets/animations/katakana_wa.gif'));
      case 'ヲ': return Asset.fromModule(require('../../assets/animations/katakana_wo.gif'));
      case 'ン': return Asset.fromModule(require('../../assets/animations/katakana_n.gif'));
      
      default: 
        // 默认返回平假名"あ"的笔顺动画
        return Asset.fromModule(require('../../assets/animations/hiragana_a.gif'));
    }
  } catch (error) {
    // 如果加载失败，使用默认占位符
    console.warn(`无法加载${kana}的笔顺动画，使用默认占位符`);
    return Asset.fromModule(require('../../assets/animations/hiragana_a.gif'));
  }
};

interface StrokeOrderImageProps {
  kana: string;
  size?: number;
}

const StrokeOrderImage: React.FC<StrokeOrderImageProps> = ({ kana, size = 200 }) => {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [assetSource, setAssetSource] = useState<Asset | null>(null);
  
  // 组件挂载时加载当前图片
  useEffect(() => {
    let isMounted = true;
    setIsLoaded(false);
    setImageError(false);
    setAssetSource(null);
    
    const loadAsset = async () => {
      try {
        const asset = getStrokeOrderImage(kana);
        
        if (!asset.downloaded) {
          await asset.downloadAsync();
        }
        
        if (isMounted) {
          setAssetSource(asset);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error(`加载笔顺动画失败: ${kana}`, error);
        if (isMounted) {
          setImageError(true);
          setIsLoaded(true);
        }
      }
    };
    
    loadAsset();
    
    return () => {
      isMounted = false;
    };
  }, [kana]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {!isLoaded && (
        <ActivityIndicator 
          size="large" 
          color={theme.primary}
          style={styles.loader} 
        />
      )}
      
      {isLoaded && !imageError && assetSource && (
        <Image
          source={{ uri: assetSource.uri }}
          style={[styles.image, { width: size, height: size }]}
          resizeMode="contain"
        />
      )}
      
      {isLoaded && imageError && (
        <View style={[styles.errorContainer, { width: size, height: size }]}>
          <Image 
            source={require('../../assets/animations/hiragana_a.gif')}
            style={{ width: size * 0.7, height: size * 0.7 }}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loader: {
    position: 'absolute',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
  }
});

export default StrokeOrderImage; 