import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// Import only the icons we actually use to reduce bundle size
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify);
let drk = localStorage.getItem('darkMode');
let dark = drk === 'true'
console.log(dark)

export default new Vuetify({
    theme: {
        dark
    },
    icons: {
        iconfont: 'mdi', // Use Material Design Icons
    },
    // Reduce bundle size by only including used components
    components: {
        // Only import components that are actually used
    }
});
