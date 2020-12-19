import Vue from 'vue';
import VueRouter from 'vue-router';
import GlobalFeed from '@/views/GlobalFeed.vue';
import YourFeed from '@/views/YourFeed.vue';
import TagFeed from '@/views/TagFeed.vue';
import Article from '@/views/Article.vue';
import CreateArticle from '@/views/CreateArticle.vue';
import EditArticle from '@/views/EditArticle.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YourFeed,
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: TagFeed,
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: CreateArticle,
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: Article,
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: EditArticle,
  },
  {
    path: '/settings',
    name: 'settings',
    component: GlobalFeed,
  },

  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: GlobalFeed,
  },

  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: GlobalFeed,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
