export interface ExampleWord {
  kana: string;
  romaji: string;
  meaning: string;
}

export interface KatakanaExample {
  kana: string;
  examples: ExampleWord[];
}

export const katakanaExamples: KatakanaExample[] = [
  // ア行
  {
    kana: 'ア',
    examples: [
      { kana: 'アイス', romaji: 'aisu', meaning: '冰淇淋' },
      { kana: 'アニメ', romaji: 'anime', meaning: '动画' },
      { kana: 'アルバム', romaji: 'arubamu', meaning: '相册' }
    ]
  },
  {
    kana: 'イ',
    examples: [
      { kana: 'イタリア', romaji: 'itaria', meaning: '意大利' },
      { kana: 'イメージ', romaji: 'imeeji', meaning: '印象、形象' },
      { kana: 'インターネット', romaji: 'intaanetto', meaning: '互联网' }
    ]
  },
  {
    kana: 'ウ',
    examples: [
      { kana: 'ウイルス', romaji: 'uirusu', meaning: '病毒' },
      { kana: 'ウエスト', romaji: 'uesuto', meaning: '腰围' },
      { kana: 'ウール', romaji: 'uuru', meaning: '羊毛' }
    ]
  },
  {
    kana: 'エ',
    examples: [
      { kana: 'エアコン', romaji: 'eakon', meaning: '空调' },
      { kana: 'エネルギー', romaji: 'enerugii', meaning: '能源' },
      { kana: 'エレベーター', romaji: 'erebeetaa', meaning: '电梯' }
    ]
  },
  {
    kana: 'オ',
    examples: [
      { kana: 'オレンジ', romaji: 'orenji', meaning: '橙子' },
      { kana: 'オフィス', romaji: 'ofisu', meaning: '办公室' },
      { kana: 'オートバイ', romaji: 'ootobai', meaning: '摩托车' }
    ]
  },

  // カ行
  {
    kana: 'カ',
    examples: [
      { kana: 'カメラ', romaji: 'kamera', meaning: '相机' },
      { kana: 'カード', romaji: 'kaado', meaning: '卡片' },
      { kana: 'カレー', romaji: 'karee', meaning: '咖喱' }
    ]
  },
  {
    kana: 'キ',
    examples: [
      { kana: 'キーボード', romaji: 'kiiboodo', meaning: '键盘' },
      { kana: 'キャンプ', romaji: 'kyanpu', meaning: '野营' },
      { kana: 'キロメートル', romaji: 'kiromeesuru', meaning: '公里' }
    ]
  },
  {
    kana: 'ク',
    examples: [
      { kana: 'クラス', romaji: 'kurasu', meaning: '班级' },
      { kana: 'クリスマス', romaji: 'kurisumasu', meaning: '圣诞节' },
      { kana: 'クッキー', romaji: 'kukkii', meaning: '饼干' }
    ]
  },
  {
    kana: 'ケ',
    examples: [
      { kana: 'ケーキ', romaji: 'keeki', meaning: '蛋糕' },
      { kana: 'ケータイ', romaji: 'keetai', meaning: '手机' },
      { kana: 'ケース', romaji: 'keesu', meaning: '盒子、套' }
    ]
  },
  {
    kana: 'コ',
    examples: [
      { kana: 'コーヒー', romaji: 'koohii', meaning: '咖啡' },
      { kana: 'コンピューター', romaji: 'konpyuutaa', meaning: '电脑' },
      { kana: 'コピー', romaji: 'kopii', meaning: '复印' }
    ]
  },

  // サ行
  {
    kana: 'サ',
    examples: [
      { kana: 'サッカー', romaji: 'sakkaa', meaning: '足球' },
      { kana: 'サラダ', romaji: 'sarada', meaning: '沙拉' },
      { kana: 'サンドイッチ', romaji: 'sandoicchi', meaning: '三明治' }
    ]
  },
  {
    kana: 'シ',
    examples: [
      { kana: 'シャツ', romaji: 'shatsu', meaning: '衬衫' },
      { kana: 'シャワー', romaji: 'shawaa', meaning: '淋浴' },
      { kana: 'システム', romaji: 'shisutemu', meaning: '系统' }
    ]
  },
  {
    kana: 'ス',
    examples: [
      { kana: 'スマホ', romaji: 'sumaho', meaning: '智能手机' },
      { kana: 'スーパー', romaji: 'suupaa', meaning: '超市' },
      { kana: 'スポーツ', romaji: 'supootsu', meaning: '体育运动' }
    ]
  },
  {
    kana: 'セ',
    examples: [
      { kana: 'セーター', romaji: 'seetaa', meaning: '毛衣' },
      { kana: 'センター', romaji: 'sentaa', meaning: '中心' },
      { kana: 'セット', romaji: 'setto', meaning: '套装' }
    ]
  },
  {
    kana: 'ソ',
    examples: [
      { kana: 'ソファ', romaji: 'sofa', meaning: '沙发' },
      { kana: 'ソフト', romaji: 'sofuto', meaning: '软件' },
      { kana: 'ソース', romaji: 'soosu', meaning: '酱料' }
    ]
  },

  // タ行
  {
    kana: 'タ',
    examples: [
      { kana: 'タクシー', romaji: 'takushii', meaning: '出租车' },
      { kana: 'タオル', romaji: 'taoru', meaning: '毛巾' },
      { kana: 'タイプ', romaji: 'taipu', meaning: '类型' }
    ]
  },
  {
    kana: 'チ',
    examples: [
      { kana: 'チーズ', romaji: 'chiizu', meaning: '奶酪' },
      { kana: 'チケット', romaji: 'chiketto', meaning: '票' },
      { kana: 'チョコレート', romaji: 'chokoreeto', meaning: '巧克力' }
    ]
  },
  {
    kana: 'ツ',
    examples: [
      { kana: 'ツアー', romaji: 'tsuaa', meaning: '旅行团' },
      { kana: 'ツイッター', romaji: 'tsuittaa', meaning: '推特' },
      { kana: 'ツール', romaji: 'tsuuru', meaning: '工具' }
    ]
  },
  {
    kana: 'テ',
    examples: [
      { kana: 'テレビ', romaji: 'terebi', meaning: '电视' },
      { kana: 'テニス', romaji: 'tenisu', meaning: '网球' },
      { kana: 'テスト', romaji: 'tesuto', meaning: '测试' }
    ]
  },
  {
    kana: 'ト',
    examples: [
      { kana: 'トマト', romaji: 'tomato', meaning: '番茄' },
      { kana: 'トースト', romaji: 'toosuto', meaning: '烤面包' },
      { kana: 'トイレ', romaji: 'toire', meaning: '厕所' }
    ]
  },

  // ナ行
  {
    kana: 'ナ',
    examples: [
      { kana: 'ナイフ', romaji: 'naifu', meaning: '刀' },
      { kana: 'ナンバー', romaji: 'nanbaa', meaning: '号码' },
      { kana: 'ナイロン', romaji: 'nairon', meaning: '尼龙' }
    ]
  },
  {
    kana: 'ニ',
    examples: [
      { kana: 'ニュース', romaji: 'nyuusu', meaning: '新闻' },
      { kana: 'ニューヨーク', romaji: 'nyuuyooku', meaning: '纽约' },
      { kana: 'ニックネーム', romaji: 'nikkuneemu', meaning: '昵称' }
    ]
  },
  {
    kana: 'ヌ',
    examples: [
      { kana: 'ヌードル', romaji: 'nuudoru', meaning: '面条' },
      { kana: 'メヌー', romaji: 'menyuu', meaning: '菜单' },
      { kana: 'アヌ', romaji: 'anu', meaning: '阿努(人名)' }
    ]
  },
  {
    kana: 'ネ',
    examples: [
      { kana: 'ネクタイ', romaji: 'nekutai', meaning: '领带' },
      { kana: 'ネット', romaji: 'netto', meaning: '网络' },
      { kana: 'ネガティブ', romaji: 'negatibu', meaning: '消极的' }
    ]
  },
  {
    kana: 'ノ',
    examples: [
      { kana: 'ノート', romaji: 'nooto', meaning: '笔记本' },
      { kana: 'ノルウェー', romaji: 'noruuee', meaning: '挪威' },
      { kana: 'ノンアルコール', romaji: 'non arukooru', meaning: '无酒精的' }
    ]
  },

  // ハ行
  {
    kana: 'ハ',
    examples: [
      { kana: 'ハンバーガー', romaji: 'hanbaagaa', meaning: '汉堡包' },
      { kana: 'ハロウィン', romaji: 'harouin', meaning: '万圣节' },
      { kana: 'ハイテク', romaji: 'haiteku', meaning: '高科技' }
    ]
  },
  {
    kana: 'ヒ',
    examples: [
      { kana: 'ヒント', romaji: 'hinto', meaning: '提示' },
      { kana: 'ヒーロー', romaji: 'hiiroo', meaning: '英雄' },
      { kana: 'ヒーター', romaji: 'hiitaa', meaning: '暖气' }
    ]
  },
  {
    kana: 'フ',
    examples: [
      { kana: 'フランス', romaji: 'furansu', meaning: '法国' },
      { kana: 'フルーツ', romaji: 'furuutsu', meaning: '水果' },
      { kana: 'フライト', romaji: 'furaito', meaning: '飞行' }
    ]
  },
  {
    kana: 'ヘ',
    examples: [
      { kana: 'ヘアスタイル', romaji: 'heasutairu', meaning: '发型' },
      { kana: 'ページ', romaji: 'peeji', meaning: '页' },
      { kana: 'ヘルメット', romaji: 'herumetto', meaning: '头盔' }
    ]
  },
  {
    kana: 'ホ',
    examples: [
      { kana: 'ホテル', romaji: 'hoteru', meaning: '酒店' },
      { kana: 'ホームページ', romaji: 'hoomu peeji', meaning: '主页' },
      { kana: 'ホッチキス', romaji: 'hocchikisu', meaning: '订书机' }
    ]
  },

  // マ行
  {
    kana: 'マ',
    examples: [
      { kana: 'マウス', romaji: 'mausu', meaning: '鼠标' },
      { kana: 'マンション', romaji: 'manshon', meaning: '公寓' },
      { kana: 'マフラー', romaji: 'mafuraa', meaning: '围巾' }
    ]
  },
  {
    kana: 'ミ',
    examples: [
      { kana: 'ミュージック', romaji: 'myuujikku', meaning: '音乐' },
      { kana: 'ミルク', romaji: 'miruku', meaning: '牛奶' },
      { kana: 'ミーティング', romaji: 'miitingu', meaning: '会议' }
    ]
  },
  {
    kana: 'ム',
    examples: [
      { kana: 'ムード', romaji: 'muudo', meaning: '氛围' },
      { kana: 'ムービー', romaji: 'muubii', meaning: '电影' },
      { kana: 'ムダ', romaji: 'muda', meaning: '浪费' }
    ]
  },
  {
    kana: 'メ',
    examples: [
      { kana: 'メール', romaji: 'meeru', meaning: '邮件' },
      { kana: 'メニュー', romaji: 'menyuu', meaning: '菜单' },
      { kana: 'メッセージ', romaji: 'messeeji', meaning: '消息' }
    ]
  },
  {
    kana: 'モ',
    examples: [
      { kana: 'モデル', romaji: 'moderu', meaning: '模特' },
      { kana: 'モバイル', romaji: 'mobairu', meaning: '移动设备' },
      { kana: 'モーター', romaji: 'mootaa', meaning: '马达' }
    ]
  },

  // ヤ行
  {
    kana: 'ヤ',
    examples: [
      { kana: 'ヤクルト', romaji: 'yakuruto', meaning: '养乐多' },
      { kana: 'ヤフー', romaji: 'yahuu', meaning: '雅虎' },
      { kana: 'ヤンキー', romaji: 'yankii', meaning: '不良少年' }
    ]
  },
  {
    kana: 'ユ',
    examples: [
      { kana: 'ユーザー', romaji: 'yuuzaa', meaning: '用户' },
      { kana: 'ユニーク', romaji: 'yuniiku', meaning: '独特的' },
      { kana: 'ユニフォーム', romaji: 'yunifoomu', meaning: '制服' }
    ]
  },
  {
    kana: 'ヨ',
    examples: [
      { kana: 'ヨーグルト', romaji: 'yooguruto', meaning: '酸奶' },
      { kana: 'ヨーロッパ', romaji: 'yooroppa', meaning: '欧洲' },
      { kana: 'ヨット', romaji: 'yotto', meaning: '游艇' }
    ]
  },

  // ラ行
  {
    kana: 'ラ',
    examples: [
      { kana: 'ラジオ', romaji: 'rajio', meaning: '收音机' },
      { kana: 'ラーメン', romaji: 'raamen', meaning: '拉面' },
      { kana: 'ラッキー', romaji: 'rakkii', meaning: '幸运的' }
    ]
  },
  {
    kana: 'リ',
    examples: [
      { kana: 'リンク', romaji: 'rinku', meaning: '链接' },
      { kana: 'リサイクル', romaji: 'risaikuru', meaning: '回收' },
      { kana: 'リモコン', romaji: 'rimokon', meaning: '遥控器' }
    ]
  },
  {
    kana: 'ル',
    examples: [
      { kana: 'ルール', romaji: 'ruuru', meaning: '规则' },
      { kana: 'ルーム', romaji: 'ruumu', meaning: '房间' },
      { kana: 'ルーマニア', romaji: 'ruumania', meaning: '罗马尼亚' }
    ]
  },
  {
    kana: 'レ',
    examples: [
      { kana: 'レストラン', romaji: 'resutoran', meaning: '餐厅' },
      { kana: 'レベル', romaji: 'reberu', meaning: '水平' },
      { kana: 'レンタカー', romaji: 'rentakaa', meaning: '租车' }
    ]
  },
  {
    kana: 'ロ',
    examples: [
      { kana: 'ロボット', romaji: 'robotto', meaning: '机器人' },
      { kana: 'ロック', romaji: 'rokku', meaning: '摇滚' },
      { kana: 'ロシア', romaji: 'roshia', meaning: '俄罗斯' }
    ]
  },

  // ワ行
  {
    kana: 'ワ',
    examples: [
      { kana: 'ワイン', romaji: 'wain', meaning: '葡萄酒' },
      { kana: 'ワールド', romaji: 'waarudo', meaning: '世界' },
      { kana: 'ワンピース', romaji: 'wanpiisu', meaning: '连衣裙' }
    ]
  },
  {
    kana: 'ヲ',
    examples: [
      { kana: 'ヲタク', romaji: 'otaku', meaning: '宅男' },
      { kana: 'カラヲケ', romaji: 'karaoke', meaning: '卡拉OK' },
      { kana: 'ガソリンヲ', romaji: 'gasorin wo', meaning: '汽油(助词)' }
    ]
  },

  // ン
  {
    kana: 'ン',
    examples: [
      { kana: 'パン', romaji: 'pan', meaning: '面包' },
      { kana: 'テレビゲーム', romaji: 'terebi geemu', meaning: '电视游戏' },
      { kana: 'ボタン', romaji: 'botan', meaning: '按钮' }
    ]
  }
];

// 获取特定片假名字符的示例单词
export const getKatakanaExamples = (kana: string): ExampleWord[] => {
  const examples = katakanaExamples.find(item => item.kana === kana);
  return examples ? examples.examples : [];
}; 