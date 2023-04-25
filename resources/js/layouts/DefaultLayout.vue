<template>

          <v-card>
                    <v-layout>
                              <v-app-bar>
                                        <v-icon icon="mdi-view-headline"
                                                @click=" $refs.sidebar.collapse();$refs.header.closeSidebar(collapse = !collapse)">
                                        </v-icon>
                                        <span class="vuetify-label mr-md-10">به سامانه کهکشان خوش آمدید</span>
                                        <AppHeader/>
                              </v-app-bar>
                              <AppSidebar ref="sidebar"/>
                              <v-main>
                                        <slot class="first"></slot>
                              </v-main>
                    </v-layout>
          </v-card>


</template>
<script setup>

import AppSidebar from './Sidebar.vue'
import AppHeader from './Header.vue'
import {ref} from "vue";

const showNavHeader = ref(false)

const sidebar = ref(null);
const rail = ref(false);
const collapse = ref(true);
// const user = localStorage.getItem("username");
// let items = ref([
//           {title: 'profile', to: "#"},
//           {title: 'message', to: "#"},
//           {title: 'logout', to: "/test"},
// ]);

</script>
<style>
@import "../styles/base-rtl.css";
@import "../styles/extraStyleRtl.css";
</style>

<style scoped>
.header_profile-name {
          font-weight: bold;
          color: #656565;
          position: absolute;
          left: 4%;
          width: 100px;
}
</style>
