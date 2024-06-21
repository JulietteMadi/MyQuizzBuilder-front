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
    <div v-if="loading" class="mt-5 pt-5">
        <div class="spinner-border spin-color" role="status"></div>
    </div>
    <div v-else class="row my-5 mx-auto text-center">
        <div class=" col-12 col-sm-6 col-md-4 col-lg-3 py-3" v-for="(quiz, index) in filteredQuiz">
            <QuizItem 
                :quiz="quiz" 
                :index="index.toString()" 
                @deleteQuiz="askDeleteQuiz" 
                @updateQuiz="updateQuiz"
                @shareQuiz="shareQuiz"/>
        </div>
        <div v-if="filteredQuiz.length === 0">
            <h2>Nom d'une coccinelle !</h2>
            <p>Vous n'avez pas de quiz correspondant à votre recherche ...</p>
            <img src="../assets/mqb-coccinelle.png" alt="Coccinelle de réconfort">
        </div>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { mapState } from "pinia";
import QuizItem from "../components/quizzes/QuizItem.vue";
import DeleteDialog from "../components/commons/DeleteDialog.vue";
import { demoQuizzes } from "../datas/quizzes";

export default {
    data() {
        return {
            quizzes: [],
            searchQuiz: "",
            quizToDelete: {},
            deleteDialogMessage: {},
            loading: false
        }
    },

    components: {
        QuizItem,
        DeleteDialog
    },

    mounted(){
        if (import.meta.env.MODE !== "demo") {
            this.getAllQuizzes();
        } else {
            this.initDemoDatas();
        }
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
        askDeleteQuiz(index){
            this.quizToDelete = this.quizzes.find(quiz => quiz.id === index);
            this.deleteDialogMessage = {
                indexDelete: this.quizToDelete.id,
                title: `Êtes vous sûr-e de vouloir supprimer ce quiz ?`,
                body: "Cette action est irréversible, et vous supprimerez définitivement le quiz: " + this.quizToDelete.name,
            }
        },
        shareQuiz(id){
            const routeUrl = this.$router.resolve({ name: 'quizStartPlay', params: { id: id} }).href;
            window.open(routeUrl, '_blank');
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
                this.loading = true;
                const headers = { 'Authorization': `Bearer ${this.token}` }
                const resp = await this.$http.delete(`/quizzes/${id}`, { headers: headers });
                this.loading = false;
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

        },
        initDemoDatas(){
            this.quizzes = demoQuizzes;
        }
    }
}
</script>
