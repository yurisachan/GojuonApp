export interface ExampleWord {
  kana: string;
  romaji: string;
  meaning: string;
}

export interface HiraganaExample {
  kana: string;
  examples: ExampleWord[];
}

export const hiraganaExamples: HiraganaExample[] = [
  // あ行
  {
    kana: 'あ',
    examples: [
      { kana: 'あき', romaji: 'aki', meaning: '秋天' },
      { kana: 'あめ', romaji: 'ame', meaning: '雨' },
      { kana: 'あお', romaji: 'ao', meaning: '蓝色' }
    ]
  },
  {
    kana: 'い',
    examples: [
      { kana: 'いぬ', romaji: 'inu', meaning: '狗' },
      { kana: 'いけ', romaji: 'ike', meaning: '池塘' },
      { kana: 'いし', romaji: 'ishi', meaning: '石头' }
    ]
  },
  {
    kana: 'う',
    examples: [
      { kana: 'うみ', romaji: 'umi', meaning: '海' },
      { kana: 'うた', romaji: 'uta', meaning: '歌' },
      { kana: 'うさぎ', romaji: 'usagi', meaning: '兔子' }
    ]
  },
  {
    kana: 'え',
    examples: [
      { kana: 'えき', romaji: 'eki', meaning: '车站' },
      { kana: 'えいが', romaji: 'eiga', meaning: '电影' },
      { kana: 'えんぴつ', romaji: 'enpitsu', meaning: '铅笔' }
    ]
  },
  {
    kana: 'お',
    examples: [
      { kana: 'おかし', romaji: 'okashi', meaning: '点心' },
      { kana: 'おとこ', romaji: 'otoko', meaning: '男人' },
      { kana: 'おんな', romaji: 'onna', meaning: '女人' }
    ]
  },

  // か行
  {
    kana: 'か',
    examples: [
      { kana: 'かばん', romaji: 'kaban', meaning: '包' },
      { kana: 'かぜ', romaji: 'kaze', meaning: '风' },
      { kana: 'かみ', romaji: 'kami', meaning: '纸' }
    ]
  },
  {
    kana: 'き',
    examples: [
      { kana: 'きょう', romaji: 'kyou', meaning: '今天' },
      { kana: 'きた', romaji: 'kita', meaning: '北' },
      { kana: 'きのこ', romaji: 'kinoko', meaning: '蘑菇' }
    ]
  },
  {
    kana: 'く',
    examples: [
      { kana: 'くつ', romaji: 'kutsu', meaning: '鞋' },
      { kana: 'くも', romaji: 'kumo', meaning: '云' },
      { kana: 'くに', romaji: 'kuni', meaning: '国家' }
    ]
  },
  {
    kana: 'け',
    examples: [
      { kana: 'けいたい', romaji: 'keitai', meaning: '手机' },
      { kana: 'けさ', romaji: 'kesa', meaning: '今早' },
      { kana: 'けが', romaji: 'kega', meaning: '受伤' }
    ]
  },
  {
    kana: 'こ',
    examples: [
      { kana: 'こども', romaji: 'kodomo', meaning: '孩子' },
      { kana: 'こえ', romaji: 'koe', meaning: '声音' },
      { kana: 'こめ', romaji: 'kome', meaning: '米饭' }
    ]
  },

  // さ行
  {
    kana: 'さ',
    examples: [
      { kana: 'さくら', romaji: 'sakura', meaning: '樱花' },
      { kana: 'さかな', romaji: 'sakana', meaning: '鱼' },
      { kana: 'さる', romaji: 'saru', meaning: '猴子' }
    ]
  },
  {
    kana: 'し',
    examples: [
      { kana: 'しごと', romaji: 'shigoto', meaning: '工作' },
      { kana: 'しんぶん', romaji: 'shinbun', meaning: '报纸' },
      { kana: 'しろ', romaji: 'shiro', meaning: '白色' }
    ]
  },
  {
    kana: 'す',
    examples: [
      { kana: 'すし', romaji: 'sushi', meaning: '寿司' },
      { kana: 'すき', romaji: 'suki', meaning: '喜欢' },
      { kana: 'すみ', romaji: 'sumi', meaning: '墨水' }
    ]
  },
  {
    kana: 'せ',
    examples: [
      { kana: 'せんせい', romaji: 'sensei', meaning: '老师' },
      { kana: 'せかい', romaji: 'sekai', meaning: '世界' },
      { kana: 'せなか', romaji: 'senaka', meaning: '背部' }
    ]
  },
  {
    kana: 'そ',
    examples: [
      { kana: 'そら', romaji: 'sora', meaning: '天空' },
      { kana: 'そと', romaji: 'soto', meaning: '外面' },
      { kana: 'そば', romaji: 'soba', meaning: '荞麦面' }
    ]
  },

  // た行
  {
    kana: 'た',
    examples: [
      { kana: 'たべる', romaji: 'taberu', meaning: '吃' },
      { kana: 'たまご', romaji: 'tamago', meaning: '鸡蛋' },
      { kana: 'たなか', romaji: 'tanaka', meaning: '田中(姓氏)' }
    ]
  },
  {
    kana: 'ち',
    examples: [
      { kana: 'ちず', romaji: 'chizu', meaning: '地图' },
      { kana: 'ちかい', romaji: 'chikai', meaning: '近' },
      { kana: 'ちち', romaji: 'chichi', meaning: '父亲' }
    ]
  },
  {
    kana: 'つ',
    examples: [
      { kana: 'つき', romaji: 'tsuki', meaning: '月亮' },
      { kana: 'つくえ', romaji: 'tsukue', meaning: '桌子' },
      { kana: 'つかう', romaji: 'tsukau', meaning: '使用' }
    ]
  },
  {
    kana: 'て',
    examples: [
      { kana: 'てがみ', romaji: 'tegami', meaning: '信' },
      { kana: 'てんき', romaji: 'tenki', meaning: '天气' },
      { kana: 'てれび', romaji: 'terebi', meaning: '电视' }
    ]
  },
  {
    kana: 'と',
    examples: [
      { kana: 'とり', romaji: 'tori', meaning: '鸟' },
      { kana: 'とけい', romaji: 'tokei', meaning: '时钟' },
      { kana: 'とうきょう', romaji: 'toukyou', meaning: '东京' }
    ]
  },

  // な行
  {
    kana: 'な',
    examples: [
      { kana: 'なつ', romaji: 'natsu', meaning: '夏天' },
      { kana: 'なまえ', romaji: 'namae', meaning: '名字' },
      { kana: 'なに', romaji: 'nani', meaning: '什么' }
    ]
  },
  {
    kana: 'に',
    examples: [
      { kana: 'にく', romaji: 'niku', meaning: '肉' },
      { kana: 'にわ', romaji: 'niwa', meaning: '花园' },
      { kana: 'にほん', romaji: 'nihon', meaning: '日本' }
    ]
  },
  {
    kana: 'ぬ',
    examples: [
      { kana: 'ぬの', romaji: 'nuno', meaning: '布' },
      { kana: 'ぬま', romaji: 'numa', meaning: '沼泽' },
      { kana: 'いぬ', romaji: 'inu', meaning: '狗' }
    ]
  },
  {
    kana: 'ね',
    examples: [
      { kana: 'ねこ', romaji: 'neko', meaning: '猫' },
      { kana: 'ねだん', romaji: 'nedan', meaning: '价格' },
      { kana: 'ねつ', romaji: 'netsu', meaning: '发烧' }
    ]
  },
  {
    kana: 'の',
    examples: [
      { kana: 'のみもの', romaji: 'nomimono', meaning: '饮料' },
      { kana: 'のり', romaji: 'nori', meaning: '海苔' },
      { kana: 'のうと', romaji: 'nouto', meaning: '笔记本' }
    ]
  },

  // は行
  {
    kana: 'は',
    examples: [
      { kana: 'はな', romaji: 'hana', meaning: '花' },
      { kana: 'はし', romaji: 'hashi', meaning: '筷子' },
      { kana: 'はる', romaji: 'haru', meaning: '春天' }
    ]
  },
  {
    kana: 'ひ',
    examples: [
      { kana: 'ひと', romaji: 'hito', meaning: '人' },
      { kana: 'ひるごはん', romaji: 'hirugohan', meaning: '午餐' },
      { kana: 'ひがし', romaji: 'higashi', meaning: '东' }
    ]
  },
  {
    kana: 'ふ',
    examples: [
      { kana: 'ふゆ', romaji: 'fuyu', meaning: '冬天' },
      { kana: 'ふく', romaji: 'fuku', meaning: '衣服' },
      { kana: 'ふじさん', romaji: 'fujisan', meaning: '富士山' }
    ]
  },
  {
    kana: 'へ',
    examples: [
      { kana: 'へや', romaji: 'heya', meaning: '房间' },
      { kana: 'へび', romaji: 'hebi', meaning: '蛇' },
      { kana: 'べんきょう', romaji: 'benkyou', meaning: '学习' }
    ]
  },
  {
    kana: 'ほ',
    examples: [
      { kana: 'ほん', romaji: 'hon', meaning: '书' },
      { kana: 'ほし', romaji: 'hoshi', meaning: '星星' },
      { kana: 'ほっかいどう', romaji: 'hokkaidou', meaning: '北海道' }
    ]
  },

  // ま行
  {
    kana: 'ま',
    examples: [
      { kana: 'まど', romaji: 'mado', meaning: '窗户' },
      { kana: 'まち', romaji: 'machi', meaning: '城市' },
      { kana: 'まんが', romaji: 'manga', meaning: '漫画' }
    ]
  },
  {
    kana: 'み',
    examples: [
      { kana: 'みず', romaji: 'mizu', meaning: '水' },
      { kana: 'みどり', romaji: 'midori', meaning: '绿色' },
      { kana: 'みち', romaji: 'michi', meaning: '道路' }
    ]
  },
  {
    kana: 'む',
    examples: [
      { kana: 'むし', romaji: 'mushi', meaning: '昆虫' },
      { kana: 'むら', romaji: 'mura', meaning: '村庄' },
      { kana: 'むすめ', romaji: 'musume', meaning: '女儿' }
    ]
  },
  {
    kana: 'め',
    examples: [
      { kana: 'め', romaji: 'me', meaning: '眼睛' },
      { kana: 'めがね', romaji: 'megane', meaning: '眼镜' },
      { kana: 'あめ', romaji: 'ame', meaning: '雨' }
    ]
  },
  {
    kana: 'も',
    examples: [
      { kana: 'もり', romaji: 'mori', meaning: '森林' },
      { kana: 'もの', romaji: 'mono', meaning: '东西' },
      { kana: 'もも', romaji: 'momo', meaning: '桃子' }
    ]
  },

  // や行
  {
    kana: 'や',
    examples: [
      { kana: 'やま', romaji: 'yama', meaning: '山' },
      { kana: 'やさい', romaji: 'yasai', meaning: '蔬菜' },
      { kana: 'やすみ', romaji: 'yasumi', meaning: '休息' }
    ]
  },
  {
    kana: 'ゆ',
    examples: [
      { kana: 'ゆき', romaji: 'yuki', meaning: '雪' },
      { kana: 'ゆび', romaji: 'yubi', meaning: '手指' },
      { kana: 'ゆめ', romaji: 'yume', meaning: '梦' }
    ]
  },
  {
    kana: 'よ',
    examples: [
      { kana: 'よる', romaji: 'yoru', meaning: '夜晚' },
      { kana: 'よん', romaji: 'yon', meaning: '四' },
      { kana: 'よこ', romaji: 'yoko', meaning: '旁边' }
    ]
  },

  // ら行
  {
    kana: 'ら',
    examples: [
      { kana: 'らいねん', romaji: 'rainen', meaning: '明年' },
      { kana: 'らく', romaji: 'raku', meaning: '舒适' },
      { kana: 'らーめん', romaji: 'raamen', meaning: '拉面' }
    ]
  },
  {
    kana: 'り',
    examples: [
      { kana: 'りんご', romaji: 'ringo', meaning: '苹果' },
      { kana: 'りょこう', romaji: 'ryokou', meaning: '旅行' },
      { kana: 'りょうり', romaji: 'ryouri', meaning: '料理' }
    ]
  },
  {
    kana: 'る',
    examples: [
      { kana: 'るす', romaji: 'rusu', meaning: '不在家' },
      { kana: 'はる', romaji: 'haru', meaning: '春天' },
      { kana: 'かえる', romaji: 'kaeru', meaning: '青蛙' }
    ]
  },
  {
    kana: 'れ',
    examples: [
      { kana: 'れんしゅう', romaji: 'renshuu', meaning: '练习' },
      { kana: 'れきし', romaji: 'rekishi', meaning: '历史' },
      { kana: 'れすとらん', romaji: 'resutoran', meaning: '餐厅' }
    ]
  },
  {
    kana: 'ろ',
    examples: [
      { kana: 'ろく', romaji: 'roku', meaning: '六' },
      { kana: 'ろうそく', romaji: 'rousoku', meaning: '蜡烛' },
      { kana: 'ろぼっと', romaji: 'robotto', meaning: '机器人' }
    ]
  },

  // わ行
  {
    kana: 'わ',
    examples: [
      { kana: 'わたし', romaji: 'watashi', meaning: '我' },
      { kana: 'わすれる', romaji: 'wasureru', meaning: '忘记' },
      { kana: 'わらう', romaji: 'warau', meaning: '笑' }
    ]
  },
  {
    kana: 'を',
    examples: [
      { kana: 'ほんを', romaji: 'hon wo', meaning: '书(助词)' },
      { kana: 'みずを', romaji: 'mizu wo', meaning: '水(助词)' },
      { kana: 'くるまを', romaji: 'kuruma wo', meaning: '车(助词)' }
    ]
  },

  // ん
  {
    kana: 'ん',
    examples: [
      { kana: 'ほん', romaji: 'hon', meaning: '书' },
      { kana: 'でんわ', romaji: 'denwa', meaning: '电话' },
      { kana: 'せんせい', romaji: 'sensei', meaning: '老师' }
    ]
  }
];

// 获取特定平假名字符的示例单词
export const getHiraganaExamples = (kana: string): ExampleWord[] => {
  const examples = hiraganaExamples.find(item => item.kana === kana);
  return examples ? examples.examples : [];
}; 