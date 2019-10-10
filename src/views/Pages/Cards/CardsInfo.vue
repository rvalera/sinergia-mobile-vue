<template>
  <v-layout id="CardsInfo" row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="text-xs-left pa-3">
        <v-toolbar dark color="#333333">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Card Information</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fill-height>
          <v-layout row wrap align-content-center justify-center>
            <v-flex xs12 sm6 class="text-xs-center">
              <v-card elevation="4" class="pa-3">
                <v-list>
                  <div class="text-xs-center">
                    <v-icon x-large color="primary">mdi-credit-card</v-icon>
                  </div>
                  <v-spacer></v-spacer>
                  <v-text-field
                    color="purple darken-2"
                    label="Numero de validación"
                    v-model="card.validation_number"
                    filled
                    readonly
                  ></v-text-field>
                  <v-text-field
                    color="purple darken-2"
                    label="Dia de activación"
                    v-model="card.activation_date"
                    filled
                    readonly
                  ></v-text-field>
                  <v-text-field
                    v-if="card.status != 'A'"
                    color="purple darken-2"
                    label="Dia de inactivación:"
                    v-model="card.inactivation_date"
                    filled
                    readonly
                  ></v-text-field>
                  <v-text-field
                    color="purple darken-2"
                    label="Estatus:"
                    v-model="status"
                    filled
                    readonly
                  ></v-text-field>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      card: {},
      status: ""
    };
  },
  methods: {
    show(data) {
      this.card = data;
      this.dialog = true;
      if (this.card.status === "A") this.status = "Activa";
      else this.status = "Inactiva";
    },
    hide() {
      this.dialog = false;
    }
  }
};
</script>
