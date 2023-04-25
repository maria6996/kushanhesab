<template>
          <v-row>
                    <v-col cols="6"
                           class="mr-12">


                              <v-select
                                        label="دسته بندی"
                                        :items=items
                                        v-model="form.category"
                                        item-text="title"
                                        item-value="id"
                                        required>
                              </v-select>
                              <v-text-field
                                        label="عنوان آموزش"
                                        v-model="form.title"
                              ></v-text-field>
                              <v-text-field
                                        label="لینک "
                                        v-model="form.link"
                              ></v-text-field>


                              <v-combobox
                                        v-model="form.tags"
                                        :items="items1"
                                        label="I use chips"
                                        multiple
                                        chips
                              ></v-combobox>

                              <!--                              <V-text-field name='ckeditor' id="ckeditor" v-model="form.editorData">-->
                              <!--                                        asdasd-->
                              <!--                              </V-text-field>-->
                              <!--                              <ckeditor :editor="editor" v-model="form.editorData" :config="editorConfig"></ckeditor>-->
                              <ckeditor :editor="editor" @ready="onReady" v-model="form.body" :config="editorConfig"></ckeditor>

                    </v-col>
                    <v-col cols="5">

                              <input type="file"
                                     id="fileimg"
                                     @change="changePhoto"/>
                              <img :src="getPhoto()"
                                   class="imagePreviewWrapper"
                                   alt="">


                    </v-col>
          </v-row>
          <!--    <PreviewImage v-model="name" />-->

          <!--    <input type="file" v-model="image" style="display: none">-->

          <!--    {{image}}-->
          <v-row>
                    <v-col cols="4"
                           class="mr-12">
                              <v-btn class="createArticle"
                                     @click="createArticle">
                                        ثبت
                              </v-btn>
                    </v-col>
          </v-row>


          <!--    <input type="file" id="fileimg" />-->


</template>


<script>

import {ref, onBeforeMount} from "vue";


import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import CategoryService from '../../services/CategoryService';
import ArticleService from '../../services/ArticleService';
import axios from "axios";
import Swal from "vue-sweetalert2";


let items = ref([]);
let name = ref()
let image = ref()


let form = ref({

          type: '',
          link: '',
          title: '',
          tags: [],
          body: '',
          category:'',
          // name : '',
          image: ''

})
let imagePreviewURL = ref(null);

let items1 = ref([
          'Programming',
          'Design',
          'Vue',
          'Vuetify',
]);


const getPhoto = () => {
          let photo = "/img/avatar.png"
          if (form.value.image) {
                    if (form.value.image.indexOf('base64') !== -1) {
                              photo = form.value.image
                    } else {
                              photo = '/img/upload/' + form.value.image
                    }
          }

          return photo;
}

const changePhoto = (e) => {
          console.log('changePhoto', '...');


          let name = ref("");
          let file = e.target.files[0];
          let reader = new FileReader();
          let limit = 1024 * 1024 * 2;
          if (file['size'] > limit) {
                    // swal({
                    //     icon: 'error',
                    //     title: 'Ooooops...',
                    //     text: 'You are uploading a large file',
                    // })
                    return false
          }
          reader.onloadend = (file) => {
                    form.value.image = reader.result
          }

          reader.readAsDataURL(file)
          // emit('getPhoto', file);


}

const CategoryServiceItem = ref(new CategoryService());
const ArticleServiceItem = ref(new ArticleService());

const createArticle = async () => {

          console.log('form', form.value);
          await  ArticleServiceItem.value.createArticle(form.value).then(response=>{
                    toast.fire({
                              icon: 'success',
                              title: 'service update successfuly',
                    })
                    console.log('response', response);
          })

}

const getImage = (val) => {
          console.log('val', val); // Raja Tamil
          form.value.image = val;
}


const getTypes = async () => {
          await CategoryServiceItem.value.getTypes().then(response => {
                    // console.log('form create', response.data);
                    items.value = response.data;
          });
}
const getCategories = async () => {

          await CategoryServiceItem.value.getCategories().then(response => {
                    console.log('getCategories', response.data.data);
                    items.value = response.data.data;
          });
}


export default {
          name: 'ArticleCreate',
          data() {
                    return {
                              editor: DocumentEditor,
                              editorConfig: {
                                        toolbar: {
                                                  items: [
                                                            'heading',
                                                            '|',
                                                            'bold',
                                                            'italic',
                                                            'link',
                                                            'bulletedList',
                                                            'numberedList',
                                                            '|',
                                                            'outdent',
                                                            'indent',
                                                            '|',
                                                            'imageUpload',
                                                            'blockQuote',
                                                            'insertTable',
                                                            'mediaEmbed',
                                                            'undo',
                                                            'redo',
                                                            'alignment',
                                                            'codeBlock',
                                                            'fontBackgroundColor',
                                                            'fontColor',
                                                            'fontFamily',
                                                            'fontSize',
                                                            'highlight',
                                                            'horizontalLine',
                                                            'htmlEmbed',
                                                            'imageInsert',
                                                            'pageBreak',
                                                            'removeFormat',
                                                            'strikethrough',
                                                            'underline',
                                                            'style'
                                                  ]
                                        },
                                        language: 'fa',
                                        ckfinder: {
                                                  openerMethod: 'popup',
                                                  uploadUrl: 'http://127.0.0.1:8000/api/uploadckeditor?command=QuickUpload&type=Files&responseType=json',
                                                  options: {resourceType: 'Images'}
                                        },


                                        image: {
                                                  toolbar: [
                                                            'imageTextAlternative',
                                                            'imageStyle:inline',
                                                            'imageStyle:block',
                                                            'imageStyle:side',
                                                            'imageStyle:alignLeft',
                                                            'imageStyle:alignRight',
                                                            'imageStyle:alignCenter',
                                                            'imageStyle:alignBlockLeft',
                                                            'imageStyle:alignBlockRight',
                                                            'linkImage'
                                                  ]
                                        },
                                        table: {
                                                  contentToolbar: [
                                                            'tableColumn',
                                                            'tableRow',
                                                            'mergeTableCells',
                                                            'tableCellProperties',
                                                            'tableProperties'
                                                  ]
                                        },
                                        fontFamily: {
                                                  options: [
                                                            'default',
                                                            'indieflowerregular',
                                                            'Arial, sans-serif',
                                                            'Verdana, sans-serif',
                                                            'Trebuchet MS',
                                                            'Apple Color Emoji',
                                                            'Segoe UI Emoji',
                                                            'Segoe UI Symbol',
                                                  ]
                                        },
                                        licenseKey: '',
                                        changeOrigin: true,
                              },
                              getTypes,
                              getImage,
                              createArticle,
                              changePhoto,
                              getCategories,
                              getPhoto,
                              items1,
                              form,
                              items,
                              image

                    }

          },

          beforeMount() {
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


.ck.ck-editor__editable_inline {
          border: 1px solid var(--ck-color-base-border);
}


</style>
