(function(e){function t(t){for(var n,r,c=t[0],s=t[1],l=t[2],u=0,d=[];u<c.length;u++)r=c[u],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&d.push(o[r][0]),o[r]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);h&&h(t);while(d.length)d.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,r=1;r<a.length;r++){var c=a[r];0!==o[c]&&(n=!1)}n&&(i.splice(t--,1),e=s(s.s=a[0]))}return e}var n={},r={app:0},o={app:0},i=[];function c(e){return s.p+"js/"+({account:"account",createAccount:"createAccount",login:"login"}[e]||e)+"."+{account:"690f9e80",createAccount:"123660f1",login:"5a8fc168"}[e]+".js"}function s(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.e=function(e){var t=[],a={account:1};r[e]?t.push(r[e]):0!==r[e]&&a[e]&&t.push(r[e]=new Promise((function(t,a){for(var n="css/"+({account:"account",createAccount:"createAccount",login:"login"}[e]||e)+"."+{account:"1c4e36e9",createAccount:"31d6cfe0",login:"31d6cfe0"}[e]+".css",o=s.p+n,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var l=i[c],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===n||u===o))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){l=d[c],u=l.getAttribute("data-href");if(u===n||u===o)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var n=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=n,delete r[e],h.parentNode.removeChild(h),a(i)},h.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(h)})).then((function(){r[e]=0})));var n=o[e];if(0!==n)if(n)t.push(n[2]);else{var i=new Promise((function(t,a){n=o[e]=[t,a]}));t.push(n[2]=i);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=c(e);var d=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(h);var a=o[e];if(0!==a){if(a){var n=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+n+": "+r+")",d.name="ChunkLoadError",d.type=n,d.request=r,a[1](d)}o[e]=void 0}};var h=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},s.m=e,s.c=n,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(a,n,function(t){return e[t]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var h=u;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"0135":function(e,t){e.exports={url:"https://anegy.nl"}},"4be0":function(e,t,a){"use strict";a("d3b4")},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("router-view")},o=[],i={name:"App",data:function(){return{}}},c=i,s=a("2877"),l=Object(s["a"])(c,r,o,!1,null,null,null),u=l.exports,d=(a("d3b7"),a("3ca3"),a("ddb0"),a("7db0"),a("fb6a"),a("d81d"),a("a630"),a("159b"),a("b64b"),a("8c4f")),h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("HomeAppBar",{attrs:{currentSearchPage:e.currentSearchPage},on:{watched:e.watched}}),a("v-main",[a("v-container",{attrs:{fluid:""}},[a("h1",{staticClass:"mb-5",staticStyle:{"text-align":"center"}},[e._v(" Today's Trending Movies & Series ")]),a("cards",{attrs:{data:e.data}}),0==this.show?a("v-pagination",{staticClass:"my-4",attrs:{color:"secondary",length:e.totalPages,"total-visible":10},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}}):e._e(),1==this.show?a("v-pagination",{staticClass:"my-4",attrs:{color:"secondary",length:e.totalSearchPages,"total-visible":10},model:{value:e.currentSearchPage,callback:function(t){e.currentSearchPage=t},expression:"currentSearchPage"}}):e._e()],1)],1),a("WebsiteFooter")],1)},p=[],m=a("5530"),v=(a("a15b"),a("68c1")),f=a("836a"),g=a("6210"),b=a("bc3a"),y=a.n(b),_=a("0135"),w=a.n(_),S=a("2f62"),A={name:"Homepage",components:{HomeAppBar:v["a"],WebsiteFooter:f["a"],Cards:g["a"]},data:function(){return{data:[],currentPage:1,totalPages:500,currentSearchPage:1,totalSearchPages:500,selectedGenres:[]}},computed:Object(m["a"])({},Object(S["c"])(["show"])),methods:Object(m["a"])(Object(m["a"])({},Object(S["b"])(["setShow"])),{},{getTrending:function(e,t){var a=this;y()({method:"post",url:"".concat(w.a.url,"/Library/Discover.php"),data:{url:"/trending/all/day?",page:e,genres:encodeURI(t.join(","))}}).then((function(e){a.currentPage=e.data.page,e.data.total_pages<=500&&(a.totalPages=e.data.total_pages),a.data=e.data.results})).catch((function(e){console.log(e)}))},watched:function(e){this.data=e.results,this.currentSearchPage=e.page,e.total_pages<=500&&(this.totalSearchPages=e.total_pages),e.errors&&(this.currentPage=1,this.currentSearchPage=1,this.setShow(!1),this.getTrending(this.currentPage,this.selectedGenres))}}),mounted:function(){this.getTrending(this.currentPage,this.selectedGenres),this.setShow(!1),window.scrollTo({top:0,behavior:"smooth"})},watch:{currentPage:function(e){this.getTrending(e,this.selectedGenres),window.scrollTo({top:0,behavior:"smooth"})},currentSearchPage:function(){window.scrollTo({top:0,behavior:"smooth"})},show:function(e){0==e&&this.getTrending(this.currentPage,this.selectedGenres)}}},x=A,P=(a("4be0"),a("6544")),C=a.n(P),T=a("7496"),j=a("a523"),k=a("f6c4"),$=a("891e"),O=Object(s["a"])(x,h,p,!1,null,null,null),D=O.exports;C()(O,{VApp:T["a"],VContainer:j["a"],VMain:k["a"],VPagination:$["a"]}),n["a"].use(d["a"]);var M=[{path:"/",name:"Homepage",component:D,meta:{title:"Anegy - Movies & Series"}},{path:"/movies/details/:id",name:"Movie Details",component:function(){return a.e("account").then(a.bind(null,"f788"))},meta:{title:"Details ... - Anegy"}},{path:"/movies/discover",name:"Discover Movies",component:function(){return a.e("account").then(a.bind(null,"da27"))},meta:{title:"Discover Movies - Anegy"}},{path:"/movies/trending",name:"Trending Movies",component:function(){return a.e("account").then(a.bind(null,"da27"))},meta:{title:"Trending Movies - Anegy"}},{path:"/movies/popular",name:"Popular Movies",component:function(){return a.e("account").then(a.bind(null,"da27"))},meta:{title:"Popular Movies - Anegy"}},{path:"/movies/playing",name:"Playing Movies",component:function(){return a.e("account").then(a.bind(null,"da27"))},meta:{title:"Playing Movies - Anegy"}},{path:"/movies/top-rated",name:"Top Rated Movies",component:function(){return a.e("account").then(a.bind(null,"da27"))},meta:{title:"Top Rated Movies - Anegy"}},{path:"/movies/upcoming",name:"Upcoming Movies",component:function(){return a.e("account").then(a.bind(null,"da27"))},meta:{title:"Upcoming Movies - Anegy"}},{path:"/series/details/:id",name:"Serie Details",component:function(){return a.e("account").then(a.bind(null,"dfbb"))},meta:{title:"Details ... - Anegy"}},{path:"/series/discover",name:"Discover Series",component:function(){return a.e("account").then(a.bind(null,"f431"))},meta:{title:"Discover Series - Anegy"}},{path:"/series/trending",name:"Trending Series",component:function(){return a.e("account").then(a.bind(null,"f431"))},meta:{title:"Trending Series - Anegy"}},{path:"/series/popular",name:"Popular Series",component:function(){return a.e("account").then(a.bind(null,"f431"))},meta:{title:"Popular Series - Anegy"}},{path:"/series/playing",name:"Playing Series",component:function(){return a.e("account").then(a.bind(null,"f431"))},meta:{title:"Playing Series - Anegy"}},{path:"/series/top-rated",name:"Top Rated Series",component:function(){return a.e("account").then(a.bind(null,"f431"))},meta:{title:"Top Rated Series - Anegy"}},{path:"/series/upcoming",name:"Upcoming Series",component:function(){return a.e("account").then(a.bind(null,"f431"))},meta:{title:"Upcoming Series - Anegy"}},{path:"/people/:id",name:"People",component:function(){return a.e("account").then(a.bind(null,"ce40"))},meta:{title:"Details Person - Anegy"}},{path:"/account",name:"Account",component:function(){return a.e("account").then(a.bind(null,"a3f2"))},meta:{title:"Account - Anegy"}},{path:"/create-account",name:"Create Account",component:function(){return a.e("createAccount").then(a.bind(null,"e753"))},meta:{title:"Create Account - Anegy"}},{path:"/login",name:"Login",component:function(){return a.e("login").then(a.bind(null,"1c92"))},meta:{title:"Login - Anegy"}},{path:"*",name:"404",component:function(){return a.e("login").then(a.bind(null,"8cdb"))},meta:{title:"404 - Anegy"}}],V=new d["a"]({routes:M});V.beforeEach((function(e,t,a){var n=e.matched.slice().reverse().find((function(e){return e.meta&&e.meta.title})),r=e.matched.slice().reverse().find((function(e){return e.meta&&e.meta.metaTags})),o=t.matched.slice().reverse().find((function(e){return e.meta&&e.meta.metaTags}));if(n?document.title=n.meta.title:o&&(document.title=o.meta.title),Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map((function(e){return e.parentNode.removeChild(e)})),!r)return a();r.meta.metaTags.map((function(e){var t=document.createElement("meta");return Object.keys(e).forEach((function(a){t.setAttribute(a,e[a])})),t.setAttribute("data-vue-router-controlled",""),t})).forEach((function(e){return document.head.appendChild(e)})),a()}));var F=V;n["a"].use(S["a"]);var E=new S["a"].Store({state:{drawer:!1,show:!1},mutations:{setDrawerInput:function(e,t){return e.drawer=t},setShow:function(e,t){return e.show=t}},actions:{setDrawerInput:function(e,t){var a=e.commit;return a("setDrawerInput",t)},setShow:function(e,t){var a=e.commit;return a("setShow",t)}},getters:{drawer:function(e){return e.drawer},show:function(e){return e.show}}}),L=a("f309");n["a"].use(L["a"]);var B=new L["a"]({theme:{themes:{light:{primary:"#e0dfdf",secondary:"#f32b2b",accent:"#23a9a7",btnFilterColor:"#000000"},dark:{primary:"#1b1b1f",secondary:"#8B0000",accent:"#23a9a7",btnFilterColor:"#FFFFFF"}}}}),I=a("58ca");n["a"].config.productionTip=!1,n["a"].use(I["a"]),new n["a"]({router:F,store:E,vuetify:B,render:function(e){return e(u)}}).$mount("#app")},6210:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"d-flex flex-wrap justify-center"},e._l(e.data,(function(t){return a("v-card",{key:t.id,staticClass:"movie ma-4",attrs:{elevation:"4"}},[t.profile_path?a("v-img",{attrs:{src:"https://image.tmdb.org/t/p/w500"+t.profile_path}}):null==t.poster_path?a("v-img",{attrs:{src:"http://via.placeholder.com/1080x1580"}}):a("v-img",{attrs:{src:"https://image.tmdb.org/t/p/w500"+t.poster_path}}),a("div",{staticClass:"movie-info d-flex justify-space-between"},[t.title?a("v-card-title",{staticStyle:{"word-break":"normal"}},[e._v(e._s(t.title))]):e._e(),t.name?a("v-card-title",{staticStyle:{"word-break":"normal"}},[e._v(e._s(t.name))]):e._e(),t.vote_average>=7.5?a("v-avatar",{staticClass:"ma-2",attrs:{color:"green white--text"}},[e._v(e._s(t.vote_average.toFixed(1)))]):t.vote_average>=5?a("v-avatar",{staticClass:"ma-2",attrs:{color:"orange white--text"}},[e._v(e._s(t.vote_average.toFixed(1)))]):null==t.vote_average?a("v-avatar",{staticClass:"ma-2",attrs:{color:"accent white--text"}},[e._v("P")]):a("v-avatar",{staticClass:"ma-2",attrs:{color:"red white--text"}},[e._v(e._s(t.vote_average.toFixed(1)))])],1),a("v-card",{staticClass:"overview"},[t.release_date?a("v-card-subtitle",[a("strong",[e._v("Release Date:")]),e._v(" "+e._s(new Date(t.release_date).toLocaleDateString("nl-NL",{year:"numeric",month:"long",day:"numeric"})))]):e._e(),t.first_air_date?a("v-card-subtitle",[a("strong",[e._v("First Air Date:")]),e._v(" "+e._s(new Date(t.first_air_date).toLocaleDateString("nl-NL",{year:"numeric",month:"long",day:"numeric"})))]):e._e(),"person"==t.media_type?a("v-card-text",[e._v("Known for: "+e._s(t.known_for_department))]):e._e(),t.overview?a("v-card-text",[e._v(e._s(t.overview))]):e._e(),0==t.video?a("v-btn",{staticClass:"ml-2",attrs:{elevation:"0",color:"accent",to:"/movies/details/"+t.id}},[e._v("Know more")]):"person"==t.media_type?a("v-btn",{staticClass:"ml-2",attrs:{elevation:"0",color:"accent",to:"/people/"+t.id}},[e._v("Know more")]):a("v-btn",{staticClass:"ml-2",attrs:{elevation:"0",color:"accent",to:"/series/details/"+t.id}},[e._v("Know more")])],1)],1)})),1)},r=[],o={props:["data"]},i=o,c=a("2877"),s=a("6544"),l=a.n(s),u=a("8212"),d=a("8336"),h=a("b0af"),p=a("99d9"),m=a("adda"),v=Object(c["a"])(i,n,r,!1,null,null,null);t["a"]=v.exports;l()(v,{VAvatar:u["a"],VBtn:d["a"],VCard:h["a"],VCardSubtitle:p["a"],VCardText:p["b"],VCardTitle:p["c"],VImg:m["a"]})},"68c1":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app-bar",{attrs:{app:"",color:"secondary","clipped-left":""}},[a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,r=t.attrs;return[a("v-btn",e._g(e._b({staticClass:"white--text",attrs:{icon:"",to:"/movies/discover"}},"v-btn",r,!1),n),[a("v-icon",[e._v("mdi-movie-open")])],1)]}}])},[a("span",[e._v("Movies Discover")])]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,r=t.attrs;return[a("v-btn",e._g(e._b({staticClass:"white--text",attrs:{icon:"",to:"/series/discover"}},"v-btn",r,!1),n),[a("v-icon",[e._v("mdi-television-classic")])],1)]}}])},[a("span",[e._v("Series Discover")])]),a("v-spacer"),a("v-btn",{attrs:{plain:"",depressed:"",icon:"",to:"/"}},[a("v-img",{attrs:{alt:"Logo Anegy",contain:"",src:"/Anegy-logo.png",transition:"scale-transition",width:"40px",height:"40px"}})],1),a("v-spacer"),1==this.show?a("v-text-field",{ref:"textField",staticClass:"mt-6 shrink",attrs:{label:"Search",solo:"",rounded:"",dense:"",flat:""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}):e._e(),this.$route.path=="/movies/details/"+this.$route.params.id||this.$route.path=="/series/details/"+this.$route.params.id?a("v-btn",{staticClass:"white--text",attrs:{disabled:"",icon:""}},[a("v-icon")],1):a("v-btn",{staticClass:"white--text",attrs:{icon:""},on:{click:e.showSearch}},[a("v-icon",[e._v("fas fa-search")])],1),e.$vuetify.theme.dark?a("v-btn",{staticClass:"white--text",attrs:{icon:""},on:{click:e.darkMode}},[a("v-icon",[e._v("fas fa-sun")])],1):a("v-btn",{staticClass:"white--text",attrs:{icon:""},on:{click:e.darkMode}},[a("v-icon",[e._v("fas fa-moon")])],1)],1)},r=[],o=a("5530"),i=(a("d3b7"),a("25f0"),a("ac1f"),a("841c"),a("bc3a")),c=a.n(i),s=a("0135"),l=a.n(s),u=a("2f62"),d={name:"AppBar",props:["currentSearchPage"],data:function(){return{url:"/search/multi?",search:""}},computed:Object(o["a"])({},Object(u["c"])(["show"])),methods:Object(o["a"])(Object(o["a"])({},Object(u["b"])(["setShow"])),{},{openAccount:function(){this.$router.push({path:"/account"})},darkMode:function(){this.$vuetify.theme.dark=!this.$vuetify.theme.dark,localStorage.setItem("dark_theme",this.$vuetify.theme.dark.toString())},showSearch:function(){0==this.show?this.setShow(!0):this.setShow(!1)},getSearch:function(e,t,a){var n=this;c()({method:"post",url:"".concat(l.a.url,"/Library/Search.php"),data:{page:e,query:t,url:a}}).then((function(e){n.$emit("watched",e.data)})).catch((function(e){console.log(e)}))}}),watch:{search:function(e){this.search=e,"/movies/trending"!=this.$route.path&&"/movies/popular"!=this.$route.path&&"/movies/playing"!=this.$route.path&&"/movies/top-rated"!=this.$route.path&&"/movies/upcoming"!=this.$route.path&&"/movies/discover"!=this.$route.path||(this.url="/search/movie?"),"/series/trending"!=this.$route.path&&"/series/popular"!=this.$route.path&&"/series/playing"!=this.$route.path&&"/series/top-rated"!=this.$route.path&&"/series/upcoming"!=this.$route.path&&"/series/discover"!=this.$route.path||(this.url="/search/tv?"),"/"==this.$route.path&&(this.url="/search/multi?"),this.getSearch(this.currentSearchPage,this.search,this.url)},currentSearchPage:function(e){this.getSearch(e,this.search,this.url)}}},h=d,p=a("2877"),m=a("6544"),v=a.n(m),f=a("40dc"),g=a("8336"),b=a("132d"),y=a("adda"),_=a("2fa4"),w=a("8654"),S=a("3a2f"),A=Object(p["a"])(h,n,r,!1,null,null,null);t["a"]=A.exports;v()(A,{VAppBar:f["a"],VBtn:g["a"],VIcon:b["a"],VImg:y["a"],VSpacer:_["a"],VTextField:w["a"],VTooltip:S["a"]})},"836a":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{staticClass:"d-flex justify-center flex-row",staticStyle:{"border-radius":"0px"},attrs:{color:"secondary"}},[a("v-footer",{attrs:{color:"secondary"}},[a("v-card-text",{staticClass:"white--text"},[e._v(" ©"+e._s((new Date).getFullYear())+" — "),a("strong",[e._v("Anegy")]),a("v-img",{staticClass:"mt-2",attrs:{"max-width":"100px",src:"https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"}})],1)],1)],1)},r=[],o={},i=o,c=a("2877"),s=a("6544"),l=a.n(s),u=a("b0af"),d=a("99d9"),h=a("553a"),p=a("adda"),m=Object(c["a"])(i,n,r,!1,null,null,null);t["a"]=m.exports;l()(m,{VCard:u["a"],VCardText:d["b"],VFooter:h["a"],VImg:p["a"]})},d3b4:function(e,t,a){}});
//# sourceMappingURL=app.348bd188.js.map