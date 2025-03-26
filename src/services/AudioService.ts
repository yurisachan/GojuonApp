import { Audio } from 'expo-av';

// 音频文件映射
const audioMap: Record<string, any> = {
  // 元音
  'a': require('../../assets/sounds/a.mp3'),
  'i': require('../../assets/sounds/i.mp3'),
  'u': require('../../assets/sounds/u.mp3'),
  'e': require('../../assets/sounds/e.mp3'),
  'o': require('../../assets/sounds/o.mp3'),
  
  // か行
  'ka': require('../../assets/sounds/ka.mp3'),
  'ki': require('../../assets/sounds/ki.mp3'),
  'ku': require('../../assets/sounds/ku.mp3'),
  'ke': require('../../assets/sounds/ke.mp3'),
  'ko': require('../../assets/sounds/ko.mp3'),
  
  // さ行
  'sa': require('../../assets/sounds/sa.mp3'),
  'shi': require('../../assets/sounds/shi.mp3'),
  'su': require('../../assets/sounds/su.mp3'),
  'se': require('../../assets/sounds/se.mp3'),
  'so': require('../../assets/sounds/so.mp3'),
  
  // た行
  'ta': require('../../assets/sounds/ta.mp3'),
  'chi': require('../../assets/sounds/chi.mp3'),
  'tsu': require('../../assets/sounds/tsu.mp3'),
  'te': require('../../assets/sounds/te.mp3'),
  'to': require('../../assets/sounds/to.mp3'),
  
  // な行
  'na': require('../../assets/sounds/na.mp3'),
  'ni': require('../../assets/sounds/ni.mp3'),
  'nu': require('../../assets/sounds/nu.mp3'),
  'ne': require('../../assets/sounds/ne.mp3'),
  'no': require('../../assets/sounds/no.mp3'),
  
  // は行
  'ha': require('../../assets/sounds/ha.mp3'),
  'hi': require('../../assets/sounds/hi.mp3'),
  'fu': require('../../assets/sounds/fu.mp3'),
  'he': require('../../assets/sounds/he.mp3'),
  'ho': require('../../assets/sounds/ho.mp3'),
  
  // ま行
  'ma': require('../../assets/sounds/ma.mp3'),
  'mi': require('../../assets/sounds/mi.mp3'),
  'mu': require('../../assets/sounds/mu.mp3'),
  'me': require('../../assets/sounds/me.mp3'),
  'mo': require('../../assets/sounds/mo.mp3'),
  
  // や行
  'ya': require('../../assets/sounds/ya.mp3'),
  'yu': require('../../assets/sounds/yu.mp3'),
  'yo': require('../../assets/sounds/yo.mp3'),
  
  // ら行
  'ra': require('../../assets/sounds/ra.mp3'),
  'ri': require('../../assets/sounds/ri.mp3'),
  'ru': require('../../assets/sounds/ru.mp3'),
  're': require('../../assets/sounds/re.mp3'),
  'ro': require('../../assets/sounds/ro.mp3'),
  
  // わ行
  'wa': require('../../assets/sounds/wa.mp3'),
  'wo': require('../../assets/sounds/wo.mp3'),
  
  // ん
  'n': require('../../assets/sounds/n.mp3'),
  
  // 占位
  'placeholder': require('../../assets/sounds/placeholder.mp3')
};

class AudioService {
  private static instance: AudioService;
  private sound: Audio.Sound | null = null;
  
  private constructor() {}
  
  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }
  
  /**
   * 播放音频
   * @param audioKey 音频键名（不含.mp3后缀）
   * @returns 播放状态
   */
  public async playSound(audioKey: string): Promise<void> {
    try {
      // 清理现有的音频
      if (this.sound) {
        await this.sound.unloadAsync();
      }
      
      // 去掉可能存在的.mp3后缀
      const key = audioKey.replace('.mp3', '');
      console.log(`尝试播放音频: ${key}`);
      
      try {
        // 使用映射表获取音频模块
        const soundModule = this.getSoundModule(key);
        console.log('音频模块加载成功');
        
        const { sound: newSound } = await Audio.Sound.createAsync(soundModule);
        this.sound = newSound;
        
        await newSound.playAsync();
        return Promise.resolve();
      } catch (soundError) {
        console.error('无法加载指定音频，使用占位音频', soundError);
        // 加载失败时使用占位音频
        const { sound: fallbackSound } = await Audio.Sound.createAsync(
          audioMap['placeholder']
        );
        this.sound = fallbackSound;
        
        await fallbackSound.playAsync();
        return Promise.resolve();
      }
    } catch (error) {
      console.error('播放音频时出错:', error);
      return Promise.reject(error);
    }
  }
  
  /**
   * 获取音频模块
   * @param key 音频键名
   * @returns 音频模块
   */
  private getSoundModule(key: string): any {
    // 如果映射表中存在该音频键，则返回对应模块
    // 否则返回占位音频模块
    return audioMap[key] || audioMap['placeholder'];
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