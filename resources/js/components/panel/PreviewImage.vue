<template>
    <div>


        <!--        <div id="imageBox" >-->
        <!--            <v-file-input-->
        <!--                ref="fileInput"-->
        <!--                label="آپلود عکس اصلی برای این آموزش"-->
        <!--                required-->
        <!--                @change="pickFile"-->

        <!--            ></v-file-input>-->
        <input type="file"  id="fileimg" @change="changePhoto"/>
        <img :src="getPhoto()" class="imagePreviewWrapper" alt="">


        <!--        <input-->
        <!--            type="text"-->
        <!--            placeholder="Name"-->
        <!--            v-model="name"-->
        <!--            @input="$emit('update:modelValue', $event.target.value)"-->
        <!--        />-->

        <!--        <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${previewImage})` }" @click="selectImage">-->

        <!--            </div>-->
        <!--        </div>-->


    </div>
</template>

<script setup>

import {reactive, ref, defineExpose} from "vue"

let image = ref();
const emit = defineEmits(['getPhoto'])

const getPhoto =()=>{
    let photo = "/img/avatar.png"
    if (image.value) {
        if (image.value.indexOf('base64') !== -1) {
            photo = image.value
        } else {
            photo = '/img/upload/' + image.value
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
        image.value = reader.result
    }

    reader.readAsDataURL(file)
    emit('getPhoto', file);



}


// export default {
//     name: 'PreviewImage',
//
//     // setup() {
//     //     return { name ,image};
//     //     // return {
//     //     //     name,
//     //     //     selected,
//     //     //
//     //     //
//     //     // }
//     // },
//     data() {
//         return {
//             getPhoto,
//             changePhoto,
//             image
//         };
//     },
    // methods: {
    //
    //     getPhoto() {
    //         let photo = "/img/avatar.png"
    //         if (this.image.value) {
    //             if (this.image.value.indexOf('base64') !== -1) {
    //                 photo = this.image.value
    //             } else {
    //                 photo = '/img/upload/' + this.image.value
    //             }
    //         }
    //         return photo;
    //
    //     },
    //
    //
    // }

    // selectImage() {
    //     console.log('select');
    //     this.$refs.fileInput.click()
    // },
    // pickFile() {
    //     console.log('select');
    //
    //     let input = this.$refs.fileInput
    //     let file = input.files
    //     if (file && file[0]) {
    //         let reader = new FileReader
    //         reader.onload = e => {
    //             this.image = e.target.result
    //         }
    //         reader.readAsDataURL(file[0])
    //         this.$emit('input', file[0])
    //     }
    // }
    // }
// }
</script>

<style scoped lang="scss">
.imagePreviewWrapper {
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}

//#imageBox{
//    width: 250px;
//    height: 250px;
//    display: block;
//    cursor: pointer;
//    margin: 0 auto 30px;
//    border: 1px solid red;
//    background-size: cover;
//    background-position: center center;
//}
</style>
