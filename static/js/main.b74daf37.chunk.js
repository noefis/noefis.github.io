(this.webpackJsonpmic_visualizer=this.webpackJsonpmic_visualizer||[]).push([[0],{132:function(e,t,a){"use strict";(function(e){var l=a(13),r=a(0),c=(a(161),a(144)),o=a(56),s=a(99),n=a(286),i=a(142),m=a(143),u=a(3);t.a=function(){var t=Object(r.useState)(0),a=Object(l.a)(t,2),g=a[0],b=a[1];e.refreshCanvas=function(){b(g+1)};var j=Object(s.a)({palette:{type:"dark"}});return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsxs)(n.a,{theme:j,children:[Object(u.jsx)(c.a,{},g),Object(u.jsxs)("div",{id:"full-screen",children:[Object(u.jsx)("p",{children:'Info: Press "Reload Canvas" to see your changes '}),Object(u.jsx)(o.a,{className:"bottom-button",variant:"outlined",style:{marginBottom:"20px"},onClick:function(){return b(g+1)},children:"reload Cavas"})," \xa0",Object(u.jsx)(o.a,{className:"bottom-button",variant:"outlined",style:{marginBottom:"20px"},href:"/visualizer",target:"_blank",children:" Open Visualizer in Fullscreen"})," \xa0",Object(u.jsx)(o.a,{className:"bottom-button",variant:"outlined",style:{marginBottom:"20px"},onClick:function(){b(g+1),null!==localStorage.getItem("musicData")&&URL.revokeObjectURL(localStorage.getItem("musicData")),localStorage.clear()},children:" Reset Visualizer"}),Object(u.jsx)(i.a,{},"m"+g),Object(u.jsx)(m.a,{},"s"+g)]})]}),Object(u.jsx)("iframe",{src:"/visualizer",title:g},g)]})}}).call(this,a(22))},133:function(e,t,a){"use strict";(function(e){a(0);var l=a(57),r=a(55),c=a(43),o=a.n(c),s=a(3);t.a=function(t){var a=null===localStorage.getItem("bcolor")?"#000000":localStorage.getItem("bcolor");return Object(s.jsxs)(r.a,{className:"all-form-inputs "+t.formControl,children:[Object(s.jsx)(l.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Background Color"}),Object(s.jsx)(o.a,{style:{marginTop:"18px"},name:"color",defaultValue:a,onChange:function(t){void 0!==t&&localStorage.getItem("bcolor")!==t&&localStorage.setItem("bcolor",t),void 0===t&&e.refreshCanvas()}})]})}}).call(this,a(22))},138:function(e,t,a){"use strict";(function(e){a(0);var l=a(57),r=a(55),c=a(43),o=a.n(c),s=a(3);t.a=function(t){var a=null===localStorage.getItem("linecolor")?"#ffffff":localStorage.getItem("linecolor");return Object(s.jsxs)(r.a,{className:"all-form-inputs "+t.formControl,children:[Object(s.jsx)(l.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Line Color"}),Object(s.jsx)(o.a,{style:{marginTop:"18px"},name:"color",defaultValue:a,onChange:function(t){void 0!==t&&localStorage.getItem("linecolor")!==t&&localStorage.setItem("linecolor",t),void 0===t&&e.refreshCanvas()}})]})}}).call(this,a(22))},139:function(e,t,a){"use strict";(function(e){var l=a(13),r=a(0),c=a.n(r),o=a(57),s=a(40),n=a(55),i=a(147),m=a(3);t.a=function(t){var a=c.a.useState(null===localStorage.getItem("vis")||"bars"===localStorage.getItem("vis")?"":localStorage.getItem("vis")),r=Object(l.a)(a,2),u=r[0],g=r[1];return Object(m.jsxs)(n.a,{className:"all-form-inputs "+t.formControl,children:[Object(m.jsx)(o.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Bar Diagrams"}),Object(m.jsxs)(i.a,{labelId:"demo-simple-select-placeholder-label-label",id:"demo-simple-select-placeholder-label",value:u,onChange:function(t){switch(g(t.target.value),localStorage.setItem("type","bar"),t.target.value){case"":localStorage.setItem("vis","bars");break;case"doubleBars":localStorage.setItem("vis","doubleBars");break;case"sidebars":localStorage.setItem("vis","sidebars");break;case"bar_circle":localStorage.setItem("vis","bar_circle");break;case"multiColor":localStorage.setItem("vis","multiColor");break;default:localStorage.setItem("vis","bars")}e.refreshCanvas()},displayEmpty:!0,className:t.selectEmpty,children:[Object(m.jsx)(s.a,{value:"",children:"Bars"}),Object(m.jsx)(s.a,{value:"doubleBars",children:"Double Bars"}),Object(m.jsx)(s.a,{value:"sidebars",children:"Sidebars"}),Object(m.jsx)(s.a,{value:"bar_circle",children:"Circle"}),Object(m.jsx)(s.a,{value:"multiColor",children:"Multi Color"})]})]})}}).call(this,a(22))},140:function(e,t,a){"use strict";(function(e){var l=a(13),r=a(0),c=a.n(r),o=a(57),s=a(40),n=a(55),i=a(147),m=a(3);t.a=function(t){var a=c.a.useState((function(){return null===localStorage.getItem("vis")?"none":"line"===localStorage.getItem("vis")?"":localStorage.getItem("vis")})),r=Object(l.a)(a,2),u=r[0],g=r[1];return Object(m.jsxs)(n.a,{className:"all-form-inputs "+t.formControl,children:[Object(m.jsx)(o.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Line Diagrams"}),Object(m.jsxs)(i.a,{labelId:"demo-simple-select-placeholder-label-label",id:"demo-simple-select-placeholder-label",value:u,onChange:function(t){switch(g(t.target.value),localStorage.setItem("type","line"),t.target.value){case"":localStorage.setItem("vis","line");break;case"line_circle":localStorage.setItem("vis","line_circle");break;default:localStorage.setItem("vis","line")}e.refreshCanvas()},displayEmpty:!0,className:t.selectEmpty,children:[Object(m.jsx)(s.a,{value:"",children:"Line"}),Object(m.jsx)(s.a,{value:"line_circle",children:"Circle"})]})]})}}).call(this,a(22))},141:function(e,t,a){"use strict";(function(e){a(0);var l=a(57),r=a(55),c=a(43),o=a.n(c),s=a(3);t.a=function(t){var a=null===localStorage.getItem("fillcolor")?"#ffffff":localStorage.getItem("fillcolor");return"multiColor"===(null===localStorage.getItem("vis")?"bars":localStorage.getItem("vis"))?Object(s.jsx)(s.Fragment,{}):Object(s.jsxs)(r.a,{className:"all-form-inputs "+t.formControl,children:[Object(s.jsx)(l.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Fill Color"}),Object(s.jsx)(o.a,{style:{marginTop:"18px"},name:"color",defaultValue:a,onChange:function(t){void 0!==t&&localStorage.getItem("fillcolor")!==t&&localStorage.setItem("fillcolor",t),void 0===t&&e.refreshCanvas()}})]})}}).call(this,a(22))},142:function(e,t,a){"use strict";(function(e){var l=a(13),r=a(0),c=a(56),o=a(289),s=a(3);t.a=function(){var t=Object(r.useState)(null===localStorage.getItem("musicName")?"":localStorage.getItem("musicName")),a=Object(l.a)(t,2),n=a[0],i=a[1],m=Object(r.useState)(null===localStorage.getItem("micOrSound")?"mic":localStorage.getItem("micOrSound")),u=Object(l.a)(m,2),g=u[0],b=(u[1],Object(o.a)("input")({display:"none"}));return Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)("label",{htmlFor:"contained-button-file",style:{float:"right",marginBottom:"20px"},children:[Object(s.jsx)("span",{className:"music-text",children:"sound"===g?n:""}),Object(s.jsx)(b,{id:"contained-button-file",type:"file",onChange:function(t){return function(t){var a=t.target.files[0];!a.type||a.type.startsWith("audio/")?(i(a.name),null!==localStorage.getItem("musicData")&&URL.revokeObjectURL(localStorage.getItem("musicData")),localStorage.setItem("musicData",URL.createObjectURL(a)),localStorage.setItem("musicName",a.name),localStorage.setItem("micOrSound","sound"),e.refreshCanvas()):console.log("File is not an audio file.",a.type,a)}(t)}}),Object(s.jsx)(c.a,{className:"bottom-button",variant:"outlined",component:"span",children:"Select Song"})]})})}}).call(this,a(22))},143:function(e,t,a){"use strict";(function(e){var l=a(13),r=a(0),c=a(56),o=a(3);t.a=function(){var t=Object(r.useState)(null===localStorage.getItem("micOrSound")?"mic":localStorage.getItem("micOrSound")),a=Object(l.a)(t,2),s=a[0],n=a[1];return"sound"===s?Object(o.jsxs)("label",{style:{float:"right"},children:["sound"===s&&Object(o.jsx)("span",{className:"music-text",children:"Info: Press on the Canvas to Play/Pause"}),Object(o.jsx)(c.a,{className:"bottom-button",variant:"outlined",component:"span",onClick:function(){"mic"===s?(n("sound"),localStorage.setItem("micOrSound","sound")):(n("mic"),localStorage.setItem("micOrSound","mic")),e.refreshCanvas()},children:"Switch back to Microphone Input"})]}):Object(o.jsx)(o.Fragment,{})}}).call(this,a(22))},144:function(e,t,a){"use strict";var l=a(0),r=a.n(l),c=a(320),o=a(57),s=a(55),n=a(322),i=a(3),m=function(e){return Object(i.jsxs)(s.a,{className:"all-form-inputs "+e.formControl,children:[Object(i.jsx)(o.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Amount of Datapoints"}),Object(i.jsx)(n.a,{style:{marginTop:"24px"},getAriaValueText:function(e){localStorage.getItem("barMultiple")!=e&&localStorage.setItem("barMultiple",e)},"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",step:1,marks:[{value:5,label:"2^5 bars"},{value:8,label:"2^8 bars"},{value:12,label:"2^12 bars"}],min:5,max:14,defaultValue:null===localStorage.getItem("barMultiple")?9:localStorage.getItem("barMultiple")})]})},u=a(133),g=a(13),b=function(e){var t=null===localStorage.getItem("barRange")?0:Number(localStorage.getItem("barRange").split(",")[0]),a=null===localStorage.getItem("barRange")?100:Number(localStorage.getItem("barRange").split(",")[1]),l=r.a.useState([t,a]),c=Object(g.a)(l,2),m=c[0],u=c[1];return Object(i.jsxs)(s.a,{className:"all-form-inputs "+e.formControl,children:[Object(i.jsx)(o.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Range"}),Object(i.jsx)(n.a,{style:{marginTop:"24px"},value:m,onChange:function(e,t){u(t),localStorage.getItem("barRange")!=m&&localStorage.setItem("barRange",m)},valueLabelDisplay:"auto","aria-labelledby":"range-slider",marks:[{value:1,label:"1"},{value:100,label:"100"}]})]})},j=function(e){return Object(i.jsxs)(s.a,{className:"all-form-inputs "+e.formControl,children:[Object(i.jsx)(o.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label",children:"Height"}),Object(i.jsx)(n.a,{style:{marginTop:"24px"},getAriaValueText:function(e){localStorage.getItem("height")!=e&&localStorage.setItem("height",e)},"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",step:1,marks:[{value:1,label:"1"},{value:100,label:"100"}],min:0,max:100,defaultValue:null===localStorage.getItem("height")?50:localStorage.getItem("height")})]})},d=a(131),h=function(e){var t=Object(l.useState)(null===localStorage.getItem("barMargin")?5:localStorage.getItem("barMargin")),a=Object(g.a)(t,2),r=a[0],c=a[1];return"bar"===(null===localStorage.getItem("type")?"bar":localStorage.getItem("type"))?Object(i.jsx)(s.a,{className:"all-form-inputs "+e.formControl,children:Object(i.jsx)(d.a,{type:"number",id:"standard-basic",label:"Bar Margin",value:r,onChange:function(e){try{e.target.value<0?(c(0),localStorage.setItem("barMargin","0")):e.target.value>1e3?(c(1e3),localStorage.setItem("barMargin","1000")):(c(parseInt(e.target.value)),""===e.target.value?localStorage.setItem("barMargin","0"):localStorage.setItem("barMargin",""+parseInt(e.target.value)))}catch(e){c(0),localStorage.setItem("barMargin","0")}}})}):Object(i.jsx)(i.Fragment,{})},f=a(138),S=function(e){var t=Object(l.useState)(null===localStorage.getItem("lineWeight")?1:localStorage.getItem("lineWeight")),a=Object(g.a)(t,2),r=a[0],c=a[1];return Object(i.jsx)(s.a,{className:"all-form-inputs "+e.formControl,children:Object(i.jsx)(d.a,{type:"number",id:"standard-basic",label:"Line Weight",value:r,onChange:function(e){try{e.target.value<0?(c(0),localStorage.setItem("lineWeight","0")):e.target.value>1e3?(c(1e3),localStorage.setItem("lineWeight","1000")):(c(parseInt(e.target.value)),""===e.target.value?localStorage.setItem("lineWeight","0"):localStorage.setItem("lineWeight",""+parseInt(e.target.value)))}catch(e){c(0),localStorage.setItem("lineWeight","1")}}})})},v=a(139),O=a(140),p=a(323),I=a(321),x=function(e){var t=r.a.useState(null!==localStorage.getItem("lineFill")&&"true"===localStorage.getItem("lineFill")),a=Object(g.a)(t,2),l=a[0],c=a[1];return"line"===(null===localStorage.getItem("type")?"bar":localStorage.getItem("type"))?Object(i.jsx)(s.a,{className:"all-form-inputs "+e.formControl,children:Object(i.jsx)(p.a,{className:e.formControl,style:{color:"#b9b9bb"},control:Object(i.jsx)(I.a,{checked:l,onChange:function(e){c(e.target.checked),localStorage.setItem("lineFill",e.target.checked)},name:"checkedB",color:"primary"}),label:"Fill"})}):Object(i.jsx)(i.Fragment,{})},C=a(141),y=function(e){var t=Object(l.useState)(null===localStorage.getItem("lineCircleSize")?60:localStorage.getItem("lineCircleSize")),a=Object(g.a)(t,2),r=a[0],c=a[1];return"line_circle"===(null===localStorage.getItem("vis")?"bars":localStorage.getItem("vis"))?Object(i.jsx)(s.a,{className:"all-form-inputs "+e.formControl,children:Object(i.jsx)(d.a,{type:"number",id:"standard-basic",label:"Line CircleSize",value:r,onChange:function(e){try{e.target.value<0?(c(0),localStorage.setItem("lineCircleSize","0")):e.target.value>1e3?(c(1e3),localStorage.setItem("lineCircleSize","1000")):(c(parseInt(e.target.value)),""===e.target.value?localStorage.setItem("lineCircleSize","0"):localStorage.setItem("lineCircleSize",""+parseInt(e.target.value)))}catch(e){c(0),localStorage.setItem("lineCircleSize","1")}}})}):Object(i.jsx)(i.Fragment,{})},k=function(e){var t=r.a.useState(null!==localStorage.getItem("showLineCircle")&&"true"===localStorage.getItem("showLineCircle")),a=Object(g.a)(t,2),l=a[0],c=a[1];return"line_circle"===(null===localStorage.getItem("vis")?"bars":localStorage.getItem("vis"))?Object(i.jsx)(s.a,{className:"all-form-inputs "+e.formControl,children:Object(i.jsx)(p.a,{className:e.formControl,style:{color:"#b9b9bb"},control:Object(i.jsx)(I.a,{checked:l,onChange:function(e){c(e.target.checked),localStorage.setItem("showLineCircle",e.target.checked)},name:"checkedB",color:"primary"}),label:"Show Circle"})}):Object(i.jsx)(i.Fragment,{})},N=Object(c.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)}}}));t.a=function(){var e=N();return Object(i.jsxs)("div",{style:{margin:"20px"},children:[Object(i.jsxs)("div",{className:"s-container",children:[Object(i.jsx)(v.a,{classes:e}),Object(i.jsx)(h,{classes:e})]}),Object(i.jsxs)("div",{className:"s-container",children:[Object(i.jsx)(O.a,{classes:e}),Object(i.jsx)(x,{classes:e}),Object(i.jsx)(y,{classes:e}),Object(i.jsx)(k,{classes:e})]}),Object(i.jsxs)("div",{className:"s-container",children:[Object(i.jsx)(m,{classes:e}),Object(i.jsx)(b,{classes:e}),Object(i.jsx)(j,{classes:e}),Object(i.jsx)(f.a,{classes:e}),Object(i.jsx)(S,{classes:e}),Object(i.jsx)(C.a,{classes:e}),Object(i.jsx)(u.a,{classes:e})]})]})}},160:function(e,t,a){},161:function(e,t,a){},285:function(e,t,a){"use strict";a.r(t);var l=a(0),r=a.n(l),c=a(12),o=a.n(c),s=(a(160),a(132)),n=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,325)).then((function(t){var a=t.getCLS,l=t.getFID,r=t.getFCP,c=t.getLCP,o=t.getTTFB;a(e),l(e),r(e),c(e),o(e)}))},i=a(3);o.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(s.a,{})}),document.getElementById("root")),n()}},[[285,1,2]]]);
//# sourceMappingURL=main.b74daf37.chunk.js.map