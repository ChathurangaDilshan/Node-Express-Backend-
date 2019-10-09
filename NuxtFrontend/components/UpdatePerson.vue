<template>
  <b-container>
    <div>
      <b-form @submit="onUpdate" v-if="show">


        <b-form-group id="input-group-u2" label="First Name:" label-for="input-2">
          <b-form-input id="input-2" v-model="form.fname" required placeholder="Enter first name"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-u3" label="Last Name:" label-for="input-3">
          <b-form-input id="input-3" v-model="form.lname" required placeholder="Enter last name"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-u4" label="Date Of Birth:" label-for="input-4">
          <b-form-input
            id="input-u4"
            v-model="form.date"
            required
            placeholder="Enter Date"
            type="date"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-u5" label="Gender:">
          <b-form-radio-group id="gender-radio-group-u" v-model="form.gender">
            <b-form-radio name="some-radios" value="male">Male</b-form-radio>
            <b-form-radio name="some-radios" value="female">Female</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group id="input-group-6u" label="Email:" label-for="input-6">
          <b-form-input
            id="input-6u"
            v-model="form.email"
            type="email"
            required
            placeholder="name@mail.com"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-7u" label="Password:" label-for="input-7">
          <b-form-input
            id="input-7u"
            v-model="form.password"
            required
            placeholder="Enter password"
            type="password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Update</b-button>
       
      </b-form>
    </div>
  </b-container>
</template>



<script>
export default {
  data() {
    return {
      show: true
      //   selectedItem: {}
    };
  },
  props: {
    form: {
      _id: {
        type: String,
        required: true
      },
    //   userId: {
    //     type: String,
    //     required: true
    //   },
      fname: {
        type: String,
        required: true
      },
      lname: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      gender: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
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
  }
};
</script>
