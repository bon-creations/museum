/* 季節の限定イベント: 日付に合わせて、トップに「いま」のイベントを出す。ごよみ(events.html)にも使う */
(function(){
var N={"oko": "おこボン", "niko": "にこボン", "hyoe": "ひょえボン", "mogu": "もぐボン", "nemu": "ねむボン", "tere": "てれボン", "niji": "にじボン"},EV=[[101, 107, "お正月", "niji", "新年あけまして おめでとう、であるな。今年も 我輩が 案内するぞ！ 見学者よ、よろしく頼む！"], [201, 203, "節分", "oko", "鬼は〜外！ ……アタシは 鬼じゃないわよ！ 豆、こっちに 投げないでよね！"], [210, 214, "バレンタイン", "niko", "バレンタイン♪ みんなに チョコ、くばっちゃうよ！ わたしからは、にっこり つきだよ♪"], [301, 303, "ひなまつり", "mogu", "ひなあられ、おいしいよ〜。ちらしずしも 作ったよ〜。もぐもぐ、はなやかな ごはんだよ〜。"], [325, 410, "お花見", "nemu", "さくらの 下で ひるね…。ひらひら、きもちいい。ふあ…。"], [501, 505, "こどもの日", "hyoe", "こいのぼり、おおきい。ひょえ〜。ボンも、おおきく なれるかな。"], [701, 707, "七夕", "tere", "短冊に、そっと、願いを 書きました。……ないしょ、です。"], [720, 815, "夏まつり", "niko", "おまつり 行こう！ わたし、りんごあめ たべたい♪ 花火も いっしょに 見ようね！"], [910, 930, "お月見", "mogu", "おだんご、作ったよ〜。おつきさま、まんまるだよ〜。もぐもぐ。"], [1025, 1031, "ハロウィン", "hyoe", "トリック・オア・トリート……ひょえっ！ おばけ、こわい。でも、おかし ほしい。"], [1029, 1029, "かいかん きねんび", "niji", "この博物館が 開いた 日だ。来てくれて ありがとう！ 我輩からも、礼を言うぞ！"], [1110, 1115, "七五三", "hyoe", "ちとせあめ、ながーい。ひょえ。おいしそう。ボンも、ほしいな。ふにゃ。"], [1220, 1225, "クリスマス", "nemu", "クリスマス…。お布団の中が、いちばん あったかい。プレゼントは、まくらが いいな。ふあ。"], [1226, 1231, "年末", "oko", "大そうじ、するわよ！ ほこりひとつ、のこさないんだから。年越しそばも、ちゃんと 食べるからね！"]];
function md(d){return (d.getMonth()+1)*100+d.getDate()}
function fmt(n){return Math.floor(n/100)+"月"+(n%100)+"日"}
function range(e){return e[0]===e[1]?fmt(e[0]):fmt(e[0])+"〜"+fmt(e[1])}
function now(){var m=/[?&]d=(\d{1,2})-(\d{1,2})/.exec(location.search);if(m){var d=new Date();d.setMonth(+m[1]-1,+m[2]);return d}return new Date()}
function active(d){var x=md(d);return EV.filter(function(e){return x>=e[0]&&x<=e[1]})}
function next(d){var x=md(d),y=d.getFullYear(),best=null,bd=1e9;EV.forEach(function(e){var s=new Date(y,Math.floor(e[0]/100)-1,e[0]%100);if(md(s)<=x)s=new Date(y+1,Math.floor(e[0]/100)-1,e[0]%100);var t=Math.round((s-new Date(y,d.getMonth(),d.getDate()))/864e5);if(t>0&&t<bd){bd=t;best=e}});return best?{e:best,days:bd}:null}
window.bmEvents={list:EV,names:N,active:active,next:next,range:range,now:now};
function card(e,tag){var c=document.createElement("div");c.className="say";c.innerHTML='<img src="icon_round_'+e[3]+'.png" alt="" width="72" height="72" style="border-radius:50%;flex:none"><div class="say-body"><p><span class="tag on"></span> <b class="en"></b></p><p class="et" style="margin:4px 0 0;line-height:1.8"></p></div>';
c.querySelector(".tag").textContent=tag;c.querySelector(".en").textContent=e[2]+"（"+N[e[3]]+"）";c.querySelector(".et").textContent=e[4];return c}
function banner(){var t=document.getElementById("today");if(!t||document.getElementById("evt"))return;var d=now(),a=active(d),nx=next(d),s=document.createElement("section");s.id="evt";s.setAttribute("aria-labelledby","evh");
var inner=document.createElement("div");inner.className="sheet plain";
if(a.length){a.slice(0,2).forEach(function(e){inner.appendChild(card(e,"いま"))})}
else if(nx&&nx.days<=14){var e=nx.e,c=card(e,"もうすぐ");c.querySelector(".et").textContent="あと "+nx.days+"にち！ "+range(e)+" だよ。";c.querySelector(".en").textContent=e[2]+"（"+N[e[3]]+"）";inner.appendChild(c)}
else return;
var h=document.createElement("h2");h.id="evh";h.innerHTML='<svg class="i fl" width="24" height="24" aria-hidden="true"><use href="#star"/></svg><span class="t">きせつの イベント</span>';
s.appendChild(h);s.appendChild(inner);var l=document.createElement("a");l.className="go";l.href="events.html";l.textContent="きせつ ごよみを 見る";l.style.marginTop="8px";inner.appendChild(l);t.parentNode.insertBefore(s,t)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",banner);else banner();
})();
