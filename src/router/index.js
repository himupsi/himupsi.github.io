import Vue from "vue";
import VueRouter from "vue-router";
import VueX from "vuex";
import Posts from "../components/views/Posts.vue";
import Post from "../components/views/Post.vue";
import About from "../components/views/About.vue";
import NotFound from "../components/views/NotFound.vue";

Vue.use(VueRouter);
Vue.use(VueX);

const routes = [
  {
    path: "/",
    name: "posts",
    component: Posts
  },
  {
    path: "/post/:postid",
    name: "post",
    component: Post
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: '*',
    name: "notFound",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    let mainElem = document.getElementsByClassName('u-main');
    mainElem[0].scrollTop = 0;     
  }
});

export default router;
