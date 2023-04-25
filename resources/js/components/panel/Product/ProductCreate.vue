<template>
          <v-container fluid id="productCreate">

                    <v-row>
                              <v-col cols="2">
                                        <p class="text-sm-right text-md-right text-lg-right">دسته بندی</p>
                              </v-col>
                              <v-col cols="5" class="mr-md-0 mr-sm-0 mr-lg-0">
                                        <v-select label="انتخاب دسته بندی"
                                                  :items=items
                                                  v-model="product.category"
                                                  item-text="title"
                                                  item-value="id"
                                                  required>
                                        </v-select>

                              </v-col>
                    </v-row>


                    <v-row>

                              <v-col cols="2">
                                        <p class="text-sm-right text-md-right text-lg-right">عنوان</p>
                              </v-col>
                              <v-col cols="5">
                                        <v-text-field v-model="product.title" label="عنوان"
                                                      :bg-color="backColor.background" :rules="[required]"
                                        ></v-text-field>
                              </v-col>
                    </v-row>

                    <v-row>

                              <v-col cols="2">
                                        <p class="text-sm-right text-md-right text-lg-right">توضیحات کوتاه</p>
                              </v-col>
                              <v-col cols="5">
                                        <v-text-field v-model="product.short_description" label="توضیحات کوتاهی برای این سرویس ثبت کنید..."
                                                      :bg-color="backColor.background" :rules="[required]"
                                        ></v-text-field>
                              </v-col>
                    </v-row>

                    <v-row>
                              <v-col cols="2">
                                        <p class="text-sm-right text-md-right text-lg-right">تصویر اصلی</p>
                              </v-col>
                              <v-col cols="5">
                                        <input type="file" id="fileimg"
                                               @change="change"/>

                                        <img :src="getPhoto(product.image)"
                                             class="imagePreviewWrapper" alt="">

                              </v-col>
                    </v-row>
                    <v-row>
                              <v-col cols="4"
                                     class="mr-12">
                                        <v-btn class="createArticle"
                                               @click="createProduct">
                                                  ثبت
                                        </v-btn>
                              </v-col>
                    </v-row>

          </v-container>
</template>

<script setup>

import {ref} from 'vue';
// import {ProductInterface} from "../../../types/ArticleCreate";
import {Product} from "@/types/globalVaribales";
import {BackColor} from "@/types/globalVaribales";
import ProductService from "@/services/ProductService";
import GetCategories from "@/services/ProductService";
import {getPhoto, changePhoto} from "../../../utilities/globalHelpers";


let product = ref(Product);
let backColor = ref(BackColor);

let items = ref()

const change = (e) => {
          changePhoto(product.value, e)
}

const createProduct = async () => {

          console.log('form', product.value);
          // await  ProductService.value.createServices(product.value).then(response=>{
          //
          //           console.log('response', response);
          // })

}
</script>

<style scoped>

</style>
