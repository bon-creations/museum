/* 博物館に ボンが 歩く / 時間と季節で 景色が かわる。動きをへらす設定のときは 出さない */
(function(){
try{
var a11y={};try{a11y=JSON.parse(localStorage.getItem("bm-a11y"))||{}}catch(e){}
if(a11y.m||(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches))return;
var st=document.createElement("style");
st.textContent="@keyframes bmfall{0%{transform:translate3d(0,-8vh,0) rotate(0)}100%{transform:translate3d(var(--dx),108vh,0) rotate(var(--rot))}}@keyframes bmtw{0%,100%{opacity:.15;transform:scale(.7)}50%{opacity:.95;transform:scale(1.15)}}@keyframes bmbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}.bmfx{position:fixed;inset:0;pointer-events:none;z-index:40;overflow:hidden}.bmfx i{position:absolute;top:0;font-style:normal;line-height:1;animation:bmfall linear infinite;will-change:transform}.bmfx i.tw{animation:bmtw ease-in-out infinite}.bmwalk{position:fixed;bottom:0;left:0;z-index:50;width:auto;height:88px;pointer-events:auto;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform 0s}.bmwalk img{height:88px;width:auto;display:block;animation:bmbob .5s ease-in-out infinite;pointer-events:none}.bmsay{position:fixed;z-index:51;max-width:210px;padding:8px 12px;border:2px solid #5E7A1E;border-radius:14px;background:#fff8e8;color:#2E241C;font-size:13px;line-height:1.5;pointer-events:none;box-shadow:0 2px 0 rgba(46,36,28,.25)}";
document.head.appendChild(st);
/* ---- 季節と時間 ---- */
var d=new Date(),mo=d.getMonth()+1,da=d.getDate(),hr=d.getHours();
var S=null;
if(mo===12||mo<=2)S={g:"❄",c:["#9fc4e8","#b9d6ee"],n:22,s:[12,22]};
else if(mo===3||mo===4)S={g:"✿",c:["#f4a6b8","#f7c1cd"],n:20,s:[12,20]};
else if(mo===6)S={g:"💧",c:["#7aa7d6"],n:16,s:[10,16]};
else if(mo===7||mo===8)S={g:"✦",c:["#e0506a","#e0a21f","#2f64c8","#4ea86a"],n:16,s:[12,22]};
else if(mo>=9&&mo<=11)S={g:"❦",c:["#c0651e","#b8421f","#d9a21b"],n:18,s:[14,24]};
if(mo===10&&da===31)S={g:"✦",c:["#e8801a","#7a4db0"],n:22,s:[14,24]};
var night=hr>=21||hr<5;
if(S||night){var fx=document.createElement("div");fx.className="bmfx";fx.setAttribute("aria-hidden","true");
if(S)for(var i=0;i<S.n;i++){var e=document.createElement("i");e.textContent=S.g;var sz=S.s[0]+Math.random()*(S.s[1]-S.s[0]);e.style.cssText="left:"+(Math.random()*100)+"%;font-size:"+sz+"px;color:"+S.c[i%S.c.length]+";opacity:.8;--dx:"+((Math.random()*80-40))+"px;--rot:"+(Math.random()*360)+"deg;animation-duration:"+(9+Math.random()*10)+"s;animation-delay:-"+(Math.random()*18)+"s";fx.appendChild(e)}
if(night)for(var j=0;j<14;j++){var t=document.createElement("i");t.className="tw";t.textContent="✦";t.style.cssText="left:"+(Math.random()*100)+"%;top:"+(Math.random()*70)+"%;font-size:"+(10+Math.random()*14)+"px;color:#e0a21f;animation-duration:"+(2+Math.random()*3)+"s;animation-delay:-"+(Math.random()*4)+"s;animation-name:bmtw";fx.appendChild(t)}
document.body.appendChild(fx)}
/* ---- 歩くボン ---- */
var C=[["hyoe",["ひょえっ！ ボン、さんぽ中なの……","わあ、見つかっちゃった……！","こ、こわくないよ……たぶん"]],["oko",["ちょっと、じゃましないでよ！","さんぽの途中なのよ。べ、別にさぼってないわ！","アタシを つかまえようなんて 100年早いわ！"]],["niko",["やっほー！ いっしょに さんぽする？","きょうも いい天気だねっ♪","博物館、ぐるっと 見てきたよ！"]],["mogu",["もぐもぐ……おやつ、持ってない？","おなか すいたぁ〜","さんぽの あとは ごはんだねぇ"]],["nemu",["……ふぁ。さんぽ中に ねむく なってきた……","ぼく、ねながら 歩いてた……","あとで ひるね する……"]],["tere",["あ、あの……見ないでください……","えへへ……ちょっとだけ さんぽ……","は、はずかしい……"]],["niji",["うむ、館内の見回りである！","お主も 展示を楽しんでおるか？","我輩の さんぽを 邪魔するでないぞ！"]],["sakusha",["さんぽ中だよ〜","みてくれて ありがとう！","ゆっくり していってね"]]];
var cur=null,tm=null;
function spawn(){if(cur||document.hidden){tm=setTimeout(spawn,6000);return}
var c=C[Math.floor(Math.random()*C.length)];var w=document.createElement("div");w.className="bmwalk";w.setAttribute("role","button");w.setAttribute("aria-label",c[0]+"ボンが歩いている。タップすると話す");var im=new Image();im.src="walk_"+c[0]+".webp";im.alt="";w.appendChild(im);document.body.appendChild(w);cur=w;
var W=window.innerWidth,dir=Math.random()<.5?1:-1,x=dir>0?-80:W+6,sp=34+Math.random()*22,stop=false,last=performance.now();im.style.transform="scaleX("+(dir>0?1:-1)+")";
w.addEventListener("click",function(){if(w._hop)return;w._hop=1;stop=true;var b=document.createElement("div");b.className="bmsay";b.textContent=c[1][Math.floor(Math.random()*c[1].length)];document.body.appendChild(b);var r=w.getBoundingClientRect();b.style.left=Math.max(6,Math.min(W-216,r.left-60))+"px";b.style.bottom=(96)+"px";w.animate([{transform:"translateY(0)"},{transform:"translateY(-26px)"},{transform:"translateY(0)"}],{duration:420});setTimeout(function(){b.remove();w._hop=0;stop=false;last=performance.now()},2600)});
function step(now){if(!w.isConnected)return;var dt=Math.min(.1,(now-last)/1000);last=now;if(!stop){x+=dir*sp*dt}w.style.transform="translateX("+x+"px)";if((dir>0&&x>W+10)||(dir<0&&x<-84)){w.remove();cur=null;tm=setTimeout(spawn,9000+Math.random()*16000);return}requestAnimationFrame(step)}
requestAnimationFrame(step)}
tm=setTimeout(spawn,4000);
}catch(e){}
})();
