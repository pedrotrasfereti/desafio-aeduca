<script setup>
import { computed, ref } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import useStudentStore from '../stores/studentStore';
import useUserStore from '../stores/userStore';
import { formatCPF, removeCpfMask, validateCPF } from '../utils/cpfCnpj';
import validateEmail from '../utils/validateEmail';

// Router
const router = useRouter();

// State
const studentStore = useStudentStore();
const { logout } = useUserStore();

const studentIndex = ref(-1);
const editedStudent = ref({
  ra: '',
  nome: '',
  email: '',
  cpf: '',
});

const deleteDialog = ref(false);
const dialog = ref(false);
const sessionExpiredDialog = ref(false);
const search = ref('');
const snackbar = ref({ color: '', message: '' });
const snackbarVisible = ref(false);

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
    value: ({ cpf }) => formatCPF(cpf),
  },
  { title: 'Ações', align: 'start', key: 'actions', sortable: false },
];

// Computed
const cpfRules = computed(() => [
  (value) => {
    if (validateCPF(value)) return true;
    return 'CPF inválido.';
  },
]);

const emailRules = computed(() => [
  (value) => {
    if (validateEmail(value)) return true;
    return 'Email inválido.';
  },
]);

const nameRules = computed(() => [
  (value) => {
    if (value && value.length >= 3) return true;
    return 'Nome deve ter pelo menos 3 caracteres.';
  },
]);

const raRules = computed(() => [
  (value) => {
    if (value && value.length >= 1) return true;
    return 'RA deve ter pelo menos 1 caracter.';
  },
]);

// Methods
const closeDeleteDialog = () => {
  deleteDialog.value = false;
  resetForm();
};

const closeDialog = () => {
  dialog.value = false;
  resetForm();
};

const openDialog = (student) => {
  if (student !== undefined) {
    studentIndex.value = +student.ra;
    editedStudent.value.ra = student.ra;
    editedStudent.value.nome = student.nome;
    editedStudent.value.email = student.email;
    editedStudent.value.cpf = student.cpf;
  }
  dialog.value = true;
};

const openDeleteDialog = (student) => {
  studentIndex.value = +student.ra;
  deleteDialog.value = true;
};

const resetForm = () => {
  studentIndex.value = -1;
  editedStudent.value = {
    ra: '',
    nome: '',
    email: '',
    cpf: '',
  };
};

const showSnackbar = ({ message, color }) => {
  snackbar.value = { message, color };
  snackbarVisible.value = true;

  setTimeout(() => (snackbarVisible.value = false), 6000);
};

const init = async () => {
  const { success } = await studentStore.getAllStudents();
  if (!success) sessionExpiredDialog.value = true;
};

const deleteStudent = async () => {
  const { success, message } = await studentStore.deleteStudent(
    studentIndex.value,
  );
  showSnackbar({ message, color: success ? 'success' : 'error' });
  init();
  closeDeleteDialog();
};

const saveStudent = async () => {
  const student = {
    ...editedStudent.value,
    cpf: removeCpfMask(editedStudent.value.cpf),
  };

  if (studentIndex.value === -1) {
    const { success, message } = await studentStore.createStudent(student);
    showSnackbar({ message, color: success ? 'success' : 'error' });
  } else {
    const { success, message } = await studentStore.updateStudent(
      studentIndex.value,
      student,
    );
    showSnackbar({ message, color: success ? 'success' : 'error' });
  }

  init();
  closeDialog();
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
            v-model="search"
            aria-label="Pesquisar"
            append-inner-icon="mdi-magnify"
            color="secondary"
            density="compact"
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
            @click="() => openDialog()"
          >
            Cadastrar Aluno
          </v-btn>
        </v-toolbar>

        <v-data-table
          :headers="headers"
          :items="studentStore.students"
          :items-per-page="6"
          :items-per-page-options="[3, 6, 9]"
          :loading="studentStore.loading"
          :search="search"
          items-per-page-text="Resultados por página"
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
              @click="() => openDialog(item)"
            />

            <v-btn
              :data-ra="item.ra"
              aria-label="Deletar Aluno"
              color="error-lighten-2"
              height="30"
              icon="mdi-delete"
              size="small"
              variant="text"
              width="30"
              @click="() => openDeleteDialog(item)"
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

    <!-- delete student dialog -->
    <v-dialog v-model="deleteDialog" :attach="true" max-width="400" persistent>
      <v-card title="Deletar Aluno">
        <v-card-text>Tem certeza que deseja deletar o aluno?</v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="grey"
            data-testid="cancel-delete-btn"
            variant="text"
            @click="closeDeleteDialog"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="primary"
            data-testid="confirm-delete-btn"
            variant="text"
            @click="deleteStudent"
          >
            Deletar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- register/edit student dialog -->
    <v-dialog v-model="dialog" :attach="true" max-width="500" persistent>
      <v-card>
        <v-card-title data-testid="register-dialog-title">
          <v-icon>mdi-account-school</v-icon>

          Cadastro do Aluno
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="12" md="5">
                <v-text-field
                  v-model="editedStudent.ra"
                  :disabled="studentIndex !== -1"
                  :rules="raRules"
                  color="primary"
                  data-testid="student-ra-input"
                  label="RA*"
                  placeholder="123"
                  aria-required
                  required
                />
              </v-col>

              <v-col cols="12" md="7">
                <v-text-field
                  v-model="editedStudent.cpf"
                  :disabled="studentIndex !== -1"
                  :rules="cpfRules"
                  color="primary"
                  data-testid="student-cpf-input"
                  label="CPF*"
                  placeholder="000.000.000-00"
                  aria-required
                  required
                />
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="editedStudent.nome"
                  :rules="nameRules"
                  color="primary"
                  data-testid="student-name-input"
                  label="Nome*"
                  aria-required
                  required
                />
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="editedStudent.email"
                  :rules="emailRules"
                  color="primary"
                  data-testid="student-email-input"
                  label="E-mail*"
                  placeholder="email@domain.com"
                  type="email"
                  aria-required
                  required
                />
              </v-col>
            </v-row>
          </v-container>

          <small class="text-caption text-on-surface">
            *indica campos obrigatórios
          </small>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="grey"
            data-testid="cancel-btn"
            variant="text"
            @click="closeDialog"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="primary"
            data-testid="save-btn"
            variant="text"
            @click="saveStudent"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- session expired dialog -->
    <v-dialog v-model="sessionExpiredDialog" max-width="400" persistent>
      <v-card title="Sua sessão expirou">
        <v-card-text>
          Clique no botão abaixo para ir à página de login.
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="primary"
            text="Fazer login"
            block
            @click="
              logout();
              router.push('/');
            "
          />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- success/error snackbar -->
    <v-snackbar
      v-model="snackbarVisible"
      :attach="true"
      :color="snackbar.color"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-sheet>
</template>

<style lang="scss">
tbody tr:hover {
  /* 'surface-bright' */
  background-color: #f8f9f9;
}
</style>
