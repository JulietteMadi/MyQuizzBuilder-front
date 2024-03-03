<template>

     <!-- Warning delete modal -->
     <DeleteDialog :dialogMessage="deleteDialogMessage" @deleteItem="deleteQuiz" />
     
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
            <QuizItem :quiz="quiz" :index="index.toString()" @deleteQuiz="askDeleteQuiz" @updateQuiz="updateQuiz"/>
        </div>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { mapState } from "pinia";
import QuizItem from "../components/quizzes/QuizItem.vue";
import DeleteDialog from "../components/commons/DeleteDialog.vue";

export default {
    data() {
        if (import.meta.env.MODE === "demo") {
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
                searchQuiz: "",
                quizToDelete: {}
            }
        } else {
            return {
                quizzes: [],
                searchQuiz: "",
                quizToDelete: {},
                deleteDialogMessage: {}
            }
        }
    },

    components: {
        QuizItem,
        DeleteDialog
    },

    mounted(){
        if (import.meta.env.MODE !== "demo") this.getAllQuizzes();
    },

    computed: {
        ...mapState(useUserStore, ["token"]),
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
    },

    methods: {
        updateQuiz(id){
            this.$router.push({name: 'modifierQuiz', params: {id: id} });
        },
        askDeleteQuiz(index){
            this.quizToDelete = this.quizzes.find(quiz => quiz.id === index);
            this.deleteDialogMessage = {
                indexDelete: this.quizToDelete.id,
                title: `Êtes vous sûr-e de vouloir supprimer ce quiz ?`,
                body: "Cette action est irréversible, et vous supprimerez définitivement le quiz: " + this.quizToDelete.name,
            }
        },
        async getAllQuizzes(){
            const headers = { 'Authorization': `Bearer ${this.token}` };
            const resp = await this.$http.get('/quizzes', {headers: headers});
            if(resp.status == 200 || resp.status == 204) {
                this.quizzes = resp.body;
            } else {
                console.error(resp);
            }
        },
        async deleteQuiz(id) {
            if (import.meta.env.MODE !== "demo") {
                const headers = { 'Authorization': `Bearer ${this.token}` }
                const resp = await this.$http.delete(`/quizzes/${id}`, { headers: headers });
                if (resp.status === 204 || resp.status === 200) {
                    await this.getAllQuizzes();
                    this.$toast.success("toast-app", `Le quiz ${this.quizToDelete.name} a bien été supprimé`);
                } else {
                    console.error(error)
                    this.$toast.error("toast-app", `Un problème est survenu à la suppression du quiz ${this.quizToDelete.name}`);
                }
            } else {
                const indexToDelete = this.quizzes.findIndex(quiz => quiz.id === id);
                this.quizzes.splice(indexToDelete, 1);
                this.$toast.success("toast-app", `Le quiz ${this.quizToDelete.name} a bien été supprimé`)
            }

        }
    }
}
</script>
