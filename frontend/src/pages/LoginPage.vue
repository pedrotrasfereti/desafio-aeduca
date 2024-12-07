<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

// Router
const router = useRouter();

// State
import useUserStore from '../stores/userStore';

const { loading, login } = useUserStore();

const credentials = ref({ login: '', password: '' });
const passwordVisible = ref(false);
const error = ref(false);

// Computed
const loginRules = computed(() => [
  (value) => {
    if (value && value.length >= 3) return true;
    return 'Login deve ter pelo menos 3 caracteres.';
  },
]);

const passwordRules = computed(() => [
  (value) => {
    if (value && value.length >= 3) return true;
    return 'A senha deve ter pelo menos 8 caracteres.';
  },
]);

// Methods
const handleLogin = async () => {
  const { success, message } = await login(credentials.value);

  if (!success) {
    error.value = message;
  } else {
    error.value = false;
    router.push({ name: 'Dashboard' });
  }
};
</script>

<template>
  <v-container class="d-flex flex-column align-center" height="100vh" fluid>
    <div>
      <v-img
        class="mx-auto mt-12 mb-6"
        max-width="168"
        src="../assets/logo.png"
      />

      <v-card color="surface" width="400">
        <template #title>
          <span class="font-weight-bold">Login</span>
        </template>

        <v-card-text class="bg-surface-light pt-4">
          <v-form validate-on="submit lazy invalid-input" @submit.prevent>
            <v-chip
              v-if="error"
              class="text-subtitle-1 ml-1 mb-3"
              color="error"
              density="comfortable"
              size="large"
              label
            >
              <v-icon icon="mdi-alert-circle-outline" start />

              {{ error }}
            </v-chip>

            <div class="text-subtitle-1 mb-1">Login</div>

            <v-text-field
              v-model="credentials.login"
              :rules="loginRules"
              class="mb-3"
              density="compact"
              prepend-inner-icon="mdi-account-outline"
              placeholder="Digite o login de acesso"
              hint="Dica: admin"
              variant="outlined"
            />

            <div class="text-subtitle-1 mb-1">Senha</div>

            <v-text-field
              v-model="credentials.password"
              :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="passwordVisible ? 'text' : 'password'"
              :rules="passwordRules"
              class="mb-3"
              density="compact"
              prepend-inner-icon="mdi-lock-outline"
              placeholder="Digite a senha de acesso"
              hint="Dica: 12345678"
              variant="outlined"
              @click:append-inner="passwordVisible = !passwordVisible"
            />

            <v-btn
              :loading="loading"
              color="primary"
              class="mt-3 mb-2"
              type="submit"
              size="large"
              block
              @click="handleLogin"
            >
              Entrar

              <v-icon icon="mdi-login" end />
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<style lang="scss" scoped></style>
