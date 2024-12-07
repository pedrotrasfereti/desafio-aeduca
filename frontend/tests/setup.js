import { createTestingPinia } from '@pinia/testing';
import { config } from '@vue/test-utils';
import ResizeObserver from 'resize-observer-polyfill';
import { vi } from 'vitest';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

// Mock Pinia Store
const testingPinia = createTestingPinia({ createSpy: vi.fn });

// Set up ResizeObserver globally
global.ResizeObserver = ResizeObserver;

// Attach plugins to Vue Test Utils
config.global.plugins = [vuetify, testingPinia];
