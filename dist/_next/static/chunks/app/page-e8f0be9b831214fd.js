(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{321:function(e,t,s){Promise.resolve().then(s.bind(s,613))},7970:function(e,t,s){"use strict";s.d(t,{R:function(){return n}});var a=s(7362),r=s.n(a);r().configure({apiKey:"patPNpSEtu8FU43Vi.ad75eb0fb7a9bf22b3570b82bbe50f1f4d374b09ee26435b12b06be48687b648"});class n{async listRecords(){return this.base(this.table).select().all()}async updateRecord(e,t){return this.base(this.table).update(e,t)}constructor(e){this.baseId="appsK0JXjQOdY1fmx",this.base=r().base(this.baseId),this.table=e}}},613:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return w}});var a=s(7437),r=s(2265),n=s(7970);let i=new n.R("Coupon");async function l(e,t,s,a,r,n,l,c,u,d,f,b,x,p,g,h,m,y){e.preventDefault(),g(!1),h(!1),m(!1),y(!1);let w=c.find(e=>e.fields.code===t),v=u.find(e=>e.fields.c1===a&&e.fields.c2===r&&e.fields.c3===n&&e.fields.c4===l),j=u.find(e=>e.fields.c1===a&&e.fields.qrcodes===s),N=u.find(e=>e.fields.c2===r&&e.fields.qrcodes===s),C=u.find(e=>e.fields.c3===n&&e.fields.qrcodes===s),S=u.find(e=>e.fields.c4===l&&e.fields.qrcodes===s),k=u.find(e=>e.fields.qrcodes===s);if(w){if(w&&"UNUSED"===w.fields.status){if(await i.updateRecord(w.id,{status:"USED"}),d((await i.listRecords()).slice()),w&&"NORMAL"===w.fields.type)v&&k?x("Congratulations!! You have received a reward. \uD83C\uDF89\uD83C\uDF89"):(b("One or more applicant code inputs are incorrect. Please check the highlighted fields."),j||g(!0),N||h(!0),C||m(!0),S||y(!0));else if(w&&"SPECIAL"===w.fields.type){p("You got access to reveal your code :)");let e=[],t=k.fields.c1,s=k.fields.c2,a=k.fields.c3,r=k.fields.c4;switch(w.fields.class){case"bronze":e=o([t,s,a,r],1);break;case"silver":e=o([t,s,a,r],2);break;case"gold":e=o([t,s,a,r],3);break;case"platinum":e=[t,s,a,r]}f(e),v&&k?x("Congratulations!! You have received a reward. \uD83C\uDF89\uD83C\uDF89"):(j||g(!0),N||h(!0),C||m(!0),S||y(!0))}}else b("Coupon code already used")}else b("Coupon does not exist")}function o(e,t){let s=["","","",""],a=[0,1,2,3];for(let e=a.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[a[e],a[t]]=[a[t],a[e]]}for(let r=0;r<t;r++)s[a[r]]=e[a[r]];return s}new n.R("Applicant");var c=s(4839),u=s(6164);let d=function(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return(0,u.m6)((0,c.W)(t))};function f(e){let{label:t,type:s,value:r,onChange:n,required:i,className:l}=e;return(0,a.jsxs)("div",{className:"mb-5",children:[(0,a.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900",children:t}),(0,a.jsx)("input",{type:s,className:d("bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",l),value:r,onChange:n,required:i})]})}var b=s(9640);let x={shake:{x:[-5,5,-5,5,-3,3,-2,2,0],transition:{duration:.5,ease:"easeInOut"}}};function p(e){let{value:t,onChange:s,error:r}=e;return(0,a.jsx)(b.E.input,{type:"text",className:d("w-12 md:w-14 h-12 md:h-14 text-center text-xl sm:text-2xl font-extrabold text-gray-900 bg-white border border-gray-300 hover:border-gray-400 appearance-none rounded p-2 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200",r?"border-red-500 focus:border-red-500 focus:ring-red-200":""),maxLength:1,required:!0,value:t,onChange:s,animate:r?"shake":"",variants:x})}function g(e){let{message:t,type:s,code1:n,code2:i,code3:l,code4:o,onClose:c}=e;return(0,r.useEffect)(()=>{let e=setTimeout(()=>{c()},1e4);return()=>clearTimeout(e)},[c]),(0,a.jsxs)(b.E.div,{initial:{y:-10,opacity:0},animate:{y:0,opacity:1},exit:{transitionEnd:{y:-10,opacity:0}},transition:{duration:.5},className:"mx-5 absolute top-0 flex flex-col ".concat("error"===s?"bg-red-500 text-white":"special"===s?"bg-yellow-500 text-black":"bg-green-500 text-white"," px-6 py-4 md:px-8 md:py-6 text-sm md:text-base rounded-lg shadow-lg"),children:[(0,a.jsx)("span",{className:"font-semibold",children:t}),"special"===s&&(0,a.jsx)("div",{className:"mt-4 flex justify-between space-x-2",children:[n,i,l,o].map((e,t)=>(0,a.jsx)("input",{type:"text",className:d("w-12 md:w-14 h-12 md:h-14 text-center text-lg md:text-xl font-bold text-gray-900 bg-gray-100 border border-gray-300 rounded-lg p-2 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"),maxLength:1,disabled:!0,value:e},t))})]})}var h=()=>(0,a.jsxs)(b.E.button,{initial:{y:-10,opacity:0},animate:{y:0,opacity:1},exit:{transitionEnd:{y:-10,opacity:0}},transition:{duration:.5},className:"absolute top-0 bg-blue-600 text-white font-semibold px-6 py-4 rounded-lg inline-flex items-center shadow-lg",disabled:!0,children:[(0,a.jsxs)("svg",{className:"animate-spin h-5 w-5 mr-3 text-white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"none",children:[(0,a.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,a.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8v4a4 4 0 00-4 4h-4z"})]}),"Processing..."]});let m=new n.R("Coupon"),y=new n.R("Applicant");function w(){let[e,t]=(0,r.useState)([]),[s,n]=(0,r.useState)([]),[i,o]=(0,r.useState)([]),[c,u]=(0,r.useState)(""),[d,b]=(0,r.useState)(""),[x,w]=(0,r.useState)(""),[v,j]=(0,r.useState)(""),[N,C]=(0,r.useState)(""),[S,k]=(0,r.useState)(""),[E,D]=(0,r.useState)(""),[R,q]=(0,r.useState)(""),[Y,F]=(0,r.useState)(""),[O,_]=(0,r.useState)(!1),[A,I]=(0,r.useState)(!1),[P,L]=(0,r.useState)(!1),[M,U]=(0,r.useState)(!1),[z,K]=(0,r.useState)(!1);(0,r.useEffect)(()=>{m.listRecords().then(e=>t(e.slice())),y.listRecords().then(e=>n(e.slice()))},[]);let T=e=>t=>{e(t.target.value)},W=async a=>{K(!0),await l(a,c,d,x,v,N,S,e,s,t,o,D,q,F,_,I,L,U),K(!1)};return(0,a.jsx)("div",{className:"w-full h-screen flex justify-center bg-gray-100 text-gray-900",children:(0,a.jsxs)("div",{className:"w-full max-w-md h-full px-6 flex flex-col items-center justify-center space-y-6",children:[(0,a.jsxs)("form",{onSubmit:W,className:"w-full flex flex-col space-y-4",children:[(0,a.jsx)(f,{label:"Your ID",type:"number",value:d,onChange:T(b),required:!0,className:"[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"}),(0,a.jsx)(f,{label:"Your Coupon",type:"text",value:c,onChange:T(u),required:!0,className:"bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"}),(0,a.jsxs)("div",{className:"flex flex-col space-y-2",children:[(0,a.jsx)("label",{className:"text-sm font-medium text-gray-700",children:"Your Number"}),(0,a.jsxs)("div",{className:"flex items-center justify-between gap-2",children:[(0,a.jsx)(p,{value:x,onChange:T(w),error:O}),(0,a.jsx)(p,{value:v,onChange:T(j),error:A}),(0,a.jsx)(p,{value:N,onChange:T(C),error:P}),(0,a.jsx)(p,{value:S,onChange:T(k),error:M})]})]}),(0,a.jsx)("button",{type:"submit",className:"mt-5 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-lg",children:"Submit"})]}),z?(0,a.jsx)(h,{}):(0,a.jsxs)(a.Fragment,{children:[E&&(0,a.jsx)(g,{message:E,type:"error",onClose:()=>D("")}),R&&(0,a.jsx)(g,{message:R,type:"success",onClose:()=>q("")}),Y&&(0,a.jsx)(g,{message:Y,type:"special",code1:i[0],code2:i[1],code3:i[2],code4:i[3],onClose:()=>F("")})]})]})})}}},function(e){e.O(0,[362,265,971,23,744],function(){return e(e.s=321)}),_N_E=e.O()}]);