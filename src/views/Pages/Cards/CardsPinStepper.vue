<template>
  <v-stepper v-model="stage" class="h-full">
    <!-- <v-stepper-header>
      <v-stepper-step step="1" :complete="stage > 1"
        >Cambio de Pin</v-stepper-step
      >
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="stage > 2"
        >Clave de operaciones</v-stepper-step
      >
    </v-stepper-header> -->

    <v-stepper-content step="1" class="no-mrpd h-full">
      <cards-pin-change @next="goToOperationKey"></cards-pin-change>
    </v-stepper-content>

    <v-stepper-content step="2" class="no-mrpd h-full">
      <operation-key
        @success="submitAll"
        @back="stage--"
        :operation_key_md5="user.operation_key"
      ></operation-key>
    </v-stepper-content>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{ textDialog.title }}</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn round color="primary" @click.native="handleCloseDialog">{{
            $t("common.accept")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-stepper>
</template>
<script>
import OperationKey from "../Pay/OperationKey";
import CardsPinChange from "./CardsPinChange";
import { mapGetters } from "vuex";
import { updatePinCardApi } from "@/api/modules";
import { mapActions } from "vuex";
import { i18n } from "@/i18n";
export default {
  components: {
    CardsPinChange,
    OperationKey
  },
  data() {
    return {
      stage: 1,
      decodeResult: {},
      card_id: "",
      dialog: false,
      textDialog: {}
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["setTitleButton"]),
    goToOperationKey(data = null) {
      this.setTitleButton(this.$t("common.accept"));
      if (data != null) {
        this.decodeResult.new_pin = data.new_pin_card;
        this.decodeResult.old_pin = data.old_pin_card;
        this.card_id = data.card_id;
      }
      this.stage = 2;
    },

    async submitAll() {
      var serviceResponse = await updatePinCardApi(
        this.card_id,
        this.decodeResult
      );
      if (serviceResponse.ok) {
        // const params = { text: serviceResponse.message.text };
        // window.getApp.$emit("SHOW_MESSAGE", params);
        this.handleShowDialog(serviceResponse.message.text);
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    handleShowDialog(textD) {
      this.textDialog.title = textD;
      this.dialog = true;
    },
    handleCloseDialog() {
      this.dialog = false;
      this.$router.push({
        name: "Dashboard"
      });
    }
  },
  beforeDestroy() {
    this.setTitleButton(i18n.t("common.continue"));
  }
};
</script>

<style>
.h-full {
  height: 100%;
}

.v-stepper__wrapper {
  height: 100%;
}
</style>
