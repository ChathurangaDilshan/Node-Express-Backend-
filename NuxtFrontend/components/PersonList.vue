<template>
  <b-container>
    <b-card>
      <b-card>
        <b-row>
          <b-button v-b-modal.modal-prevent-closing id="addPerson" title="Add Person">
            Add Person
            <SavePerson />
          </b-button>

          <!-- <b-modal id="modal-prevent-closing" title="Add Person" hide-footer>
            <SavePerson ref="form" @submit="$bvModal.hide(modal-prevent-closing)" />
          </b-modal>-->
        </b-row>
      </b-card>
      <b-card>
        <b-row>
          <div>
            <b-table striped hover :items="items" :fields="fields" >
              <template v-slot:cell(action)="row" >
                <b-button
                  id="edit"
                 
                  @click="showEditPerson(row.item)"
                  size="sm"
                  class="mr-1"
                >Edit </b-button>
              </template>
            </b-table>
          </div>
        </b-row>
      </b-card>
    </b-card>
    <UpdatePerson   :itemDetails="itemDetails" />
    <!-- <b-modal id="SaveEditPerson"  hide-footer   >
      <UpdatePerson ref="form" :itemDetails="itemDetails" />
    </b-modal> -->
  </b-container>
</template>

<script>
import SavePerson from "~/components/SavePerson";
import UpdatePerson from "~/components/UpdatePerson";
import moment from "moment";

export default {
  components: {
    SavePerson,
    UpdatePerson
  },
  // props:{

  // },
  data: () => ({
    fields: [
      // "user_id",
      "first_name",
      "last_name",
      "date_of_birth",
      "gender",
      "action"
    ],
    items: [],
    itemDetails: {}
  }),
  mounted() {
    return this.$axios
      .$get("/persons")
      .then(data => {
        console.log("data from db", data);
        // this.datas = data;
        this.modellingItems(data);
      })
      .catch(e => console.log(e));
  },
  methods: {
    modellingItems(datas) {
      let newData = datas.map(data => {
        return {
          _id: data._id,
          user_id: data.userId,
          first_name: data.firstName,
          last_name: data.lastName,
          date_of_birth: moment(data.dateOfBirth).format("YYYY-MM-DD"),
          gender: data.gender,
          email: data.email,
          password: data.password
        };
      });
      console.log(newData);
      this.items = newData;
    },
    showEditPerson(item) {
      console.log("edit the person details ", item);

      let dob = item.date_of_birth;
      let newDate = moment(dob).format("YYYY-MM-DD");

      const selectedItem = {
        _id: item._id,
        // userId: item.user_id,
        fname: item.first_name,
        lname: item.last_name,
        date: newDate,
        gender: item.gender,
        email: item.email,
        password: item.password
      };

      this.itemDetails = selectedItem;

      console.log("selectedItem = ", selectedItem);
      console.log("itemDetails =", this.itemDetails);

      // item = this.form
    }
  },
  computed: {}
};
</script>