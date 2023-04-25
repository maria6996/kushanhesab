<template>

          <v-navigation-drawer color="grey-darken-2"
                               v-model="drawer"
                               :rail="rail"
                               permanent
          >

<!--                    <v-row align="center">-->
<!--                              <v-col v-if="!rail"-->

<!--                              >-->
<!--                                        به سامانه کهکشان خوش آمدید-->
<!--                                        <v-divider></v-divider>-->
<!--                                        <v-divider></v-divider>-->

<!--                              </v-col>-->


<!--                              <v-col v-else cols="12" md="12" class="ma-5">-->
<!--                                        <v-divider></v-divider>-->
<!--                              </v-col>-->
<!--                    </v-row>-->
                    <v-divider></v-divider>

                    <v-list v-model:opened="open">

                              <v-list-item
                                        prepend-icon="mdi-view-dashboard-outline"
                                        title="داشبورد"
                                        to="/dashboard"
                              >
                                        <template v-slot:append>
                                                  <v-btn variant="text"></v-btn>
                                        </template>
                              </v-list-item>


                              <v-list-group v-for="item in main" :value="item.title">
                                        <template v-slot:activator="{ props }">
                                                  <v-list-item
                                                            v-bind="props"
                                                            :title="item.title"
                                                            :prepend-icon="item.icons"
                                                  ></v-list-item>
                                        </template>


                                        <v-list-item
                                                  v-for="i in item.child"
                                                  :title=i.title
                                                  :to="i.path"
                                                  :prepend-icon="i.icon"
                                        >
                                        </v-list-item>
                              </v-list-group>

                              <v-list-group
                                        prepend-icon="account_circle"
                                        value="setting"
                              >

                                        <template v-slot:activator="{props}">
                                                  <v-list-item
                                                            v-bind="props"
                                                            title="setting"
                                                            icon="mdi-cog"
                                                  ></v-list-item>
                                        </template>

                                        <v-list-group
                                                  no-action
                                                  sub-group
                                                  value="pages"
                                        >
                                                  <template v-slot:activator="{props}">
                                                            <v-list-item
                                                                      v-bind="props"
                                                                      title="pages"
                                                            >
                                                            </v-list-item>
                                                  </template>
                                                  <v-list-item
                                                            title="about us"
                                                  >
                                                  </v-list-item>

                                                  <!--                                                  <v-btn @click="incrementCounter">{{ counter }}</v-btn>-->
                                                  <!--                                                  <v-btn @click="incrementCounter">{{ doubleCounter  }}</v-btn>-->

                                        </v-list-group>
                              </v-list-group>
                    </v-list>


          </v-navigation-drawer>
</template>
<script setup>
import {ref, computed} from 'vue';

// import { defineExpose } from 'vue'
import {useDisplay} from 'vuetify'


// const emit= defineEmits(["enlargeText"])

defineExpose({
          collapse
})
const display = useDisplay();

const displays = () => {
          useDisplay();
}

//
// const counter = ref(0)
//
// const incrementCounter = () => {
//           counter.value++
// }

// const doubleCounter = computed(() => counter.value * 2);
const height = computed(() => {
          // name is reactive and
          // must use .value
          switch (name.value) {
                    case 'xs':
                              return 220
                    case 'sm':
                              return 400
                    case 'md':
                              return 500
                    case 'lg':
                              return 600
                    case 'xl':
                              return 800
                    case 'xxl':
                              return 1200
          }

          return undefined
})

let main = ref([
          {
                    title: 'دسته بندی ها',
                    children: true,
                    icons: "mdi-shape-outline",
                    child: [
                              {
                                        to: '/create',
                                        icon: 'mdi-plus-box-outline',
                                        route: 'CategoryCreate',
                                        title: 'ایجاد',
                                        path: '/category/create'
                              },
                              {
                                        to: '/',
                                        icon: 'mdi-list-box-outline',
                                        route: 'CategoryList',
                                        title: 'لیست',
                                        path: '/category'
                              },
                    ]
          },
          {
                    title: 'آموزش ها',
                    children: true,
                    icons: 'mdi-school-outline',
                    child: [
                              {
                                        to: '/create',
                                        icon: 'mdi-plus-box-outline',
                                        route: 'ArticleCreate',
                                        title: 'ایجاد',
                                        path: '/article/create'
                              },
                              {
                                        to: '/',
                                        icon: 'mdi-list-box-outline',
                                        route: 'ArticleList',
                                        title: 'لیست',
                                        path: '/article'
                              },
                    ]
          },
          {
                    title: 'مشتری ها',
                    children: true,
                    icons: 'mdi-account-group-outline',
                    child: [
                              {
                                        to: '/create',
                                        icon: 'mdi-plus-box-outline',
                                        route: 'UserCreate',
                                        title: 'ایجاد',
                                        path: '/user/create'
                              },
                              {
                                        to: '/',
                                        icon: 'mdi-list-box-outline',
                                        route: 'UserList',
                                        title: 'لیست',
                                        path: '/user'
                              },
                    ]
          },
          {
                    title: ' سفارشات',
                    children: true,
                    icons: 'mdi-order-bool-ascending',
                    child: [
                              {
                                        to: '/',
                                        icon: 'mdi-list-box-outline',
                                        route: 'OrderList',
                                        title: 'لیست',
                                        path: '/Order'
                              },
                    ]
          },
          {
                    title: 'خدمات ما',
                    children: true,
                    icons: 'mdi-account-wrench-outline',
                    child: [
                              {
                                        to: '/create',
                                        icon: 'mdi-plus-box-outline',
                                        route: 'ProductCreate',
                                        title: 'ایجاد',
                                        path: '/product/create'
                              },
                              {
                                        to: '/',
                                        icon: 'mdi-list-box-outline',
                                        route: 'ProductList',
                                        title: 'لیست',
                                        path: '/product'
                              },
                    ]
          },
          {
                    title: ' برچسب ها',
                    children: true,
                    icons: 'mdi-face-agent',
                    child: [
                              {
                                        to: '/create',
                                        icon: 'mdi-plus-box-outline',
                                        route: 'TagCreate',
                                        title: 'ایجاد برچسب',
                                        path: '/tags/create'
                              }
                    ]
          },
          {
                    title: ' پشتیبانی',
                    children: true,
                    icons: 'mdi-face-agent',
                    child: [
                              {
                                        to: '/ticket',
                                        icon: 'mdi-plus-box-outline',
                                        route: 'UserCreate',
                                        title: 'تیکت ها',
                                        path: '/support/ticket'
                              }
                    ]
          },
          {
                    title: ' تنظیمات',
                    children: true,
                    icons: 'mdi-cog',
                    child: [
                              {
                                        to: '/pages',
                                        icon: 'mdi-plus-box-outline',
                                        route: 'UserCreate',
                                        title: 'صفحات',
                                        path: '/support/ticket',
                                        children: true,
                                        child: [
                                                  {
                                                            to: '/about-us',
                                                            icon: 'mdi-plus-box-outline',
                                                            route: 'UserCreate',
                                                            title: 'درباره ما',
                                                            path: '/support/ticket'
                                                  }
                                        ]
                              }
                    ]
          }
])

// let categories = ref([
//           {
//                     to: '/create',
//                     icon: 'mdi-view-dashboard',
//                     route: 'CategoryCreate',
//                     title: 'ایجاد',
//                     path: '/category/create'
//           },
// ])

function collapse() {
          rail.value = !rail.value;
          // console.log("rail",rail);
          // emit("enlargeText", "someValue");
}

function change() {
          defaultDashboard.value = !defaultDashboard.value;
          // console.log("rail",rail);
          // emit("enlargeText", "someValue");
}


const rail = ref(false);
const drawer = ref(true);
const defaultDashboard = ref(false);


// const showSideMenu = ref(true);
// const closeSideMenuOnRouteChange = () => {
// if (pageSize.value <= 640) {
//     showSideMenu.value = false;
// }
// };
let admins = ref([
          ['Management', 'mdi-account-multiple-outline'],
          ['Settings', 'mdi-cog-outline']
]);

let cruds = ref([
          ['Create', 'mdi-plus-outline'],
          ['Read', 'mdi-file-outline'],
          ['Update', 'mdi-update'],
          ['Delete', 'mdi-delete']
]);
let open = ref(['Users']);

const links = [
          {
                    to: '/dashboard',
                    icon: 'mdi-view-dashboard',
                    text: 'Dashboard',
          },
          {
                    icon: 'mdi-tennis',
                    text: 'Players',
                    subLinks: [
                              {
                                        text: 'Players list',
                                        to: '/players',
                              },
                              {
                                        text: 'Import WTA Players',
                                        to: '/players/import',
                              },
                    ]
          },
          {
                    to: '/tournaments',
                    icon: 'mdi-trophy',
                    text: 'Tournaments',
          },
]

let sideMenuItems = ref([
          {
                    name: 'dashboard',
                    route: 'Dashboard'
          },
          {
                    name: 'category',
                    children: [
                              {name: 'create category', route: 'CategoryCreate'},
                              {name: 'list category', route: 'CategoryList'},
                              // {name: 'create category', route: 'Category'},
                              // {name: 'create category', route: 'Category'},
                              // {name: 'create category', route: 'Category'},
                    ],

          },


])

</script>

<style>
.bg-grey-darken-2 {
          background-color: #000000 !important;
          color: #d5d5d5 !important;
}

</style>
