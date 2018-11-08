<template>
<b-container>
  <b-form v-model="valid" ref="form" lazy-validation class="mt-5">
    <b-form-group label="Email address:">
    <b-form-input
      label="Email"
      v-model="user.email"
      :rules="emailRules"
      required
    ></b-form-input>
    </b-form-group>
    <b-form-group label="Password:">
    <b-form-input
      label="Password"
      v-model="user.password"
      type="password"
      required
    ></b-form-input>
    </b-form-group>
    <b-button
      @click="submit"
      :disabled="!valid"
    >
      submit
    </b-button>
    <b-button @click="onReset">clear</b-button>
  </b-form>
  </b-container>
</template>
<script>
import { http } from "@/config/http.js";

export default {
  data: () => ({
    valid: true,
    user: {
      email: "",
      password: ""
    },
    emailRules: [
      v => !!v || "E-mail is required",
      v => /\S+@\S+\.\S+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    submit() {
      http
        .post("/auth/login", this.user)
        .then(response => {
          console.log(response.data)
          localStorage.setItem("auth", response.data.token);
          localStorage.setItem("name", response.data.name);
          this.$swal("Great!", "You are ready to start!", "success");
          this.$router.push({ name: "admin" });
        })
        .catch(error => {
          console.log(error);
          const message = error.response.data.message;
          this.$swal("Oh oo!", `${message}`, "error");
          this.$router.push({ name: "login" });
        });
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.user.email = '';
      this.user.password = '';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
  }
}
}
</script>
