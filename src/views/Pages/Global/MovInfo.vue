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
          <v-toolbar-title>Detalle de transacción</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list>
          <v-subheader>General</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title
                ><b>Detalle: </b> {{ mov.validation_number }}</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title
                ><b>Monto: </b>
                {{ Number(mov.amount).format() }}</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title
                ><b>Fecha: </b> {{ mov.execution_date }}</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title
                ><b>Origen: </b>
                {{ mov.target.phone_number }}</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title
                ><b>Descripción Origen: </b>
                {{ mov.target_description }}</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title
                ><b>Destino: </b>
                {{ mov.source.phone_number }}</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title
                ><b>Descripción Destino: </b></v-list-tile-title
              >
              <v-list-tile-sub-title
                v-text="mov.source_description"
              ></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title
                ><b>Tipo: </b> {{ mov.type }}</v-list-tile-title
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
import "../../../assets/utils";
export default {
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      mov: {}
    };
  },
  methods: {
    show(data) {
      this.mov = data;
      this.dialog = true;
    },
    hide() {
      this.dialog = false;
    }
  }
};
</script>
