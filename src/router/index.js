import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Card from '../views/Card'
import Avalon from '../views/Avalon'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/card',
      name: 'Card',
      component: Card
    },
    {
      path: '/avalon',
      name: 'Avalon',
      component: Avalon
    }
  ]
})
