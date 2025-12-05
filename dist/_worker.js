var bt=Object.defineProperty;var Le=e=>{throw TypeError(e)};var wt=(e,t,r)=>t in e?bt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var f=(e,t,r)=>wt(e,typeof t!="symbol"?t+"":t,r),Se=(e,t,r)=>t.has(e)||Le("Cannot "+r);var o=(e,t,r)=>(Se(e,t,"read from private field"),r?r.call(e):t.get(e)),g=(e,t,r)=>t.has(e)?Le("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),d=(e,t,r,s)=>(Se(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),y=(e,t,r)=>(Se(e,t,"access private method"),r);var Me=(e,t,r,s)=>({set _(n){d(e,t,n,r)},get _(){return o(e,t,s)}});var Ne=(e,t,r)=>(s,n)=>{let i=-1;return a(0);async function a(h){if(h<=i)throw new Error("next() called multiple times");i=h;let c,l=!1,u;if(e[h]?(u=e[h][0][0],s.req.routeIndex=h):u=h===e.length&&n||void 0,u)try{c=await u(s,()=>a(h+1))}catch(p){if(p instanceof Error&&t)s.error=p,c=await t(p,s),l=!0;else throw p}else s.finalized===!1&&r&&(c=await r(s));return c&&(s.finalized===!1||l)&&(s.res=c),s}},vt=Symbol(),mt=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,i=(e instanceof st?e.raw.headers:e.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?Rt(e,{all:r,dot:s}):{}};async function Rt(e,t){const r=await e.formData();return r?Et(r,t):{}}function Et(e,t){const r=Object.create(null);return e.forEach((s,n)=>{t.all||n.endsWith("[]")?Ot(r,n,s):r[n]=s}),t.dot&&Object.entries(r).forEach(([s,n])=>{s.includes(".")&&(jt(r,s,n),delete r[s])}),r}var Ot=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},jt=(e,t,r)=>{let s=e;const n=t.split(".");n.forEach((i,a)=>{a===n.length-1?s[i]=r:((!s[i]||typeof s[i]!="object"||Array.isArray(s[i])||s[i]instanceof File)&&(s[i]=Object.create(null)),s=s[i])})},Qe=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Pt=e=>{const{groups:t,path:r}=At(e),s=Qe(r);return Ct(s,t)},At=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const n=`@${s}`;return t.push([n,r]),n}),{groups:t,path:e}},Ct=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let n=e.length-1;n>=0;n--)if(e[n].includes(s)){e[n]=e[n].replace(s,t[r][1]);break}}return e},ve={},Ht=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return ve[s]||(r[2]?ve[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:ve[s]=[e,r[1],!0]),ve[s]}return null},ke=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},St=e=>ke(e,decodeURI),Ze=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let s=r;for(;s<t.length;s++){const n=t.charCodeAt(s);if(n===37){const i=t.indexOf("?",s),a=t.slice(r,i===-1?void 0:i);return St(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(n===63)break}return t.slice(r,s)},Dt=e=>{const t=Ze(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},te=(e,t,...r)=>(r.length&&(t=te(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),et=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))s+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){r.length===0&&s===""?r.push("/"):r.push(s);const i=n.replace("?","");s+="/"+i,r.push(s)}else s+="/"+n}),r.filter((n,i,a)=>a.indexOf(n)===i)},De=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?ke(e,rt):e):e,tt=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let a=e.indexOf("?",8);if(a===-1)return;for(e.startsWith(t,a+1)||(a=e.indexOf(`&${t}`,a+1));a!==-1;){const h=e.charCodeAt(a+t.length+1);if(h===61){const c=a+t.length+2,l=e.indexOf("&",c);return De(e.slice(c,l===-1?void 0:l))}else if(h==38||isNaN(h))return"";a=e.indexOf(`&${t}`,a+1)}if(s=/[%+]/.test(e),!s)return}const n={};s??(s=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){const a=e.indexOf("&",i+1);let h=e.indexOf("=",i);h>a&&a!==-1&&(h=-1);let c=e.slice(i+1,h===-1?a===-1?void 0:a:h);if(s&&(c=De(c)),i=a,c==="")continue;let l;h===-1?l="":(l=e.slice(h+1,a===-1?void 0:a),s&&(l=De(l))),r?(n[c]&&Array.isArray(n[c])||(n[c]=[]),n[c].push(l)):n[c]??(n[c]=l)}return t?n[t]:n},$t=tt,_t=(e,t)=>tt(e,t,!0),rt=decodeURIComponent,Fe=e=>ke(e,rt),ne,A,M,nt,it,_e,F,Ue,st=(Ue=class{constructor(e,t="/",r=[[]]){g(this,M);f(this,"raw");g(this,ne);g(this,A);f(this,"routeIndex",0);f(this,"path");f(this,"bodyCache",{});g(this,F,e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const n=Object.keys(t)[0];return n?t[n].then(i=>(n==="json"&&(i=JSON.stringify(i)),new Response(i)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,d(this,A,r),d(this,ne,{})}param(e){return e?y(this,M,nt).call(this,e):y(this,M,it).call(this)}query(e){return $t(this.url,e)}queries(e){return _t(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await mt(this,e))}json(){return o(this,F).call(this,"text").then(e=>JSON.parse(e))}text(){return o(this,F).call(this,"text")}arrayBuffer(){return o(this,F).call(this,"arrayBuffer")}blob(){return o(this,F).call(this,"blob")}formData(){return o(this,F).call(this,"formData")}addValidatedData(e,t){o(this,ne)[e]=t}valid(e){return o(this,ne)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[vt](){return o(this,A)}get matchedRoutes(){return o(this,A)[0].map(([[,e]])=>e)}get routePath(){return o(this,A)[0].map(([[,e]])=>e)[this.routeIndex].path}},ne=new WeakMap,A=new WeakMap,M=new WeakSet,nt=function(e){const t=o(this,A)[0][this.routeIndex][1][e],r=y(this,M,_e).call(this,t);return r&&/\%/.test(r)?Fe(r):r},it=function(){const e={},t=Object.keys(o(this,A)[0][this.routeIndex][1]);for(const r of t){const s=y(this,M,_e).call(this,o(this,A)[0][this.routeIndex][1][r]);s!==void 0&&(e[r]=/\%/.test(s)?Fe(s):s)}return e},_e=function(e){return o(this,A)[1]?o(this,A)[1][e]:e},F=new WeakMap,Ue),Tt={Stringify:1},ot=async(e,t,r,s,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const i=e.callbacks;return i!=null&&i.length?(n?n[0]+=e:n=[e],Promise.all(i.map(h=>h({phase:t,buffer:n,context:s}))).then(h=>Promise.all(h.filter(Boolean).map(c=>ot(c,t,!1,s,n))).then(()=>n[0]))):Promise.resolve(e)},kt="text/plain; charset=UTF-8",$e=(e,t)=>({"Content-Type":e,...t}),pe,ge,T,ie,k,O,xe,oe,ae,G,ye,be,q,re,We,It=(We=class{constructor(e,t){g(this,q);g(this,pe);g(this,ge);f(this,"env",{});g(this,T);f(this,"finalized",!1);f(this,"error");g(this,ie);g(this,k);g(this,O);g(this,xe);g(this,oe);g(this,ae);g(this,G);g(this,ye);g(this,be);f(this,"render",(...e)=>(o(this,oe)??d(this,oe,t=>this.html(t)),o(this,oe).call(this,...e)));f(this,"setLayout",e=>d(this,xe,e));f(this,"getLayout",()=>o(this,xe));f(this,"setRenderer",e=>{d(this,oe,e)});f(this,"header",(e,t,r)=>{this.finalized&&d(this,O,new Response(o(this,O).body,o(this,O)));const s=o(this,O)?o(this,O).headers:o(this,G)??d(this,G,new Headers);t===void 0?s.delete(e):r!=null&&r.append?s.append(e,t):s.set(e,t)});f(this,"status",e=>{d(this,ie,e)});f(this,"set",(e,t)=>{o(this,T)??d(this,T,new Map),o(this,T).set(e,t)});f(this,"get",e=>o(this,T)?o(this,T).get(e):void 0);f(this,"newResponse",(...e)=>y(this,q,re).call(this,...e));f(this,"body",(e,t,r)=>y(this,q,re).call(this,e,t,r));f(this,"text",(e,t,r)=>!o(this,G)&&!o(this,ie)&&!t&&!r&&!this.finalized?new Response(e):y(this,q,re).call(this,e,t,$e(kt,r)));f(this,"json",(e,t,r)=>y(this,q,re).call(this,JSON.stringify(e),t,$e("application/json",r)));f(this,"html",(e,t,r)=>{const s=n=>y(this,q,re).call(this,n,t,$e("text/html; charset=UTF-8",r));return typeof e=="object"?ot(e,Tt.Stringify,!1,{}).then(s):s(e)});f(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});f(this,"notFound",()=>(o(this,ae)??d(this,ae,()=>new Response),o(this,ae).call(this,this)));d(this,pe,e),t&&(d(this,k,t.executionCtx),this.env=t.env,d(this,ae,t.notFoundHandler),d(this,be,t.path),d(this,ye,t.matchResult))}get req(){return o(this,ge)??d(this,ge,new st(o(this,pe),o(this,be),o(this,ye))),o(this,ge)}get event(){if(o(this,k)&&"respondWith"in o(this,k))return o(this,k);throw Error("This context has no FetchEvent")}get executionCtx(){if(o(this,k))return o(this,k);throw Error("This context has no ExecutionContext")}get res(){return o(this,O)||d(this,O,new Response(null,{headers:o(this,G)??d(this,G,new Headers)}))}set res(e){if(o(this,O)&&e){e=new Response(e.body,e);for(const[t,r]of o(this,O).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=o(this,O).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of s)e.headers.append("set-cookie",n)}else e.headers.set(t,r)}d(this,O,e),this.finalized=!0}get var(){return o(this,T)?Object.fromEntries(o(this,T)):{}}},pe=new WeakMap,ge=new WeakMap,T=new WeakMap,ie=new WeakMap,k=new WeakMap,O=new WeakMap,xe=new WeakMap,oe=new WeakMap,ae=new WeakMap,G=new WeakMap,ye=new WeakMap,be=new WeakMap,q=new WeakSet,re=function(e,t,r){const s=o(this,O)?new Headers(o(this,O).headers):o(this,G)??new Headers;if(typeof t=="object"&&"headers"in t){const i=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[a,h]of i)a.toLowerCase()==="set-cookie"?s.append(a,h):s.set(a,h)}if(r)for(const[i,a]of Object.entries(r))if(typeof a=="string")s.set(i,a);else{s.delete(i);for(const h of a)s.append(i,h)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??o(this,ie);return new Response(e,{status:n,headers:s})},We),w="ALL",Lt="all",Mt=["get","post","put","delete","options","patch"],at="Can not add a route since the matcher is already built.",ct=class extends Error{},Nt="__COMPOSED_HANDLER",Ft=e=>e.text("404 Not Found",404),qe=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},C,v,ht,H,K,me,Re,Be,lt=(Be=class{constructor(t={}){g(this,v);f(this,"get");f(this,"post");f(this,"put");f(this,"delete");f(this,"options");f(this,"patch");f(this,"all");f(this,"on");f(this,"use");f(this,"router");f(this,"getPath");f(this,"_basePath","/");g(this,C,"/");f(this,"routes",[]);g(this,H,Ft);f(this,"errorHandler",qe);f(this,"onError",t=>(this.errorHandler=t,this));f(this,"notFound",t=>(d(this,H,t),this));f(this,"fetch",(t,...r)=>y(this,v,Re).call(this,t,r[1],r[0],t.method));f(this,"request",(t,r,s,n)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${te("/",t)}`,r),s,n)));f(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(y(this,v,Re).call(this,t.request,t,void 0,t.request.method))})});[...Mt,Lt].forEach(i=>{this[i]=(a,...h)=>(typeof a=="string"?d(this,C,a):y(this,v,K).call(this,i,o(this,C),a),h.forEach(c=>{y(this,v,K).call(this,i,o(this,C),c)}),this)}),this.on=(i,a,...h)=>{for(const c of[a].flat()){d(this,C,c);for(const l of[i].flat())h.map(u=>{y(this,v,K).call(this,l.toUpperCase(),o(this,C),u)})}return this},this.use=(i,...a)=>(typeof i=="string"?d(this,C,i):(d(this,C,"*"),a.unshift(i)),a.forEach(h=>{y(this,v,K).call(this,w,o(this,C),h)}),this);const{strict:s,...n}=t;Object.assign(this,n),this.getPath=s??!0?t.getPath??Ze:Dt}route(t,r){const s=this.basePath(t);return r.routes.map(n=>{var a;let i;r.errorHandler===qe?i=n.handler:(i=async(h,c)=>(await Ne([],r.errorHandler)(h,()=>n.handler(h,c))).res,i[Nt]=n.handler),y(a=s,v,K).call(a,n.method,n.path,i)}),this}basePath(t){const r=y(this,v,ht).call(this);return r._basePath=te(this._basePath,t),r}mount(t,r,s){let n,i;s&&(typeof s=="function"?i=s:(i=s.optionHandler,s.replaceRequest===!1?n=c=>c:n=s.replaceRequest));const a=i?c=>{const l=i(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};n||(n=(()=>{const c=te(this._basePath,t),l=c==="/"?0:c.length;return u=>{const p=new URL(u.url);return p.pathname=p.pathname.slice(l)||"/",new Request(p,u)}})());const h=async(c,l)=>{const u=await r(n(c.req.raw),...a(c));if(u)return u;await l()};return y(this,v,K).call(this,w,te(t,"*"),h),this}},C=new WeakMap,v=new WeakSet,ht=function(){const t=new lt({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,d(t,H,o(this,H)),t.routes=this.routes,t},H=new WeakMap,K=function(t,r,s){t=t.toUpperCase(),r=te(this._basePath,r);const n={basePath:this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,n]),this.routes.push(n)},me=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},Re=function(t,r,s,n){if(n==="HEAD")return(async()=>new Response(null,await y(this,v,Re).call(this,t,r,s,"GET")))();const i=this.getPath(t,{env:s}),a=this.router.match(n,i),h=new It(t,{path:i,matchResult:a,env:s,executionCtx:r,notFoundHandler:o(this,H)});if(a[0].length===1){let l;try{l=a[0][0][0][0](h,async()=>{h.res=await o(this,H).call(this,h)})}catch(u){return y(this,v,me).call(this,u,h)}return l instanceof Promise?l.then(u=>u||(h.finalized?h.res:o(this,H).call(this,h))).catch(u=>y(this,v,me).call(this,u,h)):l??o(this,H).call(this,h)}const c=Ne(a[0],this.errorHandler,o(this,H));return(async()=>{try{const l=await c(h);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return y(this,v,me).call(this,l,h)}})()},Be),ut=[];function qt(e,t){const r=this.buildAllMatchers(),s=(n,i)=>{const a=r[n]||r[w],h=a[2][i];if(h)return h;const c=i.match(a[0]);if(!c)return[[],ut];const l=c.indexOf("",1);return[a[1][l],c]};return this.match=s,s(e,t)}var Oe="[^/]+",de=".*",fe="(?:|/.*)",se=Symbol(),zt=new Set(".\\+*[^]$()");function Ut(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===de||e===fe?1:t===de||t===fe?-1:e===Oe?1:t===Oe?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Y,X,S,Ke,Te=(Ke=class{constructor(){g(this,Y);g(this,X);g(this,S,Object.create(null))}insert(t,r,s,n,i){if(t.length===0){if(o(this,Y)!==void 0)throw se;if(i)return;d(this,Y,r);return}const[a,...h]=t,c=a==="*"?h.length===0?["","",de]:["","",Oe]:a==="/*"?["","",fe]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const u=c[1];let p=c[2]||Oe;if(u&&c[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw se;if(l=o(this,S)[p],!l){if(Object.keys(o(this,S)).some(x=>x!==de&&x!==fe))throw se;if(i)return;l=o(this,S)[p]=new Te,u!==""&&d(l,X,n.varIndex++)}!i&&u!==""&&s.push([u,o(l,X)])}else if(l=o(this,S)[a],!l){if(Object.keys(o(this,S)).some(u=>u.length>1&&u!==de&&u!==fe))throw se;if(i)return;l=o(this,S)[a]=new Te}l.insert(h,r,s,n,i)}buildRegExpStr(){const r=Object.keys(o(this,S)).sort(Ut).map(s=>{const n=o(this,S)[s];return(typeof o(n,X)=="number"?`(${s})@${o(n,X)}`:zt.has(s)?`\\${s}`:s)+n.buildRegExpStr()});return typeof o(this,Y)=="number"&&r.unshift(`#${o(this,Y)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},Y=new WeakMap,X=new WeakMap,S=new WeakMap,Ke),je,we,Ve,Wt=(Ve=class{constructor(){g(this,je,{varIndex:0});g(this,we,new Te)}insert(e,t,r){const s=[],n=[];for(let a=0;;){let h=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const l=`@\\${a}`;return n[a]=[l,c],a++,h=!0,l}),!h)break}const i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=n.length-1;a>=0;a--){const[h]=n[a];for(let c=i.length-1;c>=0;c--)if(i[c].indexOf(h)!==-1){i[c]=i[c].replace(h,n[a][1]);break}}return o(this,we).insert(i,t,s,o(this,je),r),s}buildRegExp(){let e=o(this,we).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,i,a)=>i!==void 0?(r[++t]=Number(i),"$()"):(a!==void 0&&(s[Number(a)]=++t),"")),[new RegExp(`^${e}`),r,s]}},je=new WeakMap,we=new WeakMap,Ve),Bt=[/^$/,[],Object.create(null)],Ee=Object.create(null);function dt(e){return Ee[e]??(Ee[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function Kt(){Ee=Object.create(null)}function Vt(e){var l;const t=new Wt,r=[];if(e.length===0)return Bt;const s=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,p],[x,R])=>u?1:x?-1:p.length-R.length),n=Object.create(null);for(let u=0,p=-1,x=s.length;u<x;u++){const[R,D,b]=s[u];R?n[D]=[b.map(([P])=>[P,Object.create(null)]),ut]:p++;let j;try{j=t.insert(D,p,R)}catch(P){throw P===se?new ct(D):P}R||(r[p]=b.map(([P,Z])=>{const le=Object.create(null);for(Z-=1;Z>=0;Z--){const[$,Ce]=j[Z];le[$]=Ce}return[P,le]}))}const[i,a,h]=t.buildRegExp();for(let u=0,p=r.length;u<p;u++)for(let x=0,R=r[u].length;x<R;x++){const D=(l=r[u][x])==null?void 0:l[1];if(!D)continue;const b=Object.keys(D);for(let j=0,P=b.length;j<P;j++)D[b[j]]=h[D[b[j]]]}const c=[];for(const u in a)c[u]=r[a[u]];return[i,c,n]}function ee(e,t){if(e){for(const r of Object.keys(e).sort((s,n)=>n.length-s.length))if(dt(r).test(t))return[...e[r]]}}var z,U,Pe,ft,Ge,Gt=(Ge=class{constructor(){g(this,Pe);f(this,"name","RegExpRouter");g(this,z);g(this,U);f(this,"match",qt);d(this,z,{[w]:Object.create(null)}),d(this,U,{[w]:Object.create(null)})}add(e,t,r){var h;const s=o(this,z),n=o(this,U);if(!s||!n)throw new Error(at);s[e]||[s,n].forEach(c=>{c[e]=Object.create(null),Object.keys(c[w]).forEach(l=>{c[e][l]=[...c[w][l]]})}),t==="/*"&&(t="*");const i=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=dt(t);e===w?Object.keys(s).forEach(l=>{var u;(u=s[l])[t]||(u[t]=ee(s[l],t)||ee(s[w],t)||[])}):(h=s[e])[t]||(h[t]=ee(s[e],t)||ee(s[w],t)||[]),Object.keys(s).forEach(l=>{(e===w||e===l)&&Object.keys(s[l]).forEach(u=>{c.test(u)&&s[l][u].push([r,i])})}),Object.keys(n).forEach(l=>{(e===w||e===l)&&Object.keys(n[l]).forEach(u=>c.test(u)&&n[l][u].push([r,i]))});return}const a=et(t)||[t];for(let c=0,l=a.length;c<l;c++){const u=a[c];Object.keys(n).forEach(p=>{var x;(e===w||e===p)&&((x=n[p])[u]||(x[u]=[...ee(s[p],u)||ee(s[w],u)||[]]),n[p][u].push([r,i-l+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(o(this,U)).concat(Object.keys(o(this,z))).forEach(t=>{e[t]||(e[t]=y(this,Pe,ft).call(this,t))}),d(this,z,d(this,U,void 0)),Kt(),e}},z=new WeakMap,U=new WeakMap,Pe=new WeakSet,ft=function(e){const t=[];let r=e===w;return[o(this,z),o(this,U)].forEach(s=>{const n=s[e]?Object.keys(s[e]).map(i=>[i,s[e][i]]):[];n.length!==0?(r||(r=!0),t.push(...n)):e!==w&&t.push(...Object.keys(s[w]).map(i=>[i,s[w][i]]))}),r?Vt(t):null},Ge),W,I,Ye,Yt=(Ye=class{constructor(e){f(this,"name","SmartRouter");g(this,W,[]);g(this,I,[]);d(this,W,e.routers)}add(e,t,r){if(!o(this,I))throw new Error(at);o(this,I).push([e,t,r])}match(e,t){if(!o(this,I))throw new Error("Fatal error");const r=o(this,W),s=o(this,I),n=r.length;let i=0,a;for(;i<n;i++){const h=r[i];try{for(let c=0,l=s.length;c<l;c++)h.add(...s[c]);a=h.match(e,t)}catch(c){if(c instanceof ct)continue;throw c}this.match=h.match.bind(h),d(this,W,[h]),d(this,I,void 0);break}if(i===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(o(this,I)||o(this,W).length!==1)throw new Error("No active router has been determined yet.");return o(this,W)[0]}},W=new WeakMap,I=new WeakMap,Ye),ue=Object.create(null),B,E,J,ce,m,L,V,Xe,pt=(Xe=class{constructor(e,t,r){g(this,L);g(this,B);g(this,E);g(this,J);g(this,ce,0);g(this,m,ue);if(d(this,E,r||Object.create(null)),d(this,B,[]),e&&t){const s=Object.create(null);s[e]={handler:t,possibleKeys:[],score:0},d(this,B,[s])}d(this,J,[])}insert(e,t,r){d(this,ce,++Me(this,ce)._);let s=this;const n=Pt(t),i=[];for(let a=0,h=n.length;a<h;a++){const c=n[a],l=n[a+1],u=Ht(c,l),p=Array.isArray(u)?u[0]:c;if(p in o(s,E)){s=o(s,E)[p],u&&i.push(u[1]);continue}o(s,E)[p]=new pt,u&&(o(s,J).push(u),i.push(u[1])),s=o(s,E)[p]}return o(s,B).push({[e]:{handler:r,possibleKeys:i.filter((a,h,c)=>c.indexOf(a)===h),score:o(this,ce)}}),s}search(e,t){var h;const r=[];d(this,m,ue);let n=[this];const i=Qe(t),a=[];for(let c=0,l=i.length;c<l;c++){const u=i[c],p=c===l-1,x=[];for(let R=0,D=n.length;R<D;R++){const b=n[R],j=o(b,E)[u];j&&(d(j,m,o(b,m)),p?(o(j,E)["*"]&&r.push(...y(this,L,V).call(this,o(j,E)["*"],e,o(b,m))),r.push(...y(this,L,V).call(this,j,e,o(b,m)))):x.push(j));for(let P=0,Z=o(b,J).length;P<Z;P++){const le=o(b,J)[P],$=o(b,m)===ue?{}:{...o(b,m)};if(le==="*"){const N=o(b,E)["*"];N&&(r.push(...y(this,L,V).call(this,N,e,o(b,m))),d(N,m,$),x.push(N));continue}const[Ce,Ie,he]=le;if(!u&&!(he instanceof RegExp))continue;const _=o(b,E)[Ce],yt=i.slice(c).join("/");if(he instanceof RegExp){const N=he.exec(yt);if(N){if($[Ie]=N[0],r.push(...y(this,L,V).call(this,_,e,o(b,m),$)),Object.keys(o(_,E)).length){d(_,m,$);const He=((h=N[0].match(/\//))==null?void 0:h.length)??0;(a[He]||(a[He]=[])).push(_)}continue}}(he===!0||he.test(u))&&($[Ie]=u,p?(r.push(...y(this,L,V).call(this,_,e,$,o(b,m))),o(_,E)["*"]&&r.push(...y(this,L,V).call(this,o(_,E)["*"],e,$,o(b,m)))):(d(_,m,$),x.push(_)))}}n=x.concat(a.shift()??[])}return r.length>1&&r.sort((c,l)=>c.score-l.score),[r.map(({handler:c,params:l})=>[c,l])]}},B=new WeakMap,E=new WeakMap,J=new WeakMap,ce=new WeakMap,m=new WeakMap,L=new WeakSet,V=function(e,t,r,s){const n=[];for(let i=0,a=o(e,B).length;i<a;i++){const h=o(e,B)[i],c=h[t]||h[w],l={};if(c!==void 0&&(c.params=Object.create(null),n.push(c),r!==ue||s&&s!==ue))for(let u=0,p=c.possibleKeys.length;u<p;u++){const x=c.possibleKeys[u],R=l[c.score];c.params[x]=s!=null&&s[x]&&!R?s[x]:r[x]??(s==null?void 0:s[x]),l[c.score]=!0}}return n},Xe),Q,Je,Xt=(Je=class{constructor(){f(this,"name","TrieRouter");g(this,Q);d(this,Q,new pt)}add(e,t,r){const s=et(t);if(s){for(let n=0,i=s.length;n<i;n++)o(this,Q).insert(e,s[n],r);return}o(this,Q).insert(e,t,r)}match(e,t){return o(this,Q).search(e,t)}},Q=new WeakMap,Je),gt=class extends lt{constructor(e={}){super(e),this.router=e.router??new Yt({routers:[new Gt,new Xt]})}},Jt=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(i=>typeof i=="string"?i==="*"?()=>i:a=>i===a?a:null:typeof i=="function"?i:a=>i.includes(a)?a:null)(r.origin),n=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(r.allowMethods);return async function(a,h){var u;function c(p,x){a.res.headers.set(p,x)}const l=await s(a.req.header("origin")||"",a);if(l&&c("Access-Control-Allow-Origin",l),r.credentials&&c("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&c("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),a.req.method==="OPTIONS"){r.origin!=="*"&&c("Vary","Origin"),r.maxAge!=null&&c("Access-Control-Max-Age",r.maxAge.toString());const p=await n(a.req.header("origin")||"",a);p.length&&c("Access-Control-Allow-Methods",p.join(","));let x=r.allowHeaders;if(!(x!=null&&x.length)){const R=a.req.header("Access-Control-Request-Headers");R&&(x=R.split(/\s*,\s*/))}return x!=null&&x.length&&(c("Access-Control-Allow-Headers",x.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await h(),r.origin!=="*"&&a.header("Vary","Origin",{append:!0})}};const Ae=new gt;Ae.use("/api/*",Jt());Ae.get("/api/facilities",async e=>{const{DB:t}=e.env,r=e.req.query("category");let s="SELECT * FROM facilities";const n=[];r&&r!=="all"&&(s+=" WHERE category = ?",n.push(r)),s+=" ORDER BY created_at DESC";try{const i=await t.prepare(s).bind(...n).all();return e.json({success:!0,data:i.results||[]})}catch{return e.json({success:!1,data:[]})}});Ae.get("/",e=>e.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>대대손손 - 장지·장례 정보 플랫폼</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=qkhan94hdw"><\/script>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body, html { width: 100%; height: 100vh; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
            
            /* 레이아웃 */
            .container { display: flex; height: 100vh; }
            
            /* 좌측 사이드바 */
            .sidebar {
                width: 420px;
                background: white;
                display: flex;
                flex-direction: column;
                border-right: 1px solid #e5e7eb;
                z-index: 10;
            }
            
            /* 헤더 */
            .header {
                padding: 20px;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 4px;
            }
            
            .subtitle {
                font-size: 14px;
                color: #6b7280;
            }
            
            /* 검색 박스 */
            .search-box {
                padding: 16px 20px;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .search-input-wrapper {
                display: flex;
                align-items: center;
                background: #f3f4f6;
                border-radius: 8px;
                padding: 12px 16px;
            }
            
            .search-input-wrapper i {
                color: #9ca3af;
                margin-right: 8px;
            }
            
            .search-input {
                flex: 1;
                border: none;
                background: transparent;
                outline: none;
                font-size: 14px;
            }
            
            /* 카테고리 탭 */
            .category-tabs {
                padding: 16px 20px;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                gap: 8px;
                overflow-x: auto;
            }
            
            .category-tab {
                padding: 8px 16px;
                border-radius: 20px;
                background: #f3f4f6;
                color: #4b5563;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                white-space: nowrap;
                transition: all 0.2s;
                border: none;
            }
            
            .category-tab:hover {
                background: #e5e7eb;
            }
            
            .category-tab.active {
                background: #3b82f6;
                color: white;
            }
            
            /* 시설 리스트 */
            .facility-list {
                flex: 1;
                overflow-y: auto;
                padding: 16px 20px;
            }
            
            .facility-count {
                font-size: 14px;
                color: #6b7280;
                margin-bottom: 16px;
            }
            
            .facility-card {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                padding: 16px;
                margin-bottom: 12px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .facility-card:hover {
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                transform: translateY(-2px);
            }
            
            .facility-category {
                display: inline-block;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                color: white;
                margin-bottom: 8px;
            }
            
            .category-funeral_hall { background: #3b82f6; }
            .category-crematory { background: #f97316; }
            .category-columbarium { background: #10b981; }
            .category-natural_burial { background: #84cc16; }
            
            .facility-name {
                font-size: 16px;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 8px;
            }
            
            .facility-info {
                font-size: 14px;
                color: #6b7280;
                margin-bottom: 4px;
            }
            
            .facility-info i {
                width: 16px;
                margin-right: 4px;
            }
            
            .facility-price {
                font-size: 16px;
                font-weight: bold;
                color: #3b82f6;
                margin-top: 8px;
            }
            
            /* 우측 지도 */
            .map-container {
                flex: 1;
                position: relative;
            }
            
            #map {
                width: 100%;
                height: 100%;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- 좌측 사이드바 -->
            <div class="sidebar">
                <!-- 헤더 -->
                <div class="header">
                    <div class="logo">🏔️ 대대손손</div>
                    <div class="subtitle">장지·장례 정보 플랫폼</div>
                </div>
                
                <!-- 검색 -->
                <div class="search-box">
                    <div class="search-input-wrapper">
                        <i class="fas fa-search"></i>
                        <input type="text" class="search-input" placeholder="시설명 또는 지역 검색" id="searchInput">
                    </div>
                </div>
                
                <!-- 카테고리 탭 -->
                <div class="category-tabs">
                    <button class="category-tab active" data-category="all">전체</button>
                    <button class="category-tab" data-category="funeral_hall">장례식장</button>
                    <button class="category-tab" data-category="crematory">화장장</button>
                    <button class="category-tab" data-category="columbarium">봉안당</button>
                    <button class="category-tab" data-category="natural_burial">자연장지</button>
                </div>
                
                <!-- 시설 리스트 -->
                <div class="facility-list">
                    <div class="facility-count" id="facilityCount">0개 시설</div>
                    <div id="facilityList"></div>
                </div>
            </div>
            
            <!-- 우측 지도 -->
            <div class="map-container">
                <div id="map"></div>
            </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <script src="/static/app.js"><\/script>
    </body>
    </html>
  `));const ze=new gt,Qt=Object.assign({"/src/index.tsx":Ae});let xt=!1;for(const[,e]of Object.entries(Qt))e&&(ze.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),ze.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),xt=!0);if(!xt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{ze as default};
