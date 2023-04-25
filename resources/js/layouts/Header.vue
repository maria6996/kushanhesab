<template>

          <div class="header_profile-name">
                    <v-menu>
                              <template v-slot:activator="{ props }">
                                        <v-btn
                                                  color="primary"
                                                  v-bind="props"
                                        >
                                                  <p class="header_profile-name">

                                                            <span> {{ user }}</span>
                                                  </p>


                                        </v-btn>
                              </template>
                              <v-list>
                                        <v-list-item
                                                  v-for="(item, index) in items"
                                                  :key="index"
                                                  :value="index"
                                                  :href="item.to"
                                        >
                                                  <v-list-item-title>{{
                                                                      item.title
                                                            }}
                                                  </v-list-item-title>
                                        </v-list-item>
                              </v-list>
                    </v-menu>
          </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import router from "../routes/index";
// import {defineExpose} from "vue";

const user = localStorage.getItem("username");
const sideMenuClass = ref('sidebar-open');
const showNavHeader = ref(false)

// const emit= defineEmits(["closeSidebar"])

const openNavHeader = () => {
          console.log('open menu');
          showNavHeader.value = !showNavHeader.value
}

const logout = () => {
          localStorage.removeItem('token')
          router.push('/')
}
let items = ref([
          {title: 'profile', to: "#"},
          {title: 'message', to: "#"},
          {title: 'logout', to: "/test"},
]);

// onMounted(() => {
//
//
// });
//

let closeSidebar = (collapse) => {
          collapse === true ? sideMenuClass.value = 'sidebar-open' : sideMenuClass.value = 'sidebar-close';
          // emit("closeSidebar", "closeSidebar");
}

defineExpose({
          closeSidebar
})
</script>

<style>
.sidebar-open {
          position: absolute;
          right: 3%;

}

.sidebar-close {
          position: absolute;
          right: 3%;

}

</style>
