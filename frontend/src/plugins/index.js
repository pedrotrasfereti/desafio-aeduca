// Plugins
import vuetify from './vuetify';
import router from '../router';
import pinia from '../stores';

const registerPlugins = (app) => {
  app.use(vuetify).use(router).use(pinia);
};

export default registerPlugins;
