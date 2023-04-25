<template>


    <!--    <div id="login-page"  :style=" { backgroundImage: 'url(https://cdn.vuetifyjs.com/images/parallax/material2.jpg)'}">-->
    <div id="login-page" :style="setImage">
        <Login/>
    </div>
    <!--    </v-parallax>-->


</template>

<script>
// import login from '../components/auth/Login.vue'
import Login from "../components/auth/Login.vue";
import {computed, ref} from "vue";

// let setImage =  ref();


export default {
    components: {Login},
    computed: {
        setImage() {
            return {backgroundImage: 'url(https://cdn.vuetifyjs.com/images/parallax/material2.jpg)',
            backgroundSize: '100%',
                marginBottom:'1px',
                height:'100vh'

                // height:'100%'
            }
        }
    },
    // mounted() {
    //
    //     setImage.value = { backgroundImage: 'url(https://cdn.vuetifyjs.com/images/parallax/material2.jpg)',
    //                 backgroundSize: '100%',
    //                     marginBottom:'1px',
    //                     height:'100vh'
    //     };
    // },
    // data() {
    //     return {
    //         // bar: bar,
    //         setImage:setImage
    //     }
    // }
}


</script>

<style scoped>

#login-page {
    /*background-color: #719771;*/
    /*background-image: url("../assets/img/material2.jpg");*/
    margin-bottom: 1px;
    height: 58em;
    background-size: 100%;
    font-family: 'IRANSans';

}
</style>
