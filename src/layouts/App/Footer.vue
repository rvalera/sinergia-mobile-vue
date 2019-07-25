<template>
  <v-footer
    :fixed="fixedFooter"
    :inset="!fixedFooter"
    :class="[!footer ? 'hide' : '', navFooterScheme]"
    app
  >
    <div class="pa-3">
      &copy; {{ new Date().getFullYear() }} NAJO Consultores.
    </div>
    <v-spacer></v-spacer>
    <div class="pa-3"></div>
  </v-footer>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      fixedFooter: "fixedFooter",
      footer: "showFooter",
      navFooterScheme: "navFooterScheme"
    })
  }
};
</script>
