(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{18:function(e,n,t){e.exports=t(41)},23:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var a=t(7),u=t(5),r=t(2),c=t(0),l=t.n(c),o=t(17),i=t.n(o),m=function(e){var n=e.filterHandle;return l.a.createElement(l.a.Fragment,null,l.a.createElement("form",null,l.a.createElement("div",null,"Filter shown with: ",l.a.createElement("input",{id:"filterInput",onChange:n}))))},d=function(e){var n=e.nameHandle,t=e.numberHandle,a=e.clickHandle;return l.a.createElement(l.a.Fragment,null,l.a.createElement("form",null,l.a.createElement("div",null,"name: ",l.a.createElement("input",{id:"nameInput",onChange:n})),l.a.createElement("div",null,"number: ",l.a.createElement("input",{id:"numberInput",onChange:t})),l.a.createElement("div",null,l.a.createElement("button",{onClick:a,type:"submit"},"add"))))},f=function(e){var n=e.personsHandled,t=e.deleteHandle,a=n.map((function(e){return l.a.createElement("h4",{key:e.id},e.name," ",e.number,l.a.createElement("button",{key:e.id,type:"text",onClick:function(){return t(e.id)}},"Delete"))}));return l.a.createElement(l.a.Fragment,null,a)},s=function(e){var n=e.message,t=e.status;return null===n?null:l.a.createElement("div",{className:t},n)},b=(t(23),t(4)),p=t.n(b),E="/api/persons",h=function(){return p.a.get(E).then((function(e){return e.data}))},v=function(e){return p.a.post(E,e).then((function(e){return e.data}))},j=function(e,n){return p.a.delete("".concat(E,"/").concat(e),{persons:n})},O=function(e,n){return p.a.put("".concat(E,"/").concat(e),{name:e,number:n}).then((function(e){return e.data}))},g=function(){var e=Object(c.useState)([]),n=Object(r.a)(e,2),t=n[0],o=n[1],i=Object(c.useState)(""),b=Object(r.a)(i,2),p=b[0],E=b[1],g=Object(c.useState)(""),y=Object(r.a)(g,2),k=y[0],w=y[1],H=Object(c.useState)(Object(u.a)(t)),S=Object(r.a)(H,2),I=S[0],C=S[1],D=Object(c.useState)(""),q=Object(r.a)(D,2),F=q[0],N=q[1],T=Object(c.useState)(""),x=Object(r.a)(T,2),A=x[0],J=x[1];Object(c.useEffect)((function(){console.log("effect"),h().then((function(e){o(e),C(e)}))}),[]);return l.a.createElement("div",{className:"wrap"},l.a.createElement("h2",null,"Phonebook"),l.a.createElement(s,{message:F,status:A}),l.a.createElement(m,{filterHandle:function(e){e.preventDefault();var n=t.filter((function(n){return n.name.includes(e.target.value)}));C(n)}}),l.a.createElement("h2",null,"Add a New"),l.a.createElement(d,{nameHandle:function(e){E(e.target.value)},numberHandle:function(e){w(e.target.value)},clickHandle:function(e){e.preventDefault();var n={name:p,number:k};if(console.log(n),t.some((function(e){return e.name===p&&t.some((function(e){return e.number===k}))})))alert("".concat(p," is already added to phonebook"));else if(t.some((function(e){return e.name===p}))&&t.some((function(e){return e.number!==k}))){var r="".concat(p," is already added to phonebook but the number is different. Do you want update the number?");window.confirm(r)&&(O(p,k).then((function(e){document.querySelector("#nameInput").value="",document.querySelector("#numberInput").value="",E(""),w("");var n=t.map((function(n){return n.name===e.name?Object(a.a)(Object(a.a)({},n),{},{number:e.number}):n}));o(n),C(n)})),N("The number of ".concat(p," has been modified")),J("num-modified"),setTimeout((function(){N(null)}),5e3))}else document.querySelector("#nameInput").value="",document.querySelector("#numberInput").value="",o([].concat(Object(u.a)(t),[n])),C([].concat(Object(u.a)(t),[n])),v(n).then((function(e){o(t.concat(e)),E(""),w("")})),N("Added ".concat(p)),J("successfull"),setTimeout((function(){N(null)}),5e3)}}),l.a.createElement("h2",null,"Numbers"),l.a.createElement(f,{personsHandled:I,deleteHandle:function(e){var n=t.filter((function(n){return n.id===e})),a=t.filter((function(n){return n.id!==e})),u="Do you really want to delete ".concat(e,"?");window.confirm(u)&&(j(e,n),o(a),C(a))}}),l.a.createElement("div",null,"debug: ",p))};i.a.render(l.a.createElement(g,null),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.feda5035.chunk.js.map