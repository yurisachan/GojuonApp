// 词汇数据
// 包含基础日语词汇，用于测试对浊音、半浊音和拗音的理解

// 词汇类型
export type VocabularyType = 'basic' | 'dakuten' | 'handakuten' | 'yoon' | 'mixed';

// 词汇级别
export type VocabularyLevel = 'n5' | 'n4' | 'n3' | 'n2' | 'n1';

// 词汇项接口
export interface VocabularyItem {
  hiragana?: string;    // 平假名（可选）
  katakana?: string;    // 片假名（可选）
  kanji?: string;       // 汉字（可选）
  romaji: string;       // 罗马音
  meaning: string;      // 中文意思
  type: VocabularyType; // 词汇类型
  level: VocabularyLevel; // 词汇级别
}

// 词汇数据
export const vocabularyData: VocabularyItem[] = [
  // 基础词汇（仅使用基本五十音）
  { hiragana: "あさ", kanji: "朝", romaji: "asa", meaning: "早晨", type: "basic", level: "n5" },
  { hiragana: "いま", kanji: "今", romaji: "ima", meaning: "现在", type: "basic", level: "n5" },
  { hiragana: "うみ", kanji: "海", romaji: "umi", meaning: "海", type: "basic", level: "n5" },
  { hiragana: "え", kanji: "絵", romaji: "e", meaning: "图画", type: "basic", level: "n5" },
  { hiragana: "おと", kanji: "音", romaji: "oto", meaning: "声音", type: "basic", level: "n5" },
  { hiragana: "かさ", kanji: "傘", romaji: "kasa", meaning: "伞", type: "basic", level: "n5" },
  { hiragana: "くち", kanji: "口", romaji: "kuchi", meaning: "嘴", type: "basic", level: "n5" },
  { hiragana: "せなか", kanji: "背中", romaji: "senaka", meaning: "背部", type: "basic", level: "n5" },
  { hiragana: "そら", kanji: "空", romaji: "sora", meaning: "天空", type: "basic", level: "n5" },
  { hiragana: "たいよう", kanji: "太陽", romaji: "taiyou", meaning: "太阳", type: "basic", level: "n5" },
  
  // 浊音词汇
  { hiragana: "がっこう", kanji: "学校", romaji: "gakkou", meaning: "学校", type: "dakuten", level: "n5" },
  { hiragana: "ぎんこう", kanji: "銀行", romaji: "ginkou", meaning: "银行", type: "dakuten", level: "n5" },
  { hiragana: "ぐち", kanji: "愚痴", romaji: "guchi", meaning: "抱怨", type: "dakuten", level: "n4" },
  { hiragana: "げんき", kanji: "元気", romaji: "genki", meaning: "健康", type: "dakuten", level: "n5" },
  { hiragana: "ごはん", kanji: "御飯", romaji: "gohan", meaning: "饭", type: "dakuten", level: "n5" },
  { hiragana: "でんわ", kanji: "電話", romaji: "denwa", meaning: "电话", type: "dakuten", level: "n5" },
  { hiragana: "だいがく", kanji: "大学", romaji: "daigaku", meaning: "大学", type: "dakuten", level: "n5" },
  { hiragana: "ざっし", kanji: "雑誌", romaji: "zasshi", meaning: "杂志", type: "dakuten", level: "n5" },
  { hiragana: "びょういん", kanji: "病院", romaji: "byouin", meaning: "医院", type: "dakuten", level: "n5" },
  { hiragana: "べんきょう", kanji: "勉強", romaji: "benkyou", meaning: "学习", type: "dakuten", level: "n5" },
  
  // 半浊音词汇
  { hiragana: "ぱん", romaji: "pan", meaning: "面包", type: "handakuten", level: "n5" },
  { hiragana: "ぴあの", romaji: "piano", meaning: "钢琴", type: "handakuten", level: "n5" },
  { hiragana: "ぷーる", romaji: "pu-ru", meaning: "游泳池", type: "handakuten", level: "n5" },
  { hiragana: "ぺん", romaji: "pen", meaning: "钢笔", type: "handakuten", level: "n5" },
  { katakana: "パソコン", romaji: "pasokon", meaning: "个人电脑", type: "handakuten", level: "n5" },
  { katakana: "ペット", romaji: "petto", meaning: "宠物", type: "handakuten", level: "n5" },
  
  // 拗音词汇
  { hiragana: "しゃしん", kanji: "写真", romaji: "shashin", meaning: "照片", type: "yoon", level: "n5" },
  { hiragana: "しゅくだい", kanji: "宿題", romaji: "shukudai", meaning: "作业", type: "yoon", level: "n5" },
  { hiragana: "しょうゆ", kanji: "醤油", romaji: "shouyu", meaning: "酱油", type: "yoon", level: "n5" },
  { hiragana: "ちゃ", kanji: "茶", romaji: "cha", meaning: "茶", type: "yoon", level: "n5" },
  { hiragana: "きゅう", kanji: "九", romaji: "kyuu", meaning: "九", type: "yoon", level: "n5" },
  { hiragana: "りょこう", kanji: "旅行", romaji: "ryokou", meaning: "旅行", type: "yoon", level: "n5" },
  { hiragana: "じゃあ", romaji: "jaa", meaning: "那么", type: "yoon", level: "n5" },
  { hiragana: "きょう", kanji: "今日", romaji: "kyou", meaning: "今天", type: "yoon", level: "n5" },
  
  // 混合使用（浊音+拗音等）
  { hiragana: "じゅぎょう", kanji: "授業", romaji: "jugyou", meaning: "课", type: "mixed", level: "n5" },
  { hiragana: "びょうき", kanji: "病気", romaji: "byouki", meaning: "生病", type: "mixed", level: "n5" },
  { hiragana: "ぎゅうにゅう", kanji: "牛乳", romaji: "gyuunyuu", meaning: "牛奶", type: "mixed", level: "n5" },
  { hiragana: "じゅうしょ", kanji: "住所", romaji: "juusho", meaning: "地址", type: "mixed", level: "n5" },
  { hiragana: "しゅっぱつ", kanji: "出発", romaji: "shuppatsu", meaning: "出发", type: "mixed", level: "n5" },
  { katakana: "キャンセル", romaji: "kyanseru", meaning: "取消", type: "mixed", level: "n5" },
  { katakana: "ジュース", romaji: "ju-su", meaning: "果汁", type: "mixed", level: "n5" },
  { katakana: "ニュース", romaji: "nyu-su", meaning: "新闻", type: "mixed", level: "n5" },
  { katakana: "チョコレート", romaji: "chokore-to", meaning: "巧克力", type: "mixed", level: "n5" },
  { katakana: "ピアノ", romaji: "piano", meaning: "钢琴", type: "mixed", level: "n5" }
];

// 按类型分组的词汇
export const vocabularyByType = {
  basic: vocabularyData.filter(item => item.type === 'basic'),
  dakuten: vocabularyData.filter(item => item.type === 'dakuten'),
  handakuten: vocabularyData.filter(item => item.type === 'handakuten'),
  yoon: vocabularyData.filter(item => item.type === 'yoon'),
  mixed: vocabularyData.filter(item => item.type === 'mixed')
};

// 按级别分组的词汇
export const vocabularyByLevel = {
  n5: vocabularyData.filter(item => item.level === 'n5'),
  n4: vocabularyData.filter(item => item.level === 'n4'),
  n3: vocabularyData.filter(item => item.level === 'n3'),
  n2: vocabularyData.filter(item => item.level === 'n2'),
  n1: vocabularyData.filter(item => item.level === 'n1')
};

// 词汇类型说明
export const vocabularyTypes = {
  basic: {
    name: "基础五十音",
    description: "仅使用基本五十音图的词汇",
  },
  dakuten: {
    name: "浊音词汇",
    description: "包含浊音的词汇",
  },
  handakuten: {
    name: "半浊音词汇",
    description: "包含半浊音的词汇",
  },
  yoon: {
    name: "拗音词汇",
    description: "包含拗音的词汇",
  },
  mixed: {
    name: "混合类型",
    description: "包含多种假名类型的词汇",
  }
}; 