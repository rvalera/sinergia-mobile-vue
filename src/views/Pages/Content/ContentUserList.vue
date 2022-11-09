<template>
  <v-layout row>
    <v-flex>
      <template v-if="fetched && !content.length">
        <v-flex xs12 sm6 class="text-xs-center pa-4">
          <v-alert :value="true" dense type="info" outline>
            <strong> {{ $t("content.withoutContent") }}</strong>
          </v-alert>
        </v-flex>
      </template>
      <template
        v-else-if="fetched && content.length"
        v-for="(item, index) in content"
      >
        <v-card class="mx-auto" max-width="344">
          <v-img
            v-bind:src="
              'http://localhost:5000/api/v1/entities/content/binary/' + item.id
            "
            height="200px"
          ></v-img>

          <v-card-title class="text-h5">
            {{ item.title }}
          </v-card-title>

          <v-card-subtitle>
            {{ item.keywords }}
          </v-card-subtitle>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text>{{ item.description }}</v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import {
  getMemberContentApi,
  putFollowSiteApi,
  putLoveSiteApi
} from "@/api/modules";
import ContentUserList from "./ContentUserList";
export default {
  data: () => ({
    content: [],
    fetched: false,
    currentUser: localStorage.getItem("user"),
    show: false
  }),
  methods: {
    async getUserContent() {
      let jsonUser = JSON.parse(this.currentUser);
      let serviceResponse = await getMemberContentApi(jsonUser.email);
      if (serviceResponse.ok) {
        this.content = serviceResponse.data;
        this.fetched = true;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    async handleFollow(item) {
      let payload = { id: item.site_id };
      var serviceResponse = await putFollowSiteApi(payload);
      if (serviceResponse.ok) {
        const params = { text: "Follow" };
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    async handleLove(item) {
      let payload = { id: item.site_id };
      var serviceResponse = await putLoveSiteApi(payload);
      if (serviceResponse.ok) {
        const params = { text: "Love" };
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    }
  },
  async mounted() {
    await this.getUserContent();
  }
};
</script>
