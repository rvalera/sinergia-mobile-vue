<template>
  <v-layout id="CardsInfo" row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card elevation="0" class="text-xs-left pa-3">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Detalle de transacción</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fill-height>
          <v-layout row wrap align-content-center justify-center>
            <v-flex xs12 sm6 class="text-xs-center">
              <v-card elevation="0" class="pa-3">
                <v-list>
                  <!-- <div class="text-xs-center">
                    <v-icon x-large color="primary">mdi-coin</v-icon>
                  </div> -->
                  <v-spacer></v-spacer>
                  <v-layout row>
                    <v-text-field
                      label="Fecha"
                      v-model="mov.execution_date"
                      filled
                      readonly
                    ></v-text-field>
                    <v-label>
                      {{
                        amount + " " + (mov.coin ? mov.coin.diminutive : " ")
                      }}</v-label
                    >
                  </v-layout>

                  <v-text-field
                    label="Origen"
                    v-model="mov.source_description"
                    filled
                    readonly
                  ></v-text-field>

                  <v-text-field
                    label="Destino"
                    v-model="mov.target_description"
                    filled
                    readonly
                  ></v-text-field>

                  <v-text-field
                    label="Tipo"
                    v-model="mov.type"
                    filled
                    readonly
                  ></v-text-field>
                </v-list>
                <v-layout row class="mt-4">
                  <v-flex xs12>
                    <v-btn large round block color="primary">
                      <v-icon left>share</v-icon>
                      Compartir
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
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
