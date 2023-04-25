<template>
    <DefaultLayout>
        <div class="main">

            <CategoryCreate/>
        </div>
    </DefaultLayout>
</template>

<script setup>
import Dashboard from "../views/Dashboard.vue";
// import Category from "../components/panel/Category.vue";
import CategoryCreate from "../components/panel/CategoryCreate.vue";
import DefaultLayout from '../layouts/DefaultLayout.vue';

// import {onMounted, ref, reactive} from "vue";
// import axios from "axios";
//
//
//
// let show = ref(false);
//
// let formType = ref({
//     title: '',
// });
//
// let form = ref({
//     type: {},
//     category: {},
//     title: '',
// });


// let items = ref();
// let itemCategory = ref();
// let hasSaved = ref(false);

//
// onMounted(async () => {
//
//     let response = await axios.get('/api/category/create').then(response => {
//
//         items.value = response.data.data;
//         itemCategory.value = [{id: 0, title: 'انتخاب دسته بندی'}];
//
//         form.value.type = response.data.data[0].id;
//         form.value.category = itemCategory.value;
//
//         console.log('res mounted items', items.value, 'itemCategory', response.data.data[0].id);
//
//     });
//
// })


// const changeType = async () => {
//     let response = await axios.get(`/api/categories/${form.value.type}`).then(response => {
//         if (response.data.length > 0) {
//             itemCategory.value = response.data;
//             form.value.category = itemCategory.value[0].id;
//         } else form.value.category = '';
//     });
// }
//
// const save = async () => {
//
//     console.log('form create', form.value);
//
//     let response = await axios.post('/api/category ', form.value).then(response => {
//         itemCategory.value = response.data.data;
//         console.log('response store create', items.value);
//         hasSaved.value = true;
//     })
// }
//
//
// const saveType = async () => {
//
//     let response = await axios.post('/api/category', form.value.select).then(response => {
//         console.log('rree', response.data);
//         items.value = response.data;
//     });
// }
//
// const onLanguageChange = (lang) => {
//     console.log('new lang', lang);
// }

</script>

<style scoped>

.categoryCreate_title[data-v-acb52804] {
    text-align: right;
    font-weight: bold;
    color: #201c1c !important;
    /*background: linear-gradient(to right, rgb(206 234 255 / 87%) 0%, #c7e5f1 50%, #c7e5f1 50%, #d7f4ff 100%);*/
    background-color: #f9b90094 !important;
}

/*.categoryCreate_title * {*/
/*    color: #fff;*/
/*    font-weight: bold;*/
/*    text-align: right;*/
/*    background: linear-gradient(to right, rgb(14 191 209 / 87%) 0%, #1ca1af 50%, #1ca1af 50%, #27bbbb 100%)*/

/*}*/

.category-create {
    width: 40%;
    margin-right: 1%;
}

.categoryCreate {
    /*box-shadow: -4px 4px 6px 6px #e1dbdb;*/
    margin-top: 5%;
    /*margin: 1%;*/
    /*linear-gradient(to right, rgb(14 191 209 / 87%) 0%, #1ca1af 50%, #1ca1af 50%, #27bbbb 100%)*/

}

</style>
