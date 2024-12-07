import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LoginPage from '../../src/pages/LoginPage.vue';

describe('Página de login', () => {
  const wrapper = mount(LoginPage);

  it('deve exibir o texto "Login" na tela', () => {
    expect(wrapper.text()).toContain('Login');
  });
});
