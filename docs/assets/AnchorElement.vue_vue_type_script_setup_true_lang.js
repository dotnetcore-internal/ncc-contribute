import{V as y,X as g,Y as E,M as b,Z as T,d as C,o as m,a as h,r as d,b as f,m as V,u as R}from"./vendor.js";const L="modulepreload",A=function(e){return"/"+e},_={},l=function(t,n,s){if(!n||n.length===0)return t();const a=document.getElementsByTagName("link");return Promise.all(n.map(o=>{if(o=A(o),o in _)return;_[o]=!0;const c=o.endsWith(".css"),v=c?'[rel="stylesheet"]':"";if(!!s)for(let i=a.length-1;i>=0;i--){const u=a[i];if(u.href===o&&(!c||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${v}`))return;const r=document.createElement("link");if(r.rel=c?"stylesheet":L,c||(r.as="script",r.crossOrigin=""),r.href=o,document.head.appendChild(r),c)return new Promise((i,u)=>{r.addEventListener("load",i),r.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>t())},P=[{path:"/",name:"home",component:()=>l(()=>import("./HomeView.js"),["assets/HomeView.js","assets/vendor.js","assets/_plugin-vue_export-helper.js","assets/HomeView.css"])},{path:"/project-join-ncc",name:"project-join-ncc",component:()=>l(()=>import("./ProjectJoinsNCC.js"),["assets/ProjectJoinsNCC.js","assets/_plugin-vue_export-helper.js","assets/vendor.js"])},{path:"/contribute-to-project",name:"contribute-to-project",component:()=>l(()=>import("./Contribute2Project.js"),["assets/Contribute2Project.js","assets/_plugin-vue_export-helper.js","assets/vendor.js"])},{path:"/attend-ncc",name:"attend-ncc",component:()=>l(()=>import("./AttendTheNCC.js"),["assets/AttendTheNCC.js","assets/vendor.js","assets/BodyBlock.js","assets/_plugin-vue_export-helper.js","assets/BodyBlock.css","assets/useEmitter.js","assets/AttendTheNCC.css"])},{path:"/make-ncc-better",name:"make-ncc-better",component:()=>l(()=>import("./HelpTheNCCBetter.js"),["assets/HelpTheNCCBetter.js","assets/_plugin-vue_export-helper.js","assets/vendor.js"])},{path:"/:pathMatch(.*)*",name:"all",component:()=>l(()=>import("./Page404.js"),["assets/Page404.js","assets/BodyBlock.js","assets/_plugin-vue_export-helper.js","assets/vendor.js","assets/BodyBlock.css","assets/Page404.css"])}],$=y({history:g("/"),routes:P}),j=()=>{window.scrollTo({top:0,behavior:"auto"})},w=function(e){j(),$.push({name:e,replace:!1})},p=e=>{T(`${e} | .NET Core Community`)},q=(e,t="i18n")=>{if(t==="i18n"){try{const{t:n}=b("$i18n").global;p(n(e))}catch(n){}return}else p(e)},W=()=>{var e;(e=document.querySelector("body"))==null||e.setAttribute("style","overflow:hidden; height:100%;")},M=()=>{var e;(e=document.querySelector("body"))==null||e.setAttribute("style","overflow:unset; height:auto;")},B=(e,t,n)=>{const s=E().get(e);if(s===void 0||t(s)){const a=n();return k(e,a),a}return s},k=(e,t)=>{E().set(e,t,{path:"/"})},U=()=>{let e=B("locale",t=>t==null||t==="",()=>"en");return e=e!=null?e:"en",D(e),e},D=e=>{k("locale",e)},I=["href","title"],O=["href","target","title"],z=C({__name:"AnchorElement",props:{mode:{default:"h5"},title:{default:""},href:{default:"#"},target:{default:"_self"},routeName:null,classValue:null},setup(e){const t=e;return(n,s)=>e.mode==="h5"?(m(),h("a",{key:0,class:f(e.classValue),href:t.href,onClick:s[0]||(s[0]=V(a=>{var o;return R(w)((o=t.routeName)!=null?o:"home")},["prevent"])),title:e.title},[d(n.$slots,"default")],10,I)):(m(),h("a",{key:1,class:f(e.classValue),href:t.href,target:t.target,title:e.title},[d(n.$slots,"default")],10,O))}});export{z as _,B as a,U as b,q as c,w as g,W as l,$ as r,D as s,M as u};
