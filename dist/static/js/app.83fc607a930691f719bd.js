webpackJsonp([1],{"1/oy":function(t,e){},"9M+g":function(t,e){},AF7v:function(t,e){},AeCS:function(t,e){},GfHa:function(t,e){},Id91:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),i=a("e6fC"),n={render:function(){var t=this.$createElement;return(this._self._c||t)("router-view")},staticRenderFns:[]};var c=a("VU/8")({data:function(){return{name:"App"}}},n,!1,function(t){a("AF7v")},null,null).exports,o=a("/ocq"),r=a("mtWM"),l=a.n(r),d={data:function(){return{nameColor:"red",pageError:!1,ideas:[],goodIdeas:[],badIdeas:[],maybeIdeas:[],newIdea:"",focus:!0}},methods:{nameCheck:function(){var t=this;name=this.filteredIdea(),this.ideas.unshift(this.newIdea),this.newIdea="",http.post("/api/candidates/namecheck",{name:name}).then(function(e){console.log(e.data),"yes"==e.data?(console.log(t.ideas[0]),t.ideas.splice(0,1),t.goodIdeas.unshift(name)):"no"==e.data?(t.ideas.splice(0,1),t.badIdeas.unshift(name)):"maybe"==e.data&&(t.ideas.splice(0,1),t.maybeIdeas.unshift(name))}).catch(function(e){console.log(e),t.pageError=!0})},filteredIdea:function(){return this.newIdea=this.newIdea.toLowerCase(),this.newIdea=this.newIdea.replace(/\s/g,""),this.newIdea=this.newIdea.replace(/(\.com|\.net|\.org|\.info|\.coop|\.int|\.io)/g,""),this.newIdea=this.newIdea.replace(/[.*+?^${}@;#!%&~`()|[\]\\]/g,""),this.newIdea}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid h-100"},[t._m(0),t._v(" "),t.pageError?a("div",{staticClass:"container-fluid text-center"},[a("h1",[t._v("There seems to be a problem with the service!")])]):t._e(),t._v(" "),t.pageError?t._e():a("div",[a("div",{staticClass:"row justify-content-center"},[a("div",{staticClass:"col-xs"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.newIdea,expression:"newIdea"}],staticClass:"form-control-lg mr-2 mb-2",attrs:{type:"text",autofocus:t.focus,placeholder:""},domProps:{value:t.newIdea},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.nameCheck(e):null},input:function(e){e.target.composing||(t.newIdea=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"col-xs"},[a("button",{staticClass:"btn btn-secondary btn-lg",on:{click:t.nameCheck}},[t._v("Submit")])])]),t._v(" "),a("div",{staticClass:"row justify-content-center"},[a("div",{staticClass:"col-xs text-center ml-2 mr-2",staticStyle:{height:"50px"}},[a("transition-group",{staticClass:"mt-2",attrs:{name:"list2","enter-to-class":"animated pulse","enter-active-class":"animated zoomIn","leave-active-class":"animated zoomOut","leave-class":"animated fadeOut slower","leave-to-class":"animated pulse slow"}},t._l(t.ideas,function(e){return a("h3",{key:e,staticClass:"list-item",staticStyle:{color:"black"}},[t._v(t._s(e))])}))],1)]),t._v(" "),a("div",{staticClass:"row justify-content-center"},[a("div",{staticClass:"col-4 text-center"},[a("transition-group",{staticClass:"mt-2",attrs:{name:"list2","enter-to-class":"animated pulse","enter-active-class":"animated zoomIn","leave-active-class":"animated zoomOut","leave-class":"animated fadeOut slower","leave-to-class":"animated pulse slow"}},t._l(t.goodIdeas,function(e){return a("h3",{key:e,staticClass:"list-item",staticStyle:{color:"green"}},[t._v(t._s(e))])}))],1),t._v(" "),a("div",{staticClass:"col-4 text-center"},[a("transition-group",{staticClass:"mt-2",attrs:{name:"list2","enter-to-class":"animated pulse","enter-active-class":"animated zoomIn","leave-active-class":"animated zoomOut","leave-class":"animated fadeOut slower","leave-to-class":"animated pulse slow"}},t._l(t.maybeIdeas,function(e){return a("h3",{key:e,staticClass:"list-item",staticStyle:{color:"orange"}},[t._v(t._s(e))])}))],1),t._v(" "),a("div",{staticClass:"col-4 text-center"},[a("transition-group",{staticClass:"mt-2",attrs:{name:"list2","enter-to-class":"animated pulse","enter-active-class":"animated zoomIn","leave-active-class":"animated zoomOut","leave-class":"animated fadeOut slower","leave-to-class":"animated pulse slow"}},t._l(t.badIdeas,function(e){return a("h3",{key:e,staticClass:"list-item",staticStyle:{color:"red"}},[t._v(t._s(e))])}))],1)])]),t._v(" "),a("router-link",{staticClass:"fixed-bottom nav-link",staticStyle:{"z-index":"10"},attrs:{to:"/login"}},[t._v("Login")])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"text-center"},[e("h2",{staticClass:"animated bounceIn mt-4 mb-4"},[this._v("Brandorium")])])}]};var u=a("VU/8")(d,m,!1,function(t){a("AeCS")},"data-v-8e1e2b80",null).exports,v=l.a.create({baseURL:"http://localhost:8080/api"}),h={data:function(){return{valid:!0,user:{email:"",password:""},emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/\S+@\S+\.\S+/.test(t)||"E-mail must be valid"}]}},methods:{submit:function(){var t=this;v.post("/auth/login",this.user).then(function(e){console.log(e.data),localStorage.setItem("auth",e.data.token),localStorage.setItem("name",e.data.name),t.$swal("Great!","You are ready to start!","success"),t.$router.push({name:"admin"})}).catch(function(e){console.log(e);var a=e.response.data.message;t.$swal("Oh oo!",""+a,"error"),t.$router.push({name:"login"})})},onReset:function(t){var e=this;t.preventDefault(),this.user.email="",this.user.password="",this.show=!1,this.$nextTick(function(){e.show=!0})}}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",[a("b-form",{ref:"form",staticClass:"mt-5",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[a("b-form-group",{attrs:{label:"Email address:"}},[a("b-form-input",{attrs:{label:"Email",rules:t.emailRules,required:""},model:{value:t.user.email,callback:function(e){t.$set(t.user,"email",e)},expression:"user.email"}})],1),t._v(" "),a("b-form-group",{attrs:{label:"Password:"}},[a("b-form-input",{attrs:{label:"Password",required:""},model:{value:t.user.password,callback:function(e){t.$set(t.user,"password",e)},expression:"user.password"}})],1),t._v(" "),a("b-button",{attrs:{disabled:!t.valid},on:{click:t.submit}},[t._v("\n      submit\n    ")]),t._v(" "),a("b-button",{on:{click:t.onReset}},[t._v("clear")])],1)],1)},staticRenderFns:[]},p=a("VU/8")(h,f,!1,null,null,null).exports,_={data:function(){return{candidates:[],sortBy:"isAvailable",sortDesc:!1,fields:[{key:"name",sortable:!0},{key:"isAvailable",sortable:!0},{key:"domains",sortable:!0},{key:"social_sites",sortable:!0}]}},methods:{load:function(){var t=this;v.get("candidates").then(function(e){t.candidates=e.data.candidates}).catch(function(e){t.errors.push(e)})}},checkAvailable:function(){},created:function(){this.load()}},b={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid"},[a("table",{staticClass:"table table-hover"},[t._m(0),t._v(" "),a("tbody",t._l(t.candidates,function(e){return a("tr",{key:e},[a("td",[t._v(t._s(e.name))]),t._v(" "),a("td",[t._v(t._s(e.isAvailable))]),t._v(" "),a("td",[t._m(1,!0),t._v(" "),a("tr",[a("div",{staticClass:"form-check form-check-inline mr-3 ml-2"},[a("input",{staticClass:"form-check-input",attrs:{type:"checkbox",disabled:""},domProps:{checked:e.dotcom}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline ml-3"},[a("input",{staticClass:"form-check-input",attrs:{type:"checkbox",disabled:""},domProps:{checked:e.dotnet}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline ml-2"},[a("input",{staticClass:"form-check-input",attrs:{type:"checkbox",disabled:""},domProps:{checked:e.dotorg}})])])]),t._v(" "),a("td",[t._m(2,!0),t._v(" "),a("tr",[a("div",{staticClass:"form-check form-check-inline mr-2"},[a("input",{staticClass:"form-check-input",attrs:{id:"facebook",type:"checkbox",disabled:""},domProps:{checked:e.facebook}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline mr-2.5"},[a("input",{staticClass:"form-check-input",attrs:{id:"twitter",type:"checkbox",disabled:""},domProps:{checked:e.twitter}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline mr-2"},[a("input",{staticClass:"form-check-input",attrs:{id:"instagram",type:"checkbox",disabled:""},domProps:{checked:e.instagram}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline mr-2.5"},[a("input",{staticClass:"form-check-input",attrs:{id:"google",type:"checkbox",disabled:""},domProps:{checked:e.google}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline mr-2.5"},[a("input",{staticClass:"form-check-input",attrs:{id:"youtube",type:"checkbox",disabled:""},domProps:{checked:e.youtube}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline mr-1"},[a("input",{staticClass:"reg-check form-check-input",attrs:{id:"slack",type:"checkbox",disabled:""},domProps:{checked:e.slack}})])])]),t._v(" "),t._m(3,!0)])}))])])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("Name")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("Is Available?")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("Domains")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("Social Sites")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("Buy Domains")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("div",[e("i",{staticClass:"mr-2"},[this._v(".com")]),this._v(" "),e("i",{staticClass:"mr-2"},[this._v(".net")]),this._v(" "),e("i",{staticClass:"mr-2"},[this._v(".org")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("div",[e("i",{staticClass:"fa fa-facebook fa-xs mr-2"}),this._v(" "),e("i",{staticClass:"fa fa-twitter fa-xs mr-2"}),this._v(" "),e("i",{staticClass:"fa fa-instagram fa-xs mr-2"}),this._v(" "),e("i",{staticClass:"fa fa-google fa-xs mr-2"}),this._v(" "),e("i",{staticClass:"fa fa-youtube fa-xs mr-2"}),this._v(" "),e("i",{staticClass:"fa fa-slack fa-xs mr-2"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("button",{staticClass:"btn btn-sm btn-secondary"},[this._v("Purchase")])])}]};var k=a("VU/8")(_,b,!1,function(t){a("wtUj")},"data-v-25b5707d",null).exports;s.a.use(o.a);var C=new o.a({routes:[{path:"/",name:"nameSearch",component:u},{path:"/login",name:"login",component:p},{path:"/admin",name:"admin",component:k}]}),g=a("nUxp"),w=a.n(g);a("qb6w"),a("9M+g");s.a.use(i.a),s.a.use(w.a),s.a.config.productionTip=!1,new s.a({el:"#app",router:C,components:{App:c},template:"<App/>"})},qb6w:function(t,e){},wtUj:function(t,e){},zj2Q:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.83fc607a930691f719bd.js.map