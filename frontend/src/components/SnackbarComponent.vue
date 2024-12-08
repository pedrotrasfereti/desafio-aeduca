<script setup>
import useSnackbarStore from '../stores/snackbarStore';

const { message, color, timeout } = useSnackbarStore();
</script>

<template>
  <v-snackbar v-model="visible" :color="color" :timeout="timeout" bottom right>
    {{ message }}
  </v-snackbar>
</template>
