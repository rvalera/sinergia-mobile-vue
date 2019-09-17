<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="teal" dark>
          <v-toolbar-title>Tarjetas</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-divider :inset="true" :key="index"></v-divider>
            <v-list-tile :key="item.title" avatar @click="handleClick(index)">
              <v-list-tile-avatar width="60px" tile>
                <v-img width="60px" :src="item.avatar"></v-img>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title
                  v-html="item.subtitle"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-tile
                      v-for="(item, i) in items2"
                      :key="i"
                      @click="handleClick(i)"
                    >
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
//import { getAppCardsData } from "@/api/modules";
export default {
  data: () => ({
    items: [
      {
        avatar:
          "https://www.trzcacak.rs/myfile/full/367-3670440_credit-card.png",
        title: "Brunch this weekend?",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },

      {
        avatar:
          "https://www.trzcacak.rs/myfile/full/149-1497778_card-back-png-transparent-background-credit-card-icon.png",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },

      {
        avatar:
          "https://www.trzcacak.rs/myfile/full/149-1497778_card-back-png-transparent-background-credit-card-icon.png",
        title: "Oui oui",
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      },

      {
        avatar:
          "https://www.trzcacak.rs/myfile/full/149-1497778_card-back-png-transparent-background-credit-card-icon.png",
        title: "Birthday gift",
        subtitle:
          "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },

      {
        avatar:
          "https://www.trzcacak.rs/myfile/full/149-1497778_card-back-png-transparent-background-credit-card-icon.png",
        title: "Recipe to try",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ],
    items2: [
      { title: "Movimientos" },
      { title: "Cambio de Pin" },
      { title: "Bloqueo/Desbloqueo" }
    ]
  }),
  methods: {
    handleClick: data => {
      console.log(data);
    }
  },
  async mounted() {
    // var serviceResponse =  await getAppCardsData();
    console.log("algo");
  }
};
</script>
