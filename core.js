(function(root){
'use strict';
function shuffle(items,random=Math.random){const a=items.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function selectQuestions(rows,count,randomize,random=Math.random){const questions=cleanQuestions(rows);return (randomize?shuffle(questions,random):questions).slice(0,count);}
class SilenceGate{
 constructor(){this.reset();}
 reset(){this.started=false;this.lastVoice=0;this.streak=0;}
 update(level,now,threshold){if(level>=threshold){this.streak++;if(this.streak>=3){this.started=true;this.lastVoice=now;}}else this.streak=0;return level<threshold&&this.started&&now-this.lastVoice>=10000;}
 remaining(now){return this.started?Math.max(0,Math.ceil((10000-(now-this.lastVoice))/1000)):null;}
}
function cleanQuestions(rows){return [...new Set(rows.map(x=>String(x??'').trim()).filter(Boolean))];}
const api={shuffle,selectQuestions,SilenceGate,cleanQuestions};if(typeof module!=='undefined')module.exports=api;else root.CourtCore=api;
})(typeof window==='undefined'?globalThis:window);
