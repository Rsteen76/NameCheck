webpackJsonp([1],{"1/oy":function(t,e){},"9M+g":function(t,e){},GfHa:function(t,e){},Id91:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),n=a("e6fC"),i={render:function(){var t=this.$createElement;return(this._self._c||t)("router-view")},staticRenderFns:[]};var c=a("VU/8")({data:function(){return{name:"App"}}},i,!1,function(t){a("OmmR")},null,null).exports,o=a("/ocq"),r=a("mtWM"),l=a.n(r).a.create({baseURL:"https://brandorium.herokuapp.com/api"}),d={data:function(){return{auth:localStorage.auth,nameColor:"red",pageError:!1,ideas:[],goodIdeas:[],badIdeas:[],maybeIdeas:[],newIdea:"",focus:!0}},methods:{nameCheck:function(){var t=this;name=this.filteredIdea(),this.ideas.unshift(this.newIdea),this.newIdea="",l.post("/candidates/namecheck",{name:name}).then(function(e){console.log(e.data),"yes"==e.data?(console.log(t.ideas[0]),t.ideas.splice(0,1),t.goodIdeas.unshift(name)):"no"==e.data?(t.ideas.splice(0,1),t.badIdeas.unshift(name)):"maybe"==e.data&&(t.ideas.splice(0,1),t.maybeIdeas.unshift(name))}).catch(function(e){console.log(e),t.pageError=!0})},filteredIdea:function(){return this.newIdea=this.newIdea.toLowerCase(),this.newIdea=this.newIdea.replace(/\s/g,""),this.newIdea=this.newIdea.replace(/(\.com|\.net|\.org|\.info|\.coop|\.int|\.io)/g,""),this.newIdea=this.newIdea.replace(/[.*+?^${}@;#!%&~`()|[\]\\]/g,""),this.newIdea},logout:function(){localStorage.clear(),this.$router.go({name:"/"})}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid h-100"},[t._m(0),t._v(" "),t.pageError?a("div",{staticClass:"container-fluid text-center"},[a("h1",[t._v("There seems to be a problem with the service!")])]):t._e(),t._v(" "),t.pageError?t._e():a("div",[a("div",{staticClass:"row justify-content-center"},[a("div",{staticClass:"col-xs"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.newIdea,expression:"newIdea"}],staticClass:"form-control-lg mr-2 mb-2",attrs:{type:"text",autofocus:t.focus,placeholder:""},domProps:{value:t.newIdea},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.nameCheck(e):null},input:function(e){e.target.composing||(t.newIdea=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"col-xs"},[a("button",{staticClass:"btn btn-secondary btn-lg",on:{click:t.nameCheck}},[t._v("Submit")])])]),t._v(" "),a("div",{staticClass:"row justify-content-center"},[a("div",{staticClass:"col-xs text-center ml-2 mr-2",staticStyle:{height:"50px"}},[a("transition-group",{staticClass:"mt-2",attrs:{name:"list2","enter-to-class":"animated pulse","enter-active-class":"animated zoomIn","leave-active-class":"animated zoomOut","leave-class":"animated fadeOut slower","leave-to-class":"animated pulse slow"}},t._l(t.ideas,function(e){return a("h3",{key:e,staticClass:"list-item",staticStyle:{color:"black"}},[t._v(t._s(e))])}))],1)]),t._v(" "),a("div",{staticClass:"row justify-content-center"},[a("div",{staticClass:"col-4 text-center"},[a("transition-group",{staticClass:"mt-2",attrs:{name:"list2","enter-to-class":"animated pulse","enter-active-class":"animated zoomIn","leave-active-class":"animated zoomOut","leave-class":"animated fadeOut slower","leave-to-class":"animated pulse slow"}},t._l(t.goodIdeas,function(e){return a("h3",{key:e,staticClass:"list-item",staticStyle:{color:"green"}},[t._v(t._s(e))])}))],1),t._v(" "),a("div",{staticClass:"col-4 text-center"},[a("transition-group",{staticClass:"mt-2",attrs:{name:"list2","enter-to-class":"animated pulse","enter-active-class":"animated zoomIn","leave-active-class":"animated zoomOut","leave-class":"animated fadeOut slower","leave-to-class":"animated pulse slow"}},t._l(t.maybeIdeas,function(e){return a("h3",{key:e,staticClass:"list-item",staticStyle:{color:"orange"}},[t._v(t._s(e))])}))],1),t._v(" "),a("div",{staticClass:"col-4 text-center"},[a("transition-group",{staticClass:"mt-2",attrs:{name:"list2","enter-to-class":"animated pulse","enter-active-class":"animated zoomIn","leave-active-class":"animated zoomOut","leave-class":"animated fadeOut slower","leave-to-class":"animated pulse slow"}},t._l(t.badIdeas,function(e){return a("h3",{key:e,staticClass:"list-item",staticStyle:{color:"red"}},[t._v(t._s(e))])}))],1)])]),t._v(" "),t.auth?t._e():a("div",[a("router-link",{staticClass:"fixed-bottom nav-link",staticStyle:{"z-index":"10"},attrs:{to:"/login"}},[t._v("Login")])],1),t._v(" "),t.auth?a("div",{staticClass:"fixed-bottom"},[a("a",{staticClass:"nav-link d-inline",staticStyle:{"z-index":"10"},attrs:{href:"#"},on:{click:t.logout}},[t._v("Logout")]),t._v(" "),a("a",{staticClass:"nav-link d-inline",staticStyle:{"z-index":"10"},attrs:{href:"#",to:"/admin"}},[a("router-link",{attrs:{to:"/admin"}},[t._v("Admin")])],1)]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"text-center"},[e("h2",{staticClass:"animated bounceIn mt-4 mb-4"},[this._v("Brandaur")])])}]};var m=a("VU/8")(d,u,!1,function(t){a("Wuzb")},"data-v-1918cc77",null).exports,v={data:function(){return{valid:!0,user:{email:"",password:""},emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/\S+@\S+\.\S+/.test(t)||"E-mail must be valid"}]}},methods:{submit:function(){var t=this;l.post("/auth/login",this.user).then(function(e){console.log(e.data),localStorage.setItem("auth",e.data.token),localStorage.setItem("name",e.data.name),t.$swal("Great!","You are ready to start!","success"),t.$router.push({name:"admin"})}).catch(function(e){console.log(e);var a=e.response.data.message;t.$swal("Oh oo!",""+a,"error"),t.$router.push({name:"login"})})},onReset:function(t){var e=this;t.preventDefault(),this.user.email="",this.user.password="",this.show=!1,this.$nextTick(function(){e.show=!0})}}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",[a("b-form",{ref:"form",staticClass:"mt-5",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[a("b-form-group",{attrs:{label:"Email address:"}},[a("b-form-input",{attrs:{label:"Email",rules:t.emailRules,required:""},model:{value:t.user.email,callback:function(e){t.$set(t.user,"email",e)},expression:"user.email"}})],1),t._v(" "),a("b-form-group",{attrs:{label:"Password:"}},[a("b-form-input",{attrs:{label:"Password",type:"password",required:""},model:{value:t.user.password,callback:function(e){t.$set(t.user,"password",e)},expression:"user.password"}})],1),t._v(" "),a("b-button",{attrs:{disabled:!t.valid},on:{click:t.submit}},[t._v("\n      submit\n    ")]),t._v(" "),a("b-button",{on:{click:t.onReset}},[t._v("clear")])],1)],1)},staticRenderFns:[]},h=a("VU/8")(v,f,!1,null,null,null).exports,p={data:function(){return{isAvailable:{color:"red"},candidates:[],sortBy:"isAvailable",sortDesc:!1,fields:[{key:"name",sortable:!0},{key:"isAvailable",sortable:!0},{key:"domains",sortable:!0},{key:"social_sites",sortable:!0}]}},methods:{load:function(){var t=this;l.get("candidates",{headers:{Authorization:"Bearer "+localStorage.auth}}).then(function(e){t.candidates=e.data.candidates}).catch(function(e){t.errors.push(e)})},deleteName:function(t){var e=this;this.$swal({text:"Are you sure you want to delete the name?",type:"warning",showCancelButton:"true"}).then(function(a){a.value&&(l.delete("/candidates/"+t,{headers:{Authorization:"Bearer "+localStorage.auth}}).then(function(t){console.log("Name Deleted")}).catch(function(t){e.$swal({type:"error",text:"Sorry, "+t})}),e.$router.go({name:"/admin"}))})},logout:function(){localStorage.clear(),console.log("Logging Out"),this.$router.go({name:"nameSearch"})}},created:function(){this.load()}},b={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("nav",{staticClass:"navbar navbar-expand-lg navbar-dark bg-dark py-"},[a("a",{staticClass:"navbar-brand",attrs:{href:"/"}},[t._v("Brandaur")]),t._v(" "),t._m(0),t._v(" "),a("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarSupportedContent"}},[a("ul",{staticClass:"navbar-nav ml-auto"},[t._m(1),t._v(" "),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"},on:{click:t.logout}},[t._v("Logout")])])])])]),t._v(" "),a("div",{staticClass:"container-fluid"},[a("b-modal",{attrs:{id:"modal1",title:"Delete Item","ok-variant":"danger"}},[a("div",{attrs:{slot:"modal-ok"},slot:"modal-ok"},[t._v("Delete")]),t._v(" "),a("p",{staticClass:"my-4"},[t._v("Are you sure you want to delet this name?")])]),t._v(" "),a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table table-sm table-hover text-center"},[t._m(2),t._v(" "),a("tbody",t._l(t.candidates,function(e){return a("tr",{key:e},[a("td",{staticClass:"align-middle"},[t._v(t._s(e.name))]),t._v(" "),a("td",{staticClass:"align-middle text-center"},[a("i",{staticClass:"fa fa-check-circle fa-sm",style:{color:e.isAvailable?"green":"orange"}})]),t._v(" "),a("td",{staticClass:"force-center"},[a("tr",[a("span",{staticClass:"mr-3",style:{color:e.dotcom?"green":"red"}},[a("strong",[t._v(".com")])]),t._v(" "),a("span",{staticClass:"mr-3",style:{color:e.dotnet?"green":"red"}},[a("strong",[t._v(".net")])]),t._v(" "),a("span",{staticClass:"mr-2",style:{color:e.dotorg?"green":"red"}},[a("strong",[t._v(".org")])])]),t._v(" "),a("tr",[a("div",{staticClass:"form-check form-check-inline mr-3 ml-3"},[a("input",{staticClass:"form-check-input",attrs:{type:"checkbox",disabled:""},domProps:{checked:e.dotcom}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline ml-3"},[a("input",{staticClass:"form-check-input",attrs:{type:"checkbox",disabled:""},domProps:{checked:e.dotnet}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline ml-3"},[a("input",{staticClass:"form-check-input",attrs:{type:"checkbox",disabled:""},domProps:{checked:e.dotorg}})])])]),t._v(" "),a("td",{staticClass:"force-center"},[a("tr",[a("div",{staticClass:"form-check form-check-inline spacer text-center"},[a("i",{staticClass:"fab fa-facebook fa-xs",style:{color:e.facebook?"green":"red"}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline spacer text-center"},[a("i",{staticClass:"fab fa-twitter fa-xs",style:{color:e.twitter?"green":"red"}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline spacer text-center"},[a("i",{staticClass:"fab fa-instagram fa-xs",style:{color:e.instagram?"green":"red"}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline spacer  text-center"},[a("i",{staticClass:"fab fa-google fa-xs",style:{color:e.google?"green":"red"}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline spacer  text-center"},[a("i",{staticClass:"fab fa-youtube fa-xs text-center",style:{color:e.youtube?"green":"red"}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline spacer  text-center"},[a("i",{staticClass:"fab fa-slack fa-xs text-center",style:{color:e.slack?"green":"red"}})])]),t._v(" "),a("tr",[a("div",{staticClass:"checks form-check form-check-inline spacer"},[a("input",{staticClass:"form-check-input",attrs:{id:"facebook",type:"checkbox",disabled:""},domProps:{checked:e.facebook}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline spacer"},[a("input",{staticClass:"form-check-input",attrs:{id:"twitter",type:"checkbox",disabled:""},domProps:{checked:e.twitter}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline spacer"},[a("input",{staticClass:"form-check-input",attrs:{id:"instagram",type:"checkbox",disabled:""},domProps:{checked:e.instagram}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline spacer"},[a("input",{staticClass:"form-check-input",attrs:{id:"google",type:"checkbox",disabled:""},domProps:{checked:e.google}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline spacer"},[a("input",{staticClass:"form-check-input",attrs:{id:"youtube",type:"checkbox",disabled:""},domProps:{checked:e.youtube}})]),t._v(" "),a("div",{staticClass:"form-check form-check-inline spacer"},[a("input",{staticClass:"form-check-input",attrs:{id:"slack",type:"checkbox",disabled:""},domProps:{checked:e.slack}})])])]),t._v(" "),a("td",{staticClass:"align-middle text-center"},[a("div",[a("i",{staticClass:"fa fa-dollar-sign mr-3"}),t._v(" "),a("i",{staticClass:"fa fa-trash",staticStyle:{color:"red"},on:{click:function(a){t.deleteName(e._id)}}})])])])}))])])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[e("span",{staticClass:"navbar-toggler-icon"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticClass:"nav-item active"},[e("a",{staticClass:"nav-link",attrs:{href:"/"}},[this._v("Home"),e("span",{staticClass:"sr-only"},[this._v("(current)")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("Name")]),t._v(" "),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Available?")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("Domains")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("Social Sites")]),t._v(" "),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Actions")])])])}]};var _=a("VU/8")(p,b,!1,function(t){a("YNsZ")},"data-v-00f03ff1",null).exports;s.a.use(o.a);var k=new o.a({routes:[{path:"/",name:"nameSearch",component:m},{path:"/login",name:"login",component:h},{path:"/admin",name:"admin",component:_}]}),g=a("oYt9");a("qb6w"),a("9M+g");s.a.use(n.a),s.a.use(g.a),s.a.config.productionTip=!1,new s.a({el:"#app",router:k,components:{App:c},template:"<App/>"})},OmmR:function(t,e){},UdIB:function(t,e){},Wuzb:function(t,e){},YNsZ:function(t,e){},qb6w:function(t,e){},zj2Q:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.62d06591d2f26338cafb.js.map