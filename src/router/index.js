import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import Homeindex from '@/components/Homeindex.vue'
import Release from '@/components/Release.vue'
import material from '@/components/material.vue'
import register from "@/components/register.vue"
import ShoppingCart from '@/components/ShoppingCart.vue'
import offer from '@/components/offer.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        redirect: '/'
    },
    {
        path: '/',
        name: 'login',
        component: login
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/',
                name: 'Homeindex',
                component: Homeindex
            },
            {
                path: '/Home/Release',
                name: 'Release',
                component: Release
            },
            {
                path: '/Home/material',
                name: 'material',
                component: material
            },
            {
                path: '/Home/offer',
                name: 'offer',
                component: offer
            },
            {
                path: '/Home/ShoppingCart',
                name: 'ShoppingCart',
                component: ShoppingCart
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
