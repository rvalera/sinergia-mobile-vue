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
              :placeholder="$t('common.typeYourOperationKey')"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              v-model="operation_key"
              :error-messages="fieldErrors('operation_key')"
              @input="$v.operation_key.$touch()"
              @blur="$v.operation_key.$touch()"
              required
              counter
              maxlength="6"
              mask="######"
            ></v-text-field>
          </v-form>
        </v-card>
        <v-layout justify-space-around class="put-bottom">
          <v-flex xs5>
            <v-btn
              large
              block
              round
              color="gray"
              class="mt-4"
              @click="$emit('back')"
              >{{ $t("common.goBack") }}</v-btn
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
              >{{ this.app_button_label }}</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
import validationLangMixin from "@/mixins/validationLangMixin";
import { mapGetters } from "vuex";
import md5 from "md5";
export default {
  props: {
    operation_key_md5: String
  },
  mixins: [validationLangMixin],
  validations: {
    operation_key: {
      required,
      minLength: minLength(6)
    }
  },
  validationMessages: {
    operation_key: {
      required: "validation.operationKey.required",
      minLength: "validation.operationKey.minLength"
    }
  },
  data() {
    return {
      operation_key: "",
      showPassword: false
    };
  },
  computed: {
    ...mapGetters(["app_button_label"])
  },
  methods: {
    submit() {
      if (md5(this.operation_key) === this.operation_key_md5) {
        this.$emit("success");
      } else {
        const params = { text: this.$t("message.invalidKey") };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    handlePersonIdChange(e) {
      if (e.target.value.match("^[0-9]*$") != null) {
        console.log(e.target.value);
      }
    }
  }
};
</script>
