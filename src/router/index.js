import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/userStore.js"

const routeWithoutAuth = ["signIn", "createAccount", "quizStartPlay", "answerQuestion", "quizResults"];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
            // Quiz routes
            {
                path: '/quiz',
                name: 'quiz',
                component: () => import('../pages/QuizList.page.vue')
            },
            {
                path: '/creer-quiz',
                name: 'quizCreate',
                component: () => import('../pages/QuizCreate.page.vue')
            },
            {
                path: '/quiz/modifier/:id',
                name: 'quizUpdate',
                component:() => import('../pages/QuizUpdate.page.vue')
            },
            {
                path: '/quiz/:id/bienvenue',
                name: 'quizStartPlay',
                component:() => import('../pages/QuizPlayWelcome.page.vue')
            },
            {
                path: '/quiz/:id/:questionIndex',
                name: 'answerQuestion',
                component:() => import('../pages/QuizPlayQuestion.page.vue')
            },
            {
                path: '/quiz/resultats',
                name: 'quizResults',
                component:() => import('../pages/QuizPlayResult.page.vue')
            },
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
            name: 'topics',
            component: () => import('../pages/TopicsList.page.vue')
        },
        {
            path: '/creer-theme',
            name: 'topicCreate',
            component: () => import('../pages/TopicCreate.page.vue')
        },
        {
            path: '/theme/modifier/:id/:name',
            name: 'topicUpdate',
            component: () => import('../pages/TopicUpdate.page.vue')
        }
    ]
})

router.beforeEach((to) => {
    console.log("to.meta in route: ", to.meta);
    const userStore = useUserStore();
    if (userStore.token === '' && !routeWithoutAuth.includes(to.name)) {
        return { name: 'signIn' }
    }
})

export default router;