<template>
  <v-layout column wrap class="pos-relative">
    <!--     <v-toolbar dense flat class="transparent pos-top-1px">
      <v-btn icon @click="() => $router.push({ name: 'LoginPage' })">
        <v-icon> keyboard_backspace </v-icon> 
      </v-btn>
    </v-toolbar> -->
    <v-flex xs12>
      <v-stepper v-model="stage" non-linear>
        <v-stepper-header>
          <div class="back-button">
            <v-btn icon @click="() => $router.push({ name: 'LoginPage' })">
              <v-icon> keyboard_backspace </v-icon>
            </v-btn>
          </div>
          <v-stepper-step :editable="stage > 1" step="1" :complete="stage > 1"
            >Bienvenido</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step :editable="stage > 2" step="2" :complete="stage > 2"
            >Contraseña</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step :editable="stage > 3" step="3" :complete="stage > 3"
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
import { mapActions, mapGetters } from "vuex";
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
    ...mapActions(["createAppPersonAction"]),
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
      this.createAppPersonAction(this.data);
    }
  }
};
</script>

<style>
.back-button {
  align-items: center;
  display: flex;
}
</style>
