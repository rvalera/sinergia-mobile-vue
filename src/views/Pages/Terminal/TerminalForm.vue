<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-sm3>
        <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
          <v-text-field
            class="box-input mt-4"
            :placeholder="$t('terminal.quantity')"
            v-model="form.quantity"
            :error-messages="fieldErrors('form.quantity')"
            @input="$v.form.quantity.$touch()"
            @blur="$v.form.quantity.$touch()"
            required
            type="number"
          />
          <v-select
            :items="TERMINAL_TYPES"
            color="primary"
            :label="$t('terminal.type')"
            :error-messages="fieldErrors('form.type')"
            @input="$v.form.type.$touch()"
            @blur="$v.form.type.$touch()"
            v-model="form.type"
            class="box-input"
          />
        </v-form>
        <v-layout justify-space-around class="put-bottom">
          <v-flex xs5>
            <v-btn
              large
              block
              round
              color="gray"
              class="mt-4"
              @click="() => $router.back()"
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
              >{{ $t("common.save") }}</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { TERMINAL_TYPES } from "@/config/constants";
import { required, minValue } from "vuelidate/lib/validators";
import validationLangMixin from "@/mixins/validationLangMixin";
import { postTerminalApi } from "@/api/modules";
const defaultForm = {
  type: "",
  quantity: ""
};
export default {
  mixins: [validationLangMixin],
  validations: {
    form: {
      type: { required },
      quantity: { required, minValue: minValue(1) }
    }
  },
  validationMessages: {
    form: {
      type: {
        required: "validation.fieldRequired"
      },
      quantity: {
        required: "validation.fieldRequired",
        minValue: "validation.fieldRequired"
      }
    }
  },
  data: () => ({
    form: Object.assign({}, defaultForm),
    TERMINAL_TYPES
  }),
  methods: {
    async submit() {
      this.form.person_id = localStorage.person_id;
      var serviceResponse = await postTerminalApi(this.form);
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        this.$router.back();
        const params = { text: "Terminal registrado con exito!" };
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    }
  }
};
</script>
