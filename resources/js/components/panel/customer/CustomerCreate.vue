<template>

          <div class="errorMessage">
                    <div v-if="Object.keys(errors).length">
                              <div v-for="(error, key) in errors" :key="key">
                                        <v-row>
                                                  <v-col cols="3" class="ml-md-n12">
                                                            <v-alert v-if="show" density="compact" type="error"
                                                                     :title="key" closable>
                                                                      {{ error[0] }}
                                                            </v-alert>
                                                  </v-col>
                                        </v-row>
                              </div>
                    </div>
          </div>


          <v-container fluid id="custoreCreate">
                    <v-row>

                              <v-col cols="2">
                                        <p class="text-sm-right text-md-right text-lg-right">نام</p>
                              </v-col>
                              <v-col cols="5">
                                        <v-text-field v-model="customer.name" label="name"
                                                      :bg-color="backColor.background" :rules="[required]"
                                        ></v-text-field>
                              </v-col>
                    </v-row>
                    <v-row>
                              <v-col cols="2">
                                        <p class="text-sm-right text-md-right text-lg-right">موبایل</p>
                              </v-col>
                              <v-col cols="5">
                                        <v-text-field v-model="customer.mobile" label="mobile"
                                                      :bg-color="backColor.background"></v-text-field>

                              </v-col>
                    </v-row>
                    <v-row>
                              <v-col cols="2">
                                        <p class="text-sm-right text-md-right text-lg-right">آدرس</p>
                              </v-col>

                              <v-col cols="5">
                                        <v-text-field v-model="customer.address" label="address"
                                                      :bg-color="backColor.background" autocomplete="off"
                                        ></v-text-field>
                              </v-col>
                    </v-row>
                    <v-row>
                              <v-col cols="2">
                                        <p class="text-sm-right text-md-right text-lg-right">تلفن</p>
                              </v-col>
                              <v-col cols="5">
                                        <v-text-field label="phone" v-model="customer.phone"
                                                      :bg-color="backColor.background"></v-text-field>
                              </v-col>
                    </v-row>
                    <v-row>
                              <v-col cols="2">
                                        <p class="text-sm-right text-md-right text-lg-right">پسورد</p>
                              </v-col>
                              <v-col cols="5">
                                        <v-text-field label="Password" v-model="customer.password" type="password"
                                                      :bg-color="backColor.background" autocomplete="off"

                                        ></v-text-field>
                              </v-col>
                    </v-row>

                    <v-row>
                              <v-col cols="2">
                                        <p class="text-sm-right text-md-right text-lg-right">خدمات دریافت شده</p>
                              </v-col>
                              <v-col cols="5">
                                        <v-combobox
                                                  :items="ServiceItemSelects"
                                                  :bg-color="backColor.background"
                                                  v-model="customer.services"
                                                  label="services"
                                                  multiple
                                                  chips></v-combobox>
                              </v-col>
                    </v-row>

                    <v-row>
                              <v-col cols="5">
                                        افزودن ویژگی
                              </v-col>
                    </v-row>


                    <div v-for="(row, index) in customer.userDetail">
                              <v-row v-if="row.isShown">
                                        <v-col cols="2"></v-col>
                                        <v-col cols="3">
                                                  <v-text-field v-model="row.title" label="عنوان"
                                                                :bg-color="backColor.background"></v-text-field>
                                        </v-col>
                                        <v-col cols="3">
                                                  <v-text-field v-model="row.value" label="مقدار"
                                                                :bg-color="backColor.background"></v-text-field>
                                        </v-col>

                                        <v-btn class="mt-md-6 btnGreen" @click="prepend">
                                                  <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                        <v-btn class="mt-md-6 btnRed" @click="minez(index)">
                                                  <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                              </v-row>
                    </div>
                    <v-row>
                              <v-col cols="2">
                                        <v-btn class="btnGreen" @click="createCustomer">ثبت</v-btn>
                              </v-col>
                    </v-row>
          </v-container>


</template>

<script setup>

import {onBeforeMount, ref} from "vue";
import CustomerService from '../../../services/CustomerService'
import ProductService from "../../../services/ProductService";
import {Customer} from "../../../types/globalVaribales";
import axios from "axios";

const CustomerItem = ref(new CustomerService());
const ServiceItem = ref(new ProductService());

let customer = ref(Customer);
let backColor = ref({'background': 'rgb(232,240,255)'})
let errors = ref({});
let show = ref(false);
let ServiceItemSelects = ref();

onBeforeMount(async () => {
          await ServiceItem.value.getServices().then(response => {
                    ServiceItemSelects.value = response.data.data;
          });
})

const fade = () => {
          // console.log("hide alert after 3 seconds");
          //
          // window.setInterval(() => {
          //           show.value = false;
          //           console.log("hide alert after 3 seconds");
          // }, 3000)
          //
          // show.value = false;


}

const showError = (key) => {

          setTimeout(function () {

                    console.log('key', key);
                    // console.log('errors', errors.value[key][0]);
                    //
                    // showError(key);
          }, 5000);


          // toast.fire({
          //           icon: 'error',
          //           title: errors.value[key][0]
          // });
}

const createCustomer = () => {


          // console.log(customer.value)
          // const createCustomer = ref(new CustomerService());
          CustomerItem.value.createCustomer(customer.value).then(response => {


                    if (response.data.status === 'success') {
                              toast.fire({
                                        icon: 'success',
                                        title: 'Customer created successfuly',
                              })
                    } else {
                              show.value = true;
                              console.log('show.value', show.value);

                              errors.value = response.data.data;
                              console.log('errors.value', errors.value);


                              setTimeout(function () {

                                        show.value = false;
                                        console.log('key', key);
                                        // console.log('errors', errors.value[key][0]);
                                        //
                                        // showError(key);
                              }, 5000);


                              // toast.fire({
                              //           icon: 'error',
                              //           title: 'Customer created successfuly',
                              // })

                              //
                              // setTimeout(() => {
                              //           show.value = false
                              // }, 3000)


                              // toast.fire({
                              //           icon: 'error',
                              //           title: 'test1'
                              // });
                              //
                              // toast.fire({
                              //           icon: 'error',
                              //           title: 'test2'
                              // });
                              //
                              // toast.fire({
                              //           icon: 'error',
                              //           title: '3'
                              // });

                              // const keys = Object.keys(errors.value);
                              // //
                              // keys.forEach(key => {
                              //
                              //           console.log('before show error key',key)
                              //           showError(key);
                              //
                              //
                              // });

                              // errors.forEach(el=> console.log(el));


                    }


          });
}

// const createCustomer = ref(new CustomerService())
const minez = (index) => {
          console.log(customer.value.userDetail.length)
          if (customer.value.userDetail.length < 2) {
                    console.log('latest item, cant remove');
          } else {
                    customer.value.userDetail.splice(index, 1)
          }
}

const prepend = () => {
          customer.value.userDetail.push({title: '', value: '', isShown: true})
          console.log('prepend', customer.value.userDetail);

}
</script>

<style scoped>

.btnGreen {
          background-color: green;
}

.btnRed {
          background-color: red;

}

.fieldBlue {
          background-color: rgba(36, 16, 225, 0.87);
          color: #b2caf1;
}

#custoreCreate {
          width: 95%;
          padding: 2%;
          /*border: 1px solid #ccc;*/
}

.errorMessage {
          width: 100%;
          position: fixed;
          z-index: 1000000;
          height: 10px;
          top: 0;
          left: 0;
          transition: opacity 0.5s ease;

}

.fade-enter-active,
.fade-leave-active {
          transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
          opacity: 0;
}
</style>
