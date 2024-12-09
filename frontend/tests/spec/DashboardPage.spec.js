import { mount } from '@vue/test-utils';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import DashboardPage from '../../src/pages/DashboardPage.vue';
import useStudentStore from '../../src/stores/studentStore';

const studentStore = useStudentStore();

describe('Painel de gerenciamento', () => {
  // Mock Pinia store state
  const mockStudents = [
    { id: 1, nome: 'João Silva', ra: '101235' },
    { id: 2, nome: 'Maria Souza', ra: '111687' },
  ];

  beforeAll(() => {
    studentStore.students = mockStudents;

    // Mock Pinia store actions
    studentStore.getAllStudents = vi.fn().mockImplementation(() => {});
    studentStore.createStudent = vi.fn().mockImplementation(() => {});
    studentStore.deleteStudent = vi.fn().mockImplementation(() => {});
    studentStore.updateStudent = vi.fn().mockImplementation(() => {});
  });

  const wrapper = mount(DashboardPage);

  it('deve exibir o título "Consulta de Alunos"', () => {
    const title = wrapper.find('[data-testid="dashboard-title"]');

    // Assertions
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Consulta de Alunos');
  });

  it('deve exibir a opção "Cadastrar Aluno" ao topo', () => {
    const button = wrapper.find('button[data-testid="register-button"]');

    // Assertions
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Cadastrar Aluno');
  });

  it('deve listar os dados dos alunos cadastrados', async () => {
    const rows = wrapper.findAll('tbody tr');

    // Assertions
    expect(rows.length).toBe(mockStudents.length);

    rows.forEach((row, index) => {
      const cells = row.findAll('td');
      expect(cells[0].text()).toBe(mockStudents[index].nome);
      expect(cells[1].text()).toBe(mockStudents[index].ra);
    });
  });

  it('deve exibir a opção "Editar" por aluno', async () => {
    const editButtons = wrapper.findAll('button[aria-label="Editar Aluno"]');

    expect(editButtons.length).toBe(mockStudents.length);

    editButtons.forEach((button, index) => {
      expect(button.attributes('data-ra')).toBe(String(mockStudents[index].ra));
    });
  });

  it('deve exibir a opção "Deletar" por aluno', async () => {
    const editButtons = wrapper.findAll('button[aria-label="Deletar Aluno"]');

    expect(editButtons.length).toBe(mockStudents.length);

    editButtons.forEach((button, index) => {
      expect(button.attributes('data-ra')).toBe(String(mockStudents[index].ra));
    });
  });
});
