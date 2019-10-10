<template>
  <b-container>
    <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-2"
          label="First Name:"
          label-for="input-2"
          :class="{ 'form-group--error': $v.fname.$error }"
        >
          <b-form-input
            id="input-2"
            v-model.trim="fname"
            placeholder="Enter first name"
            @input="setFname($event.target.value)"
            
          ></b-form-input>
          <div class="error" v-if="!$v.fname.required ">Field is required</div>
          <div
            class="error"
            v-if="!$v.fname.minLength"
          >Name must have at least {{$v.fname.$params.minLength.min}} letters.</div>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Last Name:"
          label-for="input-3"
          :class="{ 'form-group--error': $v.lname.$error }"
        >
          <b-form-input id="input-3" v-model.trim="$v.lname.$model" placeholder="Enter last name"></b-form-input>

          <div class="error" v-if="!$v.lname.required">Field is required</div>
          <div
            class="error"
            v-if="!$v.lname.minLength"
          >Name must have at least {{$v.lname.$params.minLength.min}} letters.</div>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Date Of Birth:"
          label-for="input-4"
          :class="{ 'form-group--error': $v.date.$error }"
        >
          <b-form-input
            id="input-4"
            v-model.trim="$v.date.$model"
            placeholder="Enter Date"
            type="date"
          ></b-form-input>
          <div class="error" v-if="!$v.date.required">Field is required</div>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Gender:"
          :class="{ 'form-group--error': $v.gender.$error }"
        >
          <b-form-radio-group id="gender-radio-group" v-model.trim="$v.gender.$model">
            <b-form-radio name="some-radios" value="male">Male</b-form-radio>
            <b-form-radio name="some-radios" value="female">Female</b-form-radio>
          </b-form-radio-group>
          <div class="error" v-if="!$v.gender.required">Field is required</div>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="Email:"
          label-for="input-6"
          :class="{ 'form-group--error': $v.email.$error }"
        >
          <b-form-input
            id="input-6"
            v-model.trim="$v.email.$model"
            type="email"
            placeholder="name@mail.com"
          ></b-form-input>
          <div class="error" v-if="!$v.email.required">Field is required</div>
        </b-form-group>

        <b-form-group
          id="input-group-7"
          label="Password:"
          label-for="input-7"
          :class="{ 'form-group--error': $v.password.$error }"
        >
          <b-form-input
            id="input-7"
            v-model.trim="$v.password.$model"
            placeholder="Enter password"
            type="password"
          ></b-form-input>
          <div class="error" v-if="!$v.password.required">Field is required</div>
          <div
            class="error"
            v-if="!$v.password.minLength"
          >Should be greater than {{$v.password.$params.minLength.min}}</div>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </b-container>
</template>



<script>
import { validationMixin } from "vuelidate";
import {
  between,
  required,
  minLength,
  email
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
        firstName: this.form.fname,
        lastName: this.form.lname,
        dateOfBirth: this.form.date,
        gender: this.form.gender,
        email: this.form.email,
        password: this.form.password
      };
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
      this.form.password = "";
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