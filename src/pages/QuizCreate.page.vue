<template>
    <!-- Warning delete modal -->
    <DeleteDialog :dialogMessage="deleteDialogMessage" @deleteItem="deleteQuestion" />
    <h1>Créer un quiz</h1>
    <form class="my-5" @submit.prevent="createQuiz">
        <div class="outlined my-4 p-4">
            <!-- Form header -->
            <div class="row">
                <div class="col-12 col-md-8">
                    <label for="name" class="fs-5 mt-2">Nom du Quiz</label>
                    <input v-model="quiz.name"
                        id="name"
                        name="name" 
                        type="text" 
                        maxlength="255" 
                        class="form-control"
                        placeholder="Ex : recrutement"
                        >
                    <p v-if="v$.quiz.name.$error" 
                        class="text-danger">
                        {{ v$.quiz.name.$errors[0].$message }}
                    </p>
                </div>
                <div class="col-12 col-md-4">
                    <label for="image" class="fs-5 mt-2">Illustration du quiz</label>
                    <input v-model="quiz.image"
                        id="image"
                        name="image"
                        class="form-control" 
                        type="text">
                    <p v-if="v$.quiz.image.$error" 
                        class="text-danger">
                        {{ v$.quiz.image.$errors[0].$message }}
                    </p>
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
                <button class="btn secundary-button mt-4" @click="addQuestion" type="button" :disabled="quiz.questions.length === 50">
                    <i class="bi bi-plus-circle" id="addButton"></i>
                    Ajouter une question
                </button>
            </div>
        </div>
        <!-- Register new quiz button-->
        <div class="align-items-end flex-column px-2 row mb-5">
            <button class="btn primary-button mt-2 col-12 col-md-3" type="submit" :disabled="invalidForm">
                <i class="bi bi-plus-circle me-3"></i>
                Créer un quiz
            </button>
        </div>
    </form>
</template>

<script>
import { useUserStore } from "../stores/userStore";
import { mapState } from "pinia";
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, minLength, helpers } from '@vuelidate/validators';
import QuizQuestions from "../components/quizzes/QuizQuestions.vue";
import DeleteDialog from "../components/commons/DeleteDialog.vue";

export default {
    setup() {
        return {
            v$: useVuelidate({ $autoDirty: true })
        }
    },
    data() {
        if (import.meta.env.MODE === "demo") {
            return {
                quiz: {
                    name: "",
                    image: "",
                    userId: 1,
                    questions: []
                },
                indexDelete: 0,
                topics : [
                    { id: 1, name: "Recrutement" },
                    { id: 2, name: "Onboarding" },
                    { id: 3, name: "Sensibilisation" },
                    { id: 4, name: "RSE en grand groupe" },
                    { id: 5, name: "Jeunes entrepreneurs" },
                    { id: 6, name: "Parité en entreprise" },
                    { id: 7, name: "Formations internes" },
                    { id: 8, name: "Rédaction de fiche emploi" },
                    { id: 9, name: "Sélectionner les CV" }
                ],
                activeIndex: 0
            }
        } else {
            return {
                quiz: {
                    name: "",
                    image: "",
                    userId: 1,
                    questions: []
                },
                indexDelete: 0,
                topics : [],
                activeIndex: 0,
                deleteDialogMessage: {}
            }
        }
    },

    validations(){
        return {
            quiz:{
                name: {
                    required: helpers.withMessage('Veuillez renseigner un nom pour ce quiz', required),
                    maxLength: helpers.withMessage('Le nom du quiz ne peut pas dépasser 255 caractères', maxLength(255))
                },
                image: {
                    required: helpers.withMessage('Veuillez ajouter une image à ce quiz', required)
                },
                questions: {
                    required: helpers.withMessage('Veuillez ajouter des questions à ce quiz', required),
                    maxLength: helpers.withMessage('Ce quiz ne peut pas contenir plus de 50 questions', maxLength(50)),
                    minLength: helpers.withMessage('Ce quiz doit contenir au moins 5 question', minLength(5))
                }
            }
        }
    },

    components: {
        QuizQuestions,
        DeleteDialog
    },

    computed: {
        ...mapState(useUserStore, ["token"]),
        invalidForm() {
            return this.quiz.questions.length < 5 || !this.quiz.name || !this.quiz.image;
        },
    },

    mounted() {
        this.addQuestion();
        this.getAllTopics();
    },

    methods: {
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
                title: `Êtes vous sûr-e de vouloir supprimer la question ${index + 1} ?`,
                body: "Cette action est irréversible, et vous supprimerez définitivement la question: " + this.quiz.questions[index].name,
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

        async getAllTopics() {
            const headers = { 'Authorization': `Bearer ${this.token}` }
            const resp = await this.$http.get('/topics', { headers: headers });
            if (resp.status == 200 || resp.status == 204) {
                this.topics = resp.body;
            } else {
                console.error(resp);
            }
        },
        async createQuiz() {
            this.formatQuestionsAnswersWithIndex();
            const headers = { 'Authorization': `Bearer ${this.token}` };
            const resp = await this.$http.post('/quizzes', this.quiz, { headers: headers });
            if (resp.status == 204 || resp.status == 200) {
                this.$toast.success("toast-app", `Le guide ${this.quiz.name} a bien été créé`);
                this.$router.push({ name: 'quiz' });
            } else {
                console.error(resp);
                this.$toast.error("toast-app", "Un problème est survenu à la création de ce quiz");
            }
        },
    }
}
</script>