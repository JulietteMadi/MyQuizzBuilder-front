<template>
    <!-- Warning delete modal -->
    <div class="modal fade" id="warningModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-danger" id="exampleModalLabel">Êtes-vous sûr.e de vouloir supprimer la
                        question {{ indexDelete + 1 }} ?</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    Cette action est irréversible, et vous perdrez toute la question {{ indexDelete + 1 }} :
                    <b v-if="quiz.questions[indexDelete]">{{ quiz.questions[indexDelete].name }}</b>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                        @click="deleteQuestion(indexDelete)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
    <h1>Créer un quiz</h1>
    <form class="my-5" @submit.prevent="createQuiz()">
        <div class="outlined my-4 p-4">
            <!-- Form header -->
            <div class="row">
                <div class="col-12 col-md-8">
                    <label for="name" class="fs-5 mt-2">Nom du Quiz</label>
                    <input name="name" id="name" type="text" maxlength="255" class="form-control"
                        placeholder="Ex : recrutement" v-model="quiz.name">
                </div>
                <div class="col-12 col-md-4">
                    <label for="image" class="fs-5 mt-2">Illustration du quiz</label>
                    <input class="form-control" type="file" id="image">
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
                    <QuizQuestions :question="question" :questionIndex="index" :topics="topics" :activeIndex="activeIndex" @askDeleteQuestion="askDeleteQuestion" />
                </div>
                <button class="btn secundary-button mt-4" @click="addQuestion" type="button">
                    <i class="bi bi-plus-circle" id="addButton"></i>
                    Ajouter une question
                </button>
            </div>
        </div>
    </form>

    <!-- Register new quiz button-->
    <div class="align-items-end flex-column px-2 row mb-5">
        <button class="btn primary-button mt-2 col-12 col-md-3" type="submit" @click="createQuiz">
            <i class="bi bi-plus-circle me-3"></i>
            Créer un quiz
        </button>
    </div>
</template>

<script>
import QuizQuestions from "../components/quizzes/QuizQuestions.vue";
import { useUserStore } from "../stores/userStore";
import { mapState } from "pinia"

export default {
    data() {
        return {
            quiz: {
                name: "",
                questions: []
            },
            indexDelete: 0,
            topics : [],
            activeIndex: 0
        }
    },

    components: {
        QuizQuestions
    },

    computed: {
        ...mapState(useUserStore, ["token"])
    },

    mounted() {
        this.addQuestion();
        this.getAllTopics();
    },

    methods: {
        createQuiz() {
            this.$router.push({ name: 'quiz' });
        },
        addQuestion() {
            this.quiz.questions.push(
                {
                    name: '',
                    topic: '',
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
            this.indexDelete = index;
        },
        deleteQuestion(index) {
            this.quiz.questions.splice(index, 1);
        },

        async getAllTopics() {
            const headers = { 'Authorization': `Bearer ${this.token}` }
            const resp = await this.$http.get('/topics', { headers: headers });
            if (resp.status == 200 || resp.status == 204) {
                this.topics = resp.body;
            } else {
                console.error(resp);
            }
        }
    }
}
</script>