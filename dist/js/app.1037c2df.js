(function(e){function t(t){for(var r,s,c=t[0],u=t[1],i=t[2],l=0,d=[];l<c.length;l++)s=c[l],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&d.push(a[s][0]),a[s]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);b&&b(t);while(d.length)d.shift()();return o.push.apply(o,i||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,s=1;s<n.length;s++){var u=n[s];0!==a[u]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},o=[];function s(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"87c4e185"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=a[e]=[t,r]}));t.push(n[2]=r);var o,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=s(e);var i=new Error;o=function(t){u.onerror=u.onload=null,clearTimeout(l);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;i.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",i.name="ChunkLoadError",i.type=r,i.request=o,n[1](i)}a[e]=void 0}};var l=setTimeout((function(){o({type:"timeout",target:u})}),12e4);u.onerror=u.onload=o,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],i=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var b=i;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"4ee2":function(e,t,n){},"7bae":function(e,t,n){e.exports=n.p+"img/check.b8ed64bf.svg"},"8b1b":function(e,t,n){e.exports=n.p+"img/close.2ba22493.svg"},"8e89":function(e,t,n){e.exports=n.p+"img/backspace.29c873c0.svg"},9174:function(e,t,n){e.exports=n.p+"img/settings.8d65b2d7.svg"},aede:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23");function a(e,t){var n=Object(r["v"])("router-view");return Object(r["q"])(),Object(r["d"])(n)}var o=n("6b0d"),s=n.n(o);const c={},u=s()(c,[["render",a]]);var i=u,l=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02"));function b(e,t,n,a,o,s){var c=Object(r["v"])("HelloWorld");return Object(r["q"])(),Object(r["d"])(c)}var d=n("9174"),g=n.n(d),f=n("7bae"),p=n.n(f),O=n("8e89"),j=n.n(O),y=n("8b1b"),v=n.n(y),h={class:"word-list",id:"word-list",ref:"wordListElement"},m={class:"word",id:"input-zone"},w={class:"bottom-sheet"},k={class:"keyboard"},L=["onClick"],x={class:"game-controls"},T=["title"],S=Object(r["f"])("img",{src:g.a,"aria-hidden":"true"},null,-1),E=[S],I=["title","disabled"],R=Object(r["f"])("img",{src:p.a,"aria-hidden":"true"},null,-1),C=["title","disabled"],A=Object(r["f"])("img",{src:j.a,"aria-hidden":"true"},null,-1),q=[A],P={class:"settings-content"},W={class:"settings-section"},G={class:"radio-btn"},H=Object(r["f"])("label",{for:"language-english"},"English",-1),M={class:"radio-btn"},N=Object(r["f"])("label",{for:"language-french"},"Français",-1),_={class:"settings-section"},U={class:"radio-btn"},Y=Object(r["f"])("label",{for:"keyboard-layout-qwerty"},"Qwerty",-1),D={class:"radio-btn"},Z=Object(r["f"])("label",{for:"keyboard-layout-azerty"},"Azerty",-1),Q={class:"settings-section mt-lg"},V=["title"],B=Object(r["f"])("img",{src:v.a,"aria-hidden":"true"},null,-1);function z(e,t,n,a,o,s){return Object(r["q"])(),Object(r["e"])(r["a"],null,[Object(r["f"])("div",h,[(Object(r["q"])(!0),Object(r["e"])(r["a"],null,Object(r["u"])(e.attemps,(function(e){return Object(r["q"])(),Object(r["e"])("div",{class:"word",key:e.word},[(Object(r["q"])(!0),Object(r["e"])(r["a"],null,Object(r["u"])(e.letters,(function(e){return Object(r["q"])(),Object(r["e"])("span",{class:"letter-wrapper",key:e},[Object(r["f"])("span",{class:Object(r["l"])(["letter","RIGHT_POSITION"===e.status?"right-pos":"WRONG_POSITION"===e.status?"wrong-pos":""])},Object(r["x"])(e.value),3)])})),128))])})),128)),Object(r["f"])("div",m,[(Object(r["q"])(!0),Object(r["e"])(r["a"],null,Object(r["u"])(e.input.letters,(function(t){return Object(r["q"])(),Object(r["e"])("span",{class:"letter-wrapper",key:t},[Object(r["f"])("span",{class:Object(r["l"])(["letter",e.badInput?"bad-input":""])},Object(r["x"])(t.value),3)])})),128))])],512),Object(r["f"])("div",w,[Object(r["f"])("div",k,[(Object(r["q"])(!0),Object(r["e"])(r["a"],null,Object(r["u"])(e.keyboard,(function(t){return Object(r["q"])(),Object(r["e"])("div",{class:"keyboard-row",key:t},[(Object(r["q"])(!0),Object(r["e"])(r["a"],null,Object(r["u"])(t,(function(t){return Object(r["q"])(),Object(r["e"])("button",{class:"btn",key:t,onClick:function(n){return e.inputLetter(t)}},Object(r["x"])(t),9,L)})),128))])})),128))]),Object(r["f"])("div",x,[Object(r["f"])("button",{class:"btn settings-btn",title:e.i18n("game.settings"),onClick:t[0]||(t[0]=function(t){return e.settings.open=!0})},E,8,T),Object(r["f"])("button",{class:"btn submit-btn",title:e.i18n("game.submit"),onClick:t[1]||(t[1]=function(t){return e.submitWord()}),disabled:5!==e.input.length},[Object(r["f"])("span",null,Object(r["x"])(e.i18n("game.submit")),1),R],8,I),Object(r["f"])("button",{class:"btn erase-btn",title:e.i18n("game.erase"),onClick:t[2]||(t[2]=function(t){return e.removeLastLetter()}),disabled:0===e.input.length},q,8,C)])]),Object(r["f"])("div",{class:Object(r["l"])(["settings-overlay",e.settings.open?"open":""])},[Object(r["f"])("div",P,[Object(r["f"])("section",W,[Object(r["f"])("h2",null,Object(r["x"])(e.i18n("settings.language")),1),Object(r["f"])("div",G,[Object(r["D"])(Object(r["f"])("input",{id:"language-english",type:"radio",name:"language",value:"en","onUpdate:modelValue":t[3]||(t[3]=function(t){return e.settings.language=t})},null,512),[[r["A"],e.settings.language]]),H]),Object(r["f"])("div",M,[Object(r["D"])(Object(r["f"])("input",{id:"language-french",type:"radio",name:"language",value:"fr","onUpdate:modelValue":t[4]||(t[4]=function(t){return e.settings.language=t})},null,512),[[r["A"],e.settings.language]]),N])]),Object(r["f"])("section",_,[Object(r["f"])("h2",null,Object(r["x"])(e.i18n("settings.keyboardLayout")),1),Object(r["f"])("div",U,[Object(r["D"])(Object(r["f"])("input",{id:"keyboard-layout-qwerty",type:"radio",name:"keyboard-layout",value:"QWERTY","onUpdate:modelValue":t[5]||(t[5]=function(t){return e.settings.keyboardLayout=t})},null,512),[[r["A"],e.settings.keyboardLayout]]),Y]),Object(r["f"])("div",D,[Object(r["D"])(Object(r["f"])("input",{id:"keyboard-layout-azerty",type:"radio",name:"keyboard-layout",value:"AZERTY","onUpdate:modelValue":t[6]||(t[6]=function(t){return e.settings.keyboardLayout=t})},null,512),[[r["A"],e.settings.keyboardLayout]]),Z])]),Object(r["f"])("section",Q,[Object(r["f"])("button",{class:"btn",title:e.i18n("settings.close"),onClick:t[7]||(t[7]=function(t){return e.settings.open=!1})},[Object(r["f"])("span",null,Object(r["x"])(e.i18n("settings.close")),1),B],8,V)])])],2)],64)}var F=n("5530"),J=n("1da1"),K=(n("96cf"),n("6062"),n("caad"),n("2532"),n("99af"),n("ac1f"),n("1276"),function(){var e=Object(J["a"])(regeneratorRuntime.mark((function e(t){var n,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("/","data/words-").concat(t,"-5.txt"));case 2:if(n=e.sent,n.ok){e.next=6;break}return console.warn("Could not fetch words for language '".concat(t,"'")),e.abrupt("return",[]);case 6:return e.next=8,n.text();case 8:return r=e.sent,a=r.toUpperCase().split("\n"),e.abrupt("return",a);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),X=n("b85c"),$={en:{game:{settings:"Settings",submit:"Submit",erase:"Erase"},settings:{language:"Language",keyboardLayout:"Keyboard layout",close:"Close settings"}},fr:{game:{settings:"Paramètres",submit:"Envoyer",erase:"Effacer"},settings:{language:"Langue",keyboardLayout:"Disposition du clavier",close:"Fermer les paramètres"}}},ee=function(e,t){if(!e||"string"!=typeof e)return console.warn("Wrong i18n parameter: "+e),e;if(!(t in $))return console.warn("Missing language '".concat(t,"'")),e;var n,r=e.split("."),a=$[t],o=Object(X["a"])(r);try{for(o.s();!(n=o.n()).done;){var s=n.value;if(!a||!(s in a))return console.warn("Missing property '".concat(e,"' for language '").concat(t,"'")),e;a=a[s]}}catch(c){o.e(c)}finally{o.f()}return a||e},te=function(e){return 1===e.length&&e>="A"&&e<="Z"},ne=function(e){var t=Math.floor(Math.random()*e.length);return e[t]},re=n("2909"),ae=n("bee2"),oe=n("d4ec"),se=(n("5319"),n("a15b"),n("fb6a"),5),ce={AZERTY:["AZERTYUIOP","QSDFGHJKLM","WXCVBN"],QWERTY:["QWERTYUIOP","ASDFGHJKL","ZXCVBNM"]},ue=Object(ae["a"])((function e(t){Object(oe["a"])(this,e),this.value=t,this.status="ABSENT"})),ie=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";Object(oe["a"])(this,e),this.word="",this.letters=[],this.update(t)}return Object(ae["a"])(e,[{key:"update",value:function(e){e=e.toUpperCase();for(var t=[],n=0;n<se;n++)n<e.length?t.push(new ue(e[n])):t.push(new ue(" "));this.word=e,this.letters=t}},{key:"length",get:function(){return this.word.replace(" ","").length}},{key:"addLetter",value:function(e){if(this.word.length<se&&te(e)){var t=this.word+e;this.update(t)}}},{key:"removeLastLetter",value:function(){if(this.word.length>0){var e=Object(re["a"])(this.word).slice(0,this.word.length-1).join("");this.update(e)}}}]),e}(),le=Object(r["g"])({name:"HelloWorld",setup:function(){var e=Object(r["s"])({dictionary:new Set,wordToGuess:"happy",input:new ie,attemps:[],badInput:!1,settings:{open:!1,language:"en",keyboardLayout:"AZERTY"}}),t=Object(r["b"])((function(){return ce[e.settings.keyboardLayout]})),n=Object(r["t"])(null);Object(r["o"])(Object(J["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=localStorage.getItem("userSettings.language"),r=localStorage.getItem("userSettings.keyboardLayout"),"en"!==n&&"fr"!==n||(e.settings.language=n),"AZERTY"!==r&&"QWERTY"!==r||(e.settings.keyboardLayout=r),window.addEventListener("keydown",a);case 5:case"end":return t.stop()}}),t)})))),Object(r["p"])((function(){window.removeEventListener("keydown",a)}));var a=function(e){"Backspace"===e.key?o():"Enter"===e.key?s():1===e.key.length&&c(e.key.toUpperCase())},o=function(){e.input.removeLastLetter()},s=function(){if(e.input.length===se&&e.dictionary.has(e.input.word)){for(var t=0;t<se;t++)e.input.letters[t].status=e.input.word[t]===e.wordToGuess.charAt(t)?"RIGHT_POSITION":e.wordToGuess.includes(e.input.word[t])?"WRONG_POSITION":"ABSENT";e.attemps.push(e.input),e.input=new ie}else e.badInput=!0,setTimeout((function(){return e.badInput=!1}),500);Object(r["k"])((function(){n.value&&(n.value.scrollTop=n.value.scrollHeight)}))},c=function(t){te(t)&&e.input.addLetter(t)},u=function(t){return ee(t,e.settings.language)},i=function(){var t=Object(J["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(["fr","en"].includes(e.settings.language)){t.next=3;break}return console.log("Cannot load words for unsuported language: '".concat(e.settings.language,"'")),t.abrupt("return");case 3:return t.next=5,K(e.settings.language);case 5:n=t.sent,console.log("".concat(n.length," words loaded for language '").concat(e.settings.language,"'")),e.dictionary=new Set(n),e.wordToGuess=ne(n),e.attemps=[],e.input=new ie;case 11:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(r["C"])((function(){localStorage.setItem("userSettings.language",e.settings.language),i()})),Object(r["C"])((function(){localStorage.setItem("userSettings.keyboardLayout",e.settings.keyboardLayout)})),Object(F["a"])(Object(F["a"])({},Object(r["y"])(e)),{},{wordListElement:n,keyboard:t,removeLastLetter:o,submitWord:s,inputLetter:c,i18n:u})}});const be=s()(le,[["render",z]]);var de=be,ge=Object(r["g"])({name:"Home",components:{HelloWorld:de}});const fe=s()(ge,[["render",b]]);var pe=fe,Oe=[{path:"/",name:"Home",component:pe},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],je=Object(l["a"])({history:Object(l["b"])(),routes:Oe}),ye=je;n("4ee2"),n("aede");Object(r["c"])(i).use(ye).mount("#app")}});
//# sourceMappingURL=app.1037c2df.js.map