<template>
<div>
<nav class="navbar navbar-expand-md navbar-dark bg-dark py-">
    <a href="/" class="navbar-brand py-0">Brandorium</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar7">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse collapse justify-content-stretch" id="navbar7">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link py-0" href="/">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link py-0" href="#">Admin</a>
            </li>
        </ul>
    </div>
</nav>

<div class="container-fluid">
 <table class="table table-hover text-center">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Available?</th>
      <th scope="col">Domains</th>
      <th scope="col">Social Sites</th>
      <th scope="col">Buy Domains</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for= "candidate in candidates" :key= "candidate">
      <td>{{ candidate.name }}</td>
      <td><i :style='{ "color" : (candidate.isAvailable? "green" : "orange") }' class="fa fa-check-circle fa-sm"></i></td>
      <td>
        <tr>
        <div>
          <span :style='{ "color" : (candidate.dotcom? "green" : "red") }' class="mr-2"><strong>.com</strong></span>
          <span :style='{ "color" : (candidate.dotnet? "green" : "red") }' class="mr-2"><strong>.net</strong></span>
          <span :style='{ "color" : (candidate.dotorg? "green" : "red") }' class="mr-2"><strong>.org</strong></span>
        </div>
        </tr>
        <tr>
        <div class="form-check form-check-inline mr-3 ml-3">
          <input :checked="candidate.dotcom" class="form-check-input" type="checkbox" disabled>
        </div>
        <div class="form-check form-check-inline ml-3">
          <input :checked="candidate.dotnet" class="form-check-input" type="checkbox" disabled>
        </div>
        <div class="form-check form-check-inline ml-2">
          <input :checked="candidate.dotorg" class="form-check-input" type="checkbox" disabled>
        </div>
        </tr>
      </td>
      <td>
        <tr>
        <div>
          <i :style='{ "color" : (candidate.facebook? "green" : "red") }' class="fa fa-facebook fa-xs mr-2"></i>
          <i :style='{ "color" : (candidate.twitter? "green" : "red") }' class="fa fa-twitter fa-xs mr-2"></i>
          <i :style='{ "color" : (candidate.instagram? "green" : "red") }' class="fa fa-instagram fa-xs mr-2"></i>
          <i :style='{ "color" : (candidate.google? "green" : "red") }' class="fa fa-google fa-xs mr-2"></i>
          <i :style='{ "color" : (candidate.youtube? "green" : "red") }' class="fa fa-youtube fa-xs mr-2"></i>
          <i :style='{ "color" : (candidate.slack? "green" : "red") }' class="fa fa-slack fa-xs mr-2"></i>
        </div>
        </tr>
        <tr>
        <div class="form-check form-check-inline mr-2">
          <input :checked="candidate.facebook" id="facebook" class="form-check-input" type="checkbox" disabled>
        </div>
        <div  class="form-check form-check-inline mr-2.5">
          <input :checked="candidate.twitter" id="twitter" class="form-check-input" type="checkbox" disabled>
        </div>
        <div class="form-check form-check-inline mr-2">
          <input :checked="candidate.instagram" id="instagram" class="form-check-input" type="checkbox" disabled>
        </div>
        <div class="form-check form-check-inline mr-2.5">
          <input :checked="candidate.google" id="google" class="form-check-input" type="checkbox" disabled>
        </div>
        <div class="form-check form-check-inline mr-2.5">
          <input :checked="candidate.youtube" id="youtube" class="form-check-input" type="checkbox" disabled>
        </div>
        <div class="form-check form-check-inline mr-1">
          <input :checked="candidate.slack" id="slack" class="form-check-input danger" type="checkbox" disabled>
        </div>
        </tr>
      </td>
      <td>
        <button class="btn btn-sm btn-secondary">Purchase</button>
        </td>
    </tr>
  </tbody>
</table> 
</div>
</div>
</template>

<script>
import { http } from "../config/http.js"

export default {
  data () {
    return {
      isAvailable: {color: 'red'},
      candidates: [],
      sortBy: 'isAvailable',
      sortDesc: false,
      fields: [
        { key: 'name', sortable: true },
        { key: 'isAvailable', sortable: true },
        { key: 'domains', sortable: true },
        { key: 'social_sites', sortable: true }
      ],
      
    }
  },
  methods: {
    load() {
      http
          .get("candidates", { headers: { 'Authorization': 'Bearer ' + localStorage.auth }})
          .then(response => {
            this.candidates = response.data.candidates
          })
          .catch(e => {
              this.errors.push(e);
          });
      }
    },
    checkAvailable() {

    },
  created() {
    this.load()
  }
}
</script>
<style scoped>

</style>


  

