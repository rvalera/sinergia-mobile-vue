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
          <v-toolbar-title>{{ $t("terminal.detail") }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fill-height>
          <v-layout row wrap align-content-center justify-center>
            <v-flex xs12 sm6 class="text-xs-center">
              <v-card elevation="0" class="pa-3">
                <v-list>
                  <v-spacer></v-spacer>
                  <v-layout column v-if="terminal">
                    <v-text-field
                      :label="$t('terminal.validationCode')"
                      v-model="terminal.validation_code"
                      filled
                      readonly
                    />
                    <v-text-field
                      :label="$t('terminal.type')"
                      v-model="terminal.named_type"
                      filled
                      readonly
                    />
                    <v-text-field
                      :label="$t('terminal.status')"
                      v-model="terminal.named_status"
                      filled
                      readonly
                    />
                    <template v-if="terminal.hasOwnProperty('device')">
                      <v-text-field
                        :label="$t('terminal.deviceName')"
                        v-model="terminal.device.name"
                        filled
                        readonly
                      />
                      <v-text-field
                        :label="$t('terminal.deviceSerial')"
                        v-model="terminal.device.serial"
                        filled
                        readonly
                      />
                    </template>
                  </v-layout>
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
      terminal: null
    };
  },
  methods: {
    show(data) {
      this.terminal = data;
      this.dialog = true;
    },
    hide() {
      if (this.dialog) this.dialog = false;
      else this.$router.back();
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
