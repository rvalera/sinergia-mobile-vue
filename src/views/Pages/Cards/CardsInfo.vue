<template>
  <v-layout id="CardsInfo" row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card elevation="4" class="text-xs-left pa-3">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Card Information</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list>
          <v-subheader>General</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title
                ><b>Numero de Validación: </b>
                {{ card.validation_number }}</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title
                ><b>Dia de activación: </b>
                {{ card.activation_date }}</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="card.status != 'A'" avatar>
            <v-list-tile-content>
              <v-list-tile-title
                ><b>Dia de inactivación: </b>
                {{ card.inactivation_date }}</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title
                ><b>Estatus: </b>
                {{
                  card.status === "A" ? "Activa" : "Bloqueada"
                }}</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
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
      card: {}
    };
  },
  methods: {
    show(data) {
      this.card = data;
      this.dialog = true;
    },
    hide() {
      this.dialog = false;
    }
  }
};
</script>
