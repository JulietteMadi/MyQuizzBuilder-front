<template>
    <!-- Header -->
    <div class="row my-5 mx-auto">
        <div class="col-md mx-auto">
            <h1>Liste de mes quiz</h1>
        </div>
        <div class="col-md mx-auto">
            <RouterLink to="/creer-quiz">
                <button class="btn secundary-button float-md-end btn-lg" type="button">
                    <i class="bi bi-plus-circle"></i>
                    Créer un quiz
                </button>
            </RouterLink>
        </div>
        <div class="col-12 p-2 mt-5 input-group">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
            <input type="text" class="form-control" id="searchQuiz" placeholder="Rechercher un quiz" v-model="searchQuiz">
        </div>
    </div>

    <!-- QuizList -->
    <div class="row my-5 mx-auto text-center">
        <div class=" col-12 col-sm-6 col-md-4 col-lg-3 py-3" v-for="(quiz, index) in filteredQuiz">
            <QuizItem :quizName="quiz.name" :index="index.toString()" />
        </div>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import QuizItem from "../components/quizzes/QuizItem.vue"

export default {
    data() {
        return {
            quizzes: [
                { id: 1, name: "Sensibilisation pour les recruteurs" },
                { id: 2, name: "Quiz de la journée contre la discrimination" },
                { id: 3, name: "Sensibilisation pour les artisants" },
                { id: 4, name: "RSE en grand groupe" },
                { id: 5, name: "Salon des entreprises" },
                { id: 6, name: "Quiz pôle emploi" },
                { id: 7, name: "Sensibilisation CEO - long" },
                { id: 8, name: "Sensibilisation CEO - court" },
                { id: 9, name: "Quiz intégration collaborateur" }
            ],
            searchQuiz: ""
        }
    },

    components: {
        QuizItem
    },

    computed: {
        filteredQuiz() {
            const search = this.searchQuiz.toLowerCase();
            if (!search) {
                return this.quizzes;
            } else {
                return this.quizzes.filter(quiz => {
                    const name = quiz.name.toLowerCase();
                    return name.includes(search);
                });
            }
        }
    }
}
</script>
