/* サイトの共通データ(ゲーム数・今週のおすすめ・ボン早見表)。ここを直すと、各ページの表示が変わる */
window.BM_DATA={
 "games": {
  "total": 14,
  "live": 10,
  "playable": 11,
  "prep": 3,
  "proto": 1
 },
 "recommend": {
  "note": "pin に {game:0,music:2,...}(各一覧の番号)を入れると、その週だけ固定できる。空なら毎週ランダム。",
  "pin": {},
  "game": [
   {
    "n": "にゃんこガーディアン",
    "u": "games.html#g-nyanko",
    "d": "ボンたちが にゃんこを まもる アクション"
   },
   {
    "n": "ボン・ビンゴ",
    "u": "games.html#g-bingo",
    "d": "ボンたちと わいわい ビンゴ対戦"
   },
   {
    "n": "ボン・パズル",
    "u": "games.html#g-puzzle",
    "d": "そろえて けす パズル。じっくり あそべるよ"
   },
   {
    "n": "ボンボンライフ！",
    "u": "games.html#g-bonlife",
    "d": "ボンたちを そだてる ゲーム"
   },
   {
    "n": "寝違え大騒動",
    "u": "games.html#g-nechigai",
    "d": "ボンちゃんの 鍼灸ミニゲーム。すぐ あそべるよ"
   },
   {
    "n": "ボン♥こい",
    "u": "games.html#g-koi",
    "d": "ボンたちと ギャグ全開の 恋愛ゲーム"
   },
   {
    "n": "弾幕のメガリス",
    "u": "games.html#g-danmaku",
    "d": "弾幕シューティング。7人の「BON SPECIAL」も あるよ"
   },
   {
    "n": "盤上のメガリス",
    "u": "games.html#g-megalith",
    "d": "チェスの メガリス。ボンたちも ゲスト出演"
   }
  ],
  "music": [
   {
    "n": "紅彩烈火(おこボンの テーマ曲)",
    "u": "music.html#t10",
    "d": "勇ましい 行進曲。胸を はって 聴きたい一曲"
   },
   {
    "n": "儚彩小夜(ひょえボンの テーマ曲)",
    "u": "music.html#t11",
    "d": "夢の なかのような、ピアノの 一曲"
   },
   {
    "n": "陽彩爛漫(にこボンの テーマ曲)",
    "u": "music.html#t12",
    "d": "アコーディオンの はずむ ポルカ"
   },
   {
    "n": "ボンたちの 音楽 ぜんぶ",
    "u": "music.html",
    "d": "ボンの テーマ曲や BGMを まとめて 聴ける ミュージック"
   }
  ],
  "novel": [
   {
    "n": "ひょえボンと たこやき パーティ",
    "u": "novel13.html",
    "d": "みのボンを よんでの たこパ。6人が むかしの はなしを するよ"
   },
   {
    "n": "ひょえボンと わらいごえの ばんぐみ",
    "u": "novel12.html",
    "d": "ボメリコの ばんぐみに ハマった ひょえボンの おはなし"
   },
   {
    "n": "ひょえボンの はじめての ようちえん",
    "u": "novel11.html",
    "d": "ひょえボンが ようちえんに いく おはなし"
   },
   {
    "n": "ひょえボンと みのボン",
    "u": "novel10.html",
    "d": "ひょえボンと みのボンの おはなし"
   },
   {
    "n": "ひょえボンの あいさつ れんしゅう",
    "u": "novel_aisatsu.html",
    "d": "せかいの あいさつを 7人と れんしゅうする ミニ話"
   }
  ],
  "chara": [
   {
    "n": "おこボン",
    "u": "zukan.html#oko",
    "d": "短気で ツンツン。実は 面倒見が よくて キレイ好き"
   },
   {
    "n": "にこボン",
    "u": "zukan.html#niko",
    "d": "お調子者で 気づかい上手。だれとでも すぐ 友だち"
   },
   {
    "n": "ひょえボン",
    "u": "zukan.html#hyoe",
    "d": "シリーズ最年少。なんでも こわい 心配性"
   },
   {
    "n": "もぐボン",
    "u": "zukan.html#mogu",
    "d": "食いしん坊で 料理が 得意"
   },
   {
    "n": "ねむボン",
    "u": "zukan.html#nemu",
    "d": "マイペースな ねぼすけ。どこでも 寝られる"
   },
   {
    "n": "てれボン",
    "u": "zukan.html#tere",
    "d": "照れ屋で あわてんぼう。詩を 書くのが 趣味"
   },
   {
    "n": "にじボン",
    "u": "zukan.html#rain",
    "d": "物知りで 自信たっぷり。博物館の ガイド役"
   }
  ]
 },
 "bons": [
  {
   "k": "oko",
   "n": "おこボン",
   "c": "赤",
   "h": "#C8344E",
   "t": "#fff",
   "d": "短気でツンツン。実は面倒見がよくてキレイ好き"
  },
  {
   "k": "niko",
   "n": "にこボン",
   "c": "黄",
   "h": "#F2C230",
   "t": "#2E241C",
   "d": "お調子者で気づかい上手。誰とでもすぐ友達に"
  },
  {
   "k": "hyoe",
   "n": "ひょえボン",
   "c": "青",
   "h": "#2F5DD0",
   "t": "#fff",
   "d": "シリーズ最年少。なんでもこわい心配性"
  },
  {
   "k": "mogu",
   "n": "もぐボン",
   "c": "緑",
   "h": "#2E8B3E",
   "t": "#fff",
   "d": "なんでも好きな食いしん坊。料理が得意"
  },
  {
   "k": "nemu",
   "n": "ねむボン",
   "c": "紫",
   "h": "#7B3FB0",
   "t": "#fff",
   "d": "マイペースなねぼすけ。どこでも寝られる"
  },
  {
   "k": "tere",
   "n": "てれボン",
   "c": "ピンク",
   "h": "#E0559A",
   "t": "#fff",
   "d": "照れ屋であわてんぼう。詩を書くのが趣味"
  },
  {
   "k": "niji",
   "n": "にじボン",
   "c": "にじ色",
   "h": "linear-gradient(90deg,#e55,#eb3,#5b5,#59e,#a6d)",
   "t": "#fff",
   "d": "物知りで自信たっぷり。博物館のガイド役",
   "a": "rain"
  }
 ]
};
(function(){function f(){var G=window.BM_DATA.games,m={gtotal:G.total,gplay:G.playable,glive:G.live,grest:G.prep+G.proto,gprep:G.prep,gproto:G.proto};[].forEach.call(document.querySelectorAll("[data-bm]"),function(e){var k=e.getAttribute("data-bm");if(m[k]!=null)e.textContent=m[k]})}f();document.addEventListener("DOMContentLoaded",f)})();
