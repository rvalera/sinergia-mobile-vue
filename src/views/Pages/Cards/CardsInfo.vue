<template>
  <v-layout id="CardsInfo" row justify-center>
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
          <v-toolbar-title>{{ $t("cards.information") }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fill-height>
          <v-layout row wrap align-content-center justify-center>
            <v-flex xs12 sm6 class="text-xs-center">
              <v-card elevation="0" class="pa-3">
                <v-list>
                  <div class="text-xs-center">
                    <v-icon x-large color="primary">mdi-credit-card</v-icon>
                  </div>
                  <v-spacer></v-spacer>
                  <v-text-field
                    :label="$t('cards.validationNumber')"
                    v-model="card.validation_number"
                    filled
                    readonly
                  ></v-text-field>
                  <v-text-field
                    :label="$t('cards.activationDate')"
                    v-model="card.activation_date"
                    filled
                    readonly
                  ></v-text-field>
                  <v-text-field
                    v-if="card.status != 'A'"
                    :label="$t('cards.disabledDate')"
                    v-model="card.inactivation_date"
                    filled
                    readonly
                  ></v-text-field>
                  <v-text-field
                    :label="$t('cards.status')"
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
      if (this.dialog) this.dialog = false;
      else
        this.$router.push({
          name: "Dashboard"
        });
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
