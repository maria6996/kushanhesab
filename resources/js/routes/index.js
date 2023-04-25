import {createRouter, createWebHistory} from 'vue-router';


import login from '../components/auth/Login.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue';
import Category from '../views/Category.vue';


const loadView = (view) => {
          return () => import(`../views/${view}.vue`);
};


const routes = [
          //login
          {path: '/login', name: 'Login', component: loadView('Login'), meta: {title: 'ورود', requiresAuth: false}},

          //home
          {
                    path: '/panel',
                    name: 'Home',
                    component: loadView('Dashboard'),
                    meta: {
                              title: 'داشبورد کهکشان حساب',
                              requiresAuth: true
                    }
          },

          //dashboard
          {
                    path: '/dashboard', name: 'Dashboard', component: loadView('Dashboard'), meta: {
                              title: 'داشبود کهکشان حساب',
                              requiresAuth: true
                    }
          },

          {
                    path: '/gallery', name: 'Gallery', component: loadView('Gallery'), meta: {
                              title: 'گالری تصاویر',
                              requiresAuth: false
                    }
          },
          {
                    path: '/product/create', name: 'ProductCreate', component: loadView('ProductCreate'),
                    meta: {
                              title: 'ایجاد محصول',
                              requiresAuth: true
                    }
          },

          {
                    path: '/tags/create', name: 'TagCreate', component: loadView('TagCreate'),
                    meta: {
                              title: 'ایجاد تگ',
                              requiresAuth: true

                    }
          },
          {
                    path: '/category/create', name: 'CategoryCreate', component: loadView('CategoryCreate'),
                    meta: {
                              title: 'افزودن دسته بندی',
                              requiresAuth: true

                    }
          },
          {
                    path: '/category', name: 'CategoryList', component: loadView('CategoryList'),
                    meta: {
                              title: 'لیست دسته بندی',
                              requiresAuth: true
                    }
          },
          {
                    path: '/article/create', name: 'ArticleCreate', component: loadView('ArticleCreate'),
                    meta: {
                              title: 'افزودن مقاله',
                              requiresAuth: true

                    }
          },
          {
                    path: '/article', name: 'ArticleList', component: loadView('ArticleList'),
                    meta: {
                              title: 'لیست مقالات',
                              requiresAuth: true

                    }
          },
          {
                    path: '/article/:article', name: 'ArticleShow', component: loadView('ArticleShow'),
                    meta: {
                              title: 'مشاهده آموزش',
                              requiresAuth: true

                    }
          },
          {
                    path: '/user/create', name: 'CustomerCreate', component: loadView('CustomerCreate'),
                    meta: {
                              title: 'ایجاد مشتری',
                              requiresAuth: true

                    }
          },
          {
                    path: '/user', name: 'CustomerList', component: loadView('CustomerList'),
                    meta: {
                              title: 'لیست مشتری',
                              requiresAuth: true

                    }
          },
          {
                    path: '/user/:user', name: 'CustomerShow', component: loadView('CustomerShow'),
                    meta: {
                              title: 'مشاهده مشتری',
                              requiresAuth: true
                    }
          },

          // {
          //     path: '/category',
          //     component: DefaultLayout,
          //     children: [
          //         {
          //             name: 'CreateCategory',
          //             path: 'create/iii',
          //             component: Category,
          //             meta: {title: 'gjg'}
          //         },
          //     ]
          // },

          //category
          // {
          //     path: '/category',
          //     component:  DefaultLayout,
          // //     name:'Category',
          // //     meta: {title: 'دسته بندی ها'},
          //     children: [
          //         {
          //             name: 'CategoryCreate',
          //             path: 'create',
          //             component: loadView('Category'),
          //             meta: {title: 'ایجاد دسته بندی'}
          //         },
          //
          //     ]
          // },


          // {
          //     path: '/admin',
          //     name: 'adminHome',
          //     component: homeAdminIndex,
          // },


          //notFound
          {
                    path: '/:pathMatch(.*)*',
                    name: 'notFound',
                    component: loadView('notFound'),

          },


]

const router = createRouter({
          history: createWebHistory(),
          routes
});

router.beforeEach((to, from) => {

          document.title = to.meta.title

          if (to.meta.requiresAuth && !localStorage.getItem('token')) {
                    return {name: 'Login'}
          }

          // next();
          // if(to.meta.requiresAuth ===false && !localStorage.getItem('token')){
          //     return {name: 'Home'}
          // }
})


// router.beforeEach((to, from, next) => {
//     document.title = to.meta.title
//
//     if (to.meta.requiresAuth && !localStorage.getItem('token')) {
//         return {name: 'Login'}
//     }
// });


export default router;

