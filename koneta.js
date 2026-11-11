/* 小ネタ: 夜のねむボン / お赤飯の日 / フッター豆知識 / ずかん7回タップ */
(function(){
var f=(location.pathname.split("/").pop()||"index.html").replace(/\.html$/,"");
var el=null,tm=0;
function toast(t,ms){if(!el){el=document.createElement("div");el.setAttribute("role","status");el.style.cssText="position:fixed;left:50%;bottom:max(24px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:9998;max-width:88vw;padding:12px 18px;border:2px solid #2E241C;border-radius:16px;background:#FFF8EA;color:#2E241C;font:700 15px/1.6 sans-serif;box-shadow:0 3px 0 rgba(46,36,28,.35);text-align:center";document.body.appendChild(el)}
el.textContent=t;el.style.display="block";clearTimeout(tm);tm=setTimeout(function(){el.style.display="none"},ms||3600)}
function ss(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch(e){}}
/* フッター豆知識 */
var TR=["ボンたちの街の名前は「いろどり町」だよ。","ボンは、何年たっても見た目が変わらないんだ。","ボンの国は「梵本(ぼんほん)」、首都は「梵京(ぼんきょう)」。","ひょえボンの名前は、最初に言えた言葉「ひょえ」からきているよ。","ボンたちは、びっくりすると「ボン！？」、ごはんのときは「ボーン！」と言うよ。","7人のボンは、胡麻かけ飯とお赤飯が大好き。","ボンはごまを万能調味料だと思っていて、サラダやお肉にもかけるよ。","似ている動物は、おこ=ネコ、にこ=イルカ、ひょえ=りす、もぐ=たぬき、ねむ=カピバラ、てれ=ヒツジ、にじ=フクロウ。","ボンたちのごはんに決まった時間はないよ。作るのは、たいてい、もぐボン。","しょんぼりしたときは「しょボン……」って言うんだ。"];
var ft=document.querySelector("footer");
if(ft){ft.style.cursor="pointer";ft.addEventListener("click",function(e){if(e.target.closest("a"))return;var k=Math.floor(Math.random()*TR.length);toast("ボンのまめ知識：\n"+TR[k],4800);el.style.whiteSpace="pre-line"})}
/* ずかん: 7回タップ */
if(f==="zukan"){var SEC={oko:"……ちょっと、くすぐったいんだけど。やめなさいよ。",niko:"えへへ、くすぐったーい！もっとやって〜！",hyoe:"ひょ、ひょえっ！？……ひょっく。",mogu:"おなかがなっちゃった〜。ごまおにぎり、たべる〜？",nemu:"……すう……(ねている)",tere:"……み、見ないで、ください……！",rain:"うむ！ 我輩を連打するとは、よい度胸である！ わっはっは！"};
var cnt={},last=0;document.addEventListener("click",function(e){var im=e.target.closest&&e.target.closest(".zimg");if(!im)return;var a=im.closest("article.zk");if(!a||!SEC[a.id])return;var n=Date.now();cnt[a.id]=(n-last<1500&&cnt.id===a.id)?(cnt[a.id]||0)+1:1;cnt.id=a.id;last=n;if(cnt[a.id]>=7){cnt[a.id]=0;toast(SEC[a.id],4200)}})}
if(f==="calendar"){try{var cn=new Date();localStorage.setItem("bm-cal",cn.getFullYear()+"-"+(cn.getMonth()+1))}catch(e){}}
if(f!=="index")return;
/* きょうのボンの一言に、ときどき小ネタのヒントをまぜる */
var HB={"おこボン":["小説は、最後まで読みなさいよ。いいこと、あるから。","毎日来なさいよ。10日目に、いいことがあるわ。"],"にこボン":["ページのいちばん下をタップすると、まめ知識が聞けるよ！","NEWってついてるところを押すと、だれかがしゃべるよ〜！"],"ひょえボン":["ロゴを、ななかい、おすと……ひみつが、でるよ。","トップを、ひらいてると……ボン、はしるよ。"],"もぐボン":["毎月1日と15日は、お赤飯の日だよ〜。もぐボンが、ごはんを炊くんだ〜。","夜にトップを開くと、ねむさんに会えるかもだよ〜。"],"ねむボン":["……夜に、トップに来ると、ぼくに会えるかも……。","……ずかんの、ボンを、何回も、つつくと……。……ひみつ。"],"てれボン":["ず、ずかんのボンを、7回、つつくと……ひみつが……。","しょ、小説を、最後まで読むと……ノートに、書きます……。"],"にじボン":["我輩のロゴを、10回つづけて押してみるがよい。いいものが見られるぞ！","トップのロゴを、7回押すと……ふっふっふ、ひみつである！"]};
var tsy=document.getElementById("tdSay"),tnm=document.getElementById("tdName"),busy=false;
function tip(){if(!tsy||!tnm||busy)return;var a=HB[tnm.textContent.trim()];if(!a||Math.random()>=.25)return;busy=true;tsy.textContent=a[Math.floor(Math.random()*a.length)];setTimeout(function(){busy=false},0)}
if(tsy&&window.MutationObserver){new MutationObserver(function(){if(!busy)tip()}).observe(tsy,{childList:true,characterData:true,subtree:true});setTimeout(tip,50)}
/* 夜のねむボン */
var now=new Date(),h=now.getHours(),mo=now.getMonth()+1,d=now.getDate(),delay=1800;
if((h>=22||h<5)&&!ss("bm-night")){ss("bm-night","1");delay=6500;setTimeout(function(){toast("ねむボン：「……ねむい。もう、おやすみの時間だよ……」",4800)},1800)}
/* 季節のあいさつ・お赤飯の日 */
var L=[],md=mo*100+d;
if(md>=1229||md<=103)L.push(md>=1229?"にじボン：「今年もよく遊んだのである。よいお年を！」":"にじボン：「あけましておめでとう！ 今年もよろしく頼むぞ！」");
else if(mo>=3&&mo<=5)L.push("にこボン：「春だよ〜！ ぽかぽかで、お花見日和だね！」");
else if(mo>=6&&mo<=8)L.push("もぐボン：「夏だね〜。冷たいおそうめんに、ごまをかけて食べよ〜」");
else if(mo>=9&&mo<=11)L.push("ひょえボン：「あき、だね。ごはんが、おいしいきせつだよ」");
else L.push("ねむボン：「……さむいね。……おふとん、あったかい」");
if(d===1||d===15)L.push("もぐボン：「きょうは、お赤飯の日だよ〜。炊けたよ〜。ごまをかけて、ボーン！」");
var lead=document.querySelector("header .lead");
if(lead){var at=lead;L.forEach(function(t){var p=document.createElement("p");p.style.cssText="margin:8px 0 0;font-weight:700";p.textContent=t;at.parentNode.insertBefore(p,at.nextSibling);at=p})}
/* ロゴ連打で虹 */
var lg=document.querySelector(".bc-logo");
if(lg){var lc=0,lt2=0;lg.addEventListener("click",function(){var n=Date.now();lc=(n-lt2<1500)?lc+1:1;lt2=n;if(lc>=10){lc=0;setTimeout(rainbow,700)}})}
function rainbow(){var r=document.createElement("div");r.setAttribute("aria-hidden","true");r.style.cssText="position:fixed;inset:0;z-index:9990;pointer-events:none;opacity:0;transition:opacity 1s;background:linear-gradient(180deg,rgba(255,0,0,.0) 0%,rgba(255,80,80,.28) 12%,rgba(255,170,60,.28) 24%,rgba(255,235,80,.28) 36%,rgba(90,200,110,.28) 48%,rgba(80,160,255,.28) 60%,rgba(120,100,230,.28) 72%,rgba(255,255,255,0) 90%)";document.body.appendChild(r);
requestAnimationFrame(function(){r.style.opacity="1"});setTimeout(function(){r.style.opacity="0";setTimeout(function(){r.remove()},1100)},3500);
var m=document.createElement("div");m.setAttribute("role","status");m.textContent="にじボン：「わっはっは！ 虹をかけてやったのである！」";m.style.cssText="position:fixed;left:50%;top:max(16px,env(safe-area-inset-top));transform:translateX(-50%);z-index:9999;max-width:88vw;padding:12px 18px;border:2px solid #2E241C;border-radius:16px;background:#FFF8EA;color:#2E241C;font:700 15px/1.6 sans-serif;box-shadow:0 3px 0 rgba(46,36,28,.35);text-align:center";document.body.appendChild(m);setTimeout(function(){m.remove()},4000)}
/* 来館回数のごほうび */
try{var td=now.getFullYear()+"-"+mo+"-"+d,vc=+localStorage.getItem("bm-vc")||0;if(localStorage.getItem("bm-vd")!==td){vc++;localStorage.setItem("bm-vc",String(vc));localStorage.setItem("bm-vd",td);
var VM={10:"にこボン：「10日目の来館だね！ いつもありがとう〜！」",50:"もぐボン：「50日目〜！ お祝いに、お赤飯、炊こうか〜」",100:"にじボン：「100日目とは！ 我輩、感動である！ わっはっは！」"};
if(VM[vc])setTimeout(function(){toast(VM[vc],5200)},delay+4500)}}catch(e){}
/* NEWバッジにひとこと */
var NM=["にこボン：「新しいのが入ったよ〜！ 見て見て！」","もぐボン：「できたてだよ〜。ほかほかだよ〜」","にじボン：「うむ、新着である！ ぜひ見るがよい」","ねむボン：「……あたらしい。……いいね」","てれボン：「あ、あの……見てくれると、うれしいです……」","おこボン：「べつに、見てほしいわけじゃ……いや、見なさいよ」"];
document.addEventListener("click",function(e){if(e.target.closest&&e.target.closest(".newb"))toast(NM[Math.floor(Math.random()*NM.length)],3200)},true);
/* ひょえボンが横切る(立ち絵・20秒に1回) */
if(!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)){var st=document.createElement("style");st.textContent="@keyframes bmRun{from{transform:translateX(-30vw)}to{transform:translateX(130vw)}}@keyframes bmHop{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}";document.head.appendChild(st);
setInterval(function(){if(document.hidden)return;var w=document.createElement("div");w.setAttribute("aria-hidden","true");w.style.cssText="position:fixed;left:0;bottom:max(6px,env(safe-area-inset-bottom));z-index:9995;pointer-events:none;animation:bmRun 5.5s linear forwards";
var im=document.createElement("img");im.src="hyoe_run.webp";im.alt="";im.width=61;im.height=90;im.style.cssText="display:block;height:90px;width:auto;animation:bmHop .45s ease-in-out infinite";
var b=document.createElement("div");b.textContent="ひょえ〜！";b.style.cssText="position:absolute;left:46px;top:-10px;white-space:nowrap;padding:3px 9px;border:2px solid #2E241C;border-radius:12px;background:#FFF8EA;color:#2E241C;font:700 12px/1.2 sans-serif";w.appendChild(im);w.appendChild(b);document.body.appendChild(w);setTimeout(function(){w.remove()},5800)},20000)}
/* すきなボンを えらぶ */
var OB=[["oko","おこボン"],["niko","にこボン"],["hyoe","ひょえボン"],["mogu","もぐボン"],["nemu","ねむボン"],["tere","てれボン"],["niji","にじボン"],["","おまかせ"]],ob=document.getElementById("oshiB"),oc="";
try{oc=localStorage.getItem("bm-oshi")||""}catch(e){}
if(ob){OB.forEach(function(x){var b=document.createElement("button"),on=oc===x[0];b.type="button";b.textContent=x[1]+(on&&x[0]?" ✓":"");b.setAttribute("aria-pressed",on?"true":"false");b.style.cssText="font:inherit;font-size:16px;padding:9px 14px;min-height:44px;border-radius:999px;border:2px solid #5E7A1E;font-weight:700;cursor:pointer;background:"+(on?"#5E7A1E":"transparent")+";color:"+(on?"#fff":"#5E7A1E");
b.addEventListener("click",function(){try{if(x[0])localStorage.setItem("bm-oshi",x[0]);else localStorage.removeItem("bm-oshi")}catch(e){}location.reload()});ob.appendChild(b)})}
})();
