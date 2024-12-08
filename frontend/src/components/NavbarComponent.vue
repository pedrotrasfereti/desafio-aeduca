<template>
  <v-navigation-drawer color="background-variant" permanent>
    <div class="d-flex flex-column fill-height">
      <v-list bg-color="background">
        <v-list-item>
          <v-img
            class="mx-auto ma-6"
            max-width="125"
            src="../assets/logo.png"
          />
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list lines="one" nav>
        <v-list-subheader class="text-grey-lighten-2">
          Módulo Acadêmico
        </v-list-subheader>

        <v-list-item
          prepend-icon="mdi-account-school"
          link
          active
          value="alunos"
        >
          <template #title>
            <span>Consulta de Alunos</span>
          </template>
        </v-list-item>
      </v-list>

      <v-spacer />

      <v-btn
        class="text-body-1"
        variant="tonal"
        size="x-large"
        prepend-icon="mdi-logout"
        rounded="0"
      >
        <span class="text-overline">Sair</span>
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>
