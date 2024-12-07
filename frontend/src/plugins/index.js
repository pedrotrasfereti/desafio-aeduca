// Plugins
import vuetify from './vuetify';
import router from '../router';

const registerPlugins = (app) => {
  app.use(vuetify).use(router);
};

export default registerPlugins;
