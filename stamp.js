/* 来館スタンプ: 記録はこの端末のブラウザ(localStorage)だけに保存 */
(function(){
if(window.bmStamp)return;
var K="bm-stamps";
function ld(){try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return{}}}
function sv(o){try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}}
var LIST=[
["v-top","トップ","博物館のトップに来た"],["v-games","ゲーム","ゲームのページを見た"],["v-gallery","ギャラリー","ギャラリーを見た"],["v-zukan","ずかん","ボンたちのずかんを見た"],["v-music","ミュージック","ミュージックのページに来た"],["v-talk","おしゃべり","ボンたちと おしゃべりのページに来た"],
["today","今日のボン","今日のボンのひとことを聞いた"],["omikuji","おみくじ","今日のおみくじを引いた"],["shindan","ボン診断","ボン診断をやった"],["bgm","BGM","BGM「BON MEMORIA」を流した"],["music-play","曲","ミュージックで曲を聴いた"],["wall","壁紙","壁紙かアイコンをもらった"],["mini","ボンたたき","ボンたたきであそんだ"],
["p-pachi","BON UTOPIA","BON UTOPIAであそんだ"],["p-nyanko","にゃんこ","にゃんこガーディアンであそんだ"],["p-hari","寝違え","寝違え大騒動であそんだ"],["p-puzzle","パズル","ボン・パズルであそんだ"],["p-life","ボンライフ","ボンボンライフ！であそんだ"],["p-love","ボンこい","ボン♥こいであそんだ"],["p-bonsei","ボン生","ボン生ゲームであそんだ"],
["n-read","小説","ひょえボンの小説を最後まで読んだ"]
];
function add(k){var o=ld();if(o[k])return false;o[k]=Date.now();sv(o);return true}
window.bmStamp={add:add,has:function(k){return !!ld()[k]},all:ld,list:LIST,count:function(){var o=ld(),n=0;LIST.forEach(function(x){if(o[x[0]])n++});return n},reset:function(){sv({})}};
var f=(location.pathname.split("/").pop()||"index.html").replace(/\.html$/,"");
var V={index:"v-top",games:"v-games",gallery:"v-gallery",zukan:"v-zukan",music:"v-music",talk:"v-talk"};
if(V[f])add(V[f]);
if(/^novel(1b|2)?$/.test(f)){document.addEventListener("DOMContentLoaded",function(){var ps=document.querySelectorAll("p"),e=null;for(var i=ps.length-1;i>=0;i--){if(ps[i].textContent.trim()==="おしまい。"){e=ps[i];break}}
if(!e||!window.IntersectionObserver)return;var io=new IntersectionObserver(function(r){if(r[0].isIntersecting){io.disconnect();if(add("n-read")){var d=document.createElement("div");d.setAttribute("role","status");d.textContent="てれボンの記録ノートに「最後まで読んでくれた」と書いたよ。来館スタンプがふえたよ！";d.style.cssText="position:fixed;left:50%;bottom:max(24px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:9998;max-width:88vw;padding:12px 18px;border:2px solid #2E241C;border-radius:16px;background:#FFF8EA;color:#2E241C;font:700 15px/1.6 sans-serif;box-shadow:0 3px 0 rgba(46,36,28,.35);text-align:center";document.body.appendChild(d);setTimeout(function(){d.remove()},5000)}}},{threshold:1});io.observe(e)})}
document.addEventListener("play",function(e){if(e.target&&e.target.id!=="bm-bgm-audio"&&e.target.src&&!/bgm\.mp3/.test(e.target.src))add("music-play")},true);
document.addEventListener("click",function(e){if(e.target.closest&&e.target.closest("#tdMore"))add("today");var a=e.target.closest&&e.target.closest("a[href]");if(!a)return;var m=/bon-creations\.github\.io\/([^\/]+)\//.exec(a.getAttribute("href")||"");if(m&&m[1]!=="museum")add("p-"+m[1])},true);
})();
