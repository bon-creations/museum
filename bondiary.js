/* bondiary.js: ボンの せいかつにっき(できごとを じどうで きろく。ブラウザの なかだけに ほぞん) */
(function(){var KEY="bm-diary",CAP=150;
function ld(){try{var d=JSON.parse(localStorage.getItem(KEY));if(d&&typeof d==="object")return d}catch(e){}return {}}
function sv(d){try{localStorage.setItem(KEY,JSON.stringify(d))}catch(e){}}
function tp(){var H=new Date().getHours();return H>=5&&H<10?"あさ":H>=10&&H<16?"おひる":H>=16&&H<19?"ゆうがた":"よる"}
window.BonDiary={
 add:function(id,x){if(!id||!x)return;var d=ld(),l=d[id]=d[id]||[],now=Date.now();var t=tp()+"、"+x+"。";for(var i=l.length-1;i>=0&&now-l[i].t<20*60000;i--)if(l[i].x===t)return;l.push({t:now,x:t});if(l.length>CAP)l.splice(0,l.length-CAP);sv(d)},
 list:function(id,n){var l=ld()[id]||[];return l.slice(-(n||30)).reverse()},
 count:function(id){return(ld()[id]||[]).length}}})();
