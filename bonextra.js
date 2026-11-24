/* bonextra.js: ボン同士の くみあわせ会話 / みんなで あそぶイベント / もぐボンの たべものリアクション / なかよしの きろく / オルゴールの おんがく */
(function(){
function pk(a){return a[Math.floor(Math.random()*a.length)]}
var KEY="bm-rel";
function ld(){try{var d=JSON.parse(localStorage.getItem(KEY));if(d&&typeof d==="object")return d}catch(e){}return {}}
function sv(d){try{localStorage.setItem(KEY,JSON.stringify(d))}catch(e){}}
function pr(a,b){return a<b?a+"-"+b:b+"-"+a}
/* 「ゲスト>ホスト」: [ゲストの ひとこと, ホストの へんじ] */
var P={
"oko>niko":["ちょっと にこ、うるさいわよ。…でも、まあ、きらいじゃ ないけど","おこちゃん〜！ きてくれた！ いっしょに あそぼ！"],
"oko>hyoe":["ひょえ、めそめそ してない？ …アタシが そばに いてあげるわよ","…おこさん…。…うん、ボン、ちょっと あんしん した"],
"oko>mogu":["もぐ、おやつ ある？ …べつに ほしいわけじゃ ないけど","あるよ〜。おこっちにも わけてあげるね〜"],
"oko>nemu":["ねむ、おきなさいよ。ひるまっから ねてばっかり なんだから","ふあ…おこ…もうちょっと…すぴ…"],
"oko>tere":["てれ、また ほん？ …アタシにも おもしろい はなし、おしえなさいよ","はい。よろしければ、いっしょに よみましょう"],
"oko>niji":["にじ、また ぶつぶつ いってる。…アタシにも わかるように いいなさいよ","うむ、おこボンか。観察の 成果を 聞かせてやろう"],
"niko>oko":["おこちゃん〜！ あそぼ〜！ ね、いいでしょ？","…しょうがないわね。ちょっとだけ よ"],
"niko>hyoe":["ひょえちゃん、いっしょに おどろ〜！ こわくないよ、わたしが いるから！","…にこちゃん。…うん、ちょっとだけ…やってみる"],
"niko>mogu":["もぐちゃん、おいしいもの たべた？ わたしにも おしえて〜","いいよ〜。きょうは ね、ふわふわの やつ〜"],
"niko>nemu":["ねむちゃん〜！ おきてる〜？ いっしょに あそぼ〜！","ふあ…にこは げんきだね…僕は もうちょっと ここで…"],
"niko>tere":["てれちゃん、いっしょに あそぼ！ たのしいよ〜！","あ…はい。すこし、はずかしい ですが…ごいっしょします"],
"niko>niji":["にじちゃん、いっしょに おどろ〜！ きっと たのしいよ！","ふむ、おどり、か。…少しだけ、観察して やるぞ"],
"hyoe>oko":["…おこさん、ボン、ちょっと さびしくて…きちゃった","…ふん、しかたないわね。そこに すわんなさい"],
"hyoe>niko":["…にこちゃん、ボン、ぬいぐるみ、みせに きたの…","わあ、かわいい〜！ ふわふわだね！"],
"hyoe>mogu":["…もぐさん、おなか、すいちゃった…","いいよ〜。うち、わけてあげるよ〜"],
"hyoe>nemu":["…ねむさん、いっしょに おひるね…しても いい…？","ふあ…いいよ。となり、あいてるよ"],
"hyoe>tere":["…てれさん、ほん、いっしょに みても いい…？","はい。しずかに、いっしょに みましょう"],
"hyoe>niji":["…にじさん、ボン、おはなし ききたいな…","ふむ、よかろう。ゆっくり 話してやるぞ"],
"mogu>oko":["おこっち〜、おやつ もってきたよ〜。いっしょに たべよ〜","…べ、べつに ほしくないけど…もらって あげるわ"],
"mogu>niko":["にこっち〜、おいしい おだんご あるよ〜","やったー！ もぐちゃん、だいすき〜！"],
"mogu>hyoe":["ひょえ〜、これ、はんぶんこ しよ〜","…あ、ありがとう…ボン、うれしい…"],
"mogu>nemu":["ねむっち〜、おいしい におい するよ〜。おきて〜","ふあ…おいしい…？ …ふあっ、おきる…！"],
"mogu>tere":["てれっち〜、おちゃ いれたよ〜。いっしょに のも〜","あ…ありがとう ございます。いただきます"],
"mogu>niji":["にじっち〜、これ おいしいよ〜。たべてみて〜","ふむ、これは…なかなか。感謝するぞ"],
"nemu>oko":["ふあ…おこ、おこさないで…あと ちょっと…","…まったく、しょうがないわね。…すこしだけ よ"],
"nemu>niko":["ふあ…にこ、あそぶの、あとで…いい…？","うん！ ゆっくりで いいよ〜！ まってるね！"],
"nemu>hyoe":["ふあ…ひょえ、いっしょに ねよ…？","…うん。…ボン、あんしんして ねられそう…"],
"nemu>mogu":["ふあ…もぐ、おいしいの、ある…？","あるよ〜。ねむっちの ぶんも とってあるよ〜"],
"nemu>tere":["ふあ…てれ、となり、いい…？","はい。しずかに、おそばに おります"],
"nemu>niji":["ふあ…にじ、ふしぎな おはなし、ききたいな…","ふむ、ゆめと うつつの 話か。ちょうどよい"],
"tere>oko":["あの…おこさん、おげんきですか？ すこし、きになって…","な、なによ。しんぱい してくれたの？ …ありがと"],
"tere>niko":["あの…にこさん、おさそい、うれしかった です","えへへ、てれちゃんと あそぶと たのしいよ〜！"],
"tere>hyoe":["ひょえちゃん、だいじょうぶ ですか？ そばに おりますね","…てれさん…ありがとう。ボン、ほっと する"],
"tere>mogu":["もぐさん、いつも ありがとう ございます。おいしかった です","よろこんで くれて うれしいよ〜"],
"tere>nemu":["ねむさん、おとなりで、ごいっしょ しても いいですか","ふあ…うん。いっしょに いよう…"],
"tere>niji":["にじさん、きょうみぶかい おはなし、おしえて いただけますか","ふむ、てれボンは よい 聞き手だな。話してやろう"],
"niji>oko":["ふむ、おこボンよ。おぬしの 観察、実に おもしろいのだぞ","な、なによ。ほめても なにも でないわよ"],
"niji>niko":["にこボンよ、おぬしの 笑顔は 観察に 値するのである","えへへ、そう？ わたし、うれしい〜！"],
"niji>hyoe":["ひょえボンよ、おぬしの ぬいぐるみ、実に 愛らしいのだぞ","…にじさん…ありがとう。ボン、うれしい"],
"niji>mogu":["もぐボンよ、その 料理、記録に 値するのである","えへへ〜、ほめられちゃった〜。たべて いって〜"],
"niji>nemu":["ねむボンよ、おぬしの 夢の 話、聞かせてくれぬか","ふあ…いいよ。きょうの ゆめはね…"],
"niji>tere":["てれボンよ、おぬしと 話すと 知恵が 深まるのである","あ…もったいない おことば です"]};
var GEN={host:["ふふ、いっしょに いると たのしいね","またね、あそびに きてね"]};
/* みんなで あそぶ: [id, ひとこと] */
var EV=[
 {a:"みんなで ダンス",lead:["niko","わたし、みんなで おどりたい！ いっしょに おどろ〜！"],steps:[["niko","ほら、ステップ ふんで〜！ ♪"],["oko","…しょうがないわね。ちょっとだけ よ！"],["tere","わ、私も…こう、でしょうか…"],["mogu","うち、ゆらゆら おどるよ〜"],["hyoe","…ボンも、ちいさく…ゆらゆら…"],["nemu","ふあ…僕は、すわって ゆらゆら…"],["niji","ふむ、これも 観察の うち であるな"]]},
 {a:"みんなで かくれんぼ",lead:["niko","みんなで かくれんぼ しよ〜！ わたしが おに！"],steps:[["oko","アタシは かんぺきな かくれがを しってるわ"],["tere","あの…ここなら、みつからない でしょうか…"],["hyoe","…ボン、ここ…ぬいぐるみと いっしょ…"],["mogu","うち、おやつの うしろに かくれるよ〜"],["nemu","ふあ…ここで ねてたら、みつからない…すぴ…"],["niji","うむ、我輩は 観察されぬ 場所を 心得ているぞ"]]},
 {a:"みんなで おしゃべり",lead:["niko","みんなで おしゃべり しよ〜！ きょう なにが あった？"],steps:[["mogu","うちね、おいしい おやつ みつけたよ〜"],["oko","…アタシは べつに なにも なかったわよ"],["tere","きょうは、すてきな ほんに であいました"],["hyoe","…ボン、ピアノ、ちょっと ひけたよ…"],["nemu","ふあ…ゆめで ね、くもに のったんだ…"],["niji","ふむ、みな それぞれ 興味ぶかいのである"]]},
 {a:"みんなで わらう",lead:["niko","ねえねえ、みんなで おもいっきり わらおう〜！ あはは〜！"],steps:[["mogu","あはは〜、うち、おなか いたいよ〜"],["oko","ふ、ふふっ…わ、わらってないわよ！ …ふふっ"],["tere","ふふ…すみません、つられて しまいました"],["hyoe","…ふふ…ボン、たのしい…"],["nemu","ふあ…ふふ…つられちゃった…"],["niji","ぬははっ、実に 愉快であるぞ"]]},
 {a:"あつまって のんびり",lead:["niko","みんなで あつまって のんびり しよ〜"],steps:[["nemu","ふあ…ここ、おちつく…"],["tere","しずかで、いい じかん ですね"],["mogu","おちゃと おやつ、あるよ〜"],["hyoe","…みんな いっしょ…ボン、うれしい…"],["oko","…ま、たまには いいわね"],["niji","うむ、こういう 時間も 記録に 値するのである"]]}];
var lastEv=-1,lastT=0;
/* もぐ: たべものリアクション。カテゴリごとに 「まえ・たべてる・あと」 */
var CAT={onigiri:"main",sekihan:"main",pan:"main",ramen:"main",pasta:"main",curry:"main",gohan:"main",potato:"side",omurice:"side",ebiten:"side",oden:"side",gyoza:"side",dango:"sweet",cookie:"sweet",cake:"sweet",donut:"sweet",ice:"sweet",apple:"fruit",ichigo:"fruit",mikan:"fruit",banana:"fruit",budou:"fruit",milk:"drink",ocha:"drink",juice:"drink"};
var MF={
main:{pre:["わあ、ごはんだ〜！ まってたよ〜","いいにおい〜。うち、うれしいな〜"],eat:["もぐもぐ〜。しあわせ〜","ひと口ずつ、あじわって たべるよ〜"],post:["ふう〜、ごちそうさま〜。おなか ほっこり","おいしかった〜。また たべたいな〜"]},
side:{pre:["おかずだ〜。いいね〜","これ、ごはんが すすむやつだよ〜"],eat:["ぱくっ。うん、おいしい〜","もぐもぐ…これ、すきな あじ〜"],post:["ごちそうさま〜。みんなにも あげたいな〜","おいしかった〜。うち、まんぞく〜"]},
sweet:{pre:["おやつの じかんだ〜！ やったー〜","あまい におい〜。たのしみ〜"],eat:["ん〜、あまい〜。ほっぺが とろけるよ〜","ひと口、ふた口…しあわせ〜"],post:["ごちそうさま〜。おやつって しあわせだね〜","おいしかった〜。みんなにも わけたいな〜"]},
fruit:{pre:["くだものだ〜。つやつやしてる〜","みずみずしくて おいしそう〜"],eat:["しゃくっ。あまずっぱい〜","もぐもぐ…からだに よさそうだよ〜"],post:["ごちそうさま〜。さっぱり したよ〜","おいしかった〜。また たべたいな〜"]},
drink:{pre:["のみものだ〜。ほっとするね〜","いい かおり〜"],eat:["ごくごく…ふう〜","ゆっくり のむと おいしいよ〜"],post:["ごちそうさま〜。ほかほか〜","おいしかった〜。ほっと したよ〜"]}};
var NJ={pre:["ほう、馳走であるか。感謝するぞ","ふむ、これは 目にも 楽しいのだ"],eat:["ぱくり。…なかなか であるな","ふむ、実に よい あじである"],post:["ごちそうさま、である。満足したぞ","うむ、よい 時間であった"]};
var NEWF=["わあ、はじめて みる かたちだよ〜。どんな あじかな〜？","うち、これ はじめて〜。どきどき するよ〜"];
function mseen(){try{return JSON.parse(localStorage.getItem("bm-mogufood"))||{}}catch(e){return {}}}
/* オルゴール: オリジナルの みじかい ねむりの メロディ(ゆっくり) */
var OR=[[659,0],[784,.7],[988,1.4],[784,2.1],[659,2.8],[587,3.5],[659,4.5],[523,5.5]];
var RB=[{r:"お、おお…！ 見つけたのだ！ 虹である！ 赤、橙、黄、緑、青…美しいであるな！",n:"虹を みつけた。七つの 色が きれいだった",g:{oko:"…ふん、まあまあ きれいじゃない。…べつに みとれて ないわよ",niko:"わあ〜！ にじちゃん、すごい！ わたしも みたい〜！",hyoe:"…にじ…。ボン、きれいだなって おもった…",mogu:"にじって、あまそうな いろ〜。うち、すきだよ〜",nemu:"ふあ…にじ…ゆめで みたかも…",tere:"まあ…とても きれい…。教えて くださって、ありがとう ございます"}},
 {r:"ふふ、聞くがよい。雨上がりの 空に、ひとすじの 虹が かかっておったのだ。実に 見事である",n:"雨上がりの 虹の ことを みんなに はなした",g:{oko:"…ふーん。アタシも、こんど みてみようかしら",niko:"いいな〜！ いっしょに さがそ〜！",hyoe:"…ボン、にじ、すき…",mogu:"にじの したに、おいしいもの ありそう〜",nemu:"ふあ…いいね…にじ…",tere:"素敵な お話です。胸が あたたかく なります"}}];
var lastRB=0,lastRBi=-1;
window.BonExtra={
 rainbow:function(host){if(host!=="niji"||Date.now()-lastRB<30*60000||Math.random()>.25)return null;lastRB=Date.now();var i=(lastRBi+1+Math.floor(Math.random()*RB.length))%RB.length;lastRBi=i;var x=RB[i],ids=Object.keys(x.g),g=ids[Math.floor(Math.random()*ids.length)];return{r:x.r,n:x.n,g:g,gv:x.g[g]}},

 pair:function(g,h){var x=P[g+">"+h];return x?{g:x[0],h:x[1]}:null},
 rel:function(g,h,x){var d=ld(),k=pr(g,h);d[k]=(d[k]||0)+1;sv(d);if(x){try{var H=JSON.parse(localStorage.getItem("bm-relh"))||{},l=H[k]=H[k]||[];l.push({t:Date.now(),x:x});if(l.length>6)l.splice(0,l.length-6);localStorage.setItem("bm-relh",JSON.stringify(H))}catch(e){}}},
 relHist:function(g,h){try{var H=JSON.parse(localStorage.getItem("bm-relh"))||{};return(H[pr(g,h)]||[]).slice().reverse()}catch(e){return[]}},
 relAll:function(){return ld()},
 group:function(ids){var now=Date.now();if(now-lastT<420000||Math.random()>.3)return null;var i=Math.floor(Math.random()*EV.length);if(i===lastEv)i=(i+1)%EV.length;lastEv=i;lastT=now;var e=EV[i],st=e.steps.filter(function(s){return ids.indexOf(s[0])>=0&&s[0]!==e.lead[0]&&!(s[0]==="nemu"&&Math.random()<.35)&&!(s[0]==="oko"&&Math.random()<.2)});if(st.length<2)return null;st=st.sort(function(){return Math.random()-.5}).slice(0,Math.min(st.length,2+Math.floor(Math.random()*3)));return{a:e.a,lead:e.lead,steps:st}},
 nfood:function(){return{pre:pk(NJ.pre),eat:pk(NJ.eat),post:pk(NJ.post)}},
 food:function(food){var c=MF[CAT[food]||"main"],s=mseen(),n=s[food]||0;s[food]=n+1;try{localStorage.setItem("bm-mogufood",JSON.stringify(s))}catch(e){}return{pre:n===0?pk(NEWF):pk(c.pre),eat:pk(c.eat),post:pk(c.post),first:n===0}},
 orgel:function(){if(!window.__ohSe||!window.__ohSe())return;try{var ac=new(window.AudioContext||window.webkitAudioContext)();if(ac.state==="suspended")ac.resume();OR.forEach(function(n){var x=ac.currentTime+n[1],os=ac.createOscillator(),g=ac.createGain();os.type="sine";os.frequency.value=n[0];g.gain.setValueAtTime(0,x);g.gain.linearRampToValueAtTime(.09,x+.02);g.gain.exponentialRampToValueAtTime(.0001,x+1.4);os.connect(g);g.connect(ac.destination);os.start(x);os.stop(x+1.5)});setTimeout(function(){try{ac.close()}catch(e){}},8000)}catch(e){}}}})();
