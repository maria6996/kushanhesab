<template>


    <!--            <div class="text-subtitle-2 justify-center">ورود</div>-->
    <v-locale-provider>

        <v-container class="fill-height fluid pa-16">
            <v-responsive>
                <v-card id="login-page" class="align-content-md-center align-center "
                        width="400"  >


                    <v-card-title class="text-center">
                        ورود به پنل کهکشان
                    </v-card-title>

                    <v-container class="spacing-playground pa-6 text-center" fluid>
                        <v-form
                            lazy-validation
                            @submit.prevent="login"
                        >
                            <v-col
                                cols="12"
                                md="12"
                            >
                                <v-text-field
                                    v-model="form.username"
                                    :counter="30"
                                    label="ایمیل یا موبایل"
                                    required

                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="12"
                            >
                                <v-text-field
                                    v-model="form.password"
                                    label="رمز ورود"
                                    required
                                    type="password"
                                ></v-text-field>
                            </v-col>


                            <v-btn
                                color="success"
                                class="mr-4"
                                @click="login"
                            >
                                ورود
                            </v-btn>


                        </v-form>
                    </v-container>

                </v-card>
            </v-responsive>

        </v-container>




    </v-locale-provider>
</template>


<script setup>

import {reactive, ref} from "vue";
import axios from 'axios';
import router from '../../routes';





let loginForm = ref({

    valid: false,
    username: '',
    password: '',
    usernameRules: [
        v => !!v || 'Email or Mobile is required',
        v => v.length <= 25 || 'Username must be less than 25 characters',
    ],
})

let form = ref({

    username: '',
    password: '',
})


// let form = reactive({
//
//     email: '',
//     password: '',
// })
const validate = async () => {
    const {valid} = await this.$refs.form.validate()

    if (valid) alert('Form is valid')
}
const reset = () => {
    this.$refs.form.reset()
}
const resetValidation = () => {
    this.$refs.form.resetValidation()
}

let errors = ref('');


const login = async () => {

    let response = await axios.post('/api/login', form.value).then(response => {

            if (response.data.success) {

                axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");


                console.log('k', response.data.data);
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('username', response.data.data.full_name);
                localStorage.setItem('user', response.data.data);
                // this.$router.push({name: 'Dashboard'})
                router.push({name: 'Dashboard'})
                // console.log(response)

            } else {

                errors.value = response.data.message
                console.log('ad', errors)
            }
        }
    )
}
// const login = () => {
//     const {username} = this;
//     console.log(username + "logged in")
// }

// export default {
//     name: "Login",
//     data() {
//         return {
//             username: "",
//             password: "",
//         };
//     },
//     methods: {
//         login() {
//             const { username } = this;
//             console.log(username + "logged in")
//         },
//     },
// };

</script>

<style scoped>
#login-page {
    /*background-color: #e3e3e3;*/
    color: #000;
    padding: 1%;
    /*border: 1px solid #718096;*/
    text-align: center;
    margin: 0 auto;
    box-shadow: 0 0 17px #333;


}

#login-page input {
    text-align: center;
    color: red;
}
</style>
