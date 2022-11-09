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
                              :label="$t('common.title')"
                              v-model="form.title"
                              required
                              :error-messages="fieldErrors('form.title')"
                              @blur="$v.form.title.$touch()"
                            ></v-text-field>
                            <v-text-field
                              color="primary"
                              :label="$t('common.description')"
                              v-model="form.description"
                              required
                              :error-messages="fieldErrors('form.description')"
                              @blur="$v.form.description.$touch()"
                            ></v-text-field>
                            <v-text-field
                              color="primary"
                              :label="$t('common.keywords')"
                              v-model="form.keywords"
                              required
                              :error-messages="fieldErrors('form.keywords')"
                              @blur="$v.form.keywords.$touch()"
                            ></v-text-field>
                            `
                            <v-select
                              :items="sites"
                              name="site"
                              item-text="name"
                              item-value="id"
                              color="primary"
                              :label="$t('common.selectSite')"
                              :error-messages="fieldErrors('form.site_id')"
                              @input="$v.form.site_id.$touch()"
                              @blur="$v.form.site_id.$touch()"
                              v-model="form.site_id"
                              class="box-input mt-4"
                            />
                            <v-select
                              :items="content_types"
                              name="content_type"
                              item-text="name"
                              item-value="id"
                              color="primary"
                              :label="$t('common.selectContentType')"
                              :error-messages="
                                fieldErrors('form.content_type_id')
                              "
                              @input="$v.form.content_type_id.$touch()"
                              @blur="$v.form.content_type_id.$touch()"
                              v-model="form.content_type_id"
                              class="box-input mt-4"
                            />
                            <input
                              @change="handleImage($event)"
                              type="file"
                              accept="image/*"
                            />
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
import {
  getAllSiteApi,
  getAllContentTypeApi,
  postContentApi
} from "@/api/modules";
const defaultForm = {
  title: "",
  description: "",
  keywords: "",
  site_id: "",
  content_type_id: ""
};
export default {
  mixins: [validationLangMixin],
  validations: {
    form: {
      title: { required },
      description: { required },
      keywords: { required },
      site_id: { required },
      content_type_id: { required }
    }
  },
  validationMessages: {
    form: {
      title: {
        required: "validation.fieldRequired"
      },
      description: {
        required: "validation.fieldRequired"
      },
      keywords: {
        required: "validation.fieldRequired"
      },
      site_id: {
        required: "validation.fieldRequired"
      },
      content_type_id: {
        required: "validation.fieldRequired"
      }
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      image: "",
      selected_image: "",
      currentUser: localStorage.getItem("user"),
      sites: [],
      content_types: [],
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
    handleImage(e) {
      console.log("U P L O A D I N G    I M A G E S  ...");
      this.selected_image = e.target.files[0]; // get first file
      this.createBase64Image(this.selected_image);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();

      reader.onload = e => {
        this.image = e.target.result;
        this.image = this.image.split(",")[1];
        // console.log(this.image);
      };
      reader.readAsDataURL(fileObject);
    },
    async getSites() {
      let serviceResponse = await getAllSiteApi();
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        this.sites = serviceResponse.data;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    async getContentTypes() {
      let serviceResponse = await getAllContentTypeApi();
      if (serviceResponse.ok) {
        this.content_types = serviceResponse.data;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    async submit() {
      console.log(this.form);
      let body = {
        title: this.form.title,
        description: this.form.description,
        keywords: this.form.keywords,
        site_id: this.form.site_id,
        content_type_id: this.form.content_type_id,
        binary_data: this.image,
        file_name: "image.png"
      };
      let serviceResponse = await postContentApi(body);
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
    await this.getSites();
    await this.getContentTypes();
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
