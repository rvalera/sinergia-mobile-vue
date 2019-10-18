<template>
  <v-container fill-height>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="0" class="text-xs-left pa-3">
          <div class="text-xs-center">
            <v-icon x-large color="primary">receipt</v-icon>
          </div>
          <p class="subheading my-4">
            <b>Destino:</b>
            {{ payData.target }}
          </p>
          <p class="subheading my-4">
            <b>Monto:</b>
            {{
              payData.amount
                | currency("$", 2, {
                  thousandsSeparator: ".",
                  decimalSeparator: ","
                })
            }}
          </p>
          <p class="subheading my-4">
            <b>Concepto:</b>
            {{ payData.concept }}
          </p>
        </v-card>
        <v-layout justify-space-around>
          <v-flex xs5>
            <v-btn
              large
              block
              round
              color="primary"
              class="mt-4"
              @click="$emit('next')"
              >Siguiente</v-btn
            >
          </v-flex>
          <v-flex xs5>
            <v-btn
              large
              block
              round
              color="gray"
              class="mt-4"
              @click="$emit('back')"
              >Volver</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: {
    payData: Object
  }
};
</script>
