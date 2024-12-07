// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const aeducaTheme = {
  dark: false,
  colors: {
    background: '#1b2731',
    surface: '#ffffff',
    'on-surface': '#2c3b48',
    'surface-light': '#f5f5f5',
    'on-surface-light': '#0f171d',
    'surface-dark': '#1d1d1d',
    'surface-dark-variant': '#3d3c3c',
    primary: '#d51030',
    secondary: '#019ead',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  },
};

export default createVuetify({
  theme: {
    defaultTheme: 'aeducaTheme',
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 1,
      darken: 1,
    },
    themes: {
      aeducaTheme,
    },
  },
  components,
  directives,
});
