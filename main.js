import Alpine from "alpinejs";
import reportComponent from './reports.js'

window.Alpine = Alpine;
Alpine.data('reportComponent', reportComponent)
Alpine.start();