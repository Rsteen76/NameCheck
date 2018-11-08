<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-">
      <a href="/" class="navbar-brand">Brandaur</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

        <span class="navbar-toggler-icon"></span>
      </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">Home<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container-fluid">
      <b-modal id="modal1" title="Delete Item" ok-variant="danger">
        <div slot="modal-ok">Delete</div>
        <p class="my-4">Are you sure you want to delet this name?</p>
      </b-modal>
      <div class="table-responsive">
      <table class="table table-sm table-hover text-center">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th class="text-center" scope="col">Available?</th>
            <th scope="col">Domains</th>
            <th scope="col">Social Sites</th>
            <th class="text-center" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="candidate in candidates" :key="candidate">
            <td class="align-middle">{{ candidate.name }}</td>
            <td class="align-middle text-center"><i :style='{ "color" : (candidate.isAvailable? "green" : "orange") }' class="fa fa-check-circle fa-sm"></i></td>
            <td style="text-align: -webkit-center; text-align: -moz-center;">
            <tr>
                <span :style='{ "color" : (candidate.dotcom? "green" : "red") }' class="mr-3"><strong>.com</strong></span>
                <span :style='{ "color" : (candidate.dotnet? "green" : "red") }' class="mr-3"><strong>.net</strong></span>
                <span :style='{ "color" : (candidate.dotorg? "green" : "red") }' class="mr-2"><strong>.org</strong></span>
            </tr>
            <tr>
              <div class="form-check form-check-inline mr-3 ml-3">
                <input :checked="candidate.dotcom" class="form-check-input" type="checkbox" disabled>
              </div>
              <div class="form-check form-check-inline ml-3">
                <input :checked="candidate.dotnet" class="form-check-input" type="checkbox" disabled>
              </div>
              <div class="form-check form-check-inline ml-3">
                <input :checked="candidate.dotorg" class="form-check-input" type="checkbox" disabled>
              </div>
            </tr>
          </td>
          <td style="text-align: -webkit-center; text-align: -moz-center;">
            <tr>
              <div class="form-check form-check-inline spacer text-center">
                <i :style='{ "color" : (candidate.facebook? "green" : "red") }' class="fab fa-facebook fa-xs"></i>
              </div>
               <div class="form-check form-check-inline spacer text-center"> <i :style='{ "color" : (candidate.twitter? "green" : "red") }' class="fab fa-twitter fa-xs"></i>
              </div>
               <div class="form-check form-check-inline spacer text-center"> <i :style='{ "color" : (candidate.instagram? "green" : "red") }' class="fab fa-instagram fa-xs"></i>
              </div>
              <div class="form-check form-check-inline spacer  text-center">  <i :style='{ "color" : (candidate.google? "green" : "red") }' class="fab fa-google fa-xs"></i>
              </div>
              <div class="form-check form-check-inline spacer  text-center">  <i :style='{ "color" : (candidate.youtube? "green" : "red") }' class="fab fa-youtube fa-xs text-center"></i>
              </div>
              <div class="form-check form-check-inline spacer  text-center">  <i :style='{ "color" : (candidate.slack? "green" : "red") }' class="fab fa-slack fa-xs text-center"></i>
              </div>
             </tr>
            <tr>
              <div class="checks form-check form-check-inline spacer">
                <input :checked="candidate.facebook" id="facebook" class="form-check-input" type="checkbox" disabled>
              </div>
              <div class="form-check form-check-inline spacer">
                <input :checked="candidate.twitter" id="twitter" class="form-check-input" type="checkbox" disabled>
              </div>
              <div class="form-check form-check-inline spacer">
                <input :checked="candidate.instagram" id="instagram" class="form-check-input" type="checkbox" disabled>
              </div>
              <div class="form-check form-check-inline spacer">
                <input :checked="candidate.google" id="google" class="form-check-input" type="checkbox" disabled>
              </div>
              <div class="form-check form-check-inline spacer">
                <input :checked="candidate.youtube" id="youtube" class="form-check-input" type="checkbox" disabled>
              </div>
              <div class="form-check form-check-inline spacer">
                <input :checked="candidate.slack" id="slack" class="form-check-input" type="checkbox" disabled>
              </div>
            </tr>
          </td>
          <td class="align-middle text-center">
              <div>
                <i class="fa fa-dollar-sign mr-3"></i>
                <i @click="deleteName(candidate._id)" class="fa fa-trash" style="color: red;"></i>
              </div>
          </td>
          </tr>
        </tbody>
      </table>
      </div>
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
      },
    deleteName(id) {
      this.$swal({
        text: 'Are you sure you want to delete the name?',
        type: 'warning',
        showCancelButton: 'true'
      }) .then((result) => {
        if(result.value) {
          http
          .delete("/candidates/" + id, { headers: { 'Authorization': 'Bearer ' + localStorage.auth }})
          .then(response => {
             console.log('Name Deleted')
          })
          .catch(e => {
            this.$swal({
              type: 'error',
              text: `Sorry, ${e}`})
          })
      this.$router.go({
        name: '/admin'
        })
        }
      })
    },
    logout() {
      localStorage.clear()
      console.log("Logging Out")
      this.$router.go({
        name: 'nameSearch'
      })
    },
  },
  created() {
  this.load()
  }
}
</script>
<style scoped>
.fa-trash {
  cursor: pointer;
}
.fa-dollar-sign {
  cursor: pointer;
}
.spacer {
  width: 15px;
}


</style>


  

