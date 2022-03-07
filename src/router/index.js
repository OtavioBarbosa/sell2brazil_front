import { createRouter, createWebHistory } from 'vue-router'
import OrderList from '../views/OrderList.vue'
import OrderCreate from '../views/OrderCreate.vue'

const routes = [
  {
    path: '/',
    name: 'order_list',
    component: OrderList
  },
  {
    path: '/create',
    name: 'order_create',
    component: OrderCreate
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
