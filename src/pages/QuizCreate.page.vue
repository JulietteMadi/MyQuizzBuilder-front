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
                    <b>{{ questions[indexDelete] && questions[indexDelete].name }}</b>
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
                <div class="accordion-item" v-for="(question, index) of questions" :key="index" ref="accordionItems">
                    <QuizQuestions :question="question" :index="index" @askDeleteQuestion="askDeleteQuestion" />
                </div>
                <button class="btn secundary-button mt-2" @click="addQuestion" type="button">
                    <i class="bi bi-plus-circle" id="addButton"></i>
                    Ajouter une question
                </button>
            </div>
        </div>
    </form>

    <!-- Register new quiz button-->
    <div class="align-items-end flex-column row mb-5">
        <button class="btn btn-primary mt-2 col-12 col-md-3" type="submit" @click="createQuiz">
            <i class="bi bi-plus-circle me-3"></i>
            Créer un quiz
        </button>
    </div>
</template>

<script>
import QuizQuestions from "../components/quizzes/QuizQuestions.vue";

export default {
    data() {
        return {
            quiz: {
                name: "",
                questions: []
            },
            questions: [],
            indexDelete: 0,
            activeIndex: null
        }
    },

    components: {
        QuizQuestions
    },

    mounted() {
        this.addQuestion();
    },

    methods: {
        createQuiz() {
            this.$router.push({ name: 'quiz' });
        },
        addQuestion() {
            this.questions.push(
                {
                    name: '',
                    topic: '',
                    answers: [
                        { name: '', valid: false },
                        { name: '', valid: false },
                        { name: '', valid: false },
                        { name: '', valid: false }
                    ],
                    answerDescription: ''
                });
            this.activeIndex = this.questions.length - 1;
            this.$nextTick(() => {
                const accordionItems = this.$refs.accordionItems;
                const lastAccordionItem = accordionItems[accordionItems.length - 1];
                lastAccordionItem.scrollIntoView({ behavior: 'smooth', block: 'end' });
            });
        },
        askDeleteQuestion(index) {
            this.indexDelete = index;
        },
        deleteQuestion(index) {
            this.questions.splice(index, 1);
        },
    }
}
</script>