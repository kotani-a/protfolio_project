import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import Works from '@/components/Works'
import HistoryDetail from '@/components/HistoryDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/works',
      name: 'works',
      component: Works
    },
    {
      path: '/historyDetail',
      name: 'historyDetail',
      component: HistoryDetail
    }
  ]
})
