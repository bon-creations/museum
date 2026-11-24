/* bonreno.js: ボンのおへや 改修(なまえ反映・まどの そとの てんき・たんじょうび・ボンどうしの おでかけ)
   ブラウザの なかだけに ほぞん。てんきは「いまの てんき」を つかう ボタンを おしたときだけ(おおよその いちを おくる) */
(function(){
var KEY="bm-reno",NAMEKEY="bontalk_name",E=null;
var IDS=["oko","niko","hyoe","mogu","nemu","tere","niji"];
var NM={oko:"おこボン",niko:"にこボン",hyoe:"ひょえボン",mogu:"もぐボン",nemu:"ねむボン",tere:"てれボン",niji:"にじボン"};
var SUF={oko:"",nemu:"",hyoe:"さん",tere:"さん",niko:"ちゃん",mogu:"しゃん",niji:"ボン"};
var BD={oko:[10,29],niko:[10,29],mogu:[10,29],nemu:[10,29],tere:[10,29],hyoe:[3,10],niji:[9,15]};
var NAMERE=/^[ぁ-ゖァ-ヶー]{1,5}$/;
var WXN={clear:"はれ",cloud:"くもり",rain:"あめ",snow:"ゆき",fog:"きり",storm:"かみなり"};
var GIFTS=[["🌷","おはな"],["🍪","おかし"],["🍙","おにぎり"],["💌","てがみ"],["🧸","ぬいぐるみ"],["📖","ほん"],["🎀","リボン"],["⭐","ほしの かざり"]];
var FAV={oko:"🎀",niko:"🌷",hyoe:"🧸",mogu:"🍙",nemu:"🧸",tere:"📖",niji:"⭐"};
/* ---- ほぞん ---- */
function ld(){try{var d=JSON.parse(localStorage.getItem(KEY));if(d&&typeof d==="object")return d}catch(e){}return {}}
function sv(d){try{localStorage.setItem(KEY,JSON.stringify(d))}catch(e){}}
function q(k){var m=location.search.match(new RegExp("[?&]"+k+"=([\\w,]+)"));return m?m[1]:""}
function pk(a){return a[Math.floor(Math.random()*a.length)]}
function rnd(s){s=s>>>0;for(var i=0;i<4;i++){s=(Math.imul(s,1664525)+1013904223)>>>0;s^=s>>>13}return(s>>>0)/4294967296}
/* ---- なまえ ---- */
function uname(){try{var v=localStorage.getItem(NAMEKEY);if(v&&NAMERE.test(v))return v}catch(e){}return""}
function you(id){var n=uname();return n?n+(SUF[id]||""):"管理人"}
function fix(t,id){var n=uname();if(!n||typeof t!=="string"||t.indexOf("管理人")<0)return t;id=id||(E&&E.cur()&&E.cur().id)||"oko";return t.split("管理人ちゃん").join(you(id)).split("管理人").join(you(id))}
var NG={oko:["あ、{n}。…き、来たのね。べ、別に待ってたわけじゃないわ！","{n}、ちょうどいいところに来たわね。"],
niko:["{n}！ きてくれたんだ！ ボンボン！","わあ、{n}だ！ やっほー！"],
hyoe:["あ…{n}。きてくれて、ボン、うれしい…","{n}…。ボン、まってたよ。"],
mogu:["{n}、いらっしゃ〜い。うち、ごはん つくってたとこだよ〜","あ、{n}〜。いいところに きたね〜"],
nemu:["ふあ…{n}。きてたんだね。","…{n}。ふあ…いらっしゃい。"],
tere:["あ、{n}…。い、いらっしゃいませ。","{n}、こんにちは。…あの、きてくださって、うれしいです。"],
niji:["うむ、{n}か。よく来た。","おお、{n}。待っておったぞ。"]};
/* ---- てんき ---- */
function wxKind(c){c=+c;if(c<=1)return"clear";if(c<=3)return"cloud";if(c===45||c===48)return"fog";if(c>=95)return"storm";if(c>=71&&c<=77||c===85||c===86)return"snow";if(c>=51)return"rain";return"clear"}
function season(){var m=new Date().getMonth()+1;return m>=3&&m<=5?"spring":m>=6&&m<=8?"summer":m>=9&&m<=11?"autumn":"winter"}
var WL={oko:{rain:"…雨ね。洗濯物がぬれちゃうじゃない。べ、別に気にしてないけど！",snow:"雪ね。…ちょっとだけ、きれいだと思うわ。ちょっとだけよ！",storm:"ひゃっ…か、雷なんて、ぜんぜんこわくないんだから！",clear:"いい天気ね。アタシの機嫌も、まあまあ いいわよ。"},
niko:{rain:"雨だぁ！ ボンボン、てるてるボン つくる？",snow:"雪！ 雪！ ボンボン！ ふわふわだぁ！",storm:"ごろごろ…。にこ、ちょっと びっくり。ボン！？",clear:"いいお天気！ ボンボン、おさんぽ したいなぁ。"},
hyoe:{rain:"あめ…ぽつぽつ、って いってる。ボン、このおと すき…",snow:"ゆき…きれい。ボン、ずっと みてられる…",storm:"ひょえっ！ おっきい おと…！ ボン、こわい…",clear:"おひさま、ぽかぽか…。ボン、うれしい。"},
mogu:{rain:"雨だね〜。あったかい汁ものが つくりたくなるな〜",snow:"雪だよ〜。おなべ日和だね〜",storm:"かみなり、おっきいね〜。うち、ごはん たべて おちつく〜",clear:"いいお天気だね〜。おにぎり もって、おでかけしたいな〜"},
nemu:{rain:"ふあ…雨の音、ねむくなるね。",snow:"ふあ…雪、しずかで いいね。",storm:"ふあ…かみなり？ …でも、ねむい。",clear:"ふあ…ぽかぽか。おひるね日和だね。"},
tere:{rain:"あめ、ですね…。窓にあたる音が、すこし、すきです。",snow:"ゆきが、ふっています…。きれい、ですね。",storm:"か、かみなり…。あの、すこしだけ、そばに、いても…よろしいでしょうか。",clear:"よいお天気、ですね。…本を、日なたで、読みたいです。"},
niji:{rain:"ふむ、雨である。雨音とは、風流なものよ。",snow:"雪である。静けさが、我輩は、嫌いではない。",storm:"雷である。…な、なに、驚いてなど、おらぬぞ。",clear:"うむ、よい天気である。夜は、星もきれいに見えそうだ。"}};
var wx={k:"",src:""};
function wxGet(){var f=q("wx");if(f&&WXN[f]){wx={k:f,src:"test"};return}var d=ld();if(d.geo&&d.w&&Date.now()-d.w.t<45*60000){wx={k:wxKind(d.w.c),src:"real"}}else wx={k:"",src:""}}
function wxFetch(cb){var d=ld();if(!d.geo){wx={k:"",src:""};cb&&cb();return}
 var u="https://api.open-meteo.com/v1/forecast?latitude="+d.geo.la+"&longitude="+d.geo.lo+"&current=weather_code&timezone=auto";
 try{fetch(u).then(function(r){return r.json()}).then(function(j){if(j&&j.current&&j.current.weather_code!=null){var x=ld();x.w={c:j.current.weather_code,t:Date.now()};sv(x);wxGet()}cb&&cb()}).catch(function(){cb&&cb()})}catch(e){cb&&cb()}}
function wxOn(ok,ng){if(!navigator.geolocation){ng&&ng("このブラウザでは つかえないよ");return}
 navigator.geolocation.getCurrentPosition(function(p){var x=ld();x.geo={la:Math.round(p.coords.latitude*10)/10,lo:Math.round(p.coords.longitude*10)/10};delete x.w;sv(x);wxFetch(function(){ok&&ok()})},function(){ng&&ng("いちじょうほうを ゆるして もらえなかったよ")},{timeout:9000,maximumAge:3600000})}
function wxOff(){var x=ld();delete x.geo;delete x.w;sv(x);wx={k:"",src:""}}
function stageWx(){var s=document.getElementById("ohStage");if(!s)return;if(wx.k)s.setAttribute("data-wx",wx.k);else s.removeAttribute("data-wx");s.setAttribute("data-sn",season())}
/* ---- たんじょうび ---- */
function bdToday(id){var f=q("bd");if(f&&(f==="all"||f.split(",").indexOf(id)>=0))return true;var b=BD[id],d=new Date();return !!b&&d.getMonth()+1===b[0]&&d.getDate()===b[1]}
var BL={oko:"…きょう、アタシの たんじょうび なのよね。べ、別に おいわいなんて いらないんだから！ …でも、ありがと。",
niko:"きょうは わたしの たんじょうび！ ボンボン！ みんなで おいわい したいなぁ！",
hyoe:"きょう、ボンの たんじょうび…って いわれた。ボン、ちょっと はずかしい…でも、うれしい。",
mogu:"きょうは うちの たんじょうび〜。ケーキ、はんぶんこ しようね〜",
nemu:"ふあ…きょうは 僕の たんじょうび。…ねむいけど、うれしいな。",
tere:"きょ、きょうは 私の お誕生日、なのです…。は、恥ずかしい、ですが…うれしい、です。",
niji:"うむ、きょうは 我輩の 生まれた日である。…祝うというなら、受けてやらんこともない。"};
var CEL={oko:"おめでと。…べ、別に いわいたかったわけじゃ ないわよ！",niko:"おたんじょうび、おめでとう！ ボンボン！",hyoe:"おめでとう…。ボン、おいわい、うれしい",mogu:"おめでと〜。ケーキ、ちゃんと はんぶんこ ね〜",nemu:"ふあ…おめでとう。…いっしょに ねよ",tere:"お誕生日、おめでとうございます…！",niji:"うむ、めでたい日である。祝おうぞ。"};
var GR={oko:"…っ、ありがと。たいせつに、してあげるわ。",niko:"わあ、ありがとう！ ボンボン！ だいじにするね！",hyoe:"ありがとう…。ボン、たからものに する。",mogu:"ありがと〜。うれしいな〜",nemu:"ふあ…ありがとう。…うれしい。",tere:"あ、ありがとう、ございます…。大切に、します。",niji:"うむ、感謝する。…大事にしよう。"};
var GF={oko:"……！ ど、どうして アタシの すきなもの、わかるのよ…。ずっと、だいじにするわ。",niko:"うそ、これ ほしかったの！ ボンボン！ だいすき！",hyoe:"ボン、これ…ずっと ほしかった。ありがとう…ありがとう…！",mogu:"わあ、うちの だいすきな やつ〜！ うれしい〜！",nemu:"ふあ…これ、ふかふか…。ずっと だいじに して ねる。",tere:"こ、これ…とても、うれしいです。大切に、します。…ずっと。",niji:"ほう…これは、我輩の 好みである。…ありがたく、受けとろう。"};
function gifts(id){var d=ld();return(d.gifts&&d.gifts[id])||[]}
function gaveThisYear(id){var y=new Date().getFullYear();return gifts(id).some(function(g){return g.y===y})}
function giveGift(id,em){var d=ld();d.gifts=d.gifts||{};var l=d.gifts[id]=d.gifts[id]||[];l.push({g:em,y:new Date().getFullYear()});if(l.length>12)l.shift();sv(d)}
/* ---- おでかけ ---- */
function babyId(){try{return window.BonBaby&&BonBaby.saved()?"hyoe":""}catch(e){return""}}
function outs(now){now=now||Date.now();var res={},taken={},d=ld(),k=d.out||{},bb=babyId();
 IDS.forEach(function(g){var o=k[g];if(o&&now<o.u&&g!==bb&&o.h!==bb){res[g]={h:o.h,s:o.s,u:o.u,by:"kan"};taken[g]=1;taken[o.h]=1}});
 var dt=new Date(now),hr=dt.getHours();if(hr<8||hr>=21)return res;
 var b=Math.floor(now/1800000);
 for(var i=0;i<IDS.length;i++){var g=IDS[(i+b)%IDS.length];if(taken[g]||g===bb)continue;
  if(rnd(b*131+i*17+7)<.1){var st=b*1800000+Math.floor(rnd(b*7+i)*10)*60000,en=st+(15+Math.floor(rnd(b*11+i)*10))*60000;
   if(now>=st&&now<en){var c=IDS.filter(function(x){return x!==g&&!taken[x]&&x!==bb});if(c.length){var h=c[Math.floor(rnd(b*19+i*3)*c.length)];res[g]={h:h,s:st,u:en,by:"auto"};taken[g]=1;taken[h]=1}}}}
 return res}
function away(id){return outs()[id]||null}
function visitors(host){var o=outs(),r=[];IDS.forEach(function(g){if(o[g]&&o[g].h===host)r.push(g)});return r}
function sendOut(g,h,mins){var d=ld();d.out=d.out||{};var now=Date.now();d.out[g]={h:h,s:now,u:now+(mins||20)*60000};sv(d)}
function callBack(g){var d=ld();if(d.out&&d.out[g]){d.out[g].u=Date.now()-1;sv(d)}}
var AW={oko:"…ただいま。べ、別に さびしくなんて なかったわよ。",niko:"ただいま〜！ ボンボン！ たのしかった！",hyoe:"ただいま…。ボン、ちょっと どきどき したけど、たのしかった。",mogu:"ただいま〜。おいしいもの、ごちそうに なっちゃった〜",nemu:"ふあ…ただいま。…ねむい。",tere:"た、ただいま もどりました。…たのしかった、です。",niji:"うむ、今帰ったぞ。有意義であった。"};
/* ---- 画面 ---- */
var lastStat="",lastOutSig="",said={};
function css(){if(document.getElementById("rnCss"))return;var s=document.createElement("style");s.id="rnCss";s.textContent=
".rnwx{position:absolute;inset:0;overflow:hidden;pointer-events:none;border-radius:5px}"+
".ohstage[data-sn=spring] .rnwx::after{content:'🌸';position:absolute;right:6%;top:6%;font-size:16px;opacity:.85;animation:rnsw 5s ease-in-out infinite}"+
".ohstage[data-sn=autumn] .rnwx::after{content:'🍁';position:absolute;right:6%;top:6%;font-size:16px;opacity:.85;animation:rnsw 5s ease-in-out infinite}"+
".ohstage[data-sn=winter] .rnwx::after{content:'❄';position:absolute;right:8%;top:8%;font-size:15px;color:#fff;text-shadow:0 0 3px #7aa;opacity:.9;animation:rnsw 6s ease-in-out infinite}"+
".ohstage[data-sn=summer] .rnwx::after{content:'☀';position:absolute;right:6%;top:4%;font-size:18px;opacity:.9;animation:rnsw 7s ease-in-out infinite}"+
".ohstage.t-night .rnwx::after{content:'🌙';color:#fff;text-shadow:none;font-size:16px}"+
".ohstage[data-wx=rain] .ohwin,.ohstage[data-wx=storm] .ohwin{background:linear-gradient(180deg,#9BB0C4,#C9D6E2)!important}"+
".ohstage[data-wx=cloud] .ohwin,.ohstage[data-wx=fog] .ohwin{background:linear-gradient(180deg,#C5CCD4,#E6EAEE)!important}"+
".ohstage[data-wx=snow] .ohwin{background:linear-gradient(180deg,#9FB6CC,#C8D8E6)!important}"+
".ohstage.t-night[data-wx] .ohwin{filter:brightness(.7)}"+
".ohstage[data-wx=rain] .rnwx::before,.ohstage[data-wx=storm] .rnwx::before{content:'';position:absolute;inset:-20% 0;background:repeating-linear-gradient(105deg,rgba(60,95,140,.6) 0 1.6px,transparent 1.6px 8px);animation:rnrain .55s linear infinite}"+
".ohstage[data-wx=snow] .rnwx::before{content:'';position:absolute;inset:-20% 0;background:radial-gradient(circle,#fff 0 1.6px,transparent 2px) 0 0/14px 16px,radial-gradient(circle,#fff 0 1.2px,transparent 1.6px) 7px 8px/14px 16px;animation:rnsnow 3.2s linear infinite}"+
".ohstage[data-wx=cloud] .rnwx::before,.ohstage[data-wx=fog] .rnwx::before{content:'☁';position:absolute;left:12%;top:8%;font-size:22px;opacity:.85;animation:rnsw 8s ease-in-out infinite}"+
".ohstage[data-wx=storm] .rnwx::after{content:'⚡';position:absolute;right:8%;top:8%;font-size:16px;animation:rnfl 2.4s steps(1) infinite}"+
".ohstage[data-wx] .rnwx::after{opacity:.0}.ohstage[data-wx=storm] .rnwx::after{opacity:1}"+
"@keyframes rnrain{to{transform:translate(-4px,9px)}}@keyframes rnsnow{to{background-position:0 16px,7px 24px}}@keyframes rnsw{50%{transform:translate(-3px,3px) rotate(8deg)}}@keyframes rnfl{0%,86%{opacity:0}87%,92%{opacity:1}93%,100%{opacity:0}}"+
".rnbd{display:none;position:absolute;left:50%;bottom:1.5%;transform:translateX(-50%);z-index:6;background:#fff;border:2px solid var(--c);border-radius:999px;padding:3px 12px;font-size:13px;font-weight:700;white-space:nowrap;box-shadow:0 2px 0 rgba(46,36,28,.15)}"+
".rnbunt{display:none;position:absolute;left:0;right:0;top:0;height:16px;z-index:5;pointer-events:none;background:repeating-linear-gradient(90deg,#E0463C 0 16px,#F2C230 16px 32px,#4C9BE0 32px 48px,#5BB66B 48px 64px);clip-path:polygon(0 0,100% 0,100% 40%,97% 100%,94% 40%,91% 100%,88% 40%,85% 100%,82% 40%,79% 100%,76% 40%,73% 100%,70% 40%,67% 100%,64% 40%,61% 100%,58% 40%,55% 100%,52% 40%,49% 100%,46% 40%,43% 100%,40% 40%,37% 100%,34% 40%,31% 100%,28% 40%,25% 100%,22% 40%,19% 100%,16% 40%,13% 100%,10% 40%,7% 100%,4% 40%,1% 100%,0 40%)}"+
".rnbl{display:none;position:absolute;z-index:5;font-size:24px;pointer-events:none;animation:rnsw 4s ease-in-out infinite}"+
".ohstage.rn-bd .rnbd,.ohstage.rn-bd .rnbunt,.ohstage.rn-bd .rnbl{display:block}"+
".rnaway{display:none;position:absolute;left:8%;right:8%;bottom:10%;z-index:7;background:rgba(255,255,255,.94);border:2px solid var(--c);border-radius:12px;padding:10px;text-align:center;font-size:14px;line-height:1.6}"+
".ohstage.rn-away .rnaway{display:block}.ohstage.rn-away #ohBon{visibility:hidden}"+
".rngf{position:absolute;right:3%;bottom:11%;z-index:3;font-size:20px;letter-spacing:2px;pointer-events:none}"+
".rnbox{max-width:440px;margin:12px auto 0}.rnbox summary{cursor:pointer;font-weight:700;min-height:44px;display:flex;align-items:center}"+
".rnbox .rnrow{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.rnbox button{font:inherit;min-height:44px;padding:6px 12px;border:2px solid var(--ink,#2E241C);border-radius:10px;background:#fff;cursor:pointer}"+
".rnbox button[aria-disabled=true]{opacity:.45;cursor:default}.rnbox input[type=text]{font:inherit;min-height:44px;padding:4px 10px;border:2px solid var(--ink,#2E241C);border-radius:10px;width:9em}.rnbox .rnnote{font-size:13px;line-height:1.7;margin:4px 0}"+
"@media (prefers-reduced-motion:reduce){.rnwx::before,.rnwx::after,.rnbl{animation:none!important}}";
 document.head.appendChild(s)}
function build(){var st=document.getElementById("ohStage");if(!st||st.querySelector(".rnbd"))return;
 var w=st.querySelector(".ohwin");if(w){var x=document.createElement("i");x.className="rnwx";x.setAttribute("aria-hidden","true");w.appendChild(x)}
 var h='<div class="rnbunt" aria-hidden="true"></div><div class="rnbd" role="status"></div><span class="rnbl" aria-hidden="true" style="left:6%;top:16%">🎈</span><span class="rnbl" aria-hidden="true" style="right:6%;top:26%;animation-delay:-2s">🎈</span><div class="rnaway" id="rnAway"></div><div class="rngf" id="rnGf" aria-hidden="true"></div>';
 st.insertAdjacentHTML("beforeend",h);
 var d=document.getElementById("ohDiary");if(!d)return;
 var set='<details class="sheet plain rnbox" id="rnSet"><summary>なまえと まどの せってい</summary><p class="rnnote">おしゃべりと おなじ なまえです。なまえを いれると、ボンたちが よんでくれるよ(ひらがな・カタカナで1〜5もじ)。</p><div class="rnrow"><input type="text" id="rnName" maxlength="5" autocomplete="off" aria-label="あなたの なまえ" placeholder="なまえ"><button type="button" id="rnNameSave">ほぞん</button><button type="button" id="rnNameDel">けす</button></div><p class="rnnote" id="rnNameMsg" aria-live="polite"></p><p class="rnnote" style="margin-top:10px"><b>まどの そとを いまの てんきに あわせる</b><br>ボタンを おしたときだけ、おおよその いち(しょうすう1けた)を この たんまつに ほぞんして、てんきサービス(Open-Meteo)に おくります。<b>さくしゃや ボンの サイトに、いちや てんきが おくられることは ありません。</b>いちは この たんまつの なかだけで つかうよ。いつでも やめられるよ。</p><div class="rnrow"><button type="button" id="rnWxOn">てんきを あわせる</button><button type="button" id="rnWxOff">やめる</button></div><p class="rnnote" id="rnWxMsg" aria-live="polite"></p></details>'+
 '<details class="sheet plain rnbox" id="rnOut"><summary>おでかけ・おいわい</summary><div id="rnOutB"></div></details>';
 d.insertAdjacentHTML("afterend",set);
 var $=function(i){return document.getElementById(i)};
 $("rnName").value=uname();
 $("rnAway").addEventListener("click",function(e){var t=e.target.closest&&e.target.closest("[data-v]");if(t&&E)E.go(t.getAttribute("data-v"))});
 $("rnNameSave").addEventListener("click",function(){var v=$("rnName").value.normalize("NFKC").replace(/\s/g,"");if(!NAMERE.test(v)){$("rnNameMsg").textContent="ひらがな・カタカナで、1〜5もじに してね。";return}try{localStorage.setItem(NAMEKEY,v)}catch(e){}$("rnNameMsg").textContent="ほぞんしたよ。これからは「"+v+"」と よぶね。";refresh()});
 $("rnNameDel").addEventListener("click",function(){try{localStorage.removeItem(NAMEKEY)}catch(e){}$("rnName").value="";$("rnNameMsg").textContent="なまえを けしたよ。(おしゃべりの なまえも けえるよ)";refresh()});
 $("rnWxOn").addEventListener("click",function(){$("rnWxMsg").textContent="いちを たしかめているよ…";wxOn(function(){$("rnWxMsg").textContent=wx.k?"いまの てんきは「"+WXN[wx.k]+"」。まどの そとに あらわれるよ。":"てんきを とれなかったよ。あとで また ためしてね。";stageWx();E&&E.time()},function(m){$("rnWxMsg").textContent=m})});
 $("rnWxOff").addEventListener("click",function(){wxOff();stageWx();$("rnWxMsg").textContent="やめたよ。じかんと きせつの ようすに もどるよ。";E&&E.time()});
 var d2=ld();if(d2.geo)$("rnWxMsg").textContent=wx.k?"いまの てんき: "+WXN[wx.k]:"てんきを よみこみ ちゅう…"}
function outBody(){var b=document.getElementById("rnOutB");if(!b||!E)return;var c=E.cur();if(!c){b.innerHTML="";return}var id=c.id,a=away(id),h="";
 if(bdToday(id)){h+='<p class="rnnote"><b>🎂 きょうは '+NM[id]+'の たんじょうび！</b> プレゼントを わたせるよ。</p><div class="rnrow">';var done=gaveThisYear(id);GIFTS.forEach(function(g){h+='<button type="button" data-g="'+g[0]+'"'+(done?' aria-disabled="true"':'')+'>'+g[0]+' '+g[1]+'</button>'});h+='</div>'+(done?'<p class="rnnote">きょうは もう わたしたよ。</p>':'')}
 var gl=gifts(id);if(gl.length)h+='<p class="rnnote">もらった プレゼント：'+gl.map(function(g){return g.g}).join(" ")+'</p>';
 if(a){h+='<p class="rnnote">いま '+NM[a.h]+'の おへやに あそびに いっているよ。</p><div class="rnrow"><button type="button" data-v="'+a.h+'">ようすを 見に いく</button>'+(a.by==="kan"?'<button type="button" data-back="1">かえってきてもらう</button>':'')+'</div>'}
 else{h+='<p class="rnnote">'+NM[id]+'を ほかの ボンの おへやへ あそびに いかせるよ(20ぷんくらい)。</p><div class="rnrow">';IDS.forEach(function(x){if(x!==id)h+='<button type="button" data-o="'+x+'">'+NM[x].replace("ボン","")+'の おへやへ</button>'});h+='</div>'}
 var vs=visitors(id);if(vs.length)h+='<p class="rnnote">いま '+vs.map(function(x){return NM[x]}).join("・")+'が あそびに きているよ。</p>';
 b.innerHTML=h;
 b.querySelectorAll("[data-g]").forEach(function(x){x.addEventListener("click",function(){if(gaveThisYear(id)){return}var em=x.getAttribute("data-g");giveGift(id,em);var fav=FAV[id]===em;E.say("（"+em+" を うけとった）　"+(fav?GF[id]:GR[id]));E.fx(fav?["★","♥","✦"]:["♥","♪"],fav?7:4,26);E.diary(you(id)+"から "+em+"の プレゼントを もらった");stageState();outBody()})});
 b.querySelectorAll("[data-o]").forEach(function(x){x.addEventListener("click",function(){if(E.blocked()){E.say("（いまは おでかけ できないみたい…）");return}var h2=x.getAttribute("data-o");sendOut(id,h2,20);E.say("（"+NM[h2]+"の おへやに いってくるね）　いってきます！");E.diary(NM[h2]+"の おへやに あそびに いった。"+you(id)+"が おくりだしてくれた",NM[h2]);try{BonDiary.add(h2,NM[id]+"が あそびに きてくれた",NM[id])}catch(e){}setTimeout(refresh,1200)})});
 b.querySelectorAll("[data-v]").forEach(function(x){x.addEventListener("click",function(){E.go(x.getAttribute("data-v"))})});
 b.querySelectorAll("[data-back]").forEach(function(x){x.addEventListener("click",function(){callBack(id);E.say("（かえってきた）　"+AW[id]);refresh()})})}
function stageState(){var st=document.getElementById("ohStage");if(!st||!E)return;var c=E.cur();if(!c){return}var id=c.id,a=away(id),bd=bdToday(id);
 st.classList.toggle("rn-away",!!a);st.classList.toggle("rn-bd",bd&&!a);
 var bn=st.querySelector(".rnbd");if(bn)bn.textContent=bd?"🎂 "+NM[id]+"、おたんじょうび！":"";
 var aw=document.getElementById("rnAway");if(aw){aw.innerHTML=a?NM[id]+"は いま<br><b>"+NM[a.h]+"の おへや</b>に あそびに いっているよ<br><button type=\"button\" data-v=\""+a.h+"\" style=\"font:inherit;min-height:44px;margin-top:6px;padding:4px 12px;border:2px solid var(--ink,#2E241C);border-radius:10px;background:#fff;cursor:pointer\">ようすを 見に いく →</button>":"";}
 var g=document.getElementById("rnGf");if(g)g.textContent=gifts(id).slice(-4).map(function(x){return x.g}).join("");
 stageWx()}
function refresh(){stageState();outBody();if(E){E.picker()}}
function onShow(id){stageState();outBody();var tok=id;var still=function(){var c=E.cur();return c&&c.id===id};
 var a=away(id);if(a){setTimeout(function(){if(still())E.say("（"+NM[id]+"は いま "+NM[a.h]+"の おへやに あそびに いっているよ）")},400);return}
 var did=false,d=ld(),today=new Date().toDateString();d.seen=d.seen||{};
 if(bdToday(id)&&d.seen["b"+id]!==today){d.seen["b"+id]=today;sv(d);did=true;setTimeout(function(){if(!still())return;E.say("（"+NM[id]+"の おへやが かざられている）　"+BL[id]);E.fx(["🎂","♪","✦"],7,28)},700);
  var oth=IDS.filter(function(x){return x!==id&&!away(x)&&x!==babyId()});if(oth.length){var c1=pk(oth);setTimeout(function(){if(!still())return;E.guest(c1,9000);E.say("（"+NM[c1]+"が おいわいに きた）　"+CEL[c1]);try{BonDiary.add(id,NM[c1]+"が たんじょうびを おいわいしてくれた",NM[c1])}catch(e){}},6500)}}
 var vs=visitors(id);if(!did&&vs.length){var g=vs[0],pp=null;try{pp=BonExtra.pair(g,id)}catch(e){}setTimeout(function(){if(!still())return;E.guest(g,120000);E.say("（"+NM[g]+"が あそびに きている）　"+(pp?pp.g:"おじゃま してるよ"));if(pp)setTimeout(function(){if(still())E.say("（"+NM[g]+"を みて）　"+pp.h)},3300)},900);did=true}
 if(!did&&uname()&&Math.random()<.4){setTimeout(function(){if(still()&&!E.blocked())E.say(pk(NG[id]).split("{n}").join(you(id)))},1500);did=true}
 if(!did&&wx.k&&WL[id][wx.k]&&Math.random()<.35){setTimeout(function(){if(still()&&!E.blocked())E.say("（まどの そとを みて）　"+WL[id][wx.k])},5200)}}
function tick(){if(!E)return;var o=outs(),sig=IDS.map(function(g){return o[g]?g+">"+o[g].h:""}).join("|");
 if(sig!==lastOutSig){var prev=lastOutSig;lastOutSig=sig;
  var d=ld();d.logged=d.logged||{};var ch=false;IDS.forEach(function(g){if(o[g]){var k=g+">"+o[g].h+"@"+o[g].s;if(!d.logged[k]){d.logged[k]=1;ch=true;if(o[g].by==="auto"){try{BonDiary.add(g,NM[o[g].h]+"の おへやに あそびに いった",NM[o[g].h]);BonDiary.add(o[g].h,NM[g]+"が あそびに きてくれた",NM[g])}catch(e){}try{BonExtra.rel(g,o[g].h,"いっしょに すごした")}catch(e){}}}}});
  var ks=Object.keys(d.logged);if(ks.length>60){ks.slice(0,ks.length-40).forEach(function(k){delete d.logged[k]})}if(ch||ks.length>60)sv(d);
  var c=E.cur();if(c){var was=prev.indexOf(c.id+">")===0||prev.indexOf("|"+c.id+">")>=0,now=!!o[c.id];if(was&&!now)E.say("（かえってきた）　"+AW[c.id]);else if(!was&&now&&!E.blocked())E.say("（"+NM[o[c.id].h]+"の おへやに あそびに いく ところ）");}
  refresh()}
 var wk=wx.k;wxGet();if(ld().geo&&!wx.k)wxFetch(function(){stageState();E.time()});else if(wk!==wx.k){stageState();E.time()}}
window.BonReno={
 init:function(env){E=env;css();wxGet();build();stageState();if(ld().geo&&!wx.k)wxFetch(function(){stageState();E.time()});setInterval(tick,30000);window.__rnReady=1},
 onShow:onShow,fix:fix,you:you,away:function(id){return!!away(id)},
 awayText:function(id){var a=away(id);return a?"（いま "+NM[a.h]+"の おへやに あそびに いっているよ）":""},
 icon:function(id){return away(id)?"🚶":bdToday(id)?"🎂":""},
 afterTime:function(){var l=document.getElementById("ohTimeL");stageState();if(l&&wx.k&&l.textContent.indexOf("てんき")<0)l.textContent+="・てんき: "+WXN[wx.k]}
};
})();
