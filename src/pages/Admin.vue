<template>
<div class="container-fluid">
 <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Is Available?</th>
      <th scope="col">Domains</th>
      <th scope="col">Social Sites</th>
      <th scope="col">Buy Domains</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for= "candidate in candidates" :key= "candidate">
      <td>{{ candidate.name }}</td>
      <td>{{ candidate.isAvailable }}</td>
      <td>
        <tr>
        <div>
          <i class="mr-2">.com</i>
          <i class="mr-2">.net</i>
          <i class="mr-2">.org</i>
        </div>
        </tr>
        <tr>
        <div class="form-check form-check-inline mr-3 ml-2">
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
          <i class="fa fa-facebook fa-xs mr-2"></i>
          <i class="fa fa-twitter fa-xs mr-2"></i>
          <i class="fa fa-instagram fa-xs mr-2"></i>
          <i class="fa fa-google fa-xs mr-2"></i>
          <i class="fa fa-youtube fa-xs mr-2"></i>
          <i class="fa fa-slack fa-xs mr-2"></i>
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

</template>

<script>
import { http } from "../config/http.js"

export default {
  data () {
    return {
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
input[type=checkbox]:disabled:checked + label {
  color: #f00 !important;
  font-style: normal;
} 
</style>


  

