<template>
  <b-container>
    <b-card>
      <b-card>
        <b-row>
          <b-button v-b-modal.modal-prevent-closing>Add Person</b-button>

          <b-modal id="modal-prevent-closing" title="Add Person" hidefooter="true">
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
                  @click="info(row.item, row.index, $event.target)"
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
        console.log(data);
        this.datas = data;
        this.modellingItems(this.datas);
      })
      .catch(e => console.log(e));
  },

  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
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
    }
  }
};
</script>