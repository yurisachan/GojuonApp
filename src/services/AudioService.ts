import { Audio } from 'expo-av';

class AudioService {
  private sound: Audio.Sound | null = null;
  
  /**
   * 播放音频
   * @param audioFile 音频文件路径
   */
  async playSound(audioFile: string): Promise<void> {
    try {
      // 如果已有声音在播放，先卸载
      if (this.sound) {
        await this.sound.unloadAsync();
        this.sound = null;
      }
      
      // 在实际应用中，我们会提供真实的音频文件
      // 这里使用一个占位方法
      console.log(`播放音频: ${audioFile}`);
      
      // 下面的代码在实际应用中使用，需要真实的音频文件
      // const { sound } = await Audio.Sound.createAsync(require(audioFile));
      // this.sound = sound;
      // await sound.playAsync();
    } catch (error) {
      console.error('播放音频失败:', error);
    }
  }
  
  /**
   * 停止音频播放
   */
  async stopSound(): Promise<void> {
    try {
      if (this.sound) {
        await this.sound.stopAsync();
      }
    } catch (error) {
      console.error('停止音频失败:', error);
    }
  }
  
  /**
   * 卸载音频资源
   */
  async unloadSound(): Promise<void> {
    try {
      if (this.sound) {
        await this.sound.unloadAsync();
        this.sound = null;
      }
    } catch (error) {
      console.error('卸载音频失败:', error);
    }
  }
}

// 导出单例
export default new AudioService(); 