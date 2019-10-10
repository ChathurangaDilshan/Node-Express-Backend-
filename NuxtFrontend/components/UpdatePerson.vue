<template>
  <b-container>
    <div>
      <b-form @submit="onUpdate" v-if="show">
        <b-form-group id="input-group-u2" label="First Name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model.trim="form.fname"
            placeholder="Enter first name"
            :class="{ 'form-group--error': $v.form.fname.$error }"
          ></b-form-input>
          <div class="error" v-if="!$v.form.fname.required ">Field is required</div>
          <div
            class="error"
            v-if="!$v.form.fname.minLength"
          >Name must have at least {{$v.form.fname.$params.minLength.min}} letters.</div>
        </b-form-group>

        <b-form-group id="input-group-u3" label="Last Name:" label-for="input-3"  :class="{ 'form-group--error': $v.form.lname.$error }">
          <b-form-input id="input-3" v-model.trim="form.lname"  placeholder="Enter last name"></b-form-input>
        <div class="error" v-if="!$v.form.lname.required">Field is required</div>
          <div
            class="error"
            v-if="!$v.form.lname.minLength"
          >Name must have at least {{$v.form.lname.$params.minLength.min}} letters.</div>
       
        </b-form-group>

        <b-form-group id="input-group-u4" label="Date Of Birth:" label-for="input-4" :class="{ 'form-group--error': $v.form.date.$error }">
          <b-form-input
            id="input-u4"
            v-model.trim="form.date"
            placeholder="Enter Date"
            type="date"
          ></b-form-input>
          <div class="error" v-if="!$v.form.date.required">Field is required</div>
        
        </b-form-group>

        <b-form-group id="input-group-u5" label="Gender:"  :class="{ 'form-group--error': $v.form.gender.$error }">
          <b-form-radio-group id="gender-radio-group-u" v-model.trim="form.gender">
            <b-form-radio name="some-radios" value="male">Male</b-form-radio>
            <b-form-radio name="some-radios" value="female">Female</b-form-radio>
          </b-form-radio-group>
          <div class="error" v-if="!$v.form.gender.required">Field is required</div>
        </b-form-group>

        <b-form-group id="input-group-6u" label="Email:" label-for="input-6" :class="{ 'form-group--error': $v.form.email.$error }">
          <b-form-input
            id="input-6u"
            v-model.trim="form.email"
            type="email"
            placeholder="name@mail.com"
          ></b-form-input>
          <div class="error" v-if="!$v.form.email.required">Field is required</div>
        </b-form-group>

        <b-form-group id="input-group-7u" label="Password:" label-for="input-7" >
          <b-form-input
            id="input-7u"
            v-model="form.password"
            placeholder="Enter password"
            required
            type="password"
          ></b-form-input>
          
        </b-form-group>

        <b-button type="submit" variant="primary">Update</b-button>
      </b-form>
    </div>
  </b-container>
</template>



<script>
import { validationMixin } from "vuelidate";
import { between, required, minLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      show: true,
      form: {
        _id: "",
        // userId: "",
        fname: "",
        lname: "",
        date: "",
        gender: "",
        email: "",
        password: ""
      },
      fname: "",
      lname: "",
      date: "",
      gender: "",
      email: "",
      password: ""
    };
  },
  props: {
    itemDetails: {
      type: Object,
      required
    }
  },
  validations: {
    form: {
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
    }
  },
  methods: {
    onUpdate(evt) {
      evt.preventDefault();
      console.log("now in the edit method");

      const personUpdatedDetails = {
        _id: this.form._id,
        // userId: this.form.userId,
        firstName: this.form.fname,
        lastName: this.form.lname,
        dateOfBirth: this.form.date,
        gender: this.form.gender,
        email: this.form.email,
        password: this.form.password
      };

      return this.$axios
        .$patch("/persons/" + this.form._id, personUpdatedDetails)
        .then(console.log("Updated"))
        .catch(e => console.log(e));
    }
  },
  mounted() {
    let details = this.itemDetails;

    const selected = {
      _id: details._id,
      fname: details.fname,
      lname: details.lname,
      date: details.date,
      gender: details.gender,
      email: details.email,
      password: details.password
    };

    this.form = selected;
  }
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 1;
}
</style>