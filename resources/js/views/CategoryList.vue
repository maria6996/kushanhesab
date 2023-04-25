<template>
    <DefaultLayout>
        <div class="main">
            <v-row>
                <v-col cols="11" class="mx-auto">
                    <v-row>
                        <v-col cols="6" class="mx-auto">
                            <div  v-show="alertType.show">
                                <v-alert :type="alertType.type">{{alertType.message }}</v-alert>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-select
                                label="انتخاب نوع دسته بندی ها"
                                :items=items
                                v-model="type"
                                item-text="title"
                                item-value="id"
                                @update:modelValue="changeType"
                                return-object
                                required></v-select>
                        </v-col>
                    </v-row>
                    <v-card>
                        <v-card-title>
                            لیست دسته بندی های
                            {{ show === true ? type.title : '' }}
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-card-title>
                        <v-data-table
                            :headers="headers"
                            :items="desserts"
                            item-value="id"
                            class="elevation-1"
                        >
                            <template v-slot:item.operation="{ item }">
                                <v-icon size="small" @click="deleteCat(item.raw)">mdi-delete</v-icon>
                            </template>

                        </v-data-table>


                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <!--                                    <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>-->
                                    <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-card>

                </v-col>
            </v-row>
        </div>
    </DefaultLayout>
</template>

<script setup>


import DefaultLayout from '../layouts/DefaultLayout.vue';
import {onMounted, reactive, ref} from "vue"
import axios from "axios";

let items = ref([]);
let show = ref(false);


let alertType = ref({
        type: '',
        show: false,
        message: '',
    }
);
let dialogDelete = ref(false);
let search = ref('');
let headers = [
    // {align: 'start', key: 'id', sortable: false, title: 'ردیف',},
    // {align: 'start', key: 'id', sortable: false, title: 'ردیف',},
    {key: 'title', title: 'عنوان'},
    {key: 'parent', title: 'دسته بندی اصلی'},
    {key: 'operation', title: 'عملیات'},
];

let desserts = ref([]);
let type = ref();
let selectItem = ref({});
onMounted(async () => {

    let response = await axios.get('/api/categoryType').then(response => {
        console.log('form create', response.data);
        items.value = response.data;
    })
})

let message = ref('');

const deleteCat = async (item) => {


    selectItem.value = item;
    dialogDelete.value = true;
}


const deleteItemConfirm = async (item) => {


    console.log('id', selectItem.value.id);

    await axios.delete(`/api/category/${selectItem.value.id}`).then(response => {

        console.log('deleteItemConfirm', response);
        dialogDelete.value = false;
        desserts.value = response.data.data;
        alertType.value.type = 'success';
        alertType.value.show = true;
        alertType.value.message = response.data.message;
    })

    // dialogDelete.value = true

}
const changeType = async () => {

    await axios.get(`/api/category/${type.value.id}`).then(response => {
        show.value = true;

        console.log('form create', response);
        desserts.value = response.data.data;
    })
};

</script>

<style scoped>

</style>
