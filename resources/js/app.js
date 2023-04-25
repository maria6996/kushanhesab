import {createApp} from 'vue';
import App from './app.vue'
import router from './routes';
import '@mdi/font/css/materialdesignicons.css'
import "./styles/fonts/A-Iranian-Sans/style.css";
import CKEditor from '@ckeditor/ckeditor5-vue'
import './plugins/vuetify/dist/vuetify.min.css';
import * as components from './plugins/vuetify/lib/components'
import * as directives from './plugins/vuetify/lib/directives'
import {VDataTable} from 'vuetify/lib/labs/VDataTable/VDataTable.mjs';
import Swal from 'sweetalert2/dist/sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

window.Swal = Swal

const toast = Swal.mixin({
          toast : true,
          // position:'absolute',
          showConfirmButton:true,
          timer:2000,
          timerProgressBar: true,

})

window.toast = toast;


const app = createApp(App)
import {createVuetify} from 'vuetify'



// const myCustomLightTheme = {
//     dark: false,
//     isRtl:true,
//     colors: {
//         background: '#000',
//         surface: '#000',
//         primary: '#6200EE',
//         'primary-darken-1': '#000',
//         secondary: '#000',
//         'secondary-darken-1': '#000',
//         error: '#000',
//         info: '#000',
//         success: '#000',
//         warning: '#000',
//     },
//     icons: {
//         defaultSet: 'mdi',
//         aliases,
//         sets: {
//             mdi,
//         }
//     },
// }


const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
    locale: {
        locale: 'customLocale',
        // messages: { customLocale },
        rtl: {
            customLocale: true,
        }
    },
    directives,
    components,


})

const vuetify1 = createVuetify({
    components: {
        VDataTable,
    },

})



app.use(CKEditor)
app.use(vuetify1)
app.use(vuetify)
app.use(router)

app.mount("#app")

