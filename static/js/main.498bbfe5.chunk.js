(this["webpackJsonpascii-pong"]=this["webpackJsonpascii-pong"]||[]).push([[0],{10:function(e,r,t){},11:function(e,r,t){"use strict";t.r(r);var n=t(1),a=t(0),c=t.n(a),o=t(4),i=t.n(o),u=(t(10),t(2)),s=function(){for(var e=[],r=33;r<=255;r++)(r<127||r>160)&&e.push(r);var t=e[Math.round(Math.random()*e.length)];return String.fromCharCode(t)},l=function(e,r){for(var t="\n    <section>----------------------------\n    |                                   |\n    |                                   |\n    |        <h1>ASCII Pong</h1>        |\n    |                                   |\n    |                                   |\n    |                                   |\n    |  <option>------   <option>------  |\n    |  |     1P     |   |     2P     |  |\n    |  -----</option>   -----</option>  |\n    |                                   |\n    |                                   |\n    |        <button>-----------        |\n    |        |      Start      |        |\n    |        ----------</button>        |\n    |                                   |\n    |                                   |\n    |                                   |\n    ---------------------------</section>".split("\n").filter((function(e){return""!==e})).map((function(e){return e.trim()})),n=[],a=0;a<t.length;a++){for(var c=[],o=0;o<t[0].length;o++)c.push({char:t[a][o]});n.push(c)}return n},f=["\n \u2588\u2588\u2588 \n\u2588   \u2588\n\u2588   \u2588\n\u2588   \u2588\n \u2588\u2588\u2588 ","\n    \u2588\n    \u2588\n    \u2588\n    \u2588\n    \u2588","\n\u2588\u2588\u2588\u2588\u2588\n    \u2588\n\u2588\u2588\u2588\u2588\u2588\n\u2588    \n\u2588\u2588\u2588\u2588\u2588","\n\u2588\u2588\u2588\u2588\u2588\n    \u2588\n\u2588\u2588\u2588\u2588\u2588\n    \u2588\n\u2588\u2588\u2588\u2588\u2588","\n\u2588   \u2588\n\u2588   \u2588\n\u2588\u2588\u2588\u2588\u2588\n    \u2588\n    \u2588","\n\u2588\u2588\u2588\u2588\u2588\n\u2588    \n\u2588\u2588\u2588\u2588\u2588\n    \u2588\n\u2588\u2588\u2588\u2588\u2588","\n\u2588\u2588\u2588\u2588\u2588\n\u2588    \n\u2588\u2588\u2588\u2588\u2588\n\u2588   \u2588\n\u2588\u2588\u2588\u2588\u2588","\n\u2588\u2588\u2588\u2588\u2588\n    \u2588\n    \u2588\n    \u2588\n    \u2588","\n\u2588\u2588\u2588\u2588\u2588\n\u2588   \u2588\n\u2588\u2588\u2588\u2588\u2588\n\u2588   \u2588\n\u2588\u2588\u2588\u2588\u2588","\n\u2588\u2588\u2588\u2588\u2588\n\u2588   \u2588\n\u2588\u2588\u2588\u2588\u2588\n    \u2588\n\u2588\u2588\u2588\u2588\u2588"],v=function(e){return f[e].split("\n").filter((function(e){return""!==e})).map((function(e){return e.split("")}))},p=function(e){for(var r="P".concat(e),t="\n    <section>------------------------------------------\n    |                                                 |\n    |                                                 |\n    |        <h1>Congratulations, ".concat(r," won!</h1>        |\n    |                                                 |\n    |                                                 |\n    |                                                 |\n    |                                                 |\n    |            <button>----------------             |\n    |            |      Main Menu       |             |\n    |            ---------------</button>             |\n    |                                                 |\n    |                                                 |\n    |                                                 |\n    -----------------------------------------</section>").split("\n").filter((function(e){return""!==e})).map((function(e){return e.trim()})),n=[],a=0;a<t.length;a++){for(var c=[],o=0;o<t[0].length;o++)c.push({char:t[a][o]});n.push(c)}return n};window.getLanding=l,window.getNum=v,window.getWin=p;var d=function(){return Object(n.jsx)("div",{className:"center-tile",children:":"})},h=function(e){var r=e.char,t=e.active,c=e.selected,o=e.handleClick,i=e.isBall,u=Object(a.useRef)();return Object(n.jsx)("div",{className:"\n        char-tile\n        ".concat(t?"active":"","\n        ").concat(c?"selected":"","\n        ").concat(o?"is-clickable":"","\n        ").concat(i?"ball":"","\n      "),ref:u,onClick:o,children:r})},y=c.a.memo(h),M="SETTILES",b="SETTILE",g="SETCLICKHANDLER",m="SETPLAYERS",j="INCREMENTSCORE",x="RESETSCORE",w=function(e,r){var t,n,a=Object.assign({},e);switch(r.type){case M:return a.tileMatrix=r.payload,a;case b:t=r.payload.x,n=r.payload.y;var c=r.payload,o=c.char,i=c.properties;return a.tileMatrix[n][t].char=o,a.tileMatrix[n][t].properties=i,a;case g:t=r.payload.x,n=r.payload.y;var u=r.payload.handleClick;return a.tileMatrix[n][t].properties.handleClick=u,a;case m:var s=r.payload,l=s.offsetX,f=s.offsetY;if(a.players=r.payload.players,1===a.players){for(var v=7;v<=9;v++)for(var p=3;p<=16;p++)8===v?[3,9,10,16].includes(p)&&(a.tileMatrix[v+f][p+l].properties.selected=!0):a.tileMatrix[v+f][p+l].properties.selected=!0;for(var d=7;d<=9;d++)for(var h=20;h<=33;h++)8===d?[20,26,27,33].includes(h)&&(a.tileMatrix[d+f][h+l].properties.selected=!1):a.tileMatrix[d+f][h+l].properties.selected=!1}else{for(var y=7;y<=9;y++)for(var w=3;w<=16;w++)8===y?[3,9,10,16].includes(w)&&(a.tileMatrix[y+f][w+l].properties.selected=!1):a.tileMatrix[y+f][w+l].properties.selected=!1;for(var S=7;S<=9;S++)for(var O=20;O<=33;O++)8===S?[20,26,27,33].includes(O)&&(a.tileMatrix[S+f][O+l].properties.selected=!0):a.tileMatrix[S+f][O+l].properties.selected=!0}return a;case j:var E=e.gameState.score["p".concat(r.payload.player)];return a.gameState.score["p".concat(r.payload.player)]=E+r.payload.score,a;case x:return a.gameState.score.p1=0,a.gameState.score.p2=0,a;default:return e}},S={tileMatrix:[],players:2,gameState:{landing:!0,game:!1,winner:void 0,score:{p1:0,p2:0}}},O=function(){var e=Object(a.useReducer)(w,S),r=Object(u.a)(e,2),t=r[0],c=r[1],o=Object(a.useState)(),i=Object(u.a)(o,2),f=(i[0],i[1]),h=Object(a.useState)(),O=Object(u.a)(h,2),E=(O[0],O[1]),C=Object(a.useState)(!1),R=Object(u.a)(C,2),k=R[0],A=R[1],K=Object(a.useRef)(k),I=function(){var e=.5*Math.random()+.5,r=Math.random(),t=0===Math.round(Math.random())?-1:1,n=0===Math.round(Math.random())?-1:1,a=Math.sqrt(Math.pow(e,2)+Math.pow(r,2));return{x:t*e/a,y:n*r/a}},N=Object(a.useState)(I()),T=Object(u.a)(N,2),L=T[0],W=T[1],D=Object(a.useState)({x:0,y:0}),P=Object(u.a)(D,2),B=P[0],U=P[1],Y=Object(a.useRef)(L),q=Object(a.useRef)(B),H=Object(a.useRef)(0),J=Object(a.useRef)(0),X=Object(a.useRef)(0),z=Object(a.useRef)(0),F=Object(a.useRef)(),G=["KeyW","KeyS","ArrowUp","ArrowDown"],Q=Object(a.useRef)({KeyW:!1,KeyS:!1,ArrowUp:!1,ArrowDown:!1}),V=function(e,r,t,n){return c({type:b,payload:{x:e,y:r,char:t,properties:n}})},Z=function(e,r,t){return c({type:g,payload:{x:e,y:r,handleClick:t}})},$=function(e){return c({type:j,payload:{player:e,score:1}})},_=function(){return c({type:x})};window.increment=$,window.reset=_,window.setTile=V;var ee=Object(a.useRef)(),re=Math.floor(document.body.clientWidth/9),te=Math.floor(document.body.clientHeight/19);re%2===0&&re--,te%2===0&&te--,Object(a.useEffect)((function(){for(var e=[],r=0;r<te;r++){for(var t=[],n=0;n<re;n++){var a={char:s(),properties:{active:!1}};t.push(a)}e.push(t)}c({type:M,payload:e}),ne(),me()}),[]);var ne=function(){for(var e=l(),r=(re-1)/2-(e[0].length-1)/2,t=(te-1)/2-(e.length-1)/2,n=0;n<e.length;n++)for(var a=0;a<e[0].length;a++){var c=e[n][a].char;if(" "!==c){var o={active:!0};(7===n&&a>=20&&a<=33||8===n&&[20,26,27,33].includes(a)||9===n&&a>=20&&a<=33)&&(o.selected=!0),V(a+r,n+t,c,o)}}ae(r,t)},ae=function(e,r){for(var t=7;t<=9;t++)for(var n=3;n<=16;n++){Z(n+e,t+r,(function(){return ce(e,r,1)}))}for(var a=7;a<=9;a++)for(var c=20;c<=33;c++){Z(c+e,a+r,(function(){return ce(e,r,2)}))}for(var o=12;o<=14;o++)for(var i=9;i<=27;i++){Z(i+e,o+r,oe)}},ce=function(e,r,t){!function(e,r,t){c({type:m,payload:{offsetX:e,offsetY:r,players:t}})}(e,r,t)},oe=function(){ie(),A(!0),K.current=!0,pe()},ie=function(){for(var e=l(),r=(re-1)/2-(e[0].length-1)/2,t=(te-1)/2-(e.length-1)/2,n=0;n<e.length;n++)for(var a=0;a<e[0].length;a++){if(" "!==e[n][a].char){var c=s();V(a+r,n+t,c,{active:!1,handleClick:void 0})}Z(a+r,n+t,void 0)}},ue=(re-1)/2,se=(te-1)/2,le=45,fe=12,ve=1.5,pe=function(){de(),be(),je(),we({x:ue,y:se}),F.current=setInterval((function(){K.current&&(Se(),Ee())}),100)},de=function(){for(var e=ue-le,r=ue+le,t=se-fe,n=se+fe,a=t;a<=n;a++)for(var c=e;c<=r;c++)a===t||a===n?V(c,a,"-",{active:!0}):c!==e&&c!==r||V(c,a,"|",{active:!0})},he=se-fe-2,ye=ue-7,Me=ue+3,be=function(){for(var e=he-4,r=he,t=v(0),n=0;n<5;n++)for(var a=0;a<5;a++){var c=t[n][a];" "!==c&&V(a+ye,n+he-4,c,{active:!0})}V(ue,e+1,"\u25cf",{active:!0}),V(ue,r-1,"\u25cf",{active:!0});for(var o=0;o<5;o++)for(var i=0;i<5;i++){var u=t[o][i];" "!==u&&V(i+Me,o+he-4,u,{active:!0})}};Object(a.useEffect)((function(){if(0!==t.gameState.score.p1&&t.gameState.score.p1<=7){for(var e=t.gameState.score.p1-1,r=e+1,n=v(e),a=v(r),c=0;c<5;c++)for(var o=0;o<5;o++){var i=a[c][o];i!==n[c][o]&&(" "===i?V(o+ye,c+he-4,s(),{active:!1}):V(o+ye,c+he-4,i,{active:!0}))}7===t.gameState.score.p1&&(A(!1),K.current=!1,clearInterval(F.current),Ce(1))}}),[t.gameState.score.p1]),Object(a.useEffect)((function(){if(0!==t.gameState.score.p2&&t.gameState.score.p2<=7){for(var e=t.gameState.score.p2-1,r=e+1,n=v(e),a=v(r),c=0;c<5;c++)for(var o=0;o<5;o++){var i=a[c][o];i!==n[c][o]&&(" "===i?V(o+Me,c+he-4,s(),{active:!1}):V(o+Me,c+he-4,i,{active:!0}))}7===t.gameState.score.p2&&(A(!1),K.current=!1,clearInterval(F.current),Ce(2))}}),[t.gameState.score.p2]);var ge,me=function(){document.addEventListener("keyup",(function(e){K.current&&G.includes(e.code)&&(Q.current[e.code]=!1)})),document.addEventListener("keydown",(function(e){if(K.current&&G.includes(e.code))switch(e.code){case"KeyW":Q.current.KeyW=!0,Q.current.KeyS=!1;break;case"KeyS":Q.current.KeyW=!1,Q.current.KeyS=!0;break;case"ArrowUp":Q.current.ArrowUp=!0,Q.current.ArrowDown=!1;break;case"ArrowDown":Q.current.ArrowUp=!1,Q.current.ArrowDown=!0}}))},je=function(){var e=ue-le+1;V(e,se-1,"\u2588",{active:!0}),V(e,se,"\u2588",{active:!0}),V(e,se+1,"\u2588",{active:!0}),f(se);var r=ue+le-1;V(r,se-1,"\u2588",{active:!0}),V(r,se,"\u2588",{active:!0}),V(r,se+1,"\u2588",{active:!0}),E(se)},xe=function(e){var r=1===e?ue-le+1:ue+le-1;if(1===e){if(X.current!==H.current){var t=se+X.current,n=se+H.current;V(r,t-1,s(),{active:!1}),V(r,t,s(),{active:!1}),V(r,t+1,s(),{active:!1}),V(r,n-1,"\u2588",{active:!0}),V(r,n,"\u2588",{active:!0}),V(r,n+1,"\u2588",{active:!0}),X.current=H.current}}else if(2===e){if(z.current!==J.current){var a=se+z.current,c=se+J.current;V(r,a-1,s(),{active:!1}),V(r,a,s(),{active:!1}),V(r,a+1,s(),{active:!1}),V(r,c-1,"\u2588",{active:!0}),V(r,c,"\u2588",{active:!0}),V(r,c+1,"\u2588",{active:!0}),z.current=J.current}}},we=function(e){var r=e.x,t=e.y;V(Math.round(q.current.x),Math.round(q.current.y),s(),{active:!1,isBall:!1}),K.current&&(U({x:r,y:t}),q.current={x:r,y:t},V(Math.round(r),Math.round(t),"\u25cf",{active:!0,isBall:!0}))},Se=function(){var e=q.current.x+Y.current.x*ve,r=q.current.y+Y.current.y*ve,t={x:e,y:r},n=.5,a=ue-le+1,c=ue+le-1,o=se+H.current,i=se+J.current;if(Math.round(e)<=a&&Math.round(r)<=o+1+n&&Math.round(r)>=o-1-n||Math.round(e)>=c&&Math.round(r)<=i+1+n&&Math.round(r)>=i-1-n){var u=Math.round(e)<=ue-le+1?o:i,s=Oe(r,u,-Y.current.x);t.x=q.current.x+s.x*ve,t.y=q.current.y+s.y*ve,W(s),Y.current=s}else if(Math.round(e)<=ue-le||Math.round(e)>=ue+le){U(t={x:ue,y:se});var l=I();W(l),Y.current=l,Math.round(e)>=ue+le?$(1):$(2)}if(Math.round(r)<=se-fe||Math.round(r)>=se+fe){t.y=q.current.y+-Y.current.y*ve;var f={x:Y.current.x,y:-Y.current.y};W(f),Y.current=f}we(t)},Oe=function(e,r,t){var n=(e-r)/1.5*Math.PI,a=Math.PI-1.5;Math.abs(n)>=a&&(n=n>0?a:-a);var c=t/Math.abs(t)*Math.tan(Math.abs(n)),o=Math.sqrt(1+Math.pow(c,2));return{y:n/Math.abs(n)/o,x:c/o}},Ee=function(){Q.current.KeyW?H.current--:Q.current.KeyS&&H.current++,xe(1),Q.current.ArrowUp?J.current--:Q.current.ArrowDown&&J.current++,xe(2)},Ce=function(e){for(var r=p(e),t=(re-1)/2-(r[0].length-1)/2,n=(te-1)/2-(r.length-1)/2,a=0;a<r.length;a++)for(var c=0;c<r[0].length;c++){var o=r[a][c].char;if(" "!==o){V(c+t,a+n,o,{active:!0})}}ke()},Re=function(){Ae(),Ke(),Ie(),_(),Ne(),ne()},ke=function(){for(var e=se+1;e<=se+3;e++)for(var r=ue-12;r<=ue+11;r++)Z(r,e,Re)},Ae=function(){for(var e=p(1),r=(re-1)/2-(e[0].length-1)/2,t=(te-1)/2-(e.length-1)/2,n=0;n<e.length;n++)for(var a=0;a<e[0].length;a++){if(" "!==e[n][a].char){var c={active:!1,handleClick:void 0};V(a+r,n+t,s(),c)}}},Ke=function(){for(var e=ue-le,r=ue+le,t=se-fe,n=se+fe,a=t;a<=n;a++)for(var c=e;c<=r;c++)a===t||a===n?V(c,a,s(),{active:!1}):c!==e&&c!==r||V(c,a,s(),{active:!1})},Ie=function(){for(var e=he-4,r=he,n=t.gameState.score.p1,a=v(n),c=0;c<5;c++)for(var o=0;o<5;o++){" "!==a[c][o]&&V(o+ye,c+he-4,s(),{active:!1})}V(ue,e+1,s(),{active:!1}),V(ue,r-1,s(),{active:!1});for(var i=t.gameState.score.p2,u=v(i),l=0;l<5;l++)for(var f=0;f<5;f++){" "!==u[l][f]&&V(f+Me,l+he-4,s(),{active:!1})}},Ne=function(){var e=ue-le+1,r=se+H.current;V(e,r-1,s(),{active:!1}),V(e,r,s(),{active:!1}),V(e,r+1,s(),{active:!1});var t=ue+le-1,n=se+J.current;V(t,n-1,s(),{active:!1}),V(t,n,s(),{active:!1}),V(t,n+1,s(),{active:!1})};if(k){for(var Te=[],Le=0;Le<23;Le++)Te.push(Object(n.jsx)(d,{}));ge=Object(n.jsx)("div",{className:"center-line",style:{top:19*(se-fe+2)-11.5,left:9*ue+1},children:Te.map((function(e,r){return Object(n.jsx)("div",{className:"center-tile",children:e},"center-".concat(r))}))})}return Object(n.jsxs)("div",{className:"app",ref:ee,children:[Object(n.jsx)("ul",{className:"rows",children:t.tileMatrix.map((function(e,r){return Object(n.jsx)("li",{className:"row-".concat(r),children:e.map((function(e,t){return Object(n.jsx)(y,{char:e.char,active:e.properties.active,selected:e.properties.selected,handleClick:e.properties.handleClick,isBall:e.properties.isBall},"".concat(r,"-").concat(t))}))},"row-".concat(r))}))}),ge]})};i.a.render(Object(n.jsx)(O,{}),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.498bbfe5.chunk.js.map