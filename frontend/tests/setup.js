import { config } from '@vue/test-utils';
import ResizeObserver from 'resize-observer-polyfill';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

// Set up ResizeObserver globally
global.ResizeObserver = ResizeObserver;

// Attach Vuetify to Vue Test Utils
config.global.plugins = [vuetify];
