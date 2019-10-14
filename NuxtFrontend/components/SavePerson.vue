<template>
  <b-container>
    <b-modal id="modal-prevent-closing" title="Add Person" hide-footer>
      <div>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group id="input-group-2" label="First Name:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model.trim="$v.fname.$model"
              :class="{'is-invalid':$v.fname.$error, 'is-valid':!$v.fname.$invalid}"
              placeholder="Enter first name"
            ></b-form-input>

            <div class="valid-feedback">Your First Name is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.fname.required">First Name is required</span>
              <span v-if="!$v.fname.minLength">First Name must have at least {{$v.fname.$params.minLength.min}} letters.</span>
            </div>
          </b-form-group>

          <b-form-group id="input-group-3" label="Last Name:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model.trim="$v.lname.$model"
              placeholder="Enter last name"
              :class="{'is-invalid':$v.lname.$error, 'is-valid':!$v.lname.$invalid}"
            ></b-form-input>

            <div class="valid-feedback">Your Last Name is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.lname.required">Last Name is required</span>
              <span v-if="!$v.lname.minLength">Last Name must have at least {{$v.lname.$params.minLength.min}} letters.</span>
            </div>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Date Of Birth:"
            label-for="input-4"
           
          >
            <b-form-input
              id="input-4"
              v-model.trim="$v.date.$model"
              placeholder="Enter Date"
              type="date"
               :class="{'is-invalid':$v.date.$error, 'is-valid':!$v.date.$invalid}"
            ></b-form-input>
                <div class="valid-feedback">Your Date of Birth is valid!</div>
                <div class="invalid-feedback">
                  <span v-if="!$v.date.required">Date of Birth is required</span>
                </div>
            
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Gender:"
          >
            <b-form-radio-group id="gender-radio-group" v-model.trim="$v.gender.$model" :class="{'is-invalid':$v.gender.$error, 'is-valid':!$v.gender.$invalid}">
              <b-form-radio name="some-radios" value="male">Male</b-form-radio>
              <b-form-radio name="some-radios" value="female">Female</b-form-radio>
            </b-form-radio-group>
                <div class="valid-feedback">Your Gender is valid!</div>
                <div class="invalid-feedback">
                  <span v-if="!$v.gender.required">Gender is required</span>
                </div>
          </b-form-group>

          <b-form-group
            id="input-group-6"
            label="Email:"
            label-for="input-6"
          >
            <b-form-input
              id="input-6"
              v-model.trim="$v.email.$model"
              type="email"
              placeholder="name@mail.com"
              :class="{'is-invalid':$v.email.$error, 'is-valid':!$v.email.$invalid}"
            ></b-form-input>
                <div class="valid-feedback">Your Email is valid!</div>
                <div class="invalid-feedback">
                  <span v-if="!$v.email.required">Email is required</span>
                </div>
          </b-form-group>

          

          <b-button
            type="submit"
            variant="primary"
            @click="$bvModal.hide('modal-prevent-closing')"
          >Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </b-modal>
  </b-container>
</template>



<script>
import { validationMixin } from "vuelidate";
import {
  between,
  required,
  minLength,
  email,
  dirty
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        // userId: "",
        fname: "",
        lname: "",
        date: "",
        gender: "",
        email: "",
        password: ""
      },
      show: true,
      fname: "",
      lname: "",
      date: "",
      gender: "",
      email: "",
      password: ""
    };
  },
  validations: {
    fname: {
      required,
      minLength: minLength(3)
    },
    lname: {
      required,
      minLength: minLength(3)
    },
    date: {
      required
    },
    gender: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      console.log("submit data");

      const personDetails = {
        // userId: this.form.userId,
        firstName: this.fname,
        lastName: this.lname,
        dateOfBirth: this.date,
        gender: this.gender,
        email: this.email
      };
      console.log("submitting details = ", personDetails);
      return this.$axios
        .$post("/persons", personDetails)
        .then(console.log("Saved"))
        .catch(e => console.log(e));

      this.show = false;
    },
    onEdit(selectedData) {
      console.log("now in the edit method");
      selectedData = this.props.selectedItem;
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      //   this.form.userId = "";
      this.form.fname = "";
      this.form.lname = "";
      this.form.email = "";
      this.form.date = "";
    },
    setFname(value) {
      this.fname = value;
      this.$v.fname.$touch();
    }
  }
};
</script>


<style scoped>
.error {
  color: red;
  font-size: 1;
}
</style>