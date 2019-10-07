<template>
  <b-container>
    <b-card>
      <b-card>
        <b-row>
          <b-button v-b-modal.modal-prevent-closing>Add Person</b-button>

          <b-modal id="modal-prevent-closing" title="Add Person" hide-footer>
            <SavePerson ref="form" @submit.stop.prevent="handleSubmit" />
          </b-modal>
        </b-row>
      </b-card>
      <b-card>
        <b-row>
          <div>
            <b-table striped hover :items="items" :fields="fields">
              <template v-slot:cell(action)="row">
                <b-button
                  size="sm"
                  @click= "editPerson()"
                  class="mr-1"
                >Edit</b-button>
              </template>
            </b-table>
          </div>
        </b-row>
      </b-card>
    </b-card>
  </b-container>
</template>

<script>
import SavePerson from "~/components/SavePerson";

export default {
  components: {
    SavePerson
  },
  data: () => ({
    datas: [],
    fields: [
      "user_id",
      "first_name",
      "last_name",
      "date_of_birth",
      "gender",
      "action"
    ],
    items: []
  }),
  mounted() {
    return this.$axios
      .$get("/persons")
      .then(data => {
        console.log("data from db",data);
        // this.datas = data;
        this.modellingItems(data);
      })
      .catch(e => console.log(e));
  },

  methods: {
    modellingItems(datas) {
      let newData = datas.map(data => {
        return {
          user_id: data.userId,
          first_name: data.firstName,
          last_name: data.lastName,
          date_of_birth: data.dateOfBirth,
          gender: data.gender
        };
      });
      console.log(newData);
      this.items = newData;
    },
    editPerson(){
      console.log("edit the person details");
    }
  }
};
</script>