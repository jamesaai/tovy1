import Vue from 'vue'
import VueRouter from 'vue-router'

// Lazy load components for code splitting
const Home = () => import('../views/Home.vue')
const ActivityPage = () => import('../views/activityPage.vue')
const Welcome = () => import('../views/Welcome')
const Login = () => import('../views/Login.vue')
const yourActivity = () => import('../views/yourActivity')
const activeNotices = () => import('@/views/activeNotices')
const settings = () => import('@/views/settings')
const err = () => import('@/views/err')
const Ban = () => import('@/views/Ban')
const staff = () => import('@/views/staff')
const profile = () => import('@/views/profile')
const signup = () => import('@/views/signup')
const forbidden = () => import('@/views/forbidden')
const automation = () => import('@/views/automation')
const wall = () => import('@/views/wall')
const audit = () => import('@/views/audit')
const sessions = () => import('@/views/sessions')
const session = () => import('@/views/session')
const notReady = () => import('@/views/notReady')
const tasks = () => import('@/views/tasks') 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main' },
    component: Home
  },
  {
    path: '/audit',
    name: 'audit',
    meta: { layout: 'main' },
    component: audit
  },
  {
    path: '/automation',
    name: 'automation',
    meta: { layout: 'main' },
    component: automation
  },
  {
    path: '/sessions',
    name: 'Sessions',
    meta: { layout: 'main' },
    component: sessions
  }, {
    path: '/nr',
    name: 'Not ready',
    meta: { layout: 'default' },
    component: notReady
  }, {
    path: '/session/:id',
    name: 'Session',
    meta: { layout: 'main' },
    component: session
  },
  {
    path: '/wall',
    name: 'Wall',
    meta: { layout: 'main' },
    component: wall
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  }, {
    path: '*',
    redirect: '/'
  }, {
    path: '/signup',
    name: 'Signup',
    component: signup
  }, {
    path: '/invite/:code',
    name: 'Invite'
  },
  {
    path: '/error',
    name: 'Server Error',
    component: err
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: forbidden
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: { layout: 'main' },
    component: settings
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    meta: { layout: 'main' },
    component: profile
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/activity',
    name: 'activity',
    meta: { layout: 'main' },
    component: ActivityPage
  },
  {
    path: '/youractivity',
    name: 'Your activity',
    meta: { layout: 'main' },
    component: yourActivity
  },
  {
    path: '/reviewa',
    name: 'Revuiew notices',
    meta: { layout: 'main' },
    component: activeNotices
  },
  {
    path: '/staff',
    name: 'Staff',
    meta: { layout: 'main' },
    component: staff
  },
  {
    path: '/ban',
    name: 'ban', 
    meta: { layout: 'main' },
    component: Ban
  },
  {
    path: '/tasks',
    name: 'Tasks',
    meta: { layout: 'main' },
    component: tasks
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '',
  routes
})

export default router
