<script setup>
import Header from '../components/HeaderComponent.vue';
import Navbar from '../components/NavbarComponent.vue';
import Snackbar from '../components/SnackbarComponent.vue';
</script>

<template>
  <v-layout>
    <Navbar />

    <Header />

    <Snackbar />

    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>
