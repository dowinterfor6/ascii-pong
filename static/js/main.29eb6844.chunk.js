(this["webpackJsonpascii-pong"]=this["webpackJsonpascii-pong"]||[]).push([[0],{10:function(e,r,t){},11:function(e,r,t){"use strict";t.r(r);var n=t(1),a=t(0),c=t.n(a),o=t(4),i=t.n(o),u=(t(10),t(2)),s=function(){for(var e=[],r=33;r<=255;r++)(r<127||r>160)&&e.push(r);var t=e[Math.round(Math.random()*e.length)];return String.fromCharCode(t)},l=function(e,r){for(var t="\n    <section>----------------------------\n    |                                   |\n    |                                   |\n    |        <h1>ASCII Pong</h1>        |\n    |                                   |\n    |                                   |\n    |                                   |\n    |  <option>------   <option>------  |\n    |  |     1P     |   |     2P     |  |\n    |  -----</option>   -----</option>  |\n    |                                   |\n    |                                   |\n    |        <button>-----------        |\n    |        |      Start      |        |\n    |        ----------</button>        |\n    |                                   |\n    |                                   |\n    |                                   |\n    ---------------------------</section>".split("\n").filter((function(e){return""!==e})).map((function(e){return e.trim()})),n=[],a=0;a<t.length;a++){for(var c=[],o=0;o<t[0].length;o++)c.push({char:t[a][o]});n.push(c)}return n},f=["\n \u2588\u2588\u2588 \n\u2588   \u2588\n\u2588   \u2588\n\u2588   \u2588\n \u2588\u2588\u2588 ","\n    \u2588\n    \u2588\n    \u2588\n    \u2588\n    \u2588","\n\u2588\u2588\u2588\u2588\u2588\n    \u2588\n\u2588\u2588\u2588\u2588\u2588\n\u2588    \n\u2588\u2588\u2588\u2588\u2588","\n\u2588\u2588\u2588\u2588\u2588\n    \u2588\n\u2588\u2588\u2588\u2588\u2588\n    \u2588\n\u2588\u2588\u2588\u2588\u2588","\n\u2588   \u2588\n\u2588   \u2588\n\u2588\u2588\u2588\u2588\u2588\n    \u2588\n    \u2588","\n\u2588\u2588\u2588\u2588\u2588\n\u2588    \n\u2588\u2588\u2588\u2588\u2588\n    \u2588\n\u2588\u2588\u2588\u2588\u2588","\n\u2588\u2588\u2588\u2588\u2588\n\u2588    \n\u2588\u2588\u2588\u2588\u2588\n\u2588   \u2588\n\u2588\u2588\u2588\u2588\u2588","\n\u2588\u2588\u2588\u2588\u2588\n    \u2588\n    \u2588\n    \u2588\n    \u2588","\n\u2588\u2588\u2588\u2588\u2588\n\u2588   \u2588\n\u2588\u2588\u2588\u2588\u2588\n\u2588   \u2588\n\u2588\u2588\u2588\u2588\u2588","\n\u2588\u2588\u2588\u2588\u2588\n\u2588   \u2588\n\u2588\u2588\u2588\u2588\u2588\n    \u2588\n\u2588\u2588\u2588\u2588\u2588"],p=function(e){return f[e].split("\n").filter((function(e){return""!==e})).map((function(e){return e.split("")}))},v=function(e){for(var r="P".concat(e),t="\n    <section>------------------------------------------\n    |                                                 |\n    |                                                 |\n    |        <h1>Congratulations, ".concat(r," won!</h1>        |\n    |                                                 |\n    |                                                 |\n    |                                                 |\n    |                                                 |\n    |            <button>----------------             |\n    |            |       Main Menu      |             |\n    |            ---------------</button>             |\n    |                                                 |\n    |                                                 |\n    |                                                 |\n    -----------------------------------------</section>").split("\n").filter((function(e){return""!==e})).map((function(e){return e.trim()})),n=[],a=0;a<t.length;a++){for(var c=[],o=0;o<t[0].length;o++)c.push({char:t[a][o]});n.push(c)}return n};window.getLanding=l,window.getNum=p,window.getWin=v;var d=function(e){var r=e.char,t=e.active,c=e.selected,o=e.handleClick,i=e.isBall,u=Object(a.useRef)();return Object(n.jsx)("div",{className:"\n        char-tile\n        ".concat(t?"active":"","\n        ").concat(c?"selected":"","\n        ").concat(o?"is-clickable":"","\n        ").concat(i?"ball":"","\n      "),ref:u,onClick:o,children:r})},h=c.a.memo(d),y="SETTILES",g="SETTILE",M="SETCLICKHANDLER",b="SETPLAYERS",m="INCREMENTSCORE",w="RESETSCORE",x=function(e,r){var t,n,a=Object.assign({},e);switch(r.type){case y:return a.tileMatrix=r.payload,a;case g:t=r.payload.x,n=r.payload.y;var c=r.payload,o=c.char,i=c.properties;return a.tileMatrix[n][t].char=o,a.tileMatrix[n][t].properties=i,a;case M:t=r.payload.x,n=r.payload.y;var u=r.payload.handleClick;return a.tileMatrix[n][t].properties.handleClick=u,a;case b:var s=r.payload,l=s.offsetX,f=s.offsetY;if(a.players=r.payload.players,1===a.players){for(var p=7;p<=9;p++)for(var v=3;v<=16;v++)8===p?[3,9,10,16].includes(v)&&(a.tileMatrix[p+f][v+l].properties.selected=!0):a.tileMatrix[p+f][v+l].properties.selected=!0;for(var d=7;d<=9;d++)for(var h=20;h<=33;h++)8===d?[20,26,27,33].includes(h)&&(a.tileMatrix[d+f][h+l].properties.selected=!1):a.tileMatrix[d+f][h+l].properties.selected=!1}else{for(var x=7;x<=9;x++)for(var S=3;S<=16;S++)8===x?[3,9,10,16].includes(S)&&(a.tileMatrix[x+f][S+l].properties.selected=!1):a.tileMatrix[x+f][S+l].properties.selected=!1;for(var j=7;j<=9;j++)for(var O=20;O<=33;O++)8===j?[20,26,27,33].includes(O)&&(a.tileMatrix[j+f][O+l].properties.selected=!0):a.tileMatrix[j+f][O+l].properties.selected=!0}return a;case m:var E=e.gameState.score["p".concat(r.payload.player)];return a.gameState.score["p".concat(r.payload.player)]=E+r.payload.score,a;case w:return a.gameState.score.p1=0,a.gameState.score.p2=0,a;default:return e}},S={tileMatrix:[],players:2,gameState:{landing:!0,game:!1,winner:void 0,score:{p1:0,p2:0}}},j=function(){var e=Object(a.useReducer)(x,S),r=Object(u.a)(e,2),t=r[0],c=r[1],o=Object(a.useState)(),i=Object(u.a)(o,2),f=i[0],d=i[1],j=Object(a.useState)(),O=Object(u.a)(j,2),E=O[0],A=O[1],R=Object(a.useState)(!1),C=Object(u.a)(R,2),L=C[0],k=C[1],T=Object(a.useRef)(L),I=Object(a.useRef)(f),K=Object(a.useRef)(E),P=function(){var e=.5*Math.random()+.5,r=Math.random(),t=0===Math.round(Math.random())?-1:1,n=0===Math.round(Math.random())?-1:1,a=Math.sqrt(Math.pow(e,2)+Math.pow(r,2));return{x:t*e/a,y:n*r/a}},D=Object(a.useState)(P()),N=Object(u.a)(D,2),W=N[0],B=N[1],U=Object(a.useState)({x:0,y:0}),G=Object(u.a)(U,2),H=G[0],Y=G[1],q=Object(a.useRef)(W),J=Object(a.useRef)(H),X=Object(a.useRef)(0),F=Object(a.useRef)(0),z=Object(a.useRef)(0),Q=Object(a.useRef)(0),V=Object(a.useRef)(),Z=["KeyW","KeyS","ArrowUp","ArrowDown"],$=Object(a.useRef)({KeyW:!1,KeyS:!1,ArrowUp:!1,ArrowDown:!1}),_=function(e,r,t,n){return c({type:g,payload:{x:e,y:r,char:t,properties:n}})},ee=function(e,r,t){return c({type:M,payload:{x:e,y:r,handleClick:t}})},re=function(e){return c({type:m,payload:{player:e,score:1}})};window.increment=re,window.reset=function(){return c({type:w})},window.setTile=_;var te=Object(a.useRef)(),ne=Math.floor(document.body.clientWidth/9),ae=Math.floor(document.body.clientHeight/19);ne%2===0&&ne--,ae%2===0&&ae--,Object(a.useEffect)((function(){for(var e=[],r=0;r<ae;r++){for(var t=[],n=0;n<ne;n++){var a={char:s(),properties:{active:!1}};t.push(a)}e.push(t)}c({type:y,payload:e}),ce(),Me()}),[]);var ce=function(){for(var e=l(),r=(ne-1)/2-(e[0].length-1)/2,t=(ae-1)/2-(e.length-1)/2,n=0;n<e.length;n++)for(var a=0;a<e[0].length;a++){var c=e[n][a].char;if(" "!==c){var o={active:!0};(7===n&&a>=20&&a<=33||8===n&&[20,26,27,33].includes(a)||9===n&&a>=20&&a<=33)&&(o.selected=!0),_(a+r,n+t,c,o)}}oe(r,t)},oe=function(e,r){for(var t=7;t<=9;t++)for(var n=3;n<=16;n++){ee(n+e,t+r,(function(){return ie(e,r,1)}))}for(var a=7;a<=9;a++)for(var c=20;c<=33;c++){ee(c+e,a+r,(function(){return ie(e,r,2)}))}for(var o=12;o<=14;o++)for(var i=9;i<=27;i++){ee(i+e,o+r,ue)}},ie=function(e,r,t){console.log("".concat(t,"P")),function(e,r,t){c({type:b,payload:{offsetX:e,offsetY:r,players:t}})}(e,r,t)},ue=function(){console.log("START GAME"),se(),ve(),k(!0),T.current=!0},se=function(){console.log("CLEAR LANDING");for(var e=l(),r=(ne-1)/2-(e[0].length-1)/2,t=(ae-1)/2-(e.length-1)/2,n=0;n<e.length;n++)for(var a=0;a<e[0].length;a++){if(" "!==e[n][a].char){var c=s();_(a+r,n+t,c,{active:!1,clickable:!1,handleClick:void 0})}}},le=(ne-1)/2,fe=(ae-1)/2,pe=45,ve=function(){console.log("SETUP GAME AREA"),de(),ge(),be(),we({x:le,y:fe}),V.current=setInterval((function(){T.current&&(xe(),je())}),100)},de=function(){for(var e=le-pe,r=le+pe,t=fe-12,n=fe+12,a=t;a<=n;a++)for(var c=e;c<=r;c++)a===t||a===n?_(c,a,"-",{active:!0}):c===e||c===r?_(c,a,"|",{active:!0}):c===le&&_(c,a,":",{active:!0})},he=le-7,ye=le+3,ge=function(){for(var e=p(0),r=0;r<5;r++)for(var t=0;t<5;t++){var n=e[r][t];" "!==n&&_(t+he,r+1,n,{active:!0})}_(le,2,"\u25cf",{active:!0}),_(le,4,"\u25cf",{active:!0});for(var a=0;a<5;a++)for(var c=0;c<5;c++){var o=e[a][c];" "!==o&&_(c+ye,a+1,o,{active:!0})}};Object(a.useEffect)((function(){if(0!==t.gameState.score.p1&&t.gameState.score.p1<=7){console.log("P1 Score changed");for(var e=t.gameState.score.p1-1,r=e+1,n=p(e),a=p(r),c=0;c<5;c++)for(var o=0;o<5;o++){var i=a[c][o];i!==n[c][o]&&(" "===i?_(o+he,c+1,s(),{active:!1}):_(o+he,c+1,i,{active:!0}))}7===t.gameState.score.p1&&(k(!1),T.current=!1,clearInterval(V.current),Oe(1))}}),[t.gameState.score.p1]),Object(a.useEffect)((function(){if(0!==t.gameState.score.p2&&t.gameState.score.p2<=7){console.log("P2 Score changed");for(var e=t.gameState.score.p2-1,r=e+1,n=p(e),a=p(r),c=0;c<5;c++)for(var o=0;o<5;o++){var i=a[c][o];i!==n[c][o]&&(" "===i?_(o+ye,c+1,s(),{active:!1}):_(o+ye,c+1,i,{active:!0}))}7===t.gameState.score.p2&&(k(!1),T.current=!1,clearInterval(V.current),Oe(2))}}),[t.gameState.score.p2]);var Me=function(){document.addEventListener("keyup",(function(e){T.current&&Z.includes(e.code)&&($.current[e.code]=!1)})),document.addEventListener("keydown",(function(e){if(T.current&&Z.includes(e.code))switch(e.code){case"KeyW":$.current.KeyW=!0,$.current.KeyS=!1;break;case"KeyS":$.current.KeyW=!1,$.current.KeyS=!0;break;case"ArrowUp":$.current.ArrowUp=!0,$.current.ArrowDown=!1;break;case"ArrowDown":$.current.ArrowUp=!1,$.current.ArrowDown=!0}}))},be=function(){var e=le-pe+1;_(e,fe-1,"\u2588",{active:!0}),_(e,fe,"\u2588",{active:!0}),_(e,fe+1,"\u2588",{active:!0}),d(fe),I.current=fe;var r=le+pe-1;_(r,fe-1,"\u2588",{active:!0}),_(r,fe,"\u2588",{active:!0}),_(r,fe+1,"\u2588",{active:!0}),A(fe),K.current=fe},me=function(e){var r=1===e?le-pe+1:le+pe-1;if(1===e){if(z.current!==X.current){var t=fe+z.current,n=fe+X.current;_(r,t-1,s(),{active:!1}),_(r,t,s(),{active:!1}),_(r,t+1,s(),{active:!1}),_(r,n-1,"\u2588",{active:!0}),_(r,n,"\u2588",{active:!0}),_(r,n+1,"\u2588",{active:!0}),z.current=X.current}}else if(2===e){if(Q.current!==F.current){var a=fe+Q.current,c=fe+F.current;_(r,a-1,s(),{active:!1}),_(r,a,s(),{active:!1}),_(r,a+1,s(),{active:!1}),_(r,c-1,"\u2588",{active:!0}),_(r,c,"\u2588",{active:!0}),_(r,c+1,"\u2588",{active:!0}),Q.current=F.current}}},we=function(e){var r=e.x,t=e.y;_(Math.round(J.current.x),Math.round(J.current.y),s(),{active:!1,isBall:!1}),Y({x:r,y:t}),J.current={x:r,y:t},_(Math.round(r),Math.round(t),"\u25cf",{active:!0,isBall:!0})},xe=function(){console.log("BALL TICK");var e=J.current.x+10*q.current.x,r=J.current.y+10*q.current.y,t={x:e,y:r},n=.5,a=le-pe+1,c=le+pe-1,o=fe+X.current,i=fe+F.current;if(Math.round(e)<=a&&Math.round(r)<=o+1+n&&Math.round(r)>=o-1-n||Math.round(e)>=c&&Math.round(r)<=i+1+n&&Math.round(r)>=i-1-n){console.log("PADDLE");var u=Math.round(e)<=le-pe+1?o:i,s=Se(r,u,-q.current.x);t.x=J.current.x+10*s.x,t.y=J.current.y+10*s.y,B(s),q.current=s}else if(Math.round(e)<=le-pe||Math.round(e)>=le+pe){Y(t={x:le,y:fe});var l=P();B(l),q.current=l,Math.round(e)>=le+pe?(console.log("RIGHT WALL"),re(1)):(console.log("LEFT WALL"),re(2))}if(Math.round(r)<=fe-12||Math.round(r)>=fe+12){t.y=J.current.y+10*-q.current.y;var f={x:q.current.x,y:-q.current.y};B(f),q.current=f}we(t)},Se=function(e,r,t){var n=(e-r)/1.5*Math.PI,a=Math.PI-1.5;Math.abs(n)>=a&&(n=n>0?a:-a);var c=t/Math.abs(t)*Math.tan(Math.abs(n)),o=Math.sqrt(1+Math.pow(c,2));return{y:n/Math.abs(n)/o,x:c/o}},je=function(){$.current.KeyW?X.current--:$.current.KeyS&&X.current++,me(1),$.current.ArrowUp?F.current--:$.current.ArrowDown&&F.current++,me(2)},Oe=function(e){setTimeout((function(){for(var r=v(e),t=(ne-1)/2-(r[0].length-1)/2,n=(ae-1)/2-(r.length-1)/2,a=0;a<r.length;a++)for(var c=0;c<r[0].length;c++){var o=r[a][c].char;if(" "!==o){_(c+t,a+n,o,{active:!0})}else c+t===le&&_(c+t,a+n,s(),{active:!1})}console.log("P".concat(e," won!"))}),200)};return Object(n.jsx)("div",{className:"app",ref:te,children:Object(n.jsx)("ul",{className:"rows",children:t.tileMatrix.map((function(e,r){return Object(n.jsx)("li",{className:"row-".concat(r),children:e.map((function(e,t){return Object(n.jsx)(h,{char:e.char,active:e.properties.active,selected:e.properties.selected,handleClick:e.properties.handleClick,isBall:e.properties.isBall},"".concat(r,"-").concat(t))}))},"row-".concat(r))}))})})};i.a.render(Object(n.jsx)(j,{}),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.29eb6844.chunk.js.map