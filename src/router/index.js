import { createRouter, createWebHistory } from 'vue-router'

const Home           = () => import('../views/Home.vue')
const Signup         = () => import('../views/Signup.vue')
const Login          = () => import('../views/Login.vue')
const Products       = () => import('../views/Products.vue')
const ProductForm    = () => import('../views/ProductForm.vue')
const ProductDetail  = () => import('../views/ProductDetail.vue')
const Catalogue      = () => import('../views/Catalogue.vue')
const Stats          = () => import('../views/Stats.vue')
const Contact        = () => import('../views/Contact.vue')

const routes = [
  { path: '/',               name: 'Home',       component: Home },
  { path: '/signup',         name: 'Signup',     component: Signup },
  { path: '/login',          name: 'Login',      component: Login },

  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: { requiresAuth: true }
  },
  {
    path: '/catalogue',
    name: 'Catalogue',
    component: Catalogue
  },
  {
    path: '/products/new',
    name: 'ProductNew',
    component: ProductForm,
    props: { id: null },
    meta: { requiresAuth: true }
  },
  {
    path: '/products/:id/edit',
    name: 'ProductEdit',
    component: ProductForm,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats,
    meta: { requiresAuth: true }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuth = !!localStorage.getItem('user')
  if (to.meta.requiresAuth && !isAuth) {
    return next({ name: 'Login' })
  }
  next()
})

export default router
