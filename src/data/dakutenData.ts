// 浊音和半浊音数据
// 格式: { kana: "假名字符", romaji: "罗马音", dakutenType: "浊音类型" }

type DakutenType = 'dakuten' | 'handakuten'; // 浊音或半浊音

// 浊音/半浊音数据项接口
export interface DakutenItem {
  kana: string;
  romaji: string;
  original?: string; // 原始假名（清音）
}

export interface DakutenTypes {
  [key: string]: {
    description: string;
  };
}

// 浊音和半浊音的类型说明
export const dakutenTypes: DakutenTypes = {
  dakuten: {
    description: "浊音是通过在清音假名上加「゛」符号而形成的，发音较重，如「か → が」"
  },
  handakuten: {
    description: "半浊音是通过在「は行」假名上加「゜」符号而形成的，发音介于清音和浊音之间，如「は → ぱ」"
  }
};

// 平假名浊音/半浊音数据
export const hiraganaDakutenData: DakutenItem[] = [
  // が行
  { kana: 'が', romaji: 'ga', original: 'か' },
  { kana: 'ぎ', romaji: 'gi', original: 'き' },
  { kana: 'ぐ', romaji: 'gu', original: 'く' },
  { kana: 'げ', romaji: 'ge', original: 'け' },
  { kana: 'ご', romaji: 'go', original: 'こ' },
  
  // ざ行
  { kana: 'ざ', romaji: 'za', original: 'さ' },
  { kana: 'じ', romaji: 'ji', original: 'し' },
  { kana: 'ず', romaji: 'zu', original: 'す' },
  { kana: 'ぜ', romaji: 'ze', original: 'せ' },
  { kana: 'ぞ', romaji: 'zo', original: 'そ' },
  
  // だ行
  { kana: 'だ', romaji: 'da', original: 'た' },
  { kana: 'ぢ', romaji: 'ji', original: 'ち' },
  { kana: 'づ', romaji: 'zu', original: 'つ' },
  { kana: 'で', romaji: 'de', original: 'て' },
  { kana: 'ど', romaji: 'do', original: 'と' },
  
  // ば行
  { kana: 'ば', romaji: 'ba', original: 'は' },
  { kana: 'び', romaji: 'bi', original: 'ひ' },
  { kana: 'ぶ', romaji: 'bu', original: 'ふ' },
  { kana: 'べ', romaji: 'be', original: 'へ' },
  { kana: 'ぼ', romaji: 'bo', original: 'ほ' },
  
  // ぱ行
  { kana: 'ぱ', romaji: 'pa', original: 'は' },
  { kana: 'ぴ', romaji: 'pi', original: 'ひ' },
  { kana: 'ぷ', romaji: 'pu', original: 'ふ' },
  { kana: 'ぺ', romaji: 'pe', original: 'へ' },
  { kana: 'ぽ', romaji: 'po', original: 'ほ' }
];

// 片假名浊音/半浊音数据
export const katakanaDakutenData: DakutenItem[] = [
  // ガ行
  { kana: 'ガ', romaji: 'ga', original: 'カ' },
  { kana: 'ギ', romaji: 'gi', original: 'キ' },
  { kana: 'グ', romaji: 'gu', original: 'ク' },
  { kana: 'ゲ', romaji: 'ge', original: 'ケ' },
  { kana: 'ゴ', romaji: 'go', original: 'コ' },
  
  // ザ行
  { kana: 'ザ', romaji: 'za', original: 'サ' },
  { kana: 'ジ', romaji: 'ji', original: 'シ' },
  { kana: 'ズ', romaji: 'zu', original: 'ス' },
  { kana: 'ゼ', romaji: 'ze', original: 'セ' },
  { kana: 'ゾ', romaji: 'zo', original: 'ソ' },
  
  // ダ行
  { kana: 'ダ', romaji: 'da', original: 'タ' },
  { kana: 'ヂ', romaji: 'ji', original: 'チ' },
  { kana: 'ヅ', romaji: 'zu', original: 'ツ' },
  { kana: 'デ', romaji: 'de', original: 'テ' },
  { kana: 'ド', romaji: 'do', original: 'ト' },
  
  // バ行
  { kana: 'バ', romaji: 'ba', original: 'ハ' },
  { kana: 'ビ', romaji: 'bi', original: 'ヒ' },
  { kana: 'ブ', romaji: 'bu', original: 'フ' },
  { kana: 'ベ', romaji: 'be', original: 'ヘ' },
  { kana: 'ボ', romaji: 'bo', original: 'ホ' },
  
  // パ行
  { kana: 'パ', romaji: 'pa', original: 'ハ' },
  { kana: 'ピ', romaji: 'pi', original: 'ヒ' },
  { kana: 'プ', romaji: 'pu', original: 'フ' },
  { kana: 'ペ', romaji: 'pe', original: 'ヘ' },
  { kana: 'ポ', romaji: 'po', original: 'ホ' }
];

// 按行分组的平假名浊音/半浊音数据
export const groupedHiraganaDakutenData: { [key: string]: DakutenItem[] } = {
  "が行": hiraganaDakutenData.slice(0, 5),
  "ざ行": hiraganaDakutenData.slice(5, 10),
  "だ行": hiraganaDakutenData.slice(10, 15),
  "ば行": hiraganaDakutenData.slice(15, 20),
  "ぱ行": hiraganaDakutenData.slice(20, 25)
};

// 按行分组的片假名浊音/半浊音数据
export const groupedKatakanaDakutenData: { [key: string]: DakutenItem[] } = {
  "ガ行": katakanaDakutenData.slice(0, 5),
  "ザ行": katakanaDakutenData.slice(5, 10),
  "ダ行": katakanaDakutenData.slice(10, 15),
  "バ行": katakanaDakutenData.slice(15, 20),
  "パ行": katakanaDakutenData.slice(20, 25)
}; 
 