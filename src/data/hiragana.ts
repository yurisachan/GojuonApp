export interface HiraganaChar {
  kana: string;
  romaji: string;
  row: string;
  column: string;
  audio: string;
}

export const hiraganaData: HiraganaChar[] = [
  // あ行
  { kana: 'あ', romaji: 'a', row: 'あ', column: 'あ', audio: 'a.mp3' },
  { kana: 'い', romaji: 'i', row: 'あ', column: 'い', audio: 'i.mp3' },
  { kana: 'う', romaji: 'u', row: 'あ', column: 'う', audio: 'u.mp3' },
  { kana: 'え', romaji: 'e', row: 'あ', column: 'え', audio: 'e.mp3' },
  { kana: 'お', romaji: 'o', row: 'あ', column: 'お', audio: 'o.mp3' },
  
  // か行
  { kana: 'か', romaji: 'ka', row: 'か', column: 'あ', audio: 'ka.mp3' },
  { kana: 'き', romaji: 'ki', row: 'か', column: 'い', audio: 'ki.mp3' },
  { kana: 'く', romaji: 'ku', row: 'か', column: 'う', audio: 'ku.mp3' },
  { kana: 'け', romaji: 'ke', row: 'か', column: 'え', audio: 'ke.mp3' },
  { kana: 'こ', romaji: 'ko', row: 'か', column: 'お', audio: 'ko.mp3' },
  
  // さ行
  { kana: 'さ', romaji: 'sa', row: 'さ', column: 'あ', audio: 'sa.mp3' },
  { kana: 'し', romaji: 'shi', row: 'さ', column: 'い', audio: 'shi.mp3' },
  { kana: 'す', romaji: 'su', row: 'さ', column: 'う', audio: 'su.mp3' },
  { kana: 'せ', romaji: 'se', row: 'さ', column: 'え', audio: 'se.mp3' },
  { kana: 'そ', romaji: 'so', row: 'さ', column: 'お', audio: 'so.mp3' },
  
  // た行
  { kana: 'た', romaji: 'ta', row: 'た', column: 'あ', audio: 'ta.mp3' },
  { kana: 'ち', romaji: 'chi', row: 'た', column: 'い', audio: 'chi.mp3' },
  { kana: 'つ', romaji: 'tsu', row: 'た', column: 'う', audio: 'tsu.mp3' },
  { kana: 'て', romaji: 'te', row: 'た', column: 'え', audio: 'te.mp3' },
  { kana: 'と', romaji: 'to', row: 'た', column: 'お', audio: 'to.mp3' },
  
  // な行
  { kana: 'な', romaji: 'na', row: 'な', column: 'あ', audio: 'na.mp3' },
  { kana: 'に', romaji: 'ni', row: 'な', column: 'い', audio: 'ni.mp3' },
  { kana: 'ぬ', romaji: 'nu', row: 'な', column: 'う', audio: 'nu.mp3' },
  { kana: 'ね', romaji: 'ne', row: 'な', column: 'え', audio: 'ne.mp3' },
  { kana: 'の', romaji: 'no', row: 'な', column: 'お', audio: 'no.mp3' },
  
  // は行
  { kana: 'は', romaji: 'ha', row: 'は', column: 'あ', audio: 'ha.mp3' },
  { kana: 'ひ', romaji: 'hi', row: 'は', column: 'い', audio: 'hi.mp3' },
  { kana: 'ふ', romaji: 'fu', row: 'は', column: 'う', audio: 'fu.mp3' },
  { kana: 'へ', romaji: 'he', row: 'は', column: 'え', audio: 'he.mp3' },
  { kana: 'ほ', romaji: 'ho', row: 'は', column: 'お', audio: 'ho.mp3' },
  
  // ま行
  { kana: 'ま', romaji: 'ma', row: 'ま', column: 'あ', audio: 'ma.mp3' },
  { kana: 'み', romaji: 'mi', row: 'ま', column: 'い', audio: 'mi.mp3' },
  { kana: 'む', romaji: 'mu', row: 'ま', column: 'う', audio: 'mu.mp3' },
  { kana: 'め', romaji: 'me', row: 'ま', column: 'え', audio: 'me.mp3' },
  { kana: 'も', romaji: 'mo', row: 'ま', column: 'お', audio: 'mo.mp3' },
  
  // や行
  { kana: 'や', romaji: 'ya', row: 'や', column: 'あ', audio: 'ya.mp3' },
  { kana: 'ゆ', romaji: 'yu', row: 'や', column: 'う', audio: 'yu.mp3' },
  { kana: 'よ', romaji: 'yo', row: 'や', column: 'お', audio: 'yo.mp3' },
  
  // ら行
  { kana: 'ら', romaji: 'ra', row: 'ら', column: 'あ', audio: 'ra.mp3' },
  { kana: 'り', romaji: 'ri', row: 'ら', column: 'い', audio: 'ri.mp3' },
  { kana: 'る', romaji: 'ru', row: 'ら', column: 'う', audio: 'ru.mp3' },
  { kana: 'れ', romaji: 're', row: 'ら', column: 'え', audio: 're.mp3' },
  { kana: 'ろ', romaji: 'ro', row: 'ら', column: 'お', audio: 'ro.mp3' },
  
  // わ行
  { kana: 'わ', romaji: 'wa', row: 'わ', column: 'あ', audio: 'wa.mp3' },
  { kana: 'を', romaji: 'wo', row: 'わ', column: 'お', audio: 'wo.mp3' },
  
  // ん
  { kana: 'ん', romaji: 'n', row: 'ん', column: '', audio: 'n.mp3' },
];

export const hiraganaRows = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ', 'ん'];
export const hiraganaColumns = ['あ', 'い', 'う', 'え', 'お']; 