(this.webpackJsonpmic_visualizer=this.webpackJsonpmic_visualizer||[]).push([[0],{131:function(e,t,a){"use strict";(function(e){var l=a(14),r=a(0),c=(a(157),a(141)),o=a(54),s=a(96),n=a(282),i=a(139),u=a(140),m=a(3);t.a=function(){var t=Object(r.useState)(0),a=Object(l.a)(t,2),b=a[0],g=a[1];e.refreshCanvas=function(){g(b+1)};var j=Object(s.a)({palette:{type:"dark"}});return Object(m.jsxs)("div",{className:"App",children:[Object(m.jsxs)(n.a,{theme:j,children:[Object(m.jsx)(c.a,{},b),Object(m.jsxs)("div",{id:"full-screen",children:[Object(m.jsx)(o.a,{className:"bottom-button",variant:"outlined",style:{marginBottom:"20px"},onClick:function(){return g(b+1)},children:"reload Cavas"})," \xa0",Object(m.jsx)(o.a,{className:"bottom-button",variant:"outlined",style:{marginBottom:"20px"},href:"/visualizer",target:"_blank",children:" Open Visualizer in Fullscreen"})," \xa0",Object(m.jsx)(o.a,{className:"bottom-button",variant:"outlined",style:{marginBottom:"20px"},onClick:function(){g(b+1),localStorage.clear()},children:" Reset Visualizer"}),Object(m.jsx)(i.a,{}),Object(m.jsx)(u.a,{})]})]}),Object(m.jsx)("iframe",{src:"/visualizer",title:b},b)]})}}).call(this,a(39))},132:function(e,t,a){"use strict";(function(e){a(0);var l=a(98),r=a(97),c=a(42),o=a.n(c),s=a(3);t.a=function(t){var a=null===localStorage.getItem("bcolor")?"#000000":localStorage.getItem("bcolor");return Object(s.jsxs)(r.a,{className:"all-form-inputs "+t.formControl,children:[Object(s.jsx)(l.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Background Color"}),Object(s.jsx)(o.a,{style:{marginTop:"18px"},name:"color",defaultValue:a,onChange:function(t){void 0!==t&&localStorage.getItem("bcolor")!==t&&localStorage.setItem("bcolor",t),void 0===t&&e.refreshCanvas()}})]})}}).call(this,a(39))},137:function(e,t,a){"use strict";(function(e){a(0);var l=a(98),r=a(97),c=a(42),o=a.n(c),s=a(3);t.a=function(t){var a=null===localStorage.getItem("linecolor")?"#ffffff":localStorage.getItem("linecolor");return Object(s.jsxs)(r.a,{className:"all-form-inputs "+t.formControl,children:[Object(s.jsx)(l.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Line Color"}),Object(s.jsx)(o.a,{style:{marginTop:"18px"},name:"color",defaultValue:a,onChange:function(t){void 0!==t&&localStorage.getItem("linecolor")!==t&&localStorage.setItem("linecolor",t),void 0===t&&e.refreshCanvas()}})]})}}).call(this,a(39))},138:function(e,t,a){"use strict";(function(e){a(0);var l=a(98),r=a(97),c=a(42),o=a.n(c),s=a(3);t.a=function(t){var a=null===localStorage.getItem("fillcolor")?"#ffffff":localStorage.getItem("fillcolor");return Object(s.jsxs)(r.a,{className:"all-form-inputs "+t.formControl,children:[Object(s.jsx)(l.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Fill Color"}),Object(s.jsx)(o.a,{style:{marginTop:"18px"},name:"color",defaultValue:a,onChange:function(t){void 0!==t&&localStorage.getItem("fillcolor")!==t&&localStorage.setItem("fillcolor",t),void 0===t&&e.refreshCanvas()}})]})}}).call(this,a(39))},139:function(e,t,a){"use strict";var l=a(14),r=a(0),c=a(54),o=a(285),s=a(3);t.a=function(){var e=Object(r.useState)(null===localStorage.getItem("musicName")?"":localStorage.getItem("musicName")),t=Object(l.a)(e,2),a=t[0],n=t[1],i=function(e){localStorage.setItem("musicData",e.target.result)},u=Object(o.a)("input")({display:"none"});return Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)("label",{htmlFor:"contained-button-file",style:{float:"right",marginBottom:"20px"},children:[Object(s.jsx)("span",{className:"music-text",children:a}),Object(s.jsx)(u,{id:"contained-button-file",type:"file",onChange:function(e){return function(e){var t=e.target.files[0];if(!t.type||t.type.startsWith("audio/")){n(t.name),localStorage.setItem("musicName",t.name);var a=new FileReader;a.onloadend=i,a.readAsDataURL(t)}else console.log("File is not an audio file.",t.type,t)}(e)}}),Object(s.jsx)(c.a,{className:"bottom-button",variant:"outlined",component:"span",children:"Select Song"})]})})}},140:function(e,t,a){"use strict";var l=a(14),r=a(0),c=a(54),o=a(3);t.a=function(){var e=Object(r.useState)(null===localStorage.getItem("micOrSound")?"mic":localStorage.getItem("micOrSound")),t=Object(l.a)(e,2),a=t[0],s=t[1];return Object(o.jsxs)("label",{style:{float:"right"},children:["sound"===a&&Object(o.jsx)("span",{className:"music-text",children:"Info: Press on the Canvas to Play/Pause"}),Object(o.jsx)(c.a,{className:"bottom-button",style:{marginRight:"20px"},variant:"outlined",component:"span",onClick:function(){"mic"===a?(s("sound"),localStorage.setItem("micOrSound","sound")):(s("mic"),localStorage.setItem("micOrSound","mic"))},children:"mic"===a?"Switch to a Sound File instead of Microphone Input":"Switch to Microphone Input instead of the Sound File"})]})}},141:function(e,t,a){"use strict";var l=a(0),r=a.n(l),c=a(316),o=a(98),s=a(97),n=a(319),i=a(3),u=function(e){return Object(i.jsxs)(s.a,{className:"all-form-inputs "+e.formControl,children:[Object(i.jsx)(o.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Amount of Datapoints"}),Object(i.jsx)(n.a,{style:{marginTop:"24px"},getAriaValueText:function(e){localStorage.getItem("barMultiple")!=e&&localStorage.setItem("barMultiple",e)},"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",step:1,marks:[{value:5,label:"2^5 bars"},{value:8,label:"2^8 bars"},{value:12,label:"2^12 bars"}],min:5,max:14,defaultValue:null===localStorage.getItem("barMultiple")?9:localStorage.getItem("barMultiple")})]})},m=a(132),b=a(14),g=function(e){var t=null===localStorage.getItem("barRange")?0:Number(localStorage.getItem("barRange").split(",")[0]),a=null===localStorage.getItem("barRange")?100:Number(localStorage.getItem("barRange").split(",")[1]),l=r.a.useState([t,a]),c=Object(b.a)(l,2),u=c[0],m=c[1];return Object(i.jsxs)(s.a,{className:"all-form-inputs "+e.formControl,children:[Object(i.jsx)(o.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Range"}),Object(i.jsx)(n.a,{style:{marginTop:"24px"},value:u,onChange:function(e,t){m(t),localStorage.getItem("barRange")!=u&&localStorage.setItem("barRange",u)},valueLabelDisplay:"auto","aria-labelledby":"range-slider",marks:[{value:1,label:"1"},{value:100,label:"100"}]})]})},j=function(e){return Object(i.jsxs)(s.a,{className:"all-form-inputs "+e.formControl,children:[Object(i.jsx)(o.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Height"}),Object(i.jsx)(n.a,{style:{marginTop:"24px"},getAriaValueText:function(e){localStorage.getItem("height")!=e&&localStorage.setItem("height",e)},"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",step:1,marks:[{value:1,label:"1"},{value:100,label:"100"}],min:0,max:100,defaultValue:null===localStorage.getItem("height")?50:localStorage.getItem("height")})]})},d=a(130),h=function(e){var t=Object(l.useState)(null===localStorage.getItem("barMargin")?5:localStorage.getItem("barMargin")),a=Object(b.a)(t,2),r=a[0],c=a[1];return Object(i.jsx)(s.a,{className:"all-form-inputs "+e.formControl,children:Object(i.jsx)(d.a,{type:"number",id:"standard-basic",label:"Bar Margin",value:r,onChange:function(e){try{e.target.value<0?(c(0),localStorage.setItem("barMargin","0")):e.target.value>1e3?(c(1e3),localStorage.setItem("barMargin","1000")):(c(parseInt(e.target.value)),""===e.target.value?localStorage.setItem("barMargin","0"):localStorage.setItem("barMargin",""+parseInt(e.target.value)))}catch(e){c(0),localStorage.setItem("barMargin","0")}}})})},f=a(137),p=function(e){var t=Object(l.useState)(null===localStorage.getItem("lineWeight")?1:localStorage.getItem("lineWeight")),a=Object(b.a)(t,2),r=a[0],c=a[1];return Object(i.jsx)(s.a,{className:"all-form-inputs "+e.formControl,children:Object(i.jsx)(d.a,{type:"number",id:"standard-basic",label:"Line Weight",value:r,onChange:function(e){try{e.target.value<0?(c(0),localStorage.setItem("lineWeight","0")):e.target.value>1e3?(c(1e3),localStorage.setItem("lineWeight","1000")):(c(parseInt(e.target.value)),""===e.target.value?localStorage.setItem("lineWeight","0"):localStorage.setItem("lineWeight",""+parseInt(e.target.value)))}catch(e){c(0),localStorage.setItem("lineWeight","1")}}})})},S=a(320),v=a(317),O=function(e){var t=r.a.useState(null===localStorage.getItem("vis")||"bars"===localStorage.getItem("vis")?"":localStorage.getItem("vis")),a=Object(b.a)(t,2),l=a[0],c=a[1];return Object(i.jsxs)(s.a,{className:"all-form-inputs "+e.formControl,children:[Object(i.jsx)(o.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Bar Diagrams"}),Object(i.jsxs)(v.a,{labelId:"demo-simple-select-placeholder-label-label",id:"demo-simple-select-placeholder-label",value:l,onChange:function(e){switch(c(e.target.value),localStorage.setItem("type","bar"),e.target.value){case"":localStorage.setItem("vis","bars");break;case"doubleBars":localStorage.setItem("vis","doubleBars");break;case"sidebars":localStorage.setItem("vis","sidebars");break;case"bar_circle":localStorage.setItem("vis","bar_circle");break;case"multiColor":localStorage.setItem("vis","multiColor");break;default:localStorage.setItem("vis","bars")}},displayEmpty:!0,className:e.selectEmpty,children:[Object(i.jsx)(S.a,{value:"",children:"Bars"}),Object(i.jsx)(S.a,{value:"doubleBars",children:"Double Bars"}),Object(i.jsx)(S.a,{value:"sidebars",children:"Sidebars"}),Object(i.jsx)(S.a,{value:"bar_circle",children:"Circle"}),Object(i.jsx)(S.a,{value:"multiColor",children:"Multi Color"})]})]})},x=function(e){var t=r.a.useState((function(){return null===localStorage.getItem("vis")?"none":"line"===localStorage.getItem("vis")?"":localStorage.getItem("vis")})),a=Object(b.a)(t,2),l=a[0],c=a[1];return Object(i.jsxs)(s.a,{className:"all-form-inputs "+e.formControl,children:[Object(i.jsx)(o.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Line Diagrams"}),Object(i.jsxs)(v.a,{labelId:"demo-simple-select-placeholder-label-label",id:"demo-simple-select-placeholder-label",value:l,onChange:function(e){switch(c(e.target.value),localStorage.setItem("type","line"),e.target.value){case"":localStorage.setItem("vis","line");break;case"line_circle":localStorage.setItem("vis","line_circle");break;default:localStorage.setItem("vis","line")}},displayEmpty:!0,className:e.selectEmpty,children:[Object(i.jsx)(S.a,{value:"",children:"Line"}),Object(i.jsx)(S.a,{value:"line_circle",children:"Circle"})]})]})},I=a(321),C=a(318),y=function(e){var t=r.a.useState(null!==localStorage.getItem("lineFill")&&"true"===localStorage.getItem("lineFill")),a=Object(b.a)(t,2),l=a[0],c=a[1];return Object(i.jsx)(s.a,{className:"all-form-inputs "+e.formControl,children:Object(i.jsx)(I.a,{className:e.formControl,style:{color:"#b9b9bb"},control:Object(i.jsx)(C.a,{checked:l,onChange:function(e){c(e.target.checked),localStorage.setItem("lineFill",e.target.checked)},name:"checkedB",color:"primary"}),label:"Fill"})})},k=a(138),N=function(e){var t=Object(l.useState)(null===localStorage.getItem("lineCircleSize")?60:localStorage.getItem("lineCircleSize")),a=Object(b.a)(t,2),r=a[0],c=a[1];return Object(i.jsx)(s.a,{className:"all-form-inputs "+e.formControl,children:Object(i.jsx)(d.a,{type:"number",id:"standard-basic",label:"Line CircleSize",value:r,onChange:function(e){try{e.target.value<0?(c(0),localStorage.setItem("lineCircleSize","0")):e.target.value>1e3?(c(1e3),localStorage.setItem("lineCircleSize","1000")):(c(parseInt(e.target.value)),""===e.target.value?localStorage.setItem("lineCircleSize","0"):localStorage.setItem("lineCircleSize",""+parseInt(e.target.value)))}catch(e){c(0),localStorage.setItem("lineCircleSize","1")}}})})},B=function(e){var t=r.a.useState(null!==localStorage.getItem("showLineCircle")&&"true"===localStorage.getItem("showLineCircle")),a=Object(b.a)(t,2),l=a[0],c=a[1];return Object(i.jsx)(s.a,{className:"all-form-inputs "+e.formControl,children:Object(i.jsx)(I.a,{className:e.formControl,style:{color:"#b9b9bb"},control:Object(i.jsx)(C.a,{checked:l,onChange:function(e){c(e.target.checked),localStorage.setItem("showLineCircle",e.target.checked)},name:"checkedB",color:"primary"}),label:"Show Circle"})})},F=Object(c.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)}}}));t.a=function(){var e=F();return Object(i.jsxs)("div",{style:{margin:"20px"},children:[Object(i.jsxs)("div",{className:"s-container",children:[Object(i.jsx)(O,{classes:e}),Object(i.jsx)(h,{classes:e})]}),Object(i.jsxs)("div",{className:"s-container",children:[Object(i.jsx)(x,{classes:e}),Object(i.jsx)(N,{classes:e}),Object(i.jsx)(y,{classes:e}),Object(i.jsx)(B,{classes:e})]}),Object(i.jsxs)("div",{className:"s-container",children:[Object(i.jsx)(u,{classes:e}),Object(i.jsx)(g,{classes:e}),Object(i.jsx)(j,{classes:e}),Object(i.jsx)(f.a,{classes:e}),Object(i.jsx)(p,{classes:e}),Object(i.jsx)(k.a,{classes:e}),Object(i.jsx)(m.a,{classes:e})]})]})}},156:function(e,t,a){},157:function(e,t,a){},281:function(e,t,a){"use strict";a.r(t);var l=a(0),r=a.n(l),c=a(12),o=a.n(c),s=(a(156),a(131)),n=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,323)).then((function(t){var a=t.getCLS,l=t.getFID,r=t.getFCP,c=t.getLCP,o=t.getTTFB;a(e),l(e),r(e),c(e),o(e)}))},i=a(3);o.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(s.a,{})}),document.getElementById("root")),n()}},[[281,1,2]]]);
//# sourceMappingURL=main.a1fab797.chunk.js.map