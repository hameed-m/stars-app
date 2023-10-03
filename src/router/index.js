// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Students from '../views/Students'
import Home from '../views/Home'
import Sections from '../views/Sections'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/students',
    name: 'Students',
    component: Students
  },
  {
    path: '/sections/:id',
    name: 'Sections',
    component: Sections
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
