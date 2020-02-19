<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-sm3>
        <v-form
          class="pt-2"
          @submit.prevent="$v.$invalid ? null : submit()"
          ref="form"
        >
          <p class="no-mrpd caption">{{ $t("common.quantity") }}</p>
          <v-layout justify-left align-center>
            <v-btn
              icon
              class="no-mrpd"
              @click="form.quantity--"
              :disabled="form.quantity === 1"
            >
              <v-icon color="red">remove</v-icon>
            </v-btn>
            <p class="no-mrpd title">{{ form.quantity }}</p>
            <v-btn
              icon
              class="no-mrpd"
              @click="form.quantity++"
              :disabled="form.quantity === 5"
            >
              <v-icon color="green">add</v-icon>
            </v-btn>
          </v-layout>
          <v-select
            :items="TERMINAL_TYPES"
            color="primary"
            :label="$t('terminal.type')"
            :error-messages="fieldErrors('form.type')"
            @input="$v.form.type.$touch()"
            @blur="$v.form.type.$touch()"
            v-model="form.type"
            class="box-input mt-4"
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
import { TERMINAL_TYPES, TERMINAL_TYPE_POS } from "@/config/constants";
import { required } from "vuelidate/lib/validators";
import validationLangMixin from "@/mixins/validationLangMixin";
import { postTerminalApi } from "@/api/modules";
const defaultForm = {
  type: TERMINAL_TYPE_POS,
  quantity: 1
};
export default {
  mixins: [validationLangMixin],
  validations: {
    form: {
      type: { required }
    }
  },
  validationMessages: {
    form: {
      type: {
        required: "validation.fieldRequired"
      }
    }
  },
  data: () => ({
    form: Object.assign({}, defaultForm),
    TERMINAL_TYPES
  }),
  methods: {
    async submit() {
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
