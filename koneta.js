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
if(f==="zukan"){var SEC={oko:"……ちょっと、くすぐったいんだけど。やめなさいよ。",niko:"えへへ、くすぐったーい！もっとやって〜！",hyoe:"ひょ、ひょえっ！？……ひょっく。",mogu:"おなかがなっちゃった〜。ごまおにぎり、たべる〜？",nemu:"……すう……(ねている)",tere:"……み、見ないで、ください……！",rain:"うむ！ 我輩を連打するとは、よい度胸だな！ わっはっは！"};
var cnt={},last=0;document.addEventListener("click",function(e){var im=e.target.closest&&e.target.closest(".zimg");if(!im)return;var a=im.closest("article.zk");if(!a||!SEC[a.id])return;var n=Date.now();cnt[a.id]=(n-last<1500&&cnt.id===a.id)?(cnt[a.id]||0)+1:1;cnt.id=a.id;last=n;if(cnt[a.id]>=7){cnt[a.id]=0;toast(SEC[a.id],4200)}})}
if(f==="calendar"){try{var cn=new Date();localStorage.setItem("bm-cal",cn.getFullYear()+"-"+(cn.getMonth()+1))}catch(e){}}
/* ひょえボンが横切る(立ち絵・20秒に1回) */
if(!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)){var st=document.createElement("style");st.textContent="@keyframes bmRun{from{transform:translateX(-30vw)}to{transform:translateX(130vw)}}@keyframes bmHop{0%,100%{transform:translateY(0)}50%{transform:translateY(-22px)}}@keyframes bmRoll{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes bmBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}";document.head.appendChild(st);
var RUNS={hyoe:[["run_yoisho.webp","bmHop 1s ease-in-out infinite"],["run_koro.webp","bmRoll 1.2s linear infinite"],["run_matte.webp","bmBob .3s ease-in-out infinite"],["run_hyoe.webp","bmHop .5s ease-in-out infinite"]],niko:[["run_niko_fight.webp","bmBob .3s ease-in-out infinite"],["run_niko_e.webp","bmHop .5s ease-in-out infinite"],["run_niko_asobo.webp","bmHop .45s ease-in-out infinite"]],oko:[["run_oko_katta.webp","bmHop .5s ease-in-out infinite"],["run_oko_chotto.webp","bmBob .3s ease-in-out infinite"],["run_oko_mou.webp","bmBob .25s ease-in-out infinite"]]};
var op="";try{op=localStorage.getItem("bm-oshi")||""}catch(e){}
var who=op?(RUNS[op]?[op]:[]):["hyoe","oko","niko"];
var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function go(any){if(document.hidden)return;var pool=any&&!who.length?["hyoe","oko","niko"]:who;if(!pool.length)return;var L=RUNS[pool[Math.floor(Math.random()*pool.length)]];var r=L[Math.floor(Math.random()*L.length)];
var W=window.innerWidth,H=window.innerHeight,s=Math.round(80+Math.random()*50),m=s+20,R=Math.random,bY=Math.max(0,H-s-8);
function rY(){return R()<.4?bY:R()*Math.max(1,H-s-10)}
var dir=R()<.5?1:-1,xs=dir>0?-m:W+m,xe=dir>0?W+m:-m,P=[],dur,kind=Math.floor(R()*6);
/* P: [x,y,flip,ms] ms=前の点からの時間 */
if(kind===0){var y=rY();dur=3800+R()*3200;P=[[xs,y,dir,0],[xe,y,dir,dur]]}
else if(kind===1){dur=4200+R()*3000;P=[[xs,rY(),dir,0],[xe,rY(),dir,dur]]}
else if(kind===2){var by=Math.min(bY-50,Math.max(50,rY())),am=20+R()*40,n=14,ph=R()*6.28;dur=5000+R()*3000;for(var i=0;i<=n;i++){var t=i/n;P.push([xs+(xe-xs)*t,by+am*Math.sin(ph+t*9),dir,i?dur/n:0])}}
else if(kind===3){var y3=rY(),xm=W*(.25+R()*.5),d1=1800+R()*1500;P=[[xs,y3,dir,0],[xm,y3,dir,d1],[xm,y3,-dir,500+R()*600],[xs,y3,-dir,d1*1.1]]}
else if(kind===4){var x4=R()*Math.max(1,W-s),dn=R()<.5,fl=R()<.5?1:-1;dur=3600+R()*2400;P=[[x4,dn?-m:H+m,fl,0],[x4+(R()*80-40),dn?H+m:-m,fl,dur]]}
else{var k=3+Math.floor(R()*3),d5=dir;P=[[xs,rY(),dir,0]];for(var j=1;j<=k;j++){var px=xs+(xe-xs)*j/(k+1);P.push([px,rY(),dir,700+R()*600])}P.push([xe,rY(),dir,800+R()*500])}
if(/run_(koro|hyoe|matte|yoisho|oko_)/.test(r[0]))for(var u=0;u<P.length;u++)P[u][2]=1;
if(r[0]==="run_yoisho.webp")for(var sl=0;sl<P.length;sl++)P[sl][3]*=1.9;var tot=0;for(var q=0;q<P.length;q++)tot+=P[q][3];
var w=document.createElement("div");w.setAttribute("aria-hidden","true");w.style.cssText="position:fixed;left:0;top:0;z-index:9995;pointer-events:none;will-change:transform";
var fp=document.createElement("div"),im=document.createElement("img");im.src=r[0];im.alt="";im.style.cssText="display:block;height:"+s+"px;width:auto;animation:"+r[1];
fp.appendChild(im);w.appendChild(fp);document.body.appendChild(w);
var kf=[],fk=[],c=0;for(var z=0;z<P.length;z++){c+=P[z][3];var o=tot?c/tot:0;kf.push({offset:o,transform:"translate("+Math.round(P[z][0])+"px,"+Math.round(P[z][1])+"px)"});fk.push({offset:o,transform:"scaleX("+P[z][2]+")",easing:"steps(1,end)"})}
var done=function(){if(w.parentNode)w.remove()};
try{var an=w.animate(kf,{duration:tot,easing:"linear",fill:"forwards"});fp.animate(fk,{duration:tot,fill:"forwards"});an.onfinish=done}catch(e){}
setTimeout(done,tot+500)}
window.bmRun=function(){go(true)};
if(who.length&&f==="index")setInterval(go,20000);
/* 走る！ボタン */
var tries=0;(function addBtn(){var row=document.getElementById("bmcopylink");if(!row){if(tries++<30)setTimeout(addBtn,100);return}
{var rb=document.createElement("button");rb.type="button";rb.innerHTML=(window.bmIco?bmIco("run"):"")+" 走る！";rb.setAttribute("aria-label","ボンを走らせる");
rb.style.cssText="min-height:44px;padding:0 14px;border-radius:999px;border:2px solid var(--ink,#2E241C);background:var(--card,#FFF8EA);color:var(--ink,#2E241C);font:700 14px/1 sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(46,36,28,.25)";
rb.addEventListener("click",function(){window.bmRun()});var g=document.getElementById("bmgear");row.insertBefore(rb,g||null)}})();
}
if(f!=="index")return;
/* きょうのボンの一言に、ときどき小ネタのヒントをまぜる */
var HB={"おこボン":["小説は、最後まで読みなさいよ。いいこと、あるから。","毎日来なさいよ。10日目に、いいことがあるわ。"],"にこボン":["ページのいちばん下をタップすると、まめ知識が聞けるよ！","NEWってついてるところを押すと、だれかがしゃべるよ〜！"],"ひょえボン":["ロゴを、ななかい、おすと……ひみつが、でるよ。","トップを、ひらいてると……ボン、はしるよ。"],"もぐボン":["毎月1日と15日は、お赤飯の日だよ〜。もぐボンが、ごはんを炊くんだ〜。","夜にトップを開くと、ねむさんに会えるかもだよ〜。"],"ねむボン":["……夜に、トップに来ると、ぼくに会えるかも……。","……ずかんの、ボンを、何回も、つつくと……。……ひみつ。"],"てれボン":["ず、ずかんのボンを、7回、つつくと……ひみつが……。","しょ、小説を、最後まで読むと……ノートに、書きます……。"],"にじボン":["我輩のロゴを、10回つづけて押してみるといいぞ！ いいものが見られるからな！","トップのロゴを、7回押すと……ふっふっふ、ひみつだぞ！"]};
var tsy=document.getElementById("tdSay"),tnm=document.getElementById("tdName"),busy=false;
function tip(){if(!tsy||!tnm||busy)return;var a=HB[tnm.textContent.trim()];if(!a||Math.random()>=.25)return;busy=true;tsy.textContent=a[Math.floor(Math.random()*a.length)];setTimeout(function(){busy=false},0)}
if(tsy&&window.MutationObserver){new MutationObserver(function(){if(!busy)tip()}).observe(tsy,{childList:true,characterData:true,subtree:true});setTimeout(tip,50)}
/* 夜のねむボン */
var now=new Date(),h=now.getHours(),mo=now.getMonth()+1,d=now.getDate(),delay=1800;
if((h>=22||h<5)&&!ss("bm-night")){ss("bm-night","1");delay=6500;setTimeout(function(){toast("ねむボン：「……ねむい。もう、おやすみの時間だよ……」",4800)},1800)}
/* 季節のあいさつ・お赤飯の日 */
var L=[],md=mo*100+d;
if(md>=1229||md<=103)L.push(md>=1229?"にじボン：「今年もよく遊んだな！ よいお年を！」":"にじボン：「あけましておめでとう！ 今年もよろしく頼むぞ！」");
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
var m=document.createElement("div");m.setAttribute("role","status");m.textContent="にじボン：「わっはっは！ 虹をかけてやったぞ！」";m.style.cssText="position:fixed;left:50%;top:max(16px,env(safe-area-inset-top));transform:translateX(-50%);z-index:9999;max-width:88vw;padding:12px 18px;border:2px solid #2E241C;border-radius:16px;background:#FFF8EA;color:#2E241C;font:700 15px/1.6 sans-serif;box-shadow:0 3px 0 rgba(46,36,28,.35);text-align:center";document.body.appendChild(m);setTimeout(function(){m.remove()},4000)}
/* 来館回数のごほうび */
try{var td=now.getFullYear()+"-"+mo+"-"+d,vc=+localStorage.getItem("bm-vc")||0;if(localStorage.getItem("bm-vd")!==td){vc++;localStorage.setItem("bm-vc",String(vc));localStorage.setItem("bm-vd",td);
var VM={10:"にこボン：「10日目の来館だね！ いつもありがとう〜！」",50:"もぐボン：「50日目〜！ お祝いに、お赤飯、炊こうか〜」",100:"にじボン：「100日目とは！ 我輩、感動したぞ！ わっはっは！」"};
if(VM[vc])setTimeout(function(){toast(VM[vc],5200)},delay+4500)}}catch(e){}
/* NEWバッジにひとこと */
var NM=["にこボン：「新しいのが入ったよ〜！ 見て見て！」","もぐボン：「できたてだよ〜。ほかほかだよ〜」","にじボン：「うむ、新着だぞ！ ぜひ見てくれ」","ねむボン：「……あたらしい。……いいね」","てれボン：「あ、あの……見てくれると、うれしいです……」","おこボン：「べつに、見てほしいわけじゃ……いや、見なさいよ」"];
document.addEventListener("click",function(e){if(e.target.closest&&e.target.closest(".newb"))toast(NM[Math.floor(Math.random()*NM.length)],3200)},true);
/* すきなボンを えらぶ */
var OB=[["oko","おこボン"],["niko","にこボン"],["hyoe","ひょえボン"],["mogu","もぐボン"],["nemu","ねむボン"],["tere","てれボン"],["niji","にじボン"],["","おまかせ"]],ob=document.getElementById("oshiB"),oc="";
try{oc=localStorage.getItem("bm-oshi")||""}catch(e){}
if(ob){OB.forEach(function(x){var b=document.createElement("button"),on=oc===x[0];b.type="button";b.textContent=x[1]+(on&&x[0]?" ✓":"");b.setAttribute("aria-pressed",on?"true":"false");b.style.cssText="font:inherit;font-size:16px;padding:9px 14px;min-height:44px;border-radius:999px;border:2px solid #5E7A1E;font-weight:700;cursor:pointer;background:"+(on?"#5E7A1E":"transparent")+";color:"+(on?"#fff":"#5E7A1E");
b.addEventListener("click",function(){try{if(x[0]){localStorage.setItem("bm-oshi",x[0]);localStorage.setItem("bm-oshis",JSON.stringify([x[0]]))}else{localStorage.removeItem("bm-oshi");localStorage.removeItem("bm-oshis")}}catch(e){}location.reload()});ob.appendChild(b)})}
if(ob){var hp=document.createElement("p");hp.style.cssText="margin:10px 0 0;font-size:14px;line-height:1.7";hp.textContent="※ えらんだボンは、ときどき 画面を 走り抜けるよ。いまは ひょえボンと おこボンと にこボンだけ。ほかの子も……どこかで こっそり 走る れんしゅうを しているらしい。";ob.parentNode.appendChild(hp)}
})();
