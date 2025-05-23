import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue';
import CategoryTree from '../components/CategoryTree.vue';
import AboutUs from '../components/AboutUs.vue';
const router = createRouter({
    history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
    },
    {
        path: '/catalog',
        name: 'catalog',
        component: CategoryTree
    },
 {
        path: '/about-us',
        name: 'AboutUs',
        component: AboutUs
    }
  ]
});

export default router;
