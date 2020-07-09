(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{368:function(t,a,s){"use strict";s.r(a);var n=s(25),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"layout"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#layout"}},[t._v("#")]),t._v(" Layout")]),t._v(" "),s("p",[t._v("Virrvarr supports different graph layouts that can be set using the virrvarr API.")]),t._v(" "),s("h2",{attrs:{id:"matrix-layout"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#matrix-layout"}},[t._v("#")]),t._v(" Matrix Layout")]),t._v(" "),s("p",[t._v("Matrix layouts are a way of grouping data in clusters. To create a matrix layout you need to supply information to virrvarr about what group each node is a part of, as well as (potentially) what order these should be displayed in.")]),t._v(" "),s("p",[t._v("To create a group you can either provide an attribute that is set directly on all nodes, or you can provide a custom function that takes the bound data on each node as an input argument and returns a group name in the form of a string value. If a function is supplied the attribute value will be ignored.")]),t._v(" "),s("p",[t._v("A sort function can also be provided. The function should take two arguments, Node object 1's bound data and node object 2's bound data, and works just like a regular array sorting function.")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("graph"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setMatrixLayout")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"type"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ngraph"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setMatrixLayout")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("boundData")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" boundData"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("someAttribute "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Sorting function can be added here")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//To reset the layout simply call resetLayout")]),t._v("\ngraph"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resetLayout")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[s("code",[t._v('A cool trick is to sort by the attribute "id". This will cause the graph to display as a grid.')])])])}),[],!1,null,null,null);a.default=e.exports}}]);