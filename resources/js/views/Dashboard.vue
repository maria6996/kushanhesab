<template>

<DefaultLayout>
         داشبوردف

</DefaultLayout>

</template>

<script setup>

import DefaultLayout from "../layouts/DefaultLayout.vue"
import Sidebar from "../layouts/Sidebar.vue";


// export default {
//     name: "Dashboard",
//     components: {Sidebar, DefaultLayout},
//     data () {
//         return {
//             select: { state: 'Florida', abbr: 'FL' },
//             items: [
//                 { state: 'Florida', abbr: 'FL' },
//                 { state: 'Georgia', abbr: 'GA' },
//                 { state: 'Nebraska', abbr: 'NE' },
//                 { state: 'California', abbr: 'CA' },
//                 { state: 'New York', abbr: 'NY' },
//             ],
//
//
//             valid: true,
//             name: '',
//             nameRules: [
//                 v => !!v || 'Name is required',
//                 v => (v && v.length <= 10) || 'Name must be less than 10 characters',
//             ],
//             email: '',
//             emailRules: [
//                 v => !!v || 'E-mail is required',
//                 v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
//             ],
//
//             checkbox: false,
//
//     }
//     },
//
//     //
//     // data: () => ({
//     //
//     //
//     //
//     //     valid: true,
//     //     name: '',
//     //     nameRules: [
//     //         v => !!v || 'Name is required',
//     //         v => (v && v.length <= 10) || 'Name must be less than 10 characters',
//     //     ],
//     //     email: '',
//     //     emailRules: [
//     //         v => !!v || 'E-mail is required',
//     //         v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
//     //     ],
//     //     select: null,
//     //     items: [
//     //         'Item 1',
//     //         'Item 2',
//     //         'Item 3',
//     //         'Item 4',
//     //     ],
//     //     checkbox: false,
//     // }),
//     //
//     methods: {
//         async validate () {
//             const { valid } = await this.$refs.form.validate()
//
//             if (valid) alert('Form is valid')
/*        },*/
//         reset () {
//             this.$refs.form.reset()
//         },
//         resetValidation () {
//             this.$refs.form.resetValidation()
//         },
//     },
//
//
// }
</script>


<style scoped>

</style>
