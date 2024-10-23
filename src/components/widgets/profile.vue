<script>
import Loader from "./loader";
// import profile from "@/assets/images/profile-img.png";
import { avatar1 } from "@/assets/images/users/data"
import { useAuthStore } from "@/state/pinia";


const auth = useAuthStore();
/**
 * Profile component
 */
export default {
  components: {
    Loader,
  },
  data() {
    return { 
     avatar1,
     userData: auth.userData,
     url_apps: process.env.VUE_APP_BACKEND_URL,
     userRoleText: auth.userRole.map((dataRole) => dataRole.role.role_name).join(", "),
  };
  },
  mounted() { },
  props: {
    updating: {
      type: Boolean,
    },
  },
};
</script>
<template>
  <Loader :loading="updating">
    <BCard class="overflow-hidden" no-body>
      <div class="bg-primary-subtle">
        <BRow>
          <BCol cols="7">
            <div class="text-primary p-3">
              <h5 class="text-primary">Welcome Back !</h5>
              <p>MentorIn Dashboard</p>
            </div>
          </BCol>
          <BCol cols="5" class="align-self-end">
            <img :src="profile" alt class="img-fluid" />
          </BCol>
        </BRow>
      </div>
      <BCardBody class="pt-0">
        <BRow>
          <BCol sm="6">
            <div v-if="userData.avatar == null">
              <div class="avatar-md profile-user-wid mb-4">
                <img :src="avatar9" alt class="img-thumbnail rounded-circle" />
              </div>
            </div>
            <div v-else>
              <div class="avatar-md profile-user-wid mb-4">
                <img v-bind:src="url_apps + userData.avatar" alt class="img-thumbnail rounded-circle" />
              </div>
            </div>
            <h5 class="font-size-15 text-truncate">{{ userData.name }}</h5>
            <p class="text-muted mb-0 text-truncate">{{ userRoleText }}</p>
            <div class="mt-4">
                <RouterLink to="/accout/profile-user"  class="btn btn-primary btn-sm">
                  View Profile
                  <i class="mdi mdi-arrow-right ms-1"></i>
                </RouterLink>
              </div>
          </BCol>

          <BCol sm="5">
            <div class="pt-4">
              <BRow>
                <BCol cols="12">
                  <h5 class="font-size-15">2/09/2024</h5>
                  <p class="text-muted mb-0">Last Mentoring</p>
                </BCol>
                <BCol cols="12 mt-3">
                  <h5 class="font-size-15">3/09/2024</h5>
                  <p class="text-muted mb-0">Next Mentoring</p>
                </BCol>
              </BRow>
            </div>
          </BCol>
        </BRow>
      </BCardBody>
    </BCard>
  </Loader>
</template>
