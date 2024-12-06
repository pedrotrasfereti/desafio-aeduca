import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import HelloWorld from '../../src/components/HelloWorld.vue';

test('displays message', () => {
  const wrapper = mount(
    {
      template: '<v-layout><hello-world></hello-world></v-layout>',
    },
    {
      global: {
        components: {
          HelloWorld,
        },
      },
    },
  );

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Hello World!');
});
