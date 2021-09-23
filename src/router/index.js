import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddTrip from '../views/AddTrip.vue'
import MyTrip from '../views/MyTrip.vue'
import AllTrip from '../views/ListTrip.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addtrip',
    name: 'AddTrip',
    component: AddTrip,
    beforeEnter: (to, from, next) => {
      if(to.name == 'AddTrip' && !localStorage.getItem('access_token')){
        next({name: 'Home'})
      } else {
        next()
      }
    }
  },
  {
    path: '/mytrip',
    name: 'MyTrip',
    component: MyTrip,
    beforeEnter: (to, from, next) => {
      if(to.name == 'MyTrip' && !localStorage.getItem('access_token')){
        next({name: 'Home'})
      } else {
        next()
      }
    }
  },
  {
    path: '/trips',
    name: 'AllTrip',
    component: AllTrip,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
