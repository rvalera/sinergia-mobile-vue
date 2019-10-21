<template>
  <v-layout id="DateFilter" row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="text-xs-left pa-3">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Filtrar movimientos</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fill-height>
          <v-layout row wrap align-content-center justify-center>
            <v-flex xs12 sm6 class="text-xs-center">
              <v-card elevation="0" class="pa-3">
                <v-list>
                  <div class="text-xs-center">
                    <v-icon x-large color="primary">mdi-filter</v-icon>
                  </div>
                  <v-spacer></v-spacer>
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="filter.start_date"
                        label="Fecha Inicio"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="filter.start_date"
                      @input="menu = false"
                      range
                    ></v-date-picker>
                  </v-menu>
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="filter.end_date"
                        label="Fecha Fin"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="filter.end_date"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                  <v-select
                    :items="movementTypes"
                    color="primary"
                    label="Tipo de movimiento"
                    v-model="filter.type"
                    class="box-input"
                  />
                  <v-text-field
                    color="primary"
                    label="Monto desde"
                    type="number"
                    v-model="filter.min_amount"
                  />
                  <v-text-field
                    color="primary"
                    label="Monto hasta"
                    type="number"
                    v-model="filter.max_amount"
                  />
                </v-list>
                <v-btn large round block color="primary" @click="makeFilter"
                  >Filtrar</v-btn
                >
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { movementTypes } from "@/config/constants";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      filter: {
        start_date: new Date().toISOString().substr(0, 10),
        end_date: new Date().toISOString().substr(0, 10),
        type: "T",
        min_amount: null,
        max_amount: null
      },
      menu: false,
      menu2: false,
      movementTypes
    };
  },
  computed: {
    ...mapGetters(["filter_app"])
  },
  methods: {
    ...mapActions(["setTransactionsApp"]),
    show() {
      this.dialog = true;
      this.filter = {
        ...this.filter,
        ...this.filter_app
      };
    },
    makeFilter() {
      console.log(this.filter);
      this.setTransactionsApp(this.filter);
      this.hide();
    },
    hide() {
      this.dialog = false;
    }
  }
};
</script>
