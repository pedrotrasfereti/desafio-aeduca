import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import LoginPage from '../../src/pages/LoginPage.vue';
import useUserStore from '../../src/stores/userStore';

const mockRoutePush = vi.fn();
const userStore = useUserStore();

describe('Página de login', () => {
  // Mock useRouter
  vi.mock('vue-router', () => ({
    RouterView: {},
    useRouter: () => ({
      push: mockRoutePush,
    }),
  }));

  // Mock Pinia store action
  userStore.login = vi.fn();

  const wrapper = mount(LoginPage);

  it('deve exibir o texto "Login" na tela', () => {
    expect(wrapper.text()).toContain('Login');
  });

  it('deve encontrar um input de login na tela', () => {
    const loginInput = wrapper.find(
      'input[placeholder="Digite o login de acesso"]',
    );

    expect(loginInput.exists()).toBe(true);
  });

  it('deve encontrar um input de senha na tela', () => {
    const passwordInput = wrapper.find(
      'input[placeholder="Digite a senha de acesso"]',
    );

    expect(passwordInput.exists()).toBe(true);
  });

  it('deve encontrar um botão de submit na tela com o texto "Entrar"', () => {
    const submitBtn = wrapper.find('button[type="submit"]');

    expect(submitBtn.exists()).toBe(true);
  });

  describe('Ao fazer login com credenciais inválidas', () => {
    it('exibe mensagem de erro ao submeter credenciais inválidas', async () => {
      const loginInput = wrapper.find(
        'input[placeholder="Digite o login de acesso"]',
      );
      const passwordInput = wrapper.find(
        'input[placeholder="Digite a senha de acesso"]',
      );
      const submitBtn = wrapper.find('button[type="submit"]');

      userStore.login.mockImplementation(() => ({
        success: false,
        message: 'Login ou senha inválidos',
      }));

      // Update inputs
      await loginInput.setValue('logininvalido');
      await passwordInput.setValue('senhainvalida');
      await submitBtn.trigger('click');

      // Assertions
      expect(userStore.login).toHaveBeenCalledWith({
        login: 'logininvalido',
        password: 'senhainvalida',
      });
      expect(wrapper.text()).toContain('Login ou senha inválidos');
    });
  });

  describe('Ao fazer login com credenciais válidas', () => {
    it('chama handleLogin e redireciona ao submeter credenciais válidas', async () => {
      const loginInput = wrapper.find(
        'input[placeholder="Digite o login de acesso"]',
      );
      const passwordInput = wrapper.find(
        'input[placeholder="Digite a senha de acesso"]',
      );
      const submitBtn = wrapper.find('button[type="submit"]');

      userStore.login.mockImplementation(() => ({
        success: true,
        message: '',
      }));

      // Update inputs
      await loginInput.setValue('admin');
      await passwordInput.setValue('12345678');
      await submitBtn.trigger('click');

      // Assertions
      expect(userStore.login).toHaveBeenCalledWith({
        login: 'admin',
        password: '12345678',
      });

      expect(mockRoutePush).toHaveBeenCalled();
      expect(mockRoutePush).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Dashboard' }),
      );
    });
  });
});
