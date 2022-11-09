//
<template>
  //
  <div class="h-full">
    //
    <template v-if="userType === USER_TYPE_CLIENT">
      // <client-dashboard /> //
    </template>
    //
    <template v-else>
      // <client-dashboard /> //
    </template>
    //
  </div>
  //
</template>

<template>
  <div class="h-full">
    <template>
      <client-dashboard />
    </template>
  </div>
</template>

<script>
import ClientDashboard from "./ClientDashboard";
//import AffiliateDashboard from "./AffiliateDashboard";
import { USER_TYPE_CLIENT } from "@/config/constants";
export default {
  data() {
    return {
      userType: localStorage.userType,
      USER_TYPE_CLIENT
    };
  },
  components: {
    ClientDashboard
    //  AffiliateDashboard
  }
};
</script>
