<script setup>
import useUserStore from '../stores/userStore';

const userStore = useUserStore();

const user = userStore.user.login;
const role = userStore.user.role;
</script>

<template>
  <v-app-bar color="surface-light" density="comfortable" :elevation="2">
    <!-- menu icon -->
    <v-app-bar-nav-icon color="on-surface-light" />

    <v-spacer />

    <!-- user info -->
    <div>
      <v-list bg-color="surface-light" style="width: 150px">
        <v-list-item>
          <template #prepend>
            <v-icon color="grey-darken-1" size="x-large">
              mdi-account-circle
            </v-icon>
          </template>

          <template #title>
            <span class="text-capitalize font-weight-medium">
              {{ user }}
            </span>
          </template>

          <template #subtitle>
            <span class="text-capitalize font-weight-medium">
              {{ role }}
            </span>
          </template>
        </v-list-item>
      </v-list>
    </div>
  </v-app-bar>
</template>
