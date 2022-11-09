<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-layout align-center>
        <v-flex xs12>
          <v-card flat height="480" class="margin-auto transparent" width="360">
            <v-container fill-height pa-0>
              <v-layout align-center>
                <v-flex xs12>
                  <v-card-text>
                    <v-form
                      @submit.prevent="$v.$invalid ? null : submit()"
                      ref="form"
                    >
                      <v-container grid-list-xl fluid>
                        <v-layout wrap>
                          <v-flex xs12 pa-0>
                            <v-text-field
                              color="primary"
                              :label="$t('common.name')"
                              v-model="form.name"
                              required
                              :error-messages="fieldErrors('form.name')"
                              @blur="$v.form.name.$touch()"
                            ></v-text-field>
                            <v-text-field
                              color="primary"
                              :label="$t('common.description')"
                              v-model="form.description"
                              required
                              :error-messages="fieldErrors('form.description')"
                              @blur="$v.form.description.$touch()"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <v-layout
                        v-if="!keyboardIsUp"
                        justify-space-around
                        class="put-bottom"
                      >
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
                            type="submit"
                            >{{ $t("common.accept") }}</v-btn
                          >
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-dialog v-model="dialogC" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{ textDialogC }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="primary" @click.native="backToDashboard">{{
            $t("common.accept")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import validationLangMixin from "@/mixins/validationLangMixin";
import { mapGetters } from "vuex";
import { postContentTypeApi } from "@/api/modules";
const defaultForm = {
  name: "",
  description: ""
};
export default {
  mixins: [validationLangMixin],
  validations: {
    form: {
      name: { required },
      description: { required }
    }
  },
  validationMessages: {
    form: {
      name: {
        required: "validation.fieldRequired"
      },
      description: {
        required: "validation.fieldRequired"
      }
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      currentUser: localStorage.getItem("user"),
      loader: false,
      modal: false,
      dialogC: false,
      textDialogC: ""
    };
  },
  computed: {
    ...mapGetters(["keyboardIsUp", "user"])
  },
  methods: {
    async submit() {
      0;
      console.log(this.form);
      // let jsonUser = JSON.parse(this.currentUser);
      // let body = { username : jsonUser.email, amount : this.amount };
      // let serviceResponse = await putRefillMemberBalanceApi(body);
      let serviceResponse = await postContentTypeApi(this.form);
      if (serviceResponse.ok) {
        this.dialogC = true;
        this.textDialogC = this.$t("message.changeInformationSuccess");
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    backToDashboard() {
      this.$router.push({
        name: "Home"
      });
    }
  },
  async mounted() {
    this.form = Object.assign({}, defaultForm);
  }
};
</script>

<style>
.currencyInput {
  font-size: 2rem;
  width: 100%;
  height: 4.5rem;
  text-align: center;
  border-bottom: 1px solid;
}
</style>
