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
          <v-toolbar-title>{{
            $t("movementsFilter.filterMovements")
          }}</v-toolbar-title>
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
                        v-model="date"
                        :label="$t('movementsFilter.startDate')"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
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
                        v-model="date2"
                        :label="$t('movementsFilter.endDate')"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date2"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-list>

                <div class=" put-bottom px-3">
                  <v-btn
                    large
                    round
                    block
                    color="primary"
                    @click="filterDate"
                    >{{ $t("movementsFilter.filter") }}</v-btn
                  >
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false
    };
  },
  watch: {
    dialog(value) {
      this.handleDialog(value);
    }
  },
  methods: {
    ...mapActions(["handleDialog"]),
    show() {
      this.dialog = true;
    },
    filterDate() {
      console.log(this.date);
      console.log(this.date2);
      if (this.date2 >= this.date) {
        this.$emit("filter", {
          start_date: this.date,
          end_date: this.date2
        });
        this.dialog = false;
      } else {
        window.getApp.$emit("SHOW_ERROR", {
          text: "EL DIA DE INICIO DEBE SER MAYOR AL DIA DE FIN"
        });
      }
    },
    hide() {
      this.dialog = false;
    }
  },
  mounted() {
    document.addEventListener("backbutton", this.hide, false);
  },
  beforeDestroy() {
    document.removeEventListener("backbutton", this.hide);
  }
};
</script>
