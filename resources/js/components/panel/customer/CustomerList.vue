<template>
          <div class="main">

                    <v-row>
                              <v-col cols="11">
                                        <v-card>
                                                  <v-data-table
                                                            :headers="headers"
                                                            :items="desserts"
                                                  >


                                                            <template v-slot:item.services="{ item }">


                                                                      <span v-if="getLenght(item.raw.services)">
                                                                                                       <span v-for="service in item.raw.services">
                                                                                                                 {{ service +  " -" }}
                                                                                                       </span>
                                                                      </span>
                                                                      <span v-else-if="!getLenght(item.raw.services)">
                                                                                                       <span v-for="service in item.raw.services">
                                                                                                                 {{ service  }}
                                                                                                       </span>
                                                                      </span>


                                                            </template>


                                                            <!--                                                            <template v-slot:item.services="{ item }">-->
                                                            <!--                                                                      <td >-->
                                                            <!--                                                                                {{" - "}}-->
                                                            <!--                                                                                {{ item }}-->

                                                            <!--                                                                      </td>-->
                                                            <!--&lt;!&ndash;                                                                      &ndash;&gt;-->
                                                            <!--&lt;!&ndash;                                                                      <v-text-field >&ndash;&gt;-->
                                                            <!--&lt;!&ndash;                                                                                {{item}}&ndash;&gt;-->
                                                            <!--&lt;!&ndash;                                                                      </v-text-field>&ndash;&gt;-->
                                                            <!--                                                            </template>-->


                                                  </v-data-table>
                                        </v-card>
                              </v-col>

                    </v-row>
          </div>

</template>

<script setup>

import CustomerService from "../../../services/CustomerService";
import {onBeforeMount, ref} from "vue";

const customerLists = ref(new CustomerService());
// let length = ref();

const getLenght = (item) => {
          console.log('item.length', item.length > 1 ? true : false, 'item.raw.services', item);

          return item.length > 1 ? true : false

          // if (item.length > 1) return true;
          // else return false;

}
const getCustomer = async () => {
          await customerLists.value.getCustomers().then(response => {
                    console.log('res', response)
          })
}

onBeforeMount(async () => {
          console.log('onBeforeMount');
          // await  getCustomer()

          await customerLists.value.getCustomers().then(response => {
                    console.log('res', response.data);
                    desserts.value = response.data;
          })

          // onBeforeMount(async () => {
          //           await getTypes();
          //           // loadingPage.value = false;
          // });


})


let headers = [
          {align: 'start', key: 'counter', sortable: false, title: 'ردیف',},
          {key: 'name', title: 'نام'},
          {key: 'mobile', title: 'موبایل'},
          {key: 'phone', title: 'تلفن'},
          {key: 'address', title: 'آدرس'},
          {key: 'services', title: 'لیست خدمات دریافتی'},
          {key: 'operation', title: 'عملیات'},
];
let desserts = ref([]);

</script>

<style scoped>

</style>
