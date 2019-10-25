<template>
  <v-img class="page-vimg">
    <toolbar-simple></toolbar-simple>
    <v-container fill-height pa-0>
      <v-layout align-center>
        <v-flex xs12>
          <v-card
            class="text-xs-center margin-auto border-radius6 box-pink-500-glow elevation-10 card-center-box"
          >
            <v-img>
              <v-layout align-center justify-center row fill-height>
                <v-flex xs12>
                  <div class="display-4 white--text" v-text="title"></div>
                  <p class="subheading white--text" v-html="description"></p>
                  <v-btn :to="{ name: 'Home' }" round color="primary" dark>{{
                    $t("common.goHome")
                  }}</v-btn>
                </v-flex>
              </v-layout>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>

<script>
import ToolbarSimple from "@/layouts/FullPageSimple/Toolbar";
export default {
  data() {
    return {
      title: "404",
      description: this.$t("error404.description")
    };
  },
  components: {
    ToolbarSimple
  }
};
</script>
