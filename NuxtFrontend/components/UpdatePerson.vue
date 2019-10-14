<template>
  <b-container>
    <b-modal id="SaveEditPerson" title="Edit Person" hide-footer>
      <div>
        <b-form @submit="onUpdate">
          <b-form-group id="input-group-u2" label="First Name:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model.trim="$v.form.fname.$model"
              placeholder="Enter first name"
              :class="{'is-invalid':$v.form.fname.$error, 'is-valid':!$v.form.fname.$invalid}"
            ></b-form-input>
            <div class="valid-feedback">Your First Name is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.form.fname.required">First Name is required</span>
              <span
                v-if="!$v.form.fname.minLength"
              >First Name must have at least {{$v.form.fname.$params.minLength.min}} letters.</span>
            </div>
          </b-form-group>

          <b-form-group id="input-group-u3" label="Last Name:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model.trim="$v.form.lname.$model"
              placeholder="Enter last name"
              :class="{'is-invalid':$v.form.lname.$error, 'is-valid':!$v.form.lname.$invalid}"
            ></b-form-input>
            <div class="valid-feedback">Your Last Name is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.form.lname.required">Last Name is required</span>
              <span
                v-if="!$v.form.lname.minLength"
              >Last Name must have at least {{$v.form.lname.$params.minLength.min}} letters.</span>
            </div>
          </b-form-group>

          <b-form-group id="input-group-u4" label="Date Of Birth:" label-for="input-4">
            <b-form-input
              id="input-u4"
              v-model.trim="$v.form.date.$model"
              placeholder="Enter Date"
              type="date"
              :class="{'is-invalid':$v.form.date.$error, 'is-valid':!$v.form.date.$invalid}"
            ></b-form-input>
            <div class="valid-feedback">Your Date of Birth is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.form.date.required">Date of Birth is required</span>
            </div>
          </b-form-group>

          <b-form-group id="input-group-u5" label="Gender:">
            <b-form-radio-group
              id="gender-radio-group-u"
              v-model.trim="$v.form.gender.$model"
              :class="{'is-invalid':$v.form.gender.$error, 'is-valid':!$v.form.gender.$invalid}"
            >
              <b-form-radio name="some-radios" value="male">Male</b-form-radio>
              <b-form-radio name="some-radios" value="female">Female</b-form-radio>
            </b-form-radio-group>
            <div class="valid-feedback">Your Gender is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.form.gender.required">Gender is required</span>
            </div>
          </b-form-group>

          <b-form-group id="input-group-6u" label="Email:" label-for="input-6">
            <b-form-input
              id="input-6u"
              v-model.trim="$v.form.email.$model"
              type="email"
              placeholder="name@mail.com"
              :class="{'is-invalid':$v.form.email.$error, 'is-valid':!$v.form.email.$invalid}"
            ></b-form-input>
            <div class="valid-feedback">Your Email is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.form.email.required">Email is required</span>
            </div>
          </b-form-group>

          <b-form-group id="input-group-7u" label="Password:" label-for="password">
            <b-form-input
              id="password"
              v-model="$v.form.password.$model"
              placeholder="Enter password"
              required
              type="password"
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-checkbox
              id="showpassword"
              v-model="showpassword"
              @change="toggleShowPassword"
            >Show Password</b-form-checkbox>
          </b-form-group>

          <b-button type="submit" variant="primary" @click="$bvModal.hide('SaveEditPerson')">Update</b-button>
        </b-form>
      </div>
    </b-modal>
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
      password: "",
      showpassword: false
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
    },

    toggleShowPassword() {
      var show = document.getElementById("password");
      console.log(show);
      if (this.showpassword === false) {
        this.showpassword = true;
        show.type = "text";
      } else {
        this.showpassword = false;
        show.type = "password";
      }
    }
  },
  mounted() {
    // let details = this.itemDetails;
    // console.log("newItemDetails = ", details);
    // const selected = {
    //   _id: details._id,
    //   fname: details.fname,
    //   lname: details.lname,
    //   date: details.date,
    //   gender: details.gender,
    //   email: details.email,
    //   password: details.password
    // };
    // this.form = selected;
  },
  watch: {
    itemDetails: function() {
      (this.form._id = this.itemDetails._id),
        (this.form.fname = this.itemDetails.fname),
        (this.form.lname = this.itemDetails.lname),
        (this.form.date = this.itemDetails.date),
        (this.form.gender = this.itemDetails.gender),
        (this.form.email = this.itemDetails.email),
        (this.form.password = this.itemDetails.password);

      // this.form = itemDetails
      console.log("this.form", this.form);
      this.$bvModal.show("SaveEditPerson");
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