<template>
  <v-layout column wrap class="pos-relative">
    <v-toolbar dense flat class="transparent pos-top-1px">
      <v-spacer></v-spacer>
      <v-btn icon @click="() => $router.push({ name: 'LoginPage' })">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-flex xs12>
      <v-stepper v-model="stage">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="stage > 1"
            >Bienvenido</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="stage > 2"
            >Contraseña</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step step="3" :complete="stage > 3"
            >Datos personales</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step step="4">Clave especial</v-stepper-step>
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
        specialKey: null,
        password: null,
        birthdate: null,
        gender: null,
        phoneNumber: null,
        secondaryEmail: null
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
    submitAll(data) {
      this.data.specialKey = data.specialKey;
      console.log(this.data);
    }
  }
};
</script>
