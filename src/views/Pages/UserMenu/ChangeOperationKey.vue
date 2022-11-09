<template>
  <v-container class="backgroundC" fill-height>
    <v-layout class="backgroundC" row wrap>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="0" class="text-xs-left pa-3">
          <div class="text-xs-center">
            <v-icon x-large color="primary">vpn_key</v-icon>
          </div>
          <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
            <v-text-field
              class="box-input"
              :placeholder="$t('operationKey.title')"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              v-model="old_key"
              :error-messages="fieldErrors('old_key')"
              @input="$v.old_key.$touch()"
              @blur="$v.old_key.$touch()"
              required
              counter
              maxlength="6"
              mask="######"
            ></v-text-field>

            <v-text-field
              class="box-input"
              :placeholder="$t('operationKey.new')"
              :append-icon="showPassword2 ? 'visibility' : 'visibility_off'"
              :type="showPassword2 ? 'text' : 'password'"
              @click:append="showPassword2 = !showPassword2"
              v-model="new_key"
              :error-messages="fieldErrors('new_key')"
              @input="$v.new_key.$touch()"
              @blur="$v.new_key.$touch()"
              required
              counter
              maxlength="6"
              mask="######"
            ></v-text-field>
            <v-text-field
              class="box-input"
              :placeholder="$t('operationKey.confirm')"
              :append-icon="showPassword3 ? 'visibility' : 'visibility_off'"
              :type="showPassword3 ? 'text' : 'password'"
              @click:append="showPassword3 = !showPassword3"
              v-model="new_key_confirm"
              :error-messages="fieldErrors('new_key_confirm')"
              @input="$v.new_key_confirm.$touch()"
              @blur="
                $v.new_key_confirm.$touch();
                handleChange($event);
              "
              required
              counter
              maxlength="6"
              mask="######"
            ></v-text-field>
          </v-form>

          <v-flex xs12 class="text-xs-right">
            <br />
            <strong @click="dialog = true">
              {{ $t("operationKey.reset") }}
            </strong>
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
              @click="backToDashboard"
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
        <v-card-title class="title">
          {{ $t("operationKey.dialog") }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" round @click.native="dialog = false">{{
            $t("common.cancel")
          }}</v-btn>
          <v-btn color="primary" round @click.native="forgotOpeKey">{{
            $t("common.accept")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogC" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{ textDialogC }}</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn round color="primary" @click.native="backToDashboard">
            {{ $t("common.accept") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import { forgotOpeKeyUserApi, changeOpeKeyApi } from "@/api/modules";
import { i18n } from "@/i18n";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    key_card: Object
  },
  mixins: [validationMixin],
  validations: {
    new_key: {
      required,
      minLength: minLength(6)
    },
    old_key: {
      required,
      minLength: minLength(6)
    },
    new_key_confirm: {
      sameAsPassword: sameAs("new_key")
    }
  },
  validationMessages: {
    new_key: {
      required: i18n.t("operationKey.required"),
      minLength: i18n.t("operationKey.minLength")
    },
    old_key: {
      required: i18n.t("operationKey.required"),
      minLength: i18n.t("operationKey.minLength")
    },
    new_key_confirm: {
      required: i18n.t("operationKey.required"),
      minLength: i18n.t("operationKey.minLength"),
      sameAsPassword: i18n.t("operationKey.equal")
    }
  },
  data() {
    return {
      operation_key: "",
      old_key: "",
      new_key: "",
      new_key_confirm: "",
      showPassword: false,
      showPassword2: false,
      showPassword3: false,
      dialog: false,
      dialogC: false,
      textDialogC: ""
    };
  },
  computed: {
    ...mapGetters(["keyboardIsUp"])
  },
  methods: {
    ...mapActions(["updateOperationKey"]),
    async submit() {
      let body = {
        new_operation_key: this.new_key,
        old_operation_key: this.old_key
      };
      let serviceResponse = await changeOpeKeyApi(body);
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        this.updateOperationKey(serviceResponse.data.operation_key);
        this.dialogC = true;
        this.textDialogC = i18n.t("operationKey.change");
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    backToList() {
      this.$router.push({
        name: "CardsList"
      });
    },
    handleChange(e) {
      if (e.target.value.match("^[0-9]*$") != null) {
        console.log(e.target.value);
      }
    },
    async forgotOpeKey() {
      this.dialog = false;
      let serviceResponse = await forgotOpeKeyUserApi();
      console.log(serviceResponse.data);
      if (serviceResponse.ok) {
        this.updateOperationKey(serviceResponse.data.operation_key);
        this.textDialogC = i18n.t("operationKey.message");
        this.dialogC = true;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },

    backToDashboard() {
      this.dialogC = false;
      this.$router.push({
        name: "Home"
      });
    }
  }
};
</script>
<style>
.backgroundC {
  background: white !important;
}
</style>
