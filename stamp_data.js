/* スタンプ素材(おしゃべり・素材集 共通の登録表)。画像は hm_stamp_XX.webp を共有し、二重管理しない。
   新しいスタンプを足すときは、ここに1行足すだけで おしゃべりにも反映されます。
   bon: 登場するボン(おしゃべりの話し相手と同じID: hyoe など / mino は話し相手ではないので おしゃべりでは使いません)
   emo: 感情・場面 / scene: 使う場面 */
window.BM_STAMP_SET=[
{id:"hm_stamp_01",file:"hm_stamp_01.webp",name:"すごーい！",bon:["mino"],emo:"surprise",scene:"感心・おどろき"},
{id:"hm_stamp_02",file:"hm_stamp_02.webp",name:"だいじょうぶ！",bon:["mino"],emo:"ok",scene:"はげまし・あんしん"},
{id:"hm_stamp_03",file:"hm_stamp_03.webp",name:"りょーかい！",bon:["mino"],emo:"cheer",scene:"へんじ・おうえん"},
{id:"hm_stamp_04",file:"hm_stamp_04.webp",name:"まってて〜！",bon:["mino"],emo:"hurry",scene:"いそぐとき"},
{id:"hm_stamp_05",file:"hm_stamp_05.webp",name:"ひょえ!?",bon:["hyoe"],emo:"surprise",scene:"びっくり"},
{id:"hm_stamp_06",file:"hm_stamp_06.webp",name:"あ、ありがとう…",bon:["hyoe"],emo:"thanks",scene:"かんしゃ"},
{id:"hm_stamp_07",file:"hm_stamp_07.webp",name:"えへへ…うれしい",bon:["hyoe"],emo:"happy",scene:"うれしい・てれる・あまえる"},
{id:"hm_stamp_08",file:"hm_stamp_08.webp",name:"あわわ…",bon:["hyoe"],emo:"worry",scene:"あわてる・ふあん"},
{id:"hm_stamp_09",file:"hm_stamp_09.webp",name:"ごはんいこっ！",bon:["hyoe","mino"],emo:"food",scene:"ごはん・おやつ"},
{id:"hm_stamp_10",file:"hm_stamp_10.webp",name:"きいてきいて！",bon:["hyoe","mino"],emo:"listen",scene:"はなしを聞いてほしい"},
{id:"hm_stamp_11",file:"hm_stamp_11.webp",name:"あそぼ！",bon:["hyoe","mino"],emo:"play",scene:"あそび"},
{id:"hm_stamp_12",file:"hm_stamp_12.webp",name:"おはなしきかせて♪",bon:["hyoe","mino"],emo:"story",scene:"おはなし"},
{id:"hm_stamp_13",file:"hm_stamp_13.webp",name:"おつかれさま！",bon:["hyoe","mino"],emo:"tired",scene:"ねぎらい"},
{id:"hm_stamp_14",file:"hm_stamp_14.webp",name:"おはよー！",bon:["hyoe","mino"],emo:"morning",scene:"あさ"},
{id:"hm_stamp_15",file:"hm_stamp_15.webp",name:"おやすみ…",bon:["hyoe","mino"],emo:"night",scene:"よる・ねむい"},
{id:"hm_stamp_16",file:"hm_stamp_16.webp",name:"ともだち！",bon:["hyoe","mino"],emo:"friend",scene:"ともだち・なかよし"}
];
/* 感情ごとの ことば(会話の文から感情を選ぶ)。おしゃべり専用の判定で、会話の返事そのものには影響しません。 */
window.BM_STAMP_EMO=[
["sad",/つらい|悲しい|かなしい|さびしい|寂しい|さみしい|泣|死|消えたい|不安で|しんどい/],
["thanks",/ありがと|サンキュ|感謝|助かった|たすかった/],
["night",/おやすみ|眠い|ねむい|寝る|ねる|寝たい|夢/],
["morning",/おはよ|朝/],
["tired",/疲れ|つかれ|おつかれ|お疲れ|残業|仕事/],
["food",/ごはん|ご飯|おなか|お腹|食べ|おやつ|ラーメン|カレー|おにぎり|ケーキ|ごちそう|ハラヘ|腹減/],
["play",/遊ぼ|あそぼ|ゲーム|しりとり|じゃんけん|遊び|あそび/],
["story",/おはなし|お話|小説|物語|読んで|聞かせ/],
["listen",/聞いて|きいて|相談|あのね|ねえ|ねぇ/],
["friend",/友だち|友達|ともだち|仲良|なかよし|いっしょ|一緒/],
["worry",/こわ|怖|緊張|どきどき|あわわ|こまった|困/],
["surprise",/びっくり|驚|えっ|まじ|すごい|凄い|ほんと/],
["happy",/うれし|嬉し|たのしい|楽しい|やった|最高|すき|好き|かわいい|可愛い|ほめ|えらい|おめでと/]
];
