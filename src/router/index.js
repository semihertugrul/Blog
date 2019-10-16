import Vue from 'vue'
import Router from 'vue-router'
import Blog from '@/components/Blog'
import About from '@/components/About'
import BlogDetail from '@/components/BlogDetail'
import Search from '@/components/Search'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Blog,
      children: [
        {
          path: '/blog/:index',
          name: 'BlogDetail',
          component: BlogDetail,
          props: true
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/404',
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '*',
      redirect: { name: 'PageNotFound' }
    }
  ],
  mode: 'history'
})
