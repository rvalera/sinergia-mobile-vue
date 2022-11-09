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

          <v-card-actions>
            <v-btn icon @click="handleLove(item)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon @click="handleFollow(item)">
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
          </v-card-actions>

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
  getAllContentApi,
  putFollowSiteApi,
  putLoveSiteApi
} from "@/api/modules";
// import ContentList from "./ContentList";
export default {
  data: () => ({
    content: [],
    fetched: false,
    show: false
  }),
  methods: {
    async getAllContent() {
      let serviceResponse = await getAllContentApi();
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
    await this.getAllContent();
  }
};
</script>
