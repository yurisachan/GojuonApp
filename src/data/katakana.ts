export interface KatakanaChar {
  kana: string;
  romaji: string;
  row: string;
  column: string;
  audio: string;
}

export const katakanaData: KatakanaChar[] = [
  // ア行
  { kana: 'ア', romaji: 'a', row: 'ア', column: 'ア', audio: 'a.mp3' },
  { kana: 'イ', romaji: 'i', row: 'ア', column: 'イ', audio: 'i.mp3' },
  { kana: 'ウ', romaji: 'u', row: 'ア', column: 'ウ', audio: 'u.mp3' },
  { kana: 'エ', romaji: 'e', row: 'ア', column: 'エ', audio: 'e.mp3' },
  { kana: 'オ', romaji: 'o', row: 'ア', column: 'オ', audio: 'o.mp3' },
  
  // カ行
  { kana: 'カ', romaji: 'ka', row: 'カ', column: 'ア', audio: 'ka.mp3' },
  { kana: 'キ', romaji: 'ki', row: 'カ', column: 'イ', audio: 'ki.mp3' },
  { kana: 'ク', romaji: 'ku', row: 'カ', column: 'ウ', audio: 'ku.mp3' },
  { kana: 'ケ', romaji: 'ke', row: 'カ', column: 'エ', audio: 'ke.mp3' },
  { kana: 'コ', romaji: 'ko', row: 'カ', column: 'オ', audio: 'ko.mp3' },
  
  // サ行
  { kana: 'サ', romaji: 'sa', row: 'サ', column: 'ア', audio: 'sa.mp3' },
  { kana: 'シ', romaji: 'shi', row: 'サ', column: 'イ', audio: 'shi.mp3' },
  { kana: 'ス', romaji: 'su', row: 'サ', column: 'ウ', audio: 'su.mp3' },
  { kana: 'セ', romaji: 'se', row: 'サ', column: 'エ', audio: 'se.mp3' },
  { kana: 'ソ', romaji: 'so', row: 'サ', column: 'オ', audio: 'so.mp3' },
  
  // タ行
  { kana: 'タ', romaji: 'ta', row: 'タ', column: 'ア', audio: 'ta.mp3' },
  { kana: 'チ', romaji: 'chi', row: 'タ', column: 'イ', audio: 'chi.mp3' },
  { kana: 'ツ', romaji: 'tsu', row: 'タ', column: 'ウ', audio: 'tsu.mp3' },
  { kana: 'テ', romaji: 'te', row: 'タ', column: 'エ', audio: 'te.mp3' },
  { kana: 'ト', romaji: 'to', row: 'タ', column: 'オ', audio: 'to.mp3' },
  
  // ナ行
  { kana: 'ナ', romaji: 'na', row: 'ナ', column: 'ア', audio: 'na.mp3' },
  { kana: 'ニ', romaji: 'ni', row: 'ナ', column: 'イ', audio: 'ni.mp3' },
  { kana: 'ヌ', romaji: 'nu', row: 'ナ', column: 'ウ', audio: 'nu.mp3' },
  { kana: 'ネ', romaji: 'ne', row: 'ナ', column: 'エ', audio: 'ne.mp3' },
  { kana: 'ノ', romaji: 'no', row: 'ナ', column: 'オ', audio: 'no.mp3' },
  
  // ハ行
  { kana: 'ハ', romaji: 'ha', row: 'ハ', column: 'ア', audio: 'ha.mp3' },
  { kana: 'ヒ', romaji: 'hi', row: 'ハ', column: 'イ', audio: 'hi.mp3' },
  { kana: 'フ', romaji: 'fu', row: 'ハ', column: 'ウ', audio: 'fu.mp3' },
  { kana: 'ヘ', romaji: 'he', row: 'ハ', column: 'エ', audio: 'he.mp3' },
  { kana: 'ホ', romaji: 'ho', row: 'ハ', column: 'オ', audio: 'ho.mp3' },
  
  // マ行
  { kana: 'マ', romaji: 'ma', row: 'マ', column: 'ア', audio: 'ma.mp3' },
  { kana: 'ミ', romaji: 'mi', row: 'マ', column: 'イ', audio: 'mi.mp3' },
  { kana: 'ム', romaji: 'mu', row: 'マ', column: 'ウ', audio: 'mu.mp3' },
  { kana: 'メ', romaji: 'me', row: 'マ', column: 'エ', audio: 'me.mp3' },
  { kana: 'モ', romaji: 'mo', row: 'マ', column: 'オ', audio: 'mo.mp3' },
  
  // ヤ行
  { kana: 'ヤ', romaji: 'ya', row: 'ヤ', column: 'ア', audio: 'ya.mp3' },
  { kana: 'ユ', romaji: 'yu', row: 'ヤ', column: 'ウ', audio: 'yu.mp3' },
  { kana: 'ヨ', romaji: 'yo', row: 'ヤ', column: 'オ', audio: 'yo.mp3' },
  
  // ラ行
  { kana: 'ラ', romaji: 'ra', row: 'ラ', column: 'ア', audio: 'ra.mp3' },
  { kana: 'リ', romaji: 'ri', row: 'ラ', column: 'イ', audio: 'ri.mp3' },
  { kana: 'ル', romaji: 'ru', row: 'ラ', column: 'ウ', audio: 'ru.mp3' },
  { kana: 'レ', romaji: 're', row: 'ラ', column: 'エ', audio: 're.mp3' },
  { kana: 'ロ', romaji: 'ro', row: 'ラ', column: 'オ', audio: 'ro.mp3' },
  
  // ワ行
  { kana: 'ワ', romaji: 'wa', row: 'ワ', column: 'ア', audio: 'wa.mp3' },
  { kana: 'ヲ', romaji: 'wo', row: 'ワ', column: 'オ', audio: 'wo.mp3' },
  
  // ン
  { kana: 'ン', romaji: 'n', row: 'ン', column: '', audio: 'n.mp3' },
];

export const katakanaRows = ['ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ', 'ン'];
export const katakanaColumns = ['ア', 'イ', 'ウ', 'エ', 'オ']; 