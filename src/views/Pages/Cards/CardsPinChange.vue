<template>
  <v-container fill-height>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="0" class="text-xs-left pa-3">
          <div class="text-xs-center">
            <v-icon x-large color="primary">vpn_key</v-icon>
          </div>
          <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
            <v-text-field
              class="box-input"
              :placeholder="$t('cards.pinA')"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              v-model="old_pin"
              :error-messages="fieldErrors('old_pin')"
              @input="$v.old_pin.$touch()"
              @blur="$v.old_pin.$touch()"
              required
              counter
              maxlength="4"
              mask="####"
            ></v-text-field>

            <v-text-field
              class="box-input"
              :placeholder="$t('cards.pinNew')"
              :append-icon="showPassword2 ? 'visibility' : 'visibility_off'"
              :type="showPassword2 ? 'text' : 'password'"
              @click:append="showPassword2 = !showPassword2"
              v-model="new_pin"
              :error-messages="fieldErrors('new_pin')"
              @input="$v.new_pin.$touch()"
              @blur="$v.new_pin.$touch()"
              required
              counter
              maxlength="4"
              mask="####"
            ></v-text-field>
            <v-text-field
              class="box-input"
              :placeholder="$t('cards.pinConfirm')"
              :append-icon="showPassword3 ? 'visibility' : 'visibility_off'"
              :type="showPassword3 ? 'text' : 'password'"
              @click:append="showPassword3 = !showPassword3"
              v-model="new_pin_confirm"
              :error-messages="fieldErrors('new_pin_confirm')"
              @input="$v.new_pin_confirm.$touch()"
              @blur="$v.new_pin_confirm.$touch()"
              required
              counter
              maxlength="4"
              mask="####"
            ></v-text-field>
          </v-form>
          <v-flex xs12 class="text-xs-right">
            <br />
            <strong @click="dialog = true">{{ $t("cards.reset") }}</strong>
          </v-flex>
        </v-card>
        <v-layout v-if="!keyboardIsUp" justify-space-around class="put-bottom">
          <v-flex xs5>
            <v-btn
              large
              round
              block
              color="gray"
              class="mt-4"
              @click="backToList"
              >{{ $t("common.cancel") }}</v-btn
            >
          </v-flex>
          <v-flex xs5>
            <v-btn
              large
              round
              block
              color="primary"
              class="mt-4"
              :disabled="$v.$invalid"
              :class="$v.$invalid ? '' : 'white--text'"
              @click="submit"
              >{{ $t("common.accept") }}</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="title">{{ $t("cards.dialog") }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" round @click.native="dialog = false">
            {{ $t("common.cancel") }}
          </v-btn>
          <v-btn color="primary" round @click.native="forgotPassword">
            {{ $t("common.accept") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogC" persistent max-width="290">
      <v-card>
        <v-card-title class="title">{{ textDialogC }}</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" round @click.native="backToList">{{
            $t("common.accept")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import { resetPinCardApi } from "@/api/modules";
import { i18n } from "@/i18n";
import { mapGetters } from "vuex";
export default {
  props: {
    pin_card: Object
  },
  mixins: [validationMixin],
  validations: {
    new_pin: {
      required,
      minLength: minLength(4)
    },
    old_pin: {
      required,
      minLength: minLength(4)
    },
    new_pin_confirm: {
      sameAsPassword: sameAs("new_pin")
    }
  },
  validationMessages: {
    new_pin: {
      required: i18n.t("cards.required"),
      minLength: i18n.t("cards.minLength")
    },
    old_pin: {
      required: i18n.t("cards.required"),
      minLength: i18n.t("cards.minLength")
    },
    new_pin_confirm: {
      required: i18n.t("cards.required"),
      minLength: i18n.t("cards.minLength"),
      sameAsPassword: i18n.t("cards.equal")
    }
  },
  data() {
    return {
      operation_key: "",
      old_pin: "",
      new_pin: "",
      new_pin_confirm: "",
      showPassword: false,
      showPassword2: false,
      showPassword3: false,
      dialog: false,
      dialogC: false,
      textDialogC: "",
      email: localStorage.getItem("email")
    };
  },
  computed: {
    ...mapGetters(["keyboardIsUp"])
  },
  methods: {
    submit() {
      if (this.new_pin === this.new_pin_confirm) {
        this.$emit("next", {
          new_pin_card: this.new_pin,
          old_pin_card: this.old_pin,
          card_id: this.$route.params.card.id
        });
      } else {
        const params = { text: "Clave invalida" };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    async forgotPassword() {
      this.dialog = false;
      let serviceResponse = await resetPinCardApi(this.$route.params.card.id);
      console.log(serviceResponse.data);
      if (serviceResponse.ok) {
        this.textDialogC = i18n.t("cards.message");
        this.dialogC = true;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    backToList() {
      this.$router.push({
        name: "Dashboard"
      });
    }
  }
};
</script>
