<script setup>
// import { ref } from 'vue';
import { nextTick, onMounted } from 'vue';

import useStudentStore from '../stores/studentStore';

const studentStore = useStudentStore();

// const editedStudent = ref({
//   nome: '',
//   email: '',
// });

const headers = [
  {
    title: 'Registro Acadêmico',
    align: 'start',
    key: 'ra',
  },
  { title: 'Nome', align: 'start', key: 'nome' },
  {
    title: 'CPF',
    align: 'start',
    key: 'cpf',
    value: (item) => {
      const badchars = /[^\d]/g;
      const mask = /(\d{3})(\d{3})(\d{3})(\d{2})/;
      const cpf = new String(item.cpf).replace(badchars, '');
      return cpf.replace(mask, '$1.$2.$3-$4');
    },
  },
  { title: 'Ações', align: 'start', key: 'actions', sortable: false },
];

// Methods
const init = async () => {
  studentStore.getAllStudents();
  nextTick();
};

onMounted(init);
</script>

<template>
  <v-sheet color="surface" class="fill-height fill-width">
    <v-container fluid>
      <v-card class="mt-2" :elevation="2">
        <v-toolbar color="surface" flat>
          <v-toolbar-title data-testid="dashboard-title">
            Consulta de Alunos
          </v-toolbar-title>

          <v-spacer />

          <v-text-field
            color="secondary"
            density="compact"
            append-inner-icon="mdi-magnify"
            placeholder="Pesquisar..."
            variant="outlined"
            hide-details
            single-line
          />

          <v-spacer />

          <v-btn
            class="mr-3"
            color="secondary"
            variant="flat"
            flat
            data-testid="register-button"
          >
            Cadastrar Aluno
          </v-btn>
        </v-toolbar>

        <v-data-table
          :headers="headers"
          :items="studentStore.students"
          :loading="studentStore.loading"
        >
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template #item.actions="{ item }">
            <v-btn
              :data-ra="item.ra"
              class="me-2"
              aria-label="Editar Aluno"
              height="30"
              icon="mdi-pencil"
              size="small"
              variant="text"
              width="30"
            />

            <v-btn
              :data-ra="item.ra"
              aria-label="Deletar Aluno"
              height="30"
              icon="mdi-delete"
              size="small"
              variant="text"
              width="30"
            />
          </template>

          <template #no-data>
            <v-sheet
              class="d-flex flex-column align-center justify-center fill-width pt-5 pb-6"
            >
              <span class="mb-6">Nenhum dado foi encontrado.</span>

              <v-btn
                append-icon="mdi-sync"
                size="small"
                variant="tonal"
                @click="init"
              >
                Atualizar
              </v-btn>
            </v-sheet>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-sheet>
</template>

<style lang="scss">
tbody tr:hover {
  /* 'surface-bright' */
  background-color: #f8f9f9;
}
</style>
