(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[382],{1981:function(e,t,s){Promise.resolve().then(s.bind(s,9996))},6463:function(e,t,s){"use strict";var n=s(1169);s.o(n,"useRouter")&&s.d(t,{useRouter:function(){return n.useRouter}})},9996:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return i}});var n=s(7437),r=s(2265),u=s(7970),a=s(6463);let c=new u.R("Prize");function i(){let[e,t]=(0,r.useState)([]),[s,u]=(0,r.useState)(""),i=(0,a.useRouter)();(0,r.useEffect)(()=>{c.listRecords().then(e=>t(e.slice()))},[]);let l=()=>{let t=e.find(e=>e.fields.code===s);t&&"UNUSED"===t.fields.status?(c.updateRecord(t.id,{status:"USED"}),alert("Congraturation!! You receive ".concat(t.fields.type))):alert("Prize number is used or invalid."),i.push("/entercoupon")};return(0,n.jsx)("div",{className:"w-full h-screen flex items-center justify-center bg-black",children:(0,n.jsxs)("div",{className:"w-[620px] px-5 flex flex-col items-center space-y-5",children:[(0,n.jsxs)("form",{action:"",className:"space-y-5 w-full flex flex-col items-center",children:[(0,n.jsx)("label",{htmlFor:"",children:"Enter Number"}),(0,n.jsx)("input",{className:"text-black max-w-full  h-10",type:"text",value:s,onChange:e=>{u(e.target.value)},onKeyDown:e=>{"Enter"===e.key&&(e.preventDefault(),l())}})]}),(0,n.jsx)("button",{className:"p-1 border",onClick:l,children:"Submit"})]})})}},7970:function(e,t,s){"use strict";s.d(t,{R:function(){return u}});var n=s(7362),r=s.n(n);r().configure({apiKey:"patPNpSEtu8FU43Vi.ad75eb0fb7a9bf22b3570b82bbe50f1f4d374b09ee26435b12b06be48687b648"});class u{async listRecords(){return this.base(this.table).select().all()}async updateRecord(e,t){return this.base(this.table).update(e,t)}constructor(e){this.baseId="appsK0JXjQOdY1fmx",this.base=r().base(this.baseId),this.table=e}}}},function(e){e.O(0,[362,971,23,744],function(){return e(e.s=1981)}),_N_E=e.O()}]);