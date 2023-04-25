<template>
          <div class="main">
                    <v-row>
                              <v-col cols="6" class="mr-md-16 mr-sm-12 mr-lg-12">
                                        <v-select label="انتخاب نوع آموزش"
                                                  :items=items
                                                  v-model="form.type"
                                                  item-text="title"
                                                  item-value="id"
                                                  @update:modelValue="changeType"
                                                  return-object
                                                  required>
                                        </v-select>
                              </v-col>
                    </v-row>
                    <v-row>
                              <v-col cols="11" class="mx-auto">
                                        <v-card>
                                                  <v-data-table
                                                            :headers="headers"
                                                            :items="dataItems"
                                                            item-value="id"
                                                            class="elevation-1">
                                                            <template v-slot:item.operation="{ item }">
                                                                      <v-icon size="small"
                                                                              @click="showArticle(item.raw)">mdi-delete
                                                                      </v-icon>
                                                            </template>
                                                  </v-data-table>
                                        </v-card>
                              </v-col>
                    </v-row>

          </div>
</template>

<script setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import ArticleService from '../../services/ArticleService';
import router from "../../routes";


const articleServiceItem = ref(new ArticleService());
let items = ref([{id: 1, title: 'ویدئو'}, {id: 2, title: 'مقاله'}]);
let form = ref({type: '',});
let itemSelected = ref({});

let headers = [
          {align: 'start', key: 'id', sortable: false, title: 'ردیف',},
          {key: 'title', title: 'عنوان'},
          {key: 'status', title: 'وضعیت'},
          {key: 'link', title: 'لینک'},
          {key: 'type', title: 'نوع'},
          {key: 'category', title: 'دسته بندی'},
          {key: 'operation', title: 'عملیات'},
];

let dataItems = ref([]);

const showArticle = async (item) => {

          itemSelected.value = item;

          console.log('item', item);
          await router.push({name: 'ArticleShow', params: {article: item.slug}})
}

const changeType = async () => {

          console.log('type', form.value.type);

          await articleServiceItem.value.changeType(form.value.type.id).then(response => {
                    dataItems.value = response.data.data;
                    console.log('form get Types', dataItems.value);
          })
}

// onMounted(async () => {
//
//           let response = await axios.get('/api/article').then(response => {
//                     console.log('form create', response.data.data);
//                     items.value = response.data.data;
//           })
// })


</script>

<style scoped>

</style>
