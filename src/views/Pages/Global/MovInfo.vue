<template>
  <v-layout id="CardsInfo" row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card elevation="4" class="text-xs-left pa-3">
        <v-toolbar dark color="#6a1b9a">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Detalle de transacción</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fill-height>
          <v-layout row wrap align-content-center justify-center>
            <v-flex xs12 sm6 class="text-xs-center">
              <v-card elevation="4" class="pa-3">
                <v-list>
                  <!-- <div class="text-xs-center">
                    <v-icon x-large color="primary">mdi-coin</v-icon>
                  </div> -->
                  <v-spacer></v-spacer>

                  <v-text-field
                    color="purple darken-2"
                    label="Monto"
                    v-model="amount"
                    filled
                    readonly
                  ></v-text-field>
                  <v-text-field
                    color="purple darken-2"
                    label="Fecha"
                    v-model="mov.execution_date"
                    filled
                    readonly
                  ></v-text-field>
                  <v-text-field
                    color="purple darken-2"
                    label="Origen"
                    v-model="mov.source.phone_number"
                    filled
                    readonly
                  ></v-text-field>
                  <v-text-field
                    color="purple darken-2"
                    label="Descripción Origen"
                    v-model="mov.source_description"
                    filled
                    readonly
                  ></v-text-field>
                  <v-text-field
                    color="purple darken-2"
                    label="Destino"
                    v-model="mov.target.phone_number"
                    filled
                    readonly
                  ></v-text-field>
                  <v-text-field
                    color="purple darken-2"
                    label="Descripción Destino"
                    v-model="mov.target_description"
                    filled
                    readonly
                  ></v-text-field>

                  <v-text-field
                    color="purple darken-2"
                    label="Tipo"
                    v-model="mov.type"
                    filled
                    readonly
                  ></v-text-field>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import "../../../assets/utils";
export default {
  data() {
    return {
      dialog: false,
      amount: 0,
      mov: {
        id: 0,
        execution_date: "",
        target_description: "",
        source_description: "",
        source: {
          id: 0,
          fullname: "",
          phone_number: ""
        },
        target: {
          id: 0,
          fullname: "",
          phone_number: ""
        },
        amount: 0,
        type: ""
      }
    };
  },
  methods: {
    show(data) {
      console.log(data);
      this.mov = data;
      this.amount = Number(this.mov.amount).format();
      this.dialog = true;
    },
    hide() {
      this.dialog = false;
    }
  }
};
</script>
