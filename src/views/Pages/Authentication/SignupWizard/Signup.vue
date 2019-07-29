<template>
  <v-layout column wrap class="pos-relative">
    <v-toolbar  dense flat class="transparent pos-top-1px">
      <v-spacer></v-spacer>
      <v-btn icon @click="() => $router.push({name:'LoginPage'})">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-flex xs12>
      <v-stepper v-model="stage" >
        <v-stepper-header>
          <v-stepper-step step="1" :complete="stage > 1">Name of step 1</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="stage > 2">Name of step 2</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" :complete="stage > 3">Name of step 3</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4">Name of step 4</v-stepper-step>
        </v-stepper-header>

        <v-stepper-content step="1" class="no-mrpd">
          <email-verification @next="goToChangePassword"></email-verification>
        </v-stepper-content>

        <v-stepper-content step="2" class="no-mrpd">
          <verify :email="data.email" @next="verifyEmailHanlder"></verify>
        </v-stepper-content>

        <v-stepper-content step="3" class="no-mrpd">
          <account-information @success="profileFilledSuccessHandler"></account-information>
        </v-stepper-content>
        <v-stepper-content step="4" class="no-mrpd">
          <account-information @success="profileFilledSuccessHandler"></account-information>
        </v-stepper-content>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>
<script>
import AccountInformation from "./AccountInformation";
import EmailVerification from "./EmailVerification";
import Verify from "./Verify";
export default {
  components: {
    AccountInformation,
    EmailVerification,
    Verify
  },
  data() {
    return {
      stage: 1,
      data: {
        email: null,
        code: null,
        firstname: null,
        lastname: null,
        username: null,
        password: null
      }
    };
  },
  methods: {
    stageHandler() {
      if (this.stage > 1) {
        this.stage -= 1;
      }
    },
    goToChangePassword() {
      this.stage = 2;
    },
    verifyEmailHanlder(data) {
      this.data.code = data.code;
      this.stage = 3;
    },
    profileFilledSuccessHandler(data) {
      const formData = this.data;
      this.data = {
        ...formData,
        ...data
      };
      this.$emit("success", {
        visibility: true,
        color: "act",
        text: "Your account has been registered"
      });
    }
  }
};
</script>
