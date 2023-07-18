import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../pages/Home.page.vue')
        },
        {
            path: '/themes',
            name: 'themes',
            component: () => import('../pages/TopicsList.page.vue')
        },
        {
            path: '/creer-theme',
            name: 'creerTheme',
            component: () => import('../pages/TopicCreate.page.vue')
        },
        {
            path: '/quiz',
            name: 'quiz',
            component: () => import('../pages/QuizList.page.vue')
        },
        {
            path: '/creer-quiz',
            name: 'creerQuiz',
            component: () => import('../pages/QuizCreate.page.vue')
        },
        {
            path: '/connexion',
            name: 'signIn',
            component: () => import('../pages/SignIn.page.vue')
        },
        {
            path: '/creer-compte',
            name: 'createAccount',
            component: () => import('../pages/SignUp.page.vue')
        }
    ]
})

export default router;