<template>
    <DeleteDialog :dialogMessage="deleteDialogMessage" @deleteItem="deleteQuestion" />
    <h1>Modifier le quiz "{{ quiz.name }}"</h1>
    <form class="my-5" @submit.prevent="updateQuiz">
        <div class="outlined my-4 p-4">
            <!-- Form header -->
            <div clas="row">
                <div class="col-12 col-md-8">
                    <label for="name" class="fs-5 mt-2">Nom du Quiz</label>
                    <input v-model="quiz.name"
                        id="name"
                        name="name" 
                        type="text" 
                        maxlength="255" 
                        class="form-control"
                        >
                </div>
                <div class="col-12 col-md-4">
                    <label for="image" class="fs-5 mt-2">Illustration du quiz</label>
                    <input v-model="quiz.image"
                        id="image"
                        name="image"
                        class="form-control" 
                        type="text">
                </div>
                <div class="col-12 my-4">
                    <p>Veuillez ajouter entre 5 et 50 questions pour votre quiz<br>
                        Attention au choix de l’image et du nom de votre quiz, ce sont les informations que les
                        utilisateurs verront !</p>
                </div>
            </div>

            <!-- List of questions -->
            <div class="accordion" id="questionsList">
                <div class="accordion-item" v-for="(question, index) of quiz.questions" :key="index" ref="accordionItems">
                    <QuizQuestions :question="question" :questionIndex="index" :topics="topics" @askDeleteQuestion="askDeleteQuestion" />
                </div>
                <button class="btn secundary-button mt-4" @click="addQuestion" type="button">
                    <i class="bi bi-plus-circle" id="addButton"></i>
                    Ajouter une question
                </button>
            </div>
        </div>

        <!-- Register new quiz button-->
        <div class="align-items-end flex-column px-2 row mb-5">
            <button class="btn primary-button mt-2 col-12 col-md-3" type="submit">
                <i class="bi bi-plus-circle me-3"></i>
                Modifier le quiz
            </button>
        </div>

    </form>
</template>
<script>
import { useRoute } from 'vue-router';
import { mapState } from 'pinia';
import { useUserStore } from '../stores/userStore';
import QuizQuestions from "../components/quizzes/QuizQuestions.vue";
import DeleteDialog from '../components/commons/DeleteDialog.vue';

export default {
    setup(){
        return {
            route: useRoute()
        }
    },
    data(){
        return {
            id: this.route.params.id, 
            quiz: {},
            topics: [],
            deleteDialogMessage: {}
        }
    },

    components: {
        QuizQuestions, 
        DeleteDialog
    },

    async mounted(){
        this.initQuiz();
        this.getAllTopics();
    },

    computed: {
        ...mapState(useUserStore, ["token"])
    },

    methods:{
        addQuestion() {
            this.quiz.questions.push(
                {
                    name: '',
                    topicId: null,
                    answers: [
                        { name: '', valid: false },
                        { name: '', valid: false }
                    ],
                    answerDescription: ''
                });
            const newIndex = this.quiz.questions.length - 1;
            this.activeIndex = newIndex;
        },
        askDeleteQuestion(index) {
            this.deleteDialogMessage = {
                indexDelete: index,
                title: `Êtes vous sûr-e de vouloir supprimer la question ${index + 1} :`,
                body:  "Cette action est irréversible, et vous supprimerez définitivement la question: " + this.quiz.questions[index].name,
            }
            this.indexDelete = index;
        },
        deleteQuestion(index) {
            this.quiz.questions.splice(index, 1);
        },
        formatQuestionsAnswersWithIndex(){
            for(let i = 0; i < this.quiz.questions.length; i++){
                this.quiz.questions[i].questionIndex = i;
                for(let j = 0; j < this.quiz.questions[i].answers.length; j++){
                    this.quiz.questions[i].answers[j].answerIndex = j;
                }
            }
        },
    
        async initQuiz(){
            const headers = { 'Authorization': `Bearer ${this.token}` };
            const resp = await this.$http.get(`/quizzes/${this.id}`,  { headers: headers });
            if(resp.status === 204 || resp.status === 200){
                this.quiz = resp.body;
            } else {
                console.error(resp);
            }

        },
        async getAllTopics() {
            const headers = { 'Authorization': `Bearer ${this.token}` }
            const resp = await this.$http.get('/topics', { headers: headers });
            if (resp.status == 200 || resp.status == 204) {
                this.topics = resp.body;
            } else {
                console.error(resp);
            }
        },
        async updateQuiz(){
            this.formatQuestionsAnswersWithIndex();
            const headers = { 'Authorization': `Bearer ${this.token}` };
            const resp = await this.$http.put(`/quizzes/${this.id}`, this.quiz, { headers: headers });
            if (resp.status == 204 || resp.status == 200) {
                this.$toast.success("toast-app", `Le guide ${this.quiz.name} a bien été modifié`);
                this.$router.push({ name: 'quiz' });
            } else {
                console.error(resp);
                this.$toast.error("toast-app", "Un problème est survenu à la modification de ce quiz");
            }
        }
    }
}
</script>