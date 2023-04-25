<template>

          <v-container fluid>

                    <v-row>
                              <v-col cols="5">

                                        <v-row>
                                                  <v-col cols="6"></v-col>
                                                  <v-col cols="6">
                                                            <v-select
                                                                      label="دسته بندی"
                                                                      :items=items
                                                                      v-model="form.category"
                                                                      item-text="title"
                                                                      item-value="id"
                                                                      required>
                                                            </v-select>

                                                  </v-col>

                                        </v-row>
                                        <v-row>


                                                  <v-col cols="6">
                                                            <p class="text-sm-left text-md-left text-lg-left">عنوان</p>

                                                  </v-col>
                                                  <v-col cols="6">
                                                            <v-text-field v-model="form.title"></v-text-field>

                                                  </v-col>

                                        </v-row>
                                        <v-row>
                                                  <v-col cols="6">
                                                            <p class="text-sm-left text-md-left text-lg-left">لینک</p>

                                                  </v-col>
                                                  <v-col cols="6">
                                                            <v-text-field v-model="form.link"></v-text-field>
                                                  </v-col>

                                        </v-row>
                                        <v-row>
                                                  <v-col cols="6">
                                                            <p class="text-sm-left text-md-left text-lg-left">تگ</p>
                                                  </v-col>
                                                  <v-col cols="6">
                                                            <v-combobox :items="tags" v-model="form.tags" label="تگ ها"
                                                                        multiple
                                                                        chips></v-combobox>
                                                  </v-col>
                                        </v-row>
                              </v-col>
                              <v-col cols="7">


                                        <v-col cols="6">
                                                  <input type="file" id="fileimg"
                                                         @change="change"/>

                                                            <img :src="getPhoto(form.image)"
                                                                 class="imagePreviewWrapper" alt="">

                                        </v-col>


                              </v-col>

                    </v-row>

                    <v-row>
                              <v-col cols=7 class=" mx-auto">
                                        <ckeditor :editor="editor" @ready="onReady" v-model="form.body"
                                                  :config="editorConfig"></ckeditor>
                              </v-col>
                    </v-row>


                    <v-row>
                              <v-col cols="12"
                                     class="ml-lg-16 ml-md-n12">
                                        <v-btn class="updateArticle"
                                               @click="updateArticle">
                                                  ثبت
                                        </v-btn>
                              </v-col>
                    </v-row>
          </v-container>


</template>

<script>

import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import ArticleService from '../../../services/ArticleService';
import {onBeforeMount, onMounted, ref} from "vue";
import {useRoute} from 'vue-router'
import {getPhoto, changePhoto} from "../../../utilities/globalHelpers";
import CategoryService from '../../../services/CategoryService';

const route = useRoute()
const article = ref({
          title: '',
          link: '',
});
const items = ref([])
const tags = ref([]);

let form = ref({
          id: '',
          title: '',
          category: '',
          status: '',
          link: '',
          tags: [],
          image: '',
          body: ''
});


const articleShowItem = ref(new ArticleService());
const CategoryServiceItem = ref(new CategoryService());


const change = (e) => {
          changePhoto(form.value, e)
}

const updateArticle = async () => {
          console.log('form.value', form.value);
          let response = await articleShowItem.value.updateArticle(form.value, form.value.slug).then(response => {
                    toast.fire({
                              icon: 'success',
                              title: 'service update successfuly',
                    })
                    console.log('response', response);
          });
};
const getCategories = async () => {

          await CategoryServiceItem.value.getCategories().then(response => {
                    console.log('getCategories getCategories', response.data.data);
                    items.value = response.data.data;
          });
}


export default {
          name: 'ArticleShow',
          data() {
                    return {
                              editor: DecoupledEditor,
                              editorConfig: {
                                        language: 'fa',
                                        ckfinder: {
                                                  openerMethod: 'popup',
                                                  uploadUrl: 'http://127.0.0.1:8000/api/uploadckeditor?command=QuickUpload&type=Files&responseType=json',
                                                  options: {resourceType: 'Images'}
                                        },

                              },
                              getPhoto,
                              form,
                              items,
                              updateArticle,
                              changePhoto,
                              change

                    }

          },

          beforeMount() {
                    articleShowItem.value.getArticle(this.$route.params.article).then(response => {
                              form.value = {
                                        'id': response.data.data.id,
                                        'image': response.data.data.medias != null ? response.data.data.medias[0] : '',
                                        'tags': response.data.data.tags ?? '',
                                        'body': response.data.data.body ?? '',
                                        'link': response.data.data.link ?? '',
                                        'title': response.data.data.title ?? '',
                                        'slug': response.data.data.slug ?? '',
                                        'category':response.data.data.category.id ?? ''
                              }
                              console.log('form.response.data.data.....', response.data.data.category.id);
                              tags.value = response.data.data.tags;
                    })
                    getCategories();

          },
          methods: {
                    onReady(editor) {
                              // Insert the toolbar before the editable area.
                              editor.ui.getEditableElement().parentElement.insertBefore(
                                        editor.ui.view.toolbar.element,
                                        editor.ui.getEditableElement()
                              );
                    },

          }
};


//
// const editorConfig =()=>{
//           toolbar: {
//                     items: [
//                               'heading',
//                               '|',
//                               'bold',
//                               'italic',
//                               'link',
//                               'bulletedList',
//                               'numberedList',
//                               '|',
//                               'outdent',
//                               'indent',
//                               '|',
//                               'imageUpload',
//                               'blockQuote',
//                               'insertTable',
//                               'mediaEmbed',
//                               'undo',
//                               'redo',
//                               'alignment',
//                               'codeBlock',
//                               'fontBackgroundColor',
//                               'fontColor',
//                               'fontFamily',
//                               'fontSize',
//                               'highlight',
//                               'horizontalLine',
//                               'htmlEmbed',
//                               'imageInsert',
//                               'pageBreak',
//                               'removeFormat',
//                               'strikethrough',
//                               'underline',
//                               'style'
//                     ]
//           }
//           language: 'fa'
//           ckfinder: {
//                     openerMethod: 'popup'
//                     uploadUrl: 'http://127.0.0.1:8000/api/uploadckeditor?command=QuickUpload&type=Files&responseType=json'
//                     options: {resourceType: 'Images'}
//           }
//           image: {
//                     toolbar: [
//                               'imageTextAlternative',
//                               'imageStyle:inline',
//                               'imageStyle:block',
//                               'imageStyle:side',
//                               'imageStyle:alignLeft',
//                               'imageStyle:alignRight',
//                               'imageStyle:alignCenter',
//                               'imageStyle:alignBlockLeft',
//                               'imageStyle:alignBlockRight',
//                               'linkImage'
//                     ]
//           }
//           table: {
//                     contentToolbar: [
//                               'tableColumn',
//                               'tableRow',
//                               'mergeTableCells',
//                               'tableCellProperties',
//                               'tableProperties'
//                     ]
//           }
//           fontFamily: {
//                     options: [
//                               'default',
//                               'indieflowerregular',
//                               'Arial, sans-serif',
//                               'Verdana, sans-serif',
//                               'Trebuchet MS',
//                               'Apple Color Emoji',
//                               'Segoe UI Emoji',
//                               'Segoe UI Symbol',
//                     ]
//           }
//           licenseKey: ''
//           changeOrigin: true
// }

// onBeforeMount(async () => {
//           await articleShowItem.value.getArticle(route.params.article).then(response => {
//                     form.value = response.data.data;
//                     console.log('response', form.value,'response.data.data.medias',response.data.data.medias[0]);
//
//                     form.value.image = response.data.data.medias[0];
//                     form.value.editorData = response.data.data.body;
//
//                     items.value = response.data.data.tags;
//                     tags.value = response.data.data.tags;
//           })
// })


</script>

<style scoped>

.imagePreviewWrapper {
          width: 250px;
          height: 250px;
          display: block;
          cursor: pointer;
          margin: 0 auto 30px;
          background-size: cover;
          background-position: center center;
}

.updateArticle {
          background-color: red;
          float: left;
          margin-left: 28%;
}

.ck.ck-editor__editable_inline {
          border: 1px solid var(--ck-color-base-border);
}


</style>
