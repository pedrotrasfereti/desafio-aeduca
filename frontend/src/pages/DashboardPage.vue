<script setup></script>

<template>
  <v-sheet color="surface" class="fill-height fill-width">
    <v-container fluid>
      <v-card class="mt-2" :elevation="2">
        <v-toolbar color="surface" flat>
          <v-toolbar-title>Consulta de Alunos</v-toolbar-title>

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

          <v-btn class="mr-3" color="secondary" variant="flat" flat>
            Cadastrar Aluno
          </v-btn>
        </v-toolbar>

        <v-data-table>
          <thead class="bg-surface-light">
            <tr>
              <th class="text-left">Registro Acadêmico</th>
              <th class="text-left">Nome</th>
              <th class="text-left">CPF</th>
              <th class="text-left">Ações</th>
            </tr>
          </thead>

          <tbody class="stripe">
            <tr>
              <td>Item 1</td>
              <td>Item 2</td>
              <td>Item 1</td>
              <td>Item 2</td>
            </tr>

            <tr>
              <td>Item 1</td>
              <td>Item 2</td>
              <td>Item 1</td>
              <td>Item 2</td>
            </tr>

            <tr>
              <td>Item 1</td>
              <td>Item 2</td>
              <td>Item 1</td>
              <td>Item 2</td>
            </tr>

            <tr>
              <td>Item 1</td>
              <td>Item 2</td>
              <td>Item 1</td>
              <td>Item 2</td>
            </tr>
          </tbody>
        </v-data-table>
      </v-card>
    </v-container>
  </v-sheet>
</template>

<style lang="scss">
.stripe {
  & tr:hover {
    /* 'surface-bright' */
    background-color: #f8f9f9;
  }
}
</style>
