(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{22:function(e,t,n){e.exports=n(35)},27:function(e,t,n){},28:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(19),o=n.n(c);n(27),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l=n(11),u=n(10),i=n(2),m=n(3),s=n(5),p=n(4),b=n(6),h=(n(28),function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"main_wrapper"},r.a.createElement("div",{className:"menu"},r.a.createElement("h1",null,"react-router-dom \u5b9e\u8df5"),r.a.createElement(l.b,{to:"/"},"\u9996\u9875"),r.a.createElement(l.b,{to:"/list"},"\u5546\u54c1\u5217\u8868"),r.a.createElement(l.b,{to:"/about"},"\u5173\u4e8e"),r.a.createElement(l.b,{to:"/user-center"},"\u4e2a\u4eba\u4e2d\u5fc3"),r.a.createElement(l.b,{to:"/login"},"\u767b\u5f55")),r.a.createElement("div",{id:"body"},this.props.children))}}]),t}(r.a.Component)),d=Object(u.g)(h),E=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"\u6b22\u8fce\u6765\u5230\u9996\u9875"))}}]),t}(r.a.Component),f=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"\u6b22\u8fce\u6765\u5230\u5546\u54c1\u5217\u8868"))}}]),t}(r.a.Component),j=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"\u6b22\u8fce\u6765\u5230\u4e2a\u4eba\u4e2d\u5fc3"))}}]),t}(r.a.Component),O=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"\u6b22\u8fce\u6765\u5230\u5173\u4e8e\u6211\u4eec"))}}]),t}(r.a.Component),v=(n(34),function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(m.a)(t,[{key:"jump",value:function(){this.props.history.push("/")}},{key:"register",value:function(){window.alert("\u6682\u65e0\u6ce8\u518c\u529f\u80fd")}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"login_wrapper"},r.a.createElement("div",{className:"block"},r.a.createElement("h3",null,"\u6b22\u8fce\u6765\u5230\u767b\u5f55\u754c\u9762"),r.a.createElement("div",{className:"form"},r.a.createElement("label",{htmlFor:"account"},"\u8d26\u53f7\uff1a"),r.a.createElement("input",{id:"account",type:"text",value:"demo",placeholder:"\u7528\u6237\u540d"}),r.a.createElement("label",{htmlFor:"password"},"\u5bc6\u7801\uff1a"),r.a.createElement("input",{id:"password",type:"password",value:"demo",placeholder:"\u5bc6\u7801"}),r.a.createElement("div",{className:"button_group"},r.a.createElement("button",{onClick:function(){e.jump()}},"\u767b\u5f55"),r.a.createElement("button",{onClick:function(){e.register()}},"\u6ce8\u518c")))))}}]),t}(r.a.Component)),y=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"error_page"},r.a.createElement("h3",null,"404 - \u672a\u627e\u5230\u4f60\u8bf7\u6c42\u7684\u9875\u9762"))}}]),t}(r.a.Component),k=function(){return r.a.createElement(l.a,{basename:"/react-router-dom-demo"},r.a.createElement(u.d,null,r.a.createElement(u.b,{path:"/login",component:v}),r.a.createElement(u.b,{path:"/not-found",component:y}),r.a.createElement(u.b,{path:"/",render:function(){return r.a.createElement(d,null,r.a.createElement(u.b,{exact:!0,path:"/",component:E}),r.a.createElement(u.b,{exact:!0,path:"/list",component:f}),r.a.createElement(u.b,{exact:!0,path:"/about",component:O}),r.a.createElement(u.b,{exact:!0,path:"/user-center",component:j}))}}),r.a.createElement(u.a,{from:"/*",to:"/not-found"})))};o.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[22,1,2]]]);
//# sourceMappingURL=main.0d718e05.chunk.js.map