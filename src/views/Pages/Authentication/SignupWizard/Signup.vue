<template>
  <v-layout column wrap class="pos-relative">
    <v-flex xs12>
      <v-stepper v-model="stage" non-linear>
        <v-stepper-header>
          <v-stepper-step
            :editable="stage > 1"
            step="1"
            :complete="stage > 1"
            >{{ $t("common.welcome") }}</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step
            :editable="stage > 2"
            step="2"
            :complete="stage > 2"
            >{{ $t("common.password") }}</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step
            :editable="stage > 3"
            step="3"
            :complete="stage > 3"
            >{{ $t("common.personalInformation") }}</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step step="4">{{
            $t("common.operationKey")
          }}</v-stepper-step>
        </v-stepper-header>

        <v-stepper-content step="1" class="no-mrpd">
          <presentation @next="goToChangePassword"></presentation>
        </v-stepper-content>

        <v-stepper-content step="2" class="no-mrpd">
          <change-password @next="goToAccountInformation"></change-password>
        </v-stepper-content>

        <v-stepper-content step="3" class="no-mrpd">
          <account-information
            @next="goToChangeSpecialKey"
          ></account-information>
        </v-stepper-content>

        <v-stepper-content step="4" class="no-mrpd">
          <change-special-key @success="submitAll"></change-special-key>
        </v-stepper-content>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>
<script>
import ChangePassword from "./ChangePassword";
import ChangeSpecialKey from "./ChangeSpecialKey";
import AccountInformation from "./AccountInformation";
import Presentation from "./Presentation";
import { mapActions, mapGetters } from "vuex";
import { finishSignupApi } from "@/api/modules";
import { refreshToken } from "@/utils/helpers";
export default {
  components: {
    ChangePassword,
    Presentation,
    AccountInformation,
    ChangeSpecialKey
  },
  data() {
    return {
      stage: 1,
      data: {
        operation_key: null,
        password: null,
        birth_date: null,
        gender: null,
        phone_number: null,
        secondary_email: null
      }
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["getProfileAction"]),
    goToChangePassword() {
      this.stage = 2;
    },
    goToAccountInformation(data) {
      this.data.password = data.password;
      this.stage = 3;
    },
    goToChangeSpecialKey(data) {
      const formData = this.data;
      this.data = {
        ...formData,
        ...data
      };
      this.stage = 4;
    },
    async submitAll(data) {
      this.data.operation_key = data.operation_key;
      let serviceResponse = await finishSignupApi(this.data);
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        await refreshToken();
        this.getProfileAction();
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    }
  }
};
</script>
