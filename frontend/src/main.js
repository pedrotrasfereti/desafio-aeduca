// Plugins
import { createApp } from 'vue';

import App from './App.vue';
import registerPlugins from './plugins';

// Components

// Composables

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
