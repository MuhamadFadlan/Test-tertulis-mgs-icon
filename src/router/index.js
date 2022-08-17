import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'auth.login',
        component: () => import("../views/auth/login.vue")
    },
    {
        path: '/register',
        name: 'auth.register',
        component: () => import("../views/auth/register.vue")
    },
    {
        path: '/index',
        name: 'books.index',
        component: () => import("../views/books/index.vue")
    },
    {
        path: '/create',
        name: 'books.create',
        component: () => import("../views/books/create.vue")
    },
    {
        path: '/edit/:id',
        name: 'books.edit',
        component: () => import("../views/books/edit.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;