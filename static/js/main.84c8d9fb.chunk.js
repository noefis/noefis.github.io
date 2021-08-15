(this.webpackJsonpmic_visualizer=this.webpackJsonpmic_visualizer||[]).push([[0],{128:function(e,t,a){"use strict";(function(e){var l=a(16),r=a(0),i=(a(151),a(137)),c=a(94),o=a(92),s=a(276),n=a(5);t.a=function(){var t=Object(r.useState)(0),a=Object(l.a)(t,2),m=a[0],g=a[1];e.refreshCanvas=function(){g(m+1)};var b=Object(o.a)({palette:{type:"dark"}});return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsxs)(s.a,{theme:b,children:[Object(n.jsx)(i.a,{},m),Object(n.jsxs)("div",{id:"full-screen",children:[Object(n.jsx)(c.a,{className:"bottom-button",variant:"outlined",onClick:function(){return g(m+1)},children:"reload Cavas"})," \xa0",Object(n.jsx)(c.a,{className:"bottom-button",variant:"outlined",href:"/visualizer",target:"_blank",children:" Open Visualizer in Fullscreen"})," \xa0",Object(n.jsx)(c.a,{className:"bottom-button",variant:"outlined",onClick:function(){g(m+1),localStorage.clear()},children:" Reset Visualizer"})]})]}),Object(n.jsx)("iframe",{src:"/visualizer",title:m},m)]})}}).call(this,a(38))},130:function(e,t,a){"use strict";(function(e){a(0);var l=a(95),r=a(93),i=a(42),c=a.n(i),o=a(5);t.a=function(t){var a=null===localStorage.getItem("bcolor")?"#000000":localStorage.getItem("bcolor");return Object(o.jsxs)(r.a,{style:{minWidth:"180px",marginLeft:"30px",marginRight:"30px",marginBottom:"12px"},className:t.formControl,children:[Object(o.jsx)(l.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Background Color"}),Object(o.jsx)(c.a,{style:{marginTop:"18px"},name:"color",defaultValue:a,onChange:function(t){void 0!==t&&localStorage.getItem("bcolor")!==t&&localStorage.setItem("bcolor",t),void 0===t&&e.refreshCanvas()}})]})}}).call(this,a(38))},135:function(e,t,a){"use strict";(function(e){a(0);var l=a(95),r=a(93),i=a(42),c=a.n(i),o=a(5);t.a=function(t){var a=null===localStorage.getItem("linecolor")?"#ffffff":localStorage.getItem("linecolor");return Object(o.jsxs)(r.a,{style:{minWidth:"180px",marginLeft:"30px",marginRight:"30px",marginBottom:"12px"},className:t.formControl,children:[Object(o.jsx)(l.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Line Color"}),Object(o.jsx)(c.a,{style:{marginTop:"18px"},name:"color",defaultValue:a,onChange:function(t){void 0!==t&&localStorage.getItem("linecolor")!==t&&localStorage.setItem("linecolor",t),void 0===t&&e.refreshCanvas()}})]})}}).call(this,a(38))},136:function(e,t,a){"use strict";(function(e){a(0);var l=a(95),r=a(93),i=a(42),c=a.n(i),o=a(5);t.a=function(t){var a=null===localStorage.getItem("fillcolor")?"#ffffff":localStorage.getItem("fillcolor");return Object(o.jsxs)(r.a,{style:{minWidth:"180px",marginLeft:"30px",marginRight:"30px",marginBottom:"12px"},className:t.formControl,children:[Object(o.jsx)(l.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Fill Color"}),Object(o.jsx)(c.a,{style:{marginTop:"18px"},name:"color",defaultValue:a,onChange:function(t){void 0!==t&&localStorage.getItem("fillcolor")!==t&&localStorage.setItem("fillcolor",t),void 0===t&&e.refreshCanvas()}})]})}}).call(this,a(38))},137:function(e,t,a){"use strict";var l=a(0),r=a.n(l),i=a(313),c=a(95),o=a(93),s=a(316),n=a(5),m=function(e){return Object(n.jsxs)(o.a,{className:e.formControl,style:{minWidth:"180px",marginLeft:"30px",marginRight:"30px",marginBottom:"12px"},children:[Object(n.jsx)(c.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Amount of Datapoints"}),Object(n.jsx)(s.a,{style:{marginTop:"24px"},getAriaValueText:function(e){localStorage.getItem("barMultiple")!=e&&localStorage.setItem("barMultiple",e)},"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",step:1,marks:[{value:5,label:"2^5 bars"},{value:8,label:"2^8 bars"},{value:12,label:"2^12 bars"}],min:5,max:14,defaultValue:null===localStorage.getItem("barMultiple")?9:localStorage.getItem("barMultiple")})]})},g=a(130),b=a(16),u=function(e){var t=null===localStorage.getItem("barRange")?0:Number(localStorage.getItem("barRange").split(",")[0]),a=null===localStorage.getItem("barRange")?100:Number(localStorage.getItem("barRange").split(",")[1]),l=r.a.useState([t,a]),i=Object(b.a)(l,2),m=i[0],g=i[1];return Object(n.jsxs)(o.a,{className:e.formControl,style:{minWidth:"180px",marginLeft:"30px",marginRight:"30px",marginBottom:"12px"},children:[Object(n.jsx)(c.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Range"}),Object(n.jsx)(s.a,{style:{marginTop:"24px"},value:m,onChange:function(e,t){g(t),localStorage.getItem("barRange")!=m&&localStorage.setItem("barRange",m)},valueLabelDisplay:"auto","aria-labelledby":"range-slider",marks:[{value:1,label:"1"},{value:100,label:"100"}]})]})},d=function(e){return Object(n.jsxs)(o.a,{className:e.formControl,style:{minWidth:"180px",marginLeft:"30px",marginRight:"30px",marginBottom:"12px"},children:[Object(n.jsx)(c.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Height"}),Object(n.jsx)(s.a,{style:{marginTop:"24px"},getAriaValueText:function(e){localStorage.getItem("height")!=e&&localStorage.setItem("height",e)},"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",step:1,marks:[{value:1,label:"1"},{value:100,label:"100"}],min:0,max:100,defaultValue:null===localStorage.getItem("height")?50:localStorage.getItem("height")})]})},j=a(127),h=function(e){var t=Object(l.useState)(null===localStorage.getItem("barMargin")?5:localStorage.getItem("barMargin")),a=Object(b.a)(t,2),r=a[0],i=a[1];return Object(n.jsx)(o.a,{style:{minWidth:"180px",marginLeft:"30px",marginRight:"30px",marginBottom:"12px"},className:e.formControl,children:Object(n.jsx)(j.a,{type:"number",id:"standard-basic",label:"Bar Margin",value:r,onChange:function(e){try{e.target.value<0?(i(0),localStorage.setItem("barMargin","0")):e.target.value>1e3?(i(1e3),localStorage.setItem("barMargin","1000")):(i(parseInt(e.target.value)),""===e.target.value?localStorage.setItem("barMargin","0"):localStorage.setItem("barMargin",""+parseInt(e.target.value)))}catch(e){i(0),localStorage.setItem("barMargin","0")}}})})},p=a(135),x=function(e){var t=Object(l.useState)(null===localStorage.getItem("lineWeight")?1:localStorage.getItem("lineWeight")),a=Object(b.a)(t,2),r=a[0],i=a[1];return Object(n.jsx)(o.a,{style:{minWidth:"180px",marginLeft:"30px",marginRight:"30px",marginBottom:"12px"},className:e.formControl,children:Object(n.jsx)(j.a,{type:"number",id:"standard-basic",label:"Line Weight",value:r,onChange:function(e){try{e.target.value<1?(i(1),localStorage.setItem("lineWeight","1")):e.target.value>1e3?(i(1e3),localStorage.setItem("lineWeight","1000")):(i(parseInt(e.target.value)),""===e.target.value?localStorage.setItem("lineWeight","1"):localStorage.setItem("lineWeight",""+parseInt(e.target.value)))}catch(e){i(0),localStorage.setItem("lineWeight","1")}}})})},f=a(317),v=a(314),O=function(e){var t=r.a.useState(null===localStorage.getItem("vis")||"bars"===localStorage.getItem("vis")?"":localStorage.getItem("vis")),a=Object(b.a)(t,2),l=a[0],i=a[1];return Object(n.jsxs)(o.a,{style:{minWidth:"180px",marginLeft:"30px",marginRight:"30px",marginBottom:"12px"},className:e.formControl,children:[Object(n.jsx)(c.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Bar Diagrams"}),Object(n.jsxs)(v.a,{labelId:"demo-simple-select-placeholder-label-label",id:"demo-simple-select-placeholder-label",value:l,onChange:function(e){switch(i(e.target.value),localStorage.setItem("type","bar"),e.target.value){case"":localStorage.setItem("vis","bars");break;case"doubleBars":localStorage.setItem("vis","doubleBars");break;case"sidebars":localStorage.setItem("vis","sidebars");break;case"bar_circle":localStorage.setItem("vis","bar_circle");break;case"multiColor":localStorage.setItem("vis","multiColor");break;default:localStorage.setItem("vis","bars")}},displayEmpty:!0,className:e.selectEmpty,children:[Object(n.jsx)(f.a,{value:"",children:"Bars"}),Object(n.jsx)(f.a,{value:"doubleBars",children:"Double Bars"}),Object(n.jsx)(f.a,{value:"sidebars",children:"Sidebars"}),Object(n.jsx)(f.a,{value:"bar_circle",children:"Circle"}),Object(n.jsx)(f.a,{value:"multiColor",children:"Multi Color"})]})]})},S=function(e){var t=r.a.useState((function(){return null===localStorage.getItem("vis")?"none":"line"===localStorage.getItem("vis")?"":localStorage.getItem("vis")})),a=Object(b.a)(t,2),l=a[0],i=a[1];return Object(n.jsxs)(o.a,{style:{minWidth:"180px",marginLeft:"30px",marginRight:"30px",marginBottom:"12px"},className:e.formControl,children:[Object(n.jsx)(c.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Line Diagrams"}),Object(n.jsxs)(v.a,{labelId:"demo-simple-select-placeholder-label-label",id:"demo-simple-select-placeholder-label",value:l,onChange:function(e){switch(i(e.target.value),localStorage.setItem("type","line"),e.target.value){case"":localStorage.setItem("vis","line");break;case"line_circle":localStorage.setItem("vis","line_circle");break;default:localStorage.setItem("vis","line")}},displayEmpty:!0,className:e.selectEmpty,children:[Object(n.jsx)(f.a,{value:"",children:"Line"}),Object(n.jsx)(f.a,{value:"line_circle",children:"TODO"})]})]})},I=a(318),y=a(315),C=function(e){var t=r.a.useState(null!==localStorage.getItem("lineFill")&&"true"===localStorage.getItem("lineFill")),a=Object(b.a)(t,2),l=a[0],i=a[1];return Object(n.jsx)(o.a,{style:{minWidth:"180px",marginLeft:"30px",marginRight:"30px",marginBottom:"12px"},className:e.formControl,children:Object(n.jsx)(I.a,{className:e.formControl,style:{color:"#b9b9bb"},control:Object(n.jsx)(y.a,{checked:l,onChange:function(e){i(e.target.checked),localStorage.setItem("lineFill",e.target.checked)},name:"checkedB",color:"primary"}),label:"Fill"})})},k=a(136),N=Object(i.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)}}}));t.a=function(){var e=N();return Object(n.jsxs)("div",{style:{margin:"20px"},children:[Object(n.jsxs)("div",{className:"s-container",children:[Object(n.jsx)(O,{classes:e}),Object(n.jsx)(h,{classes:e})]}),Object(n.jsxs)("div",{className:"s-container",children:[Object(n.jsx)(S,{classes:e}),Object(n.jsx)(C,{classes:e})]}),Object(n.jsxs)("div",{className:"s-container",children:[Object(n.jsx)(m,{classes:e}),Object(n.jsx)(u,{classes:e}),Object(n.jsx)(d,{classes:e}),Object(n.jsx)(p.a,{classes:e}),Object(n.jsx)(x,{classes:e}),Object(n.jsx)(k.a,{classes:e}),Object(n.jsx)(g.a,{classes:e})]})]})}},150:function(e,t,a){},151:function(e,t,a){},275:function(e,t,a){"use strict";a.r(t);var l=a(0),r=a.n(l),i=a(12),c=a.n(i),o=(a(150),a(128)),s=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,320)).then((function(t){var a=t.getCLS,l=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;a(e),l(e),r(e),i(e),c(e)}))},n=a(5);c.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(o.a,{})}),document.getElementById("root")),s()}},[[275,1,2]]]);
//# sourceMappingURL=main.84c8d9fb.chunk.js.map