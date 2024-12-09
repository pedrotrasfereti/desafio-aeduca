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

    studentStore.createStudent = vi.fn().mockImplementation((newStudent) => {
      mockStudents.push(newStudent);
    });

    studentStore.deleteStudent = vi.fn().mockImplementation((ra) => {
      const index = mockStudents.findIndex((student) => student.ra === ra);
      if (index !== -1) {
        mockStudents.splice(index, 1);
      }
    });

    studentStore.updateStudent = vi
      .fn()
      .mockImplementation((ra, updatedData) => {
        const student = mockStudents.find((student) => student.ra === ra);
        if (student) {
          Object.assign(student, updatedData);
        }
      });
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

    // Assertions
    expect(editButtons.length).toBe(mockStudents.length);

    editButtons.forEach((button, index) => {
      expect(button.attributes('data-ra')).toBe(String(mockStudents[index].ra));
    });
  });

  it('deve exibir a opção "Deletar" por aluno', async () => {
    const editButtons = wrapper.findAll('button[aria-label="Deletar Aluno"]');

    // Assertions
    expect(editButtons.length).toBe(mockStudents.length);

    editButtons.forEach((button, index) => {
      expect(button.attributes('data-ra')).toBe(String(mockStudents[index].ra));
    });
  });

  describe('Ao clicar em "Cadastrar Aluno"', () => {
    const registerButton = wrapper.find(
      'button[data-testid="register-button"]',
    );

    const raInput = wrapper.find('input[placeholder="Digite o RA do aluno"]');
    const nameInput = wrapper.find(
      'input[placeholder="Digite o nome do aluno"]',
    );
    const emailInput = wrapper.find(
      'input[placeholder="Digite o e-mail do aluno"]',
    );
    const cpfInput = wrapper.find('input[placeholder="Digite o CPF do aluno"]');
    const cancelBtn = wrapper.find('button[data-testid="cancel-btn"]');
    const saveBtn = wrapper.find('button[data-testid="save-btn"]');

    registerButton.trigger('click');

    // Assertions
    it('deve mostrar o modal de "Cadastro do Aluno"', () => {
      expect(wrapper.text()).toContain('Cadastro do Aluno');
    });

    it('deve exibir os campos obrigatórios vazios', () => {
      expect(raInput.exists()).toBe(true);
      expect(nameInput.exists()).toBe(true);
      expect(emailInput.exists()).toBe(true);
      expect(cpfInput.exists()).toBe(true);
      expect(raInput.element.value).toBe('');
      expect(nameInput.element.value).toBe('');
      expect(emailInput.element.value).toBe('');
      expect(cpfInput.element.value).toBe('');
    });

    describe('Ao preencher o formulário com dados válidos e clicar em Salvar', () => {
      raInput.setValue('157980');
      nameInput.setValue('Aline Correia');
      emailInput.setValue('alinecorreia@exemplo.com');
      cpfInput.setValue('58446298333');
      saveBtn.trigger('click');

      // Assertions
      it('deve criar o novo aluno na base', () => {
        expect(wrapper.text()).toContain('Aline Correia');
      });

      it('deve retornar mensagem de sucesso', () => {
        expect(wrapper.text()).toContain('Aluno cadastrado com sucesso.');
      });
    });

    describe('Ao preencher o formulário com dados válidos e clicar em Cancelar', () => {
      const rows = wrapper.findAll('tbody tr');

      raInput.setValue('157980');
      nameInput.setValue('Aline Correia');
      emailInput.setValue('alinecorreia@exemplo.com');
      cpfInput.setValue('58446298333');
      cancelBtn.trigger('click');

      // Assertions
      it('deve retornar para tela de Consulta de Alunos', () => {
        expect(wrapper.text()).toContain('Consulta de Alunos');
      });

      it('não deve persistir a gravação dos dados no banco', () => {
        expect(rows.length).toBe(mockStudents.length);
      });
    });
  });
});
