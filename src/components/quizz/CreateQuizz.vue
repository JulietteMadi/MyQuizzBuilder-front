<template>
    <h1>Créer un quizz</h1>
    <form class="my-5">
        <div class="outlined my-4 p-4">
            <!-- Form header -->
            <div class="row">
                <div class="col-12 col-md-8">
                    <label for="name" class="fs-5">Nom du Quizz</label>
                    <input name="name" id="name" type="text" maxlength="255" class="form-control"
                        placeholder="Ex : recrutement" v-model="quizz.name">
                </div>
                <div class="col-12 col-md-4">
                    <label for="image" class="fs-5">Illustration du quizz</label>
                    <input class="form-control" type="file" id="image">
                </div>
                <div class="col-12 my-4">
                    <p>Veuillez ajouter entre 5 et 50 questions pour votre quizz<br>
                        Attention au choix de l’image et du nom de votre quizz, ce sont les informations que les
                        utilisateurs verront !</p>
                </div>
            </div>

            <!-- List of questions -->
            <div class="accordion" id="questionsList">
                <div class="accordion-item" v-for="(question, index) of quizz.questions" :key="index">
                    <h3 class="accordion-header" :id="`heading${index}`">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            :data-bs-target="`#collapse${index}`">
                            Question {{ index + 1 }} <span v-if="question.name"> : {{ question.name }}</span>
                        </button>
                    </h3>
                    <div :id="`collapse${index}`" class="accordion-collapse collapse show" data-bs-parent="questionsList">
                        <div class="accordion-body">
                            <div class="row">
                                <div class="col-11">
                                    <label :for="`questionName${index}`" class="fs-6">Question</label>
                                    <input :name="`questionName${index}`" :id="`questionName${index}`"
                                        v-model="question.name" type="text" maxlength="100" class="form-control mb-2">
                                </div>
                                <div class="col-1 d-flex justify-content-center align-self-center">
                                    <i class="bi bi-trash3-fill primary clickable-icon"
                                        style="font-size: 1.5rem; color: var(--second-dark-color);"
                                        @click="deleteQuestion(index)" data-bs-toggle="tooltip" data-bs-placement="top"
                                        data-bs-title="Tooltip on top"></i>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <label :for="`questionTopic${index}`">
                                        Choisissez le thème de votre question :
                                    </label>
                                    <select class="form-select" :id="`questionTopic${index}`"
                                        :name="`questionTopic${index}`" v-model="question.topic">
                                        <option selected>Choisissez le tème de votre question</option>
                                        <option value="1">RH</option>
                                        <option value="2">RSE dans les grandes compagnies</option>
                                        <option value="3">Recrutement éthique</option>
                                    </select>
                                </div>
                            </div>

                            <!-- List of 4 answers -->
                            <div class="row mt-5">
                                <div class="col-12">
                                    <h3>Proposez 4 réponses puis cochez la ou les bonne(s) réponse(s) :</h3>
                                </div>
                                <div class="col-6" v-for="(answer, i) of question.answers">
                                    <label :for="`answer${i}`">
                                        Réponse {{ i + 1 }}
                                    </label>
                                    <div class="row">
                                        <div class="col-11">
                                            <input :name="`answer${i}-${index}`" :id="`answer${i}-${index}`" type="text"
                                                maxlength="100" class="form-control mb-2" v-model="answer.name">
                                        </div>
                                        <div class="col-1">
                                            <input class="form-check-input" type="checkbox" value=""
                                                :id="`checkAnswer${i}-${index}`" v-model="answer.valid">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label :for="`answerDescription${index}`" class="form-label">Description</label>
                                <textarea class="form-control" :id="`answerDescription${index}`"
                                    :name="`answerDescription${index}`" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Add a question -->
            <button class="btn secundary-button mt-2" @click="addQuestion" type="button">
                <i class="bi bi-plus-circle"></i>
                Ajouter une question
            </button>
        </div>
    </form>

    <!-- Register new quizz button-->
    <div class="align-items-end flex-column row mb-5">
        <RouterLink to="/quizz">
            <button class="btn primary-button mt-2 col-12 col-md-3" type="submit">
                <i class="bi bi-plus-circle me-3"></i>
                Créer un quizz
            </button>
        </RouterLink>
    </div>
</template>

<script>
import { RouterLink } from "vue-router"

export default {
    data() {
        return {
            quizz: {
                name: "",
                questions: []
            }
        }
    },

    methods: {
        addQuestion() {
            this.quizz.questions.push(
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
        },
        deleteQuestion(index) {
            this.quizz.questions.splice(index, 1);
        }
    }
}
</script>