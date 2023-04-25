<template>
    <v-row class="pt-16">
        <v-col cols="6">
            <v-card
                class="mr-12 categoryCreate"
                color="white-lighten-1 "
            >
                <v-toolbar flat color="white" class="categoryCreate_title">
                    <v-toolbar-title class="font-weight-light">
                        افزودن دسته بندی جدید
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-card-text>
                    <v-row justify="start">
                        <v-col cols="9">
                            <v-select
                                label="دسته بندی والد"
                                :items=items
                                v-model="form.type"
                                item-text="title"
                                item-value="id"
                                @update:modelValue="changeType"
                                required></v-select>
                        </v-col>
                        <v-col cols="3">
                            <v-btn color="green" @click="show = !show">
                                <v-icon icon="mdi-plus"></v-icon>
                                افزودن
                            </v-btn>

                        </v-col>
                    </v-row>
                    <v-select
                        label="دسته بندی "
                        :items=itemCategory
                        v-model="form.category"
                        item-text="title"
                        item-value="id"
                        required>
                    </v-select>

                    <v-text-field
                        color="white"
                        label="عنوان"
                        v-model="form.title"
                    ></v-text-field>
                </v-card-text>


                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        @click="save"
                    >
                        Save
                    </v-btn>
                </v-card-actions>

                <v-snackbar
                    v-model="hasSaved"
                    :timeout="2000"
                    attach
                    position="absolute"
                    location="bottom left">
                    Your profile has been updated
                </v-snackbar>
            </v-card>
        </v-col>
        <v-col cols="4" class="mx-auto" v-show="show">
            <v-card
                color="white-lighten-1"
                class="categoryCreate"
            >
                <v-toolbar flat color="white" class="categoryCreate_title">
                    <v-toolbar-title class="font-weight-light">
                        افزودن دسته بندی والد
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-card-text>

                    <v-text-field
                        color="white"
                        label="عنوان"
                        v-model="formType.title"
                    ></v-text-field>
                </v-card-text>


                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        @click="saveType"
                    >
                        Save
                    </v-btn>
                </v-card-actions>

                <!--                        <v-snackbar-->
                <!--                            v-model="hasSaved"-->
                <!--                            :timeout="2000"-->
                <!--                            attach-->
                <!--                            position="absolute"-->
                <!--                            location="bottom left"-->
                <!--                        >-->
                <!--                            Your profile has been updated-->
                <!--                        </v-snackbar>-->
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>

import {onMounted, ref, reactive,onBeforeMount} from "vue";
import axios from "axios";
import CategoryService from '../../services/CategoryService';

const CategoryServiceItem = ref(new CategoryService());


let show = ref(false);
let form = ref({
    type: '',
    category: '',
    title: '',
});
let formType = ref({title: '',});
let items = ref([]);
let itemCategory = ref([]);
let hasSaved = ref(false);
let result = ref();


onBeforeMount(async () => {
    await getTypes();
    // loadingPage.value = false;
});


const getTypes = async ()=>{
 await  CategoryServiceItem.value.getTypes().then(response => {
     console.log('form get Types', response.data);
     items.value = response.data;
 });
}



const changeType = async () => {

    let response = await axios.get(`/api/category/${form.value.type}`).then(response => {

        // itemCategory.value = response.data;

         length = response.data.data.length;
         result.value = response.data.data;


        console.log(result.value);
        if (length > 0) {
            itemCategory.value = result.value;
            // form.value.category = itemCategory.value[0].id;
            // console.log('changeType',itemCategory.value,itemCategory.value[0].id);


            // form.value.category = itemCategory.value[0].id;
        }else
            itemCategory.value = '';
    });
}

const save = async () => {


    let response = await axios.post('/api/category ', form.value).then(response => {


        itemCategory.value = response.data.data;
        console.log('response store create', items.value);
        hasSaved.value = true;
    })
}

const saveType = async () => {

    console.log('form typ create', formType.value);

    let response = await axios.post('/api/categoryType',formType.value).then(response => {
        items.value = response.data.data;
        // length = response.data.data.length;

        // console.log('lenght',length);
        // form.value.type = response.data.data[length-1].id;

        // items.value = [{id: 0, title: 'انتخاب دسته بندی'}];

    });
}

</script>

<style scoped>

.categoryCreate_title {
    background-color: #ebad3b94 !important;
}

</style>
