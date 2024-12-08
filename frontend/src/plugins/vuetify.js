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
    'background-variant': '#2c3b48',
    surface: '#ffffff',
    'on-surface': '#2c3b48',
    'surface-bright': '#f8f9f9',
    'on-surface-bright': '#1d1d1d',
    'surface-light': '#eef1f1',
    'on-surface-light': '#3d3c3c',
    'surface-dark': '#171717',
    'on-surface-dark': '#ffffff',
    'surface-dark-variant': '#3d3c3c',
    'on-surface-dark-variant': '#ffffff',
    primary: '#d51030',
    secondary: '#0da3b1',
    error: '#b00020',
    info: '#2196f3',
    success: '#4caf50',
    warning: '#Fb8c00',
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
    'theme-on-kbd': '#ffffff',
    'theme-code': '#f5f5f5',
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
