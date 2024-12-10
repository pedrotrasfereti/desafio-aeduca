import { mount } from '@vue/test-utils';
import { beforeAll, describe, expect, it, vi, beforeEach } from 'vitest';
import { nextTick } from 'vue';

import DashboardPage from '../../src/pages/DashboardPage.vue';
import useStudentStore from '../../src/stores/studentStore';

const studentStore = useStudentStore();

const findAfterNextTick = async (wrapper, selector) => {
  await nextTick();
  return wrapper.find(selector);
};

describe('Painel de gerenciamento', () => {
  // Mock Pinia store state
  const mockStudents = [
    {
      nome: 'João Silva',
      ra: '101235',
      cpf: '76000586930',
      email: 'joao@exemplo.com',
    },
    {
      nome: 'Maria Souza',
      ra: '111687',
      cpf: '97676923808',
      email: 'maria@exemplo.com',
    },
  ];

  beforeEach(() => {
    // Force value reassignment instead of pointing
    studentStore.students = JSON.parse(JSON.stringify(mockStudents));
  });

  beforeAll(() => {
    // Mock Pinia store actions
    studentStore.getAllStudents = vi
      .fn()
      .mockImplementation(() => ({ success: true, message: '' }));

    studentStore.createStudent = vi.fn().mockImplementation((newStudent) => {
      studentStore.students.push(newStudent);
      return { success: true, message: 'Aluno cadastrado com sucesso.' };
    });

    studentStore.deleteStudent = vi.fn().mockImplementation((ra) => {
      studentStore.students = studentStore.students.filter(
        (student) => student.ra !== ra.toString(),
      );
      return { success: true, message: '' };
    });

    studentStore.updateStudent = vi
      .fn()
      .mockImplementation((ra, updatedData) => {
        const index = studentStore.students.findIndex(
          (student) => student.ra === ra.toString(),
        );

        if (index !== -1) {
          studentStore.students[index] = {
            ...studentStore.students[index],
            ...updatedData,
          };
        }

        return { success: true, message: '' };
      });
  });

  it('deve exibir o título "Consulta de Alunos"', () => {
    const wrapper = mount(DashboardPage);

    const title = wrapper.find('[data-testid="dashboard-title"]');

    // Assertions
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Consulta de Alunos');
  });

  it('deve exibir a opção "Cadastrar Aluno" ao topo', () => {
    const wrapper = mount(DashboardPage);

    const button = wrapper.find('button[data-testid="register-button"]');

    // Assertions
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Cadastrar Aluno');
  });

  it('deve listar os dados dos alunos cadastrados', () => {
    const wrapper = mount(DashboardPage);

    const rows = wrapper.findAll('tbody tr');

    // Assertions
    expect(rows.length).toBe(mockStudents.length);

    rows.forEach((row, index) => {
      const cells = row.findAll('td');
      expect(cells[0].text()).toBe(mockStudents[index].ra);
      expect(cells[1].text()).toBe(mockStudents[index].nome);
    });
  });

  it('deve exibir a opção "Editar" por aluno', () => {
    const wrapper = mount(DashboardPage);

    const editButtons = wrapper.findAll('button[aria-label="Editar Aluno"]');

    // Assertions
    expect(editButtons.length).toBe(mockStudents.length);

    editButtons.forEach((button, index) => {
      expect(button.attributes('data-ra')).toBe(String(mockStudents[index].ra));
    });
  });

  it('deve exibir a opção "Deletar" por aluno', () => {
    const wrapper = mount(DashboardPage);

    const editButtons = wrapper.findAll('button[aria-label="Deletar Aluno"]');

    // Assertions
    expect(editButtons.length).toBe(mockStudents.length);

    editButtons.forEach((button, index) => {
      expect(button.attributes('data-ra')).toBe(String(mockStudents[index].ra));
    });
  });

  describe('Ao clicar em "Cadastrar Aluno"', () => {
    // Assertions
    it('deve mostrar o modal de "Cadastro do Aluno"', async () => {
      const wrapper = mount(DashboardPage);

      const registerButton = wrapper.find(
        'button[data-testid="register-button"]',
      );

      registerButton.trigger('click');

      const cardTitle = await findAfterNextTick(
        wrapper,
        'div[data-testid="register-dialog-title"]',
      );

      // Assertions
      expect(cardTitle.exists()).toBe(true);
      expect(cardTitle.text()).toContain('Cadastro do Aluno');
    });

    it('deve exibir os campos obrigatórios vazios', async () => {
      const wrapper = mount(DashboardPage);

      const registerButton = wrapper.find(
        'button[data-testid="register-button"]',
      );

      registerButton.trigger('click');

      const cpfInput = await findAfterNextTick(
        wrapper,
        'div[data-testid="student-cpf-input"] input',
      );
      const emailInput = await findAfterNextTick(
        wrapper,
        'div[data-testid="student-email-input"] input',
      );
      const nameInput = await findAfterNextTick(
        wrapper,
        'div[data-testid="student-name-input"] input',
      );
      const raInput = await findAfterNextTick(
        wrapper,
        'div[data-testid="student-ra-input"] input',
      );

      // Assertions
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
      it('deve criar o novo aluno na base e mostrar mensagem de sucesso', async () => {
        const wrapper = mount(DashboardPage);

        const registerButton = wrapper.find(
          'button[data-testid="register-button"]',
        );

        registerButton.trigger('click');

        const cpfInput = await findAfterNextTick(
          wrapper,
          'div[data-testid="student-cpf-input"] input',
        );
        const emailInput = await findAfterNextTick(
          wrapper,
          'div[data-testid="student-email-input"] input',
        );
        const nameInput = await findAfterNextTick(
          wrapper,
          'div[data-testid="student-name-input"] input',
        );
        const raInput = await findAfterNextTick(
          wrapper,
          'div[data-testid="student-ra-input"] input',
        );
        const saveBtn = await findAfterNextTick(
          wrapper,
          'button[data-testid="save-btn"]',
        );

        raInput.setValue('157980');
        nameInput.setValue('Aline Correia');
        emailInput.setValue('alinecorreia@exemplo.com');
        cpfInput.setValue('58446298333');
        saveBtn.trigger('click');

        await nextTick();

        // Assertions
        expect(studentStore.createStudent).toHaveBeenCalled();
        expect(wrapper.text()).toContain('Aline Correia');

        await nextTick();

        expect(wrapper.text()).toContain('Aluno cadastrado com sucesso.');
      });
    });

    describe('Ao preencher o formulário com dados válidos e clicar em Cancelar', () => {
      it('deve retornar para tela de Consulta de Alunos', async () => {
        const wrapper = mount(DashboardPage);

        const registerButton = wrapper.find(
          'button[data-testid="register-button"]',
        );

        registerButton.trigger('click');

        const cancelBtn = await findAfterNextTick(
          wrapper,
          'button[data-testid="cancel-btn"]',
        );
        const cpfInput = await findAfterNextTick(
          wrapper,
          'div[data-testid="student-cpf-input"] input',
        );
        const emailInput = await findAfterNextTick(
          wrapper,
          'div[data-testid="student-email-input"] input',
        );
        const nameInput = await findAfterNextTick(
          wrapper,
          'div[data-testid="student-name-input"] input',
        );
        const raInput = await findAfterNextTick(
          wrapper,
          'div[data-testid="student-ra-input"] input',
        );

        raInput.setValue('157980');
        nameInput.setValue('Aline Correia');
        emailInput.setValue('alinecorreia@exemplo.com');
        cpfInput.setValue('58446298333');
        cancelBtn.trigger('click');

        // Assertions
        expect(wrapper.text()).toContain('Consulta de Alunos');

        // "Não deve persistir a gravação dos dados no banco"
        const rows = wrapper.findAll('tbody tr');

        expect(rows.length).toBe(mockStudents.length);
      });
    });
  });

  describe('Ao clicar no ícone de editar na listagem de alunos', () => {
    // Assertions
    it('deve mostrar o modal de "Cadastro do Aluno"', async () => {
      const wrapper = mount(DashboardPage);

      const firstRow = wrapper.findAll('tbody tr')[0];
      const editBtn = firstRow.find('button[aria-label="Editar Aluno"]');

      editBtn.trigger('click');

      const cardTitle = await findAfterNextTick(
        wrapper,
        'div[data-testid="register-dialog-title"]',
      );

      // Assertions
      expect(cardTitle.exists()).toBe(true);
      expect(cardTitle.text()).toContain('Cadastro do Aluno');
    });

    it('deve exibir os campos de cadastro preenchidos', async () => {
      const wrapper = mount(DashboardPage);

      const firstRow = wrapper.findAll('tbody tr')[0];
      const editBtn = firstRow.find('button[aria-label="Editar Aluno"]');

      editBtn.trigger('click');

      const cpfInput = await findAfterNextTick(
        wrapper,
        'div[data-testid="student-cpf-input"] input',
      );
      const emailInput = await findAfterNextTick(
        wrapper,
        'div[data-testid="student-email-input"] input',
      );
      const nameInput = await findAfterNextTick(
        wrapper,
        'div[data-testid="student-name-input"] input',
      );
      const raInput = await findAfterNextTick(
        wrapper,
        'div[data-testid="student-ra-input"] input',
      );

      // Assertions
      expect(raInput.exists()).toBe(true);
      expect(nameInput.exists()).toBe(true);
      expect(emailInput.exists()).toBe(true);
      expect(cpfInput.exists()).toBe(true);
      expect(raInput.element.value).toBe('101235');
      expect(nameInput.element.value).toBe('João Silva');
      expect(emailInput.element.value).toBe('joao@exemplo.com');
      expect(cpfInput.element.value).toBe('76000586930');
    });

    it('deve permitir edição apenas dos campos permitidos', async () => {
      const wrapper = mount(DashboardPage);

      const firstRow = wrapper.findAll('tbody tr')[0];
      const editBtn = firstRow.find('button[aria-label="Editar Aluno"]');

      editBtn.trigger('click');

      const cpfInput = await findAfterNextTick(
        wrapper,
        'div[data-testid="student-cpf-input"] input',
      );
      const emailInput = await findAfterNextTick(
        wrapper,
        'div[data-testid="student-email-input"] input',
      );
      const nameInput = await findAfterNextTick(
        wrapper,
        'div[data-testid="student-name-input"] input',
      );
      const raInput = await findAfterNextTick(
        wrapper,
        'div[data-testid="student-ra-input"] input',
      );

      // Assertions
      expect(cpfInput.attributes('disabled')).toBeDefined();
      expect(raInput.attributes('disabled')).toBeDefined();
      expect(emailInput.attributes('disabled')).toBeUndefined();
      expect(nameInput.attributes('disabled')).toBeUndefined();
    });

    describe('Ao preencher o formulário com dados válidos e clicar em Salvar', () => {
      it('deve gravar os dados atualizados na base', async () => {
        const wrapper = mount(DashboardPage);

        const firstRow = wrapper.findAll('tbody tr')[0];
        const editBtn = firstRow.find('button[aria-label="Editar Aluno"]');

        editBtn.trigger('click');

        const nameInput = await findAfterNextTick(
          wrapper,
          'div[data-testid="student-name-input"] input',
        );
        const saveBtn = await findAfterNextTick(
          wrapper,
          'button[data-testid="save-btn"]',
        );

        nameInput.setValue('João Costa');
        saveBtn.trigger('click');

        await nextTick();

        // Assertions
        expect(studentStore.updateStudent).toHaveBeenCalled();

        expect(firstRow.text()).toContain('João Costa');
      });
    });

    describe('Ao preencher o formulário com dados válidos e clicar em Cancelar', () => {
      it('deve retornar para tela de Consulta de Alunos', async () => {
        const wrapper = mount(DashboardPage);

        const registerButton = wrapper.find(
          'button[data-testid="register-button"]',
        );

        registerButton.trigger('click');

        const cancelBtn = await findAfterNextTick(
          wrapper,
          'button[data-testid="cancel-btn"]',
        );
        const emailInput = await findAfterNextTick(
          wrapper,
          'div[data-testid="student-email-input"] input',
        );
        const nameInput = await findAfterNextTick(
          wrapper,
          'div[data-testid="student-name-input"] input',
        );

        nameInput.setValue('João Costa');
        emailInput.setValue('joao@teleworm.us');
        cancelBtn.trigger('click');

        // Assertions
        expect(wrapper.text()).toContain('Consulta de Alunos');

        // "Não deve persistir a gravação dos dados no banco"
        const firstRow = wrapper.findAll('tbody tr')[0];

        expect(firstRow.text()).toContain('João Silva');
      });
    });
  });

  describe('Ao clicar no ícone de deletar na listagem de alunos', () => {
    it('deve mostrar o modal de "Deletar Aluno"', async () => {
      const wrapper = mount(DashboardPage);

      const firstRow = wrapper.findAll('tbody tr')[0];
      const deleteBtn = firstRow.find('button[aria-label="Deletar Aluno"]');

      deleteBtn.trigger('click');

      await nextTick();

      // Assertions
      expect(wrapper.html()).toContain(
        'Tem certeza que deseja deletar o aluno?',
      );
    });

    describe('Ao clicar em Deletar', () => {
      it('deve excluir o registro do aluno', async () => {
        const wrapper = mount(DashboardPage);

        const firstRow = wrapper.findAll('tbody tr')[0];
        const deleteBtn = firstRow.find('button[aria-label="Deletar Aluno"]');

        deleteBtn.trigger('click');

        const confirmDeleteBtn = await findAfterNextTick(
          wrapper,
          'button[data-testid="confirm-delete-btn"]',
        );

        confirmDeleteBtn.trigger('click');

        await nextTick();

        // Assertions
        expect(studentStore.deleteStudent).toHaveBeenCalled();

        const rows = wrapper.findAll('tbody tr');
        expect(rows.length).toBe(mockStudents.length - 1);
      });
    });

    describe('Ao clicar em Cancelar', () => {
      it('não deve persistir a exclusão', async () => {
        const wrapper = mount(DashboardPage);

        const firstRow = wrapper.findAll('tbody tr')[0];
        const deleteBtn = firstRow.find('button[aria-label="Deletar Aluno"]');

        deleteBtn.trigger('click');

        const cancelDeleteBtn = await findAfterNextTick(
          wrapper,
          'button[data-testid="cancel-delete-btn"]',
        );

        cancelDeleteBtn.trigger('click');

        // Assertions
        const rows = wrapper.findAll('tbody tr');
        expect(rows.length).toBe(mockStudents.length);
        expect(firstRow.text()).toContain('João Silva');
      });
    });
  });
});
