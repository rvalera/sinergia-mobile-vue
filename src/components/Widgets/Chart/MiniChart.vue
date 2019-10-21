<template>
  <v-card elevation="0" :color="cardColorSet" :dark="computeCardDark">
    <v-card-text class="textAlign">
      <p class="subheading my-0 grey--text text-right">{{ title }}</p>
      <span class="display-1 font-weight-black green--text darken-4">
        {{ subtitleLarge }}
      </span>
    </v-card-text>

    <v-layout row>
      <v-flex xs10></v-flex>
      <v-flex xs2>
        <v-btn icon outline color="blue" @click="showModal">
          <v-icon color="blue">mdi-filter</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-responsive class="white--text">
      <component
        :is="type"
        :data="setData"
        :options="setOptions"
        :height="setHeight"
        :gradient="setGradient"
        :gradientSet="setGradientData"
        :linearStroke="linearStrokeData"
      ></component>
    </v-responsive>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import ChartJs from "@/components/ChartJs";

export default {
  props: {
    type: String,
    title: String,
    subtitleLarge: String,
    subTitle: String,
    preSubtitle: String,
    icon: String,
    cardColor: {
      type: String,
      default: "white"
    },
    iconColor: {
      type: String,
      default: "primary"
    },
    data: Object,
    option: Object,
    height: {
      type: Number,
      default: 140
    },
    gradient: {
      type: Boolean,
      default: false
    },
    gradientSet: Array,
    linearStroke: {
      type: Array,
      default: () => [500, 0, 200, 0]
    }
  },
  components: {
    ...ChartJs
  },
  computed: {
    ...mapGetters({
      colorScheme: "colorScheme"
    }),
    cardColorSet() {
      return this.cardColor === "white" && this.colorScheme.dark
        ? "dark"
        : this.cardColor;
    },
    computeCardDark() {
      return this.cardColor !== "white";
    },
    setData() {
      return this.data;
    },
    setOptions() {
      return this.option;
    },
    setHeight() {
      return this.height;
    },
    setGradient() {
      return this.gradient;
    },
    setGradientData() {
      return this.gradientSet;
    },
    linearStrokeData() {
      return this.linearStroke;
    }
  },
  methods: {
    showModal() {
      this.$emit("show", {});
    }
  },
  mounted() {
    // chart.canvas.parentNode.style.width = '128px';
  }
};
</script>
<style>
.textAlign {
  text-align: center;
  padding-bottom: 0px !important;
}
</style>
