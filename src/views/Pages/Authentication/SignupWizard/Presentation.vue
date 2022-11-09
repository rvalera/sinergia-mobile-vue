<template>
  <v-layout wrap :style="{ height: height + 'px' }">
    <v-flex xs12 primary class="background-image">
      <v-container fill-height>
        <v-layout>
          <v-flex xs12 class="text-xs-center">
            <p color="primary" class="display-1 primary--text font-weight-bold">
              Bienvenido a DOCFabric
            </p>
            <div></div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <div class="put-bottom px-3">
      <v-btn
        color="primary"
        round
        block
        @click="$emit('next')"
        class="headline ml-0"
      >
        {{ $t("common.continue") }}
      </v-btn>
    </div>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      height: window.innerHeight - 72 - 56 // 72 is stepper header size, 56 is navbar header
    };
  }
};
</script>

<style scoped>
.background-image {
  background-image: url("/static/signup_wizard.png");
  background-size: cover;
}
</style>
