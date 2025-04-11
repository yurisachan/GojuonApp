import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';

class AudioService {
  private static instance: AudioService;
  private sound: Audio.Sound | null = null;
  private isInitialized: boolean = false;
  private audioAssets: Record<string, Asset> = {};
  
  private constructor() {
    // 直接在Asset.fromModule中使用require
    // 元音
    this.audioAssets['a'] = Asset.fromModule(require('../../assets/sounds/a.mp3'));
    this.audioAssets['i'] = Asset.fromModule(require('../../assets/sounds/i.mp3'));
    this.audioAssets['u'] = Asset.fromModule(require('../../assets/sounds/u.mp3'));
    this.audioAssets['e'] = Asset.fromModule(require('../../assets/sounds/e.mp3'));
    this.audioAssets['o'] = Asset.fromModule(require('../../assets/sounds/o.mp3'));
    
    // か行
    this.audioAssets['ka'] = Asset.fromModule(require('../../assets/sounds/ka.mp3'));
    this.audioAssets['ki'] = Asset.fromModule(require('../../assets/sounds/ki.mp3'));
    this.audioAssets['ku'] = Asset.fromModule(require('../../assets/sounds/ku.mp3'));
    this.audioAssets['ke'] = Asset.fromModule(require('../../assets/sounds/ke.mp3'));
    this.audioAssets['ko'] = Asset.fromModule(require('../../assets/sounds/ko.mp3'));
    
    // さ行
    this.audioAssets['sa'] = Asset.fromModule(require('../../assets/sounds/sa.mp3'));
    this.audioAssets['shi'] = Asset.fromModule(require('../../assets/sounds/shi.mp3'));
    this.audioAssets['su'] = Asset.fromModule(require('../../assets/sounds/su.mp3'));
    this.audioAssets['se'] = Asset.fromModule(require('../../assets/sounds/se.mp3'));
    this.audioAssets['so'] = Asset.fromModule(require('../../assets/sounds/so.mp3'));
    
    // た行
    this.audioAssets['ta'] = Asset.fromModule(require('../../assets/sounds/ta.mp3'));
    this.audioAssets['chi'] = Asset.fromModule(require('../../assets/sounds/chi.mp3'));
    this.audioAssets['tsu'] = Asset.fromModule(require('../../assets/sounds/tsu.mp3'));
    this.audioAssets['te'] = Asset.fromModule(require('../../assets/sounds/te.mp3'));
    this.audioAssets['to'] = Asset.fromModule(require('../../assets/sounds/to.mp3'));
    
    // な行
    this.audioAssets['na'] = Asset.fromModule(require('../../assets/sounds/na.mp3'));
    this.audioAssets['ni'] = Asset.fromModule(require('../../assets/sounds/ni.mp3'));
    this.audioAssets['nu'] = Asset.fromModule(require('../../assets/sounds/nu.mp3'));
    this.audioAssets['ne'] = Asset.fromModule(require('../../assets/sounds/ne.mp3'));
    this.audioAssets['no'] = Asset.fromModule(require('../../assets/sounds/no.mp3'));
    
    // は行
    this.audioAssets['ha'] = Asset.fromModule(require('../../assets/sounds/ha.mp3'));
    this.audioAssets['hi'] = Asset.fromModule(require('../../assets/sounds/hi.mp3'));
    this.audioAssets['fu'] = Asset.fromModule(require('../../assets/sounds/fu.mp3'));
    this.audioAssets['he'] = Asset.fromModule(require('../../assets/sounds/he.mp3'));
    this.audioAssets['ho'] = Asset.fromModule(require('../../assets/sounds/ho.mp3'));
    
    // ま行
    this.audioAssets['ma'] = Asset.fromModule(require('../../assets/sounds/ma.mp3'));
    this.audioAssets['mi'] = Asset.fromModule(require('../../assets/sounds/mi.mp3'));
    this.audioAssets['mu'] = Asset.fromModule(require('../../assets/sounds/mu.mp3'));
    this.audioAssets['me'] = Asset.fromModule(require('../../assets/sounds/me.mp3'));
    this.audioAssets['mo'] = Asset.fromModule(require('../../assets/sounds/mo.mp3'));
    
    // や行
    this.audioAssets['ya'] = Asset.fromModule(require('../../assets/sounds/ya.mp3'));
    this.audioAssets['yu'] = Asset.fromModule(require('../../assets/sounds/yu.mp3'));
    this.audioAssets['yo'] = Asset.fromModule(require('../../assets/sounds/yo.mp3'));
    
    // ら行
    this.audioAssets['ra'] = Asset.fromModule(require('../../assets/sounds/ra.mp3'));
    this.audioAssets['ri'] = Asset.fromModule(require('../../assets/sounds/ri.mp3'));
    this.audioAssets['ru'] = Asset.fromModule(require('../../assets/sounds/ru.mp3'));
    this.audioAssets['re'] = Asset.fromModule(require('../../assets/sounds/re.mp3'));
    this.audioAssets['ro'] = Asset.fromModule(require('../../assets/sounds/ro.mp3'));
    
    // わ行
    this.audioAssets['wa'] = Asset.fromModule(require('../../assets/sounds/wa.mp3'));
    this.audioAssets['wo'] = Asset.fromModule(require('../../assets/sounds/wo.mp3'));
    
    // ん
    this.audioAssets['n'] = Asset.fromModule(require('../../assets/sounds/n.mp3'));
    
    // 占位
    this.audioAssets['placeholder'] = Asset.fromModule(require('../../assets/sounds/placeholder.mp3'));
  }
  
  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }
  
  /**
   * 初始化音频服务
   */
  public async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;
    
    try {
      // 配置音频模式
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
      
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('初始化音频服务失败:', error);
      return false;
    }
  }
  
  /**
   * 播放音频
   * @param audioKey 音频键名（不含.mp3后缀）
   */
  public async playSound(audioKey: string): Promise<void> {
    try {
      // 确保服务已初始化
      if (!this.isInitialized) {
        await this.initialize();
      }
      
      // 清理现有的音频
      await this.unloadSound();
      
      // 去掉可能存在的.mp3后缀
      const key = audioKey.replace('.mp3', '');
      
      // 获取资源并播放
      const asset = this.audioAssets[key] || this.audioAssets['placeholder'];
      
      // 确保资源已下载
      if (!asset.downloaded) {
        await asset.downloadAsync();
      }
      
      const { sound: newSound } = await Audio.Sound.createAsync(asset);
      this.sound = newSound;
      
      await newSound.playAsync();
    } catch (error) {
      console.error(`播放音频[${audioKey}]出错:`, error);
      
      // 尝试播放占位音频
      try {
        const placeholderAsset = this.audioAssets['placeholder'];
        if (!placeholderAsset.downloaded) {
          await placeholderAsset.downloadAsync();
        }
        
        const { sound: fallbackSound } = await Audio.Sound.createAsync(placeholderAsset);
        this.sound = fallbackSound;
        await fallbackSound.playAsync();
      } catch (fallbackError) {
        console.error('播放占位音频也失败:', fallbackError);
      }
    }
  }
  
  /**
   * 释放音频资源
   */
  public async unloadSound(): Promise<void> {
    if (this.sound) {
      await this.sound.unloadAsync();
      this.sound = null;
    }
  }
}

export default AudioService; 