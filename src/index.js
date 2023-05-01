/*
Pre-utilización de alias
import Template from './templates/Template.js';
import '../src/styles/main.css';
import '../src/styles/vars.styl';
*/
import Template from '@templates/Template.js';
import '@styles/main.css';
import '@styles/vars.styl';
(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
