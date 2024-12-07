import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DashboardPage from '../../src/pages/DashboardPage.vue';

describe('Painel de gerenciamento', () => {
  const wrapper = mount(DashboardPage);

  it('deve exibir o texto "Dashboard" na tela', () => {
    expect(wrapper.text()).toContain('Dashboard');
  });
});
