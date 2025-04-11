// 拗音数据
// 格式: { kana: "假名字符", romaji: "罗马音" }

// 拗音数据项接口
export interface YoonItem {
  kana: string;
  romaji: string;
  description?: string;
}

export interface YoonGroup {
  title: string;
  type: 'seion' | 'dakuon' | 'handakuon';
  items: YoonItem[];
}

// 拗音类型说明
export const yoonTypes = {
  seion: {
    description: "清音拗音是由「い」段假名与小写的「や」「ゆ」「よ」组合形成的。"
  },
  dakuon: {
    description: "浊音拗音是由浊音假名与小写的「や」「ゆ」「よ」组合形成的。"
  },
  handakuon: {
    description: "半浊音拗音是由半浊音假名与小写的「や」「ゆ」「よ」组合形成的。"
  }
};

// 平假名拗音数据
export const hiraganaYoonData: YoonGroup[] = [
  // 清音拗音
  {
    title: "きゃ行",
    type: "seion",
    items: [
      { kana: "きゃ", romaji: "kya" },
      { kana: "きゅ", romaji: "kyu" },
      { kana: "きょ", romaji: "kyo" }
    ]
  },
  {
    title: "しゃ行",
    type: "seion",
    items: [
      { kana: "しゃ", romaji: "sha" },
      { kana: "しゅ", romaji: "shu" },
      { kana: "しょ", romaji: "sho" }
    ]
  },
  {
    title: "ちゃ行",
    type: "seion",
    items: [
      { kana: "ちゃ", romaji: "cha" },
      { kana: "ちゅ", romaji: "chu" },
      { kana: "ちょ", romaji: "cho" }
    ]
  },
  {
    title: "にゃ行",
    type: "seion",
    items: [
      { kana: "にゃ", romaji: "nya" },
      { kana: "にゅ", romaji: "nyu" },
      { kana: "にょ", romaji: "nyo" }
    ]
  },
  {
    title: "ひゃ行",
    type: "seion",
    items: [
      { kana: "ひゃ", romaji: "hya" },
      { kana: "ひゅ", romaji: "hyu" },
      { kana: "ひょ", romaji: "hyo" }
    ]
  },
  {
    title: "みゃ行",
    type: "seion",
    items: [
      { kana: "みゃ", romaji: "mya" },
      { kana: "みゅ", romaji: "myu" },
      { kana: "みょ", romaji: "myo" }
    ]
  },
  {
    title: "りゃ行",
    type: "seion",
    items: [
      { kana: "りゃ", romaji: "rya" },
      { kana: "りゅ", romaji: "ryu" },
      { kana: "りょ", romaji: "ryo" }
    ]
  },
  
  // 浊音拗音
  {
    title: "ぎゃ行",
    type: "dakuon",
    items: [
      { kana: "ぎゃ", romaji: "gya" },
      { kana: "ぎゅ", romaji: "gyu" },
      { kana: "ぎょ", romaji: "gyo" }
    ]
  },
  {
    title: "じゃ行",
    type: "dakuon",
    items: [
      { kana: "じゃ", romaji: "ja" },
      { kana: "じゅ", romaji: "ju" },
      { kana: "じょ", romaji: "jo" }
    ]
  },
  {
    title: "びゃ行",
    type: "dakuon",
    items: [
      { kana: "びゃ", romaji: "bya" },
      { kana: "びゅ", romaji: "byu" },
      { kana: "びょ", romaji: "byo" }
    ]
  },
  
  // 半浊音拗音
  {
    title: "ぴゃ行",
    type: "handakuon",
    items: [
      { kana: "ぴゃ", romaji: "pya" },
      { kana: "ぴゅ", romaji: "pyu" },
      { kana: "ぴょ", romaji: "pyo" }
    ]
  }
];

// 片假名拗音数据
export const katakanaYoonData: YoonGroup[] = [
  // 清音拗音
  {
    title: "キャ行",
    type: "seion",
    items: [
      { kana: "キャ", romaji: "kya" },
      { kana: "キュ", romaji: "kyu" },
      { kana: "キョ", romaji: "kyo" }
    ]
  },
  {
    title: "シャ行",
    type: "seion",
    items: [
      { kana: "シャ", romaji: "sha" },
      { kana: "シュ", romaji: "shu" },
      { kana: "ショ", romaji: "sho" }
    ]
  },
  {
    title: "チャ行",
    type: "seion",
    items: [
      { kana: "チャ", romaji: "cha" },
      { kana: "チュ", romaji: "chu" },
      { kana: "チョ", romaji: "cho" }
    ]
  },
  {
    title: "ニャ行",
    type: "seion",
    items: [
      { kana: "ニャ", romaji: "nya" },
      { kana: "ニュ", romaji: "nyu" },
      { kana: "ニョ", romaji: "nyo" }
    ]
  },
  {
    title: "ヒャ行",
    type: "seion",
    items: [
      { kana: "ヒャ", romaji: "hya" },
      { kana: "ヒュ", romaji: "hyu" },
      { kana: "ヒョ", romaji: "hyo" }
    ]
  },
  {
    title: "ミャ行",
    type: "seion",
    items: [
      { kana: "ミャ", romaji: "mya" },
      { kana: "ミュ", romaji: "myu" },
      { kana: "ミョ", romaji: "myo" }
    ]
  },
  {
    title: "リャ行",
    type: "seion",
    items: [
      { kana: "リャ", romaji: "rya" },
      { kana: "リュ", romaji: "ryu" },
      { kana: "リョ", romaji: "ryo" }
    ]
  },
  
  // 浊音拗音
  {
    title: "ギャ行",
    type: "dakuon",
    items: [
      { kana: "ギャ", romaji: "gya" },
      { kana: "ギュ", romaji: "gyu" },
      { kana: "ギョ", romaji: "gyo" }
    ]
  },
  {
    title: "ジャ行",
    type: "dakuon",
    items: [
      { kana: "ジャ", romaji: "ja" },
      { kana: "ジュ", romaji: "ju" },
      { kana: "ジョ", romaji: "jo" }
    ]
  },
  {
    title: "ビャ行",
    type: "dakuon",
    items: [
      { kana: "ビャ", romaji: "bya" },
      { kana: "ビュ", romaji: "byu" },
      { kana: "ビョ", romaji: "byo" }
    ]
  },
  
  // 半浊音拗音
  {
    title: "ピャ行",
    type: "handakuon",
    items: [
      { kana: "ピャ", romaji: "pya" },
      { kana: "ピュ", romaji: "pyu" },
      { kana: "ピョ", romaji: "pyo" }
    ]
  }
];

// 按行分组
export const groupedHiraganaYoonData = {
  "清音拗音": {
    "きゃ行": hiraganaYoonData.filter(item => item.title === "きゃ行"),
    "しゃ行": hiraganaYoonData.filter(item => item.title === "しゃ行"),
    "ちゃ行": hiraganaYoonData.filter(item => item.title === "ちゃ行"),
    "にゃ行": hiraganaYoonData.filter(item => item.title === "にゃ行"),
    "ひゃ行": hiraganaYoonData.filter(item => item.title === "ひゃ行"),
    "みゃ行": hiraganaYoonData.filter(item => item.title === "みゃ行"),
    "りゃ行": hiraganaYoonData.filter(item => item.title === "りゃ行")
  },
  "浊音拗音": {
    "ぎゃ行": hiraganaYoonData.filter(item => item.title === "ぎゃ行"),
    "じゃ行": hiraganaYoonData.filter(item => item.title === "じゃ行"),
    "びゃ行": hiraganaYoonData.filter(item => item.title === "びゃ行")
  },
  "半浊音拗音": {
    "ぴゃ行": hiraganaYoonData.filter(item => item.title === "ぴゃ行")
  }
};

export const groupedKatakanaYoonData = {
  "清音拗音": {
    "キャ行": katakanaYoonData.filter(item => item.title === "キャ行"),
    "シャ行": katakanaYoonData.filter(item => item.title === "シャ行"),
    "チャ行": katakanaYoonData.filter(item => item.title === "チャ行"),
    "ニャ行": katakanaYoonData.filter(item => item.title === "ニャ行"),
    "ヒャ行": katakanaYoonData.filter(item => item.title === "ヒャ行"),
    "ミャ行": katakanaYoonData.filter(item => item.title === "ミャ行"),
    "リャ行": katakanaYoonData.filter(item => item.title === "リャ行")
  },
  "浊音拗音": {
    "ギャ行": katakanaYoonData.filter(item => item.title === "ギャ行"),
    "ジャ行": katakanaYoonData.filter(item => item.title === "ジャ行"),
    "ビャ行": katakanaYoonData.filter(item => item.title === "ビャ行")
  },
  "半浊音拗音": {
    "ピャ行": katakanaYoonData.filter(item => item.title === "ピャ行")
  }
};

// 拗音说明
export const yoonDescription = {
  name: "拗音",
  description: "拗音是由一个假名的「イ段」（i段，如き、し、に等）加上「ヤ行」的「ャ」、「ュ」、「ョ」（小写的ya、yu、yo）组成的发音。",
  example: "き(ki) + や(ya) → きゃ(kya)",
  types: {
    regular: "清音拗音 - 基本拗音，如きゃ(kya)、しゃ(sha)",
    dakuten: "浊音拗音 - 浊音加拗音，如ぎゃ(gya)、じゃ(ja)",
    handakuten: "半浊音拗音 - 半浊音加拗音，如ぴゃ(pya)"
  }
}; 