import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/userStore.js"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

        // Main and commons routes
        {
            path: '/',
            name: 'home',
            component: () => import('../pages/Home.page.vue')
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
        },


        // Topic routes
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
            path: '/theme/modifier/:id/:name',
            name: 'modifierTheme',
            component: () => import('../pages/TopicUpdate.page.vue')
        },


        // Quiz routes
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
            path: '/quiz/modifier/:id',
            name: 'modifierQuiz',
            component:() => import('../pages/QuizUpdate.page.vue')
        },
        {
            path: '/quiz/:id/bienvenue',
            name: 'jouerQuiz',
            component:() => import('../pages/QuizPlay.page.vue')
        },
        {
            path: '/quiz/:id/:questionIndex',
            name: 'repondreQuestion',
            component:() => import('../pages/QuizQuestion.page.vue')
        }
    ]
})

router.beforeEach((to) => {
    const userStore = useUserStore();
    if (userStore.token === '' && to.name !== "signIn" && to.name !== "createAccount") {
        return { name: 'signIn' }
    }
})

export default router;