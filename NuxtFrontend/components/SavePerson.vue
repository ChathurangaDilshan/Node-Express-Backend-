<template>
  <b-container>
    
      <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    
          <b-form-group id="input-group-1" label="User ID:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.userId"
              type="text"
              required
              placeholder="Enter user id"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="First Name:" label-for="input-2">
            <b-form-input id="input-2" v-model="form.fname" required placeholder="Enter first name"></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Last Name:" label-for="input-3">
            <b-form-input id="input-3" v-model="form.lname" required placeholder="Enter last name"></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="Date Of Birth:" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="form.date"
              required
              placeholder="Enter Date"
              type="date"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-5" label="Gender:">
            <b-form-radio-group id="gender-radio-group" v-model="form.gender">
              <b-form-radio  name="some-radios" value="male"> Male </b-form-radio>
              <b-form-radio  name="some-radios" value="female"> Female </b-form-radio>
            </b-form-radio-group>
          </b-form-group>

          <b-form-group id="input-group-6" label="Email:" label-for="input-6">
            <b-form-input
              id="input-6"
              v-model="form.email"
              type="email"
              required
              placeholder="name@mail.com"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-7" label="Password:" label-for="input-7">
            <b-form-input
              id="input-7"
              v-model="form.password"
              required
              placeholder="Enter password"
              type="password"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    
  </b-container>
</template>



<script>
export default {
  data() {
    return {
      form: {
        userId:"",
        fname: "",
        lname:"",
        date:"",
        gender: "male",
        email: "",
        password:""        
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      console.log("submit data");
      
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.userId = "";
      this.form.fname = "";
      this.form.lname = "";
      this.form.email = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
