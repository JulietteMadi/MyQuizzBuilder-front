import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../components/HomePage.vue')
        },
        {
            path: '/themes',
            name: 'themes',
            component: () => import('../components/topics/TopicsList.vue')
        },
        {
            path: '/creer-theme',
            name: 'creerTheme',
            component: () => import('../components/topics/CreateTopic.vue')
        },
        {
            path: '/quizz',
            name: 'quizz',
            component: () => import('../components/quizz/QuizzList.vue')
        },
        {
            path: '/creer-quizz',
            name: 'creerQuizz',
            component: () => import('../components/quizz/CreateQuizz.vue')
        }
    ]
})

export default router;