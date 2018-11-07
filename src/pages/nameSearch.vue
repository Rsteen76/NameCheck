<template>
  <div class="container-fluid h-100">
    
    <div class="text-center">
      <h2 class="animated bounceIn mt-4 mb-4">Brandorium</h2>
    </div>
    <div v-if="pageError" class="container-fluid text-center">
      <h1>There seems to be a problem with the service!</h1>
    </div>
    <div v-if="!pageError">
      <div class="row justify-content-center">
        <div class="col-xs">
          <input v-model="newIdea" type="text" class="form-control-lg mr-2 mb-2" @keyup.enter="nameCheck" :autofocus="focus"
            placeholder="">
        </div>
        <div class="col-xs">
          <button @click="nameCheck" class="btn btn-secondary btn-lg">Submit</button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-xs text-center ml-2 mr-2" style="height: 50px;">
          <transition-group name="list2" class="mt-2" enter-to-class="animated pulse" enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut" leave-class="animated fadeOut slower" leave-to-class="animated pulse slow">
            <h3 v-for="idea in ideas" :key="idea" class="list-item" style=" color: black">{{ idea }}</h3>
          </transition-group>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-4 text-center">
          <transition-group name="list2" class="mt-2" enter-to-class="animated pulse" enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut" leave-class="animated fadeOut slower" leave-to-class="animated pulse slow">
            <h3 v-for="goodIdea in goodIdeas" :key="goodIdea" class="list-item" style=" color: green">{{ goodIdea }}</h3>
          </transition-group>
        </div>
        <div class="col-4 text-center">
          <transition-group name="list2" class="mt-2" enter-to-class="animated pulse" enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut" leave-class="animated fadeOut slower" leave-to-class="animated pulse slow">
            <h3 v-for="maybeIdea in maybeIdeas" :key="maybeIdea" class="list-item" style=" color: orange">{{ maybeIdea
              }}</h3>
          </transition-group>
        </div>
        <div class="col-4 text-center">
          <transition-group name="list2" class="mt-2" enter-to-class="animated pulse" enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut" leave-class="animated fadeOut slower" leave-to-class="animated pulse slow">
            <h3 v-for="badIdea in badIdeas" :key="badIdea" class="list-item" style="color: red">{{ badIdea }}</h3>
          </transition-group>
        </div>
      </div>
    </div>
    <div v-if="!auth">
    <router-link style="z-index:10;" class="fixed-bottom nav-link" to='/login'>Login</router-link>
    </div>
    <div v-if="auth">
    <a style="z-index:10;" class="fixed-bottom nav-link" href="#" @click="logout">Logout</a>
    </div>
  </div>
</template>
<script>
import { http } from "@/config/http.js";

export default {
      data: () => ({
        auth: localStorage.auth,
        nameColor: 'red',
        pageError: false,
        ideas: [],
        goodIdeas: [],
        badIdeas: [],
        maybeIdeas: [],
        newIdea: "",
        focus: true,
      }),
      methods: {
        //Check to see if name is available
        nameCheck() {
          //Clean up user input and remove unwanted characters
          name = this.filteredIdea();
          //Push idea to array
          this.ideas.unshift(this.newIdea)
          //Clear input
          this.newIdea=""  
          //Send request to see what domains and social sites are available
          http 
          .post('/candidates/namecheck', {name: name})
          .then(response => {
            //Check response and change color if available
            console.log(response.data)
                if(response.data == "yes") {
                  console.log(this.ideas[0])
                  this.ideas.splice(0,1)
                  this.goodIdeas.unshift(name)
                  //Write to database
                  // this.submit(name)
                } else if(response.data == 'no') {
                  this.ideas.splice(0,1)
                  this.badIdeas.unshift(name)
                } else if(response.data == 'maybe'){
                  this.ideas.splice(0,1)
                  this.maybeIdeas.unshift(name)
                }
              })
          .catch(e => {
            console.log(e) 
            if('error'){
            this.pageError=true
            }
          })
        },
        //Write to database
        // submit(name) {
        //   console.log(name)
        //   axios.post('https://floating-shore-43899.herokuapp.com/candidates', {name: name})
        //     .then(response => {
        //       console.log(response.data)
        //     })
        //     .catch(e => {
        //       console.log("failed")
        //     })
        // },
        //Cleanup user input
        filteredIdea() {
          this.newIdea = this.newIdea.toLowerCase();
          this.newIdea = this.newIdea.replace(/\s/g,"")
          this.newIdea = this.newIdea.replace(/(\.com|\.net|\.org|\.info|\.coop|\.int|\.io)/g, '') 
          this.newIdea = this.newIdea.replace(/[.*+?^${}@;#!%&~`()|[\]\\]/g, '')
          return this.newIdea
        },
        logout() {
          localStorage.clear()
          this.$router.go({
            name: '/'
          })
        }
      }
    }
  </script>
  <style scoped>
    .list-item {
      z-index: -1;
    }
    .list-enter-active, .list-leave-active {
      transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: translateY(-30px);
    }
  </style>