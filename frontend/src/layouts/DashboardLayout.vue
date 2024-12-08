<script setup>
import Header from '../components/HeaderComponent.vue';
import Navbar from '../components/NavbarComponent.vue';
</script>

<template>
  <v-layout>
    <Navbar />

    <Header />

    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>
