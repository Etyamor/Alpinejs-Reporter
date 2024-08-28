import Alpine from "./node_modules/alpinejs/dist/module.esm";
import reportComponent from './reports.js'

window.Alpine = Alpine;
Alpine.data('reportComponent', reportComponent)
Alpine.start();