<template>
    <!-- List of question -->
    <h3 class="accordion-header row d-flex me-0" :id="`heading${questionIndex}`">

        <!-- Header of question -->
        <div class="col-11 pe-0">
            <button class="accordion-button d-flex flex-row" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${questionIndex}`">
                <span class="col-6 col-md-2 col-sm-4">Question {{ questionIndex + 1 }} </span>
                <span class="col-6 col-md-10 col-sm-8" v-if="question.name">{{ question.name }}</span>
            </button>
        </div>
        <div class="col-1 px-0 d-flex justify-content-evenly align-items-center">
                <div class="d-flex flex-column">
                    <button class="btn btn-outline-light p-0" type="button"  
                    @click="$emit('moveQuestionUp', questionIndex)"
                    :disabled="questionIndex === 0">
                        <i :id="(`questionUp${questionIndex}`)"
                            class="bi bi-chevron-up primary clickable-icon"
                            data-bs-toggle="tooltip" 
                            data-bs-custom-class="bg-tooltip"
                            :data-bs-original-title="'Monter la question ' + (questionIndex + 1)"
                            @mouseover="enableTooltip(`questionUp${questionIndex}`)"></i>
                    </button>
                    <button class="btn btn-outline-light p-0" type="button"
                    @click="$emit('moveQuestionDown', questionIndex)"
                    :disabled="questionIndex === questionsLength - 1">
                        <i :id="(`questionDown${questionIndex}`)"
                        class="bi bi-chevron-down primary clickable-icon"
                        data-bs-toggle="tooltip" 
                        data-bs-custom-class="bg-tooltip"
                        :data-bs-original-title="'Descendre la question ' + (questionIndex + 1)"
                        @mouseover="enableTooltip(`questionDown${questionIndex}`)"></i>
                    </button>
                </div>
                <button class="btn" 
                    data-bs-toggle="modal" 
                    data-bs-target="#warningDeleteModal" 
                    type="button">
                    <i :id="'deleteQuestion' + questionIndex"
                        @click="$emit('askDeleteQuestion', questionIndex, 'warningModalQuestion')"
                        class="bi bi-trash3-fill primary clickable-icon"
                        style="font-size: 1.5rem; color: var(--second-dark-color);"
                        data-bs-toggle="tooltip" 
                        data-bs-custom-class="bg-tooltip"
                        :data-bs-original-title="'Supprimer la question ' + (questionIndex + 1)"
                        @mouseover="enableTooltip(`deleteQuestion${questionIndex}`)">
                    </i>
                </button>
        </div>
    </h3>
    <div :id="`collapse${questionIndex}`" class="accordion-collapse collapse" :class="{ show: activeIndex === questionIndex }"
        data-bs-parent="#questionsList">
        <div class="accordion-body">
            <div class="row">
                <div class="col-12">
                    <label :for="`questionName${questionIndex}`" class="fs-6 required-label">Question</label>
                    <input :name="`questionName${questionIndex}`" :id="`questionName${questionIndex}`" v-model="question.name" type="text" class="form-control mb-2">
                    <p v-if="v$.question.name.$error" 
                        class="text-danger">
                        {{ v$.question.name.$errors[0].$message }}
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <label :for="`questionTopic${questionIndex}`" class="required-label">
                        Choisissez le thème de votre question :
                    </label>
                    <select class="form-select" :id="`questionTopic${questionIndex}`" :name="`questionTopic${questionIndex}`"
                        v-model="question.topicId">
                        <option v-for="(topic, index) of topics" :key="topic.id" :value="topic.id">{{topic.name}}</option>
                    </select>
                    <p v-if="v$.question.topic.$error" 
                        class="text-danger">
                        {{ v$.question.topic.$errors[0].$message }}
                    </p>
                </div>
            </div>

            <!-- List of answers -->
            <div class="row mt-5">
                <div class="col-12">
                    <h3>Proposez {{ question.answers.length }} réponses puis cochez la ou les bonne(s) réponse(s) :</h3>
                </div>
                <div class="col-12" v-for="(answer, index) of question.answers">
                   <QuizAnswer :answer="answer" :questionIndex="questionIndex" :answerIndex="index" :answersLength="question.answers.length" @deleteAnswer="deleteAnswer"/>
                </div>
                <div class="col-12 mt-2">
                    <button class="btn primary-button-outlined col-12" @click="addAnswer" :disabled="question.answers.length >= 10" type="button">
                        <span v-if="v$.question.answers.$error">
                            <i class="bi bi-plus-circle me-3"></i>
                            {{ v$.question.answers.$errors[0].$message }}
                        </span>
                        <span v-else>
                            Ajouter une proposition de réponse
                        </span>
                    </button>
                </div>
            </div>
            <div>
                <label :for="`answerDescription${questionIndex}`" class="form-label mt-5">
                    <h3 class="required-label">Description de la ou les bonne(s) réponse(s)</h3>
                </label>
                <textarea 
                    v-model="question.answerDescription"
                    :id="`answerDescription${questionIndex}`" 
                    :name="`answerDescription${questionIndex}`"
                    class="form-control"
                    placeholder="Ecrivez ici l'explication de la ou les bonnes réponses. C'est une information que l'utilisateur verra juste après avoir répondu à la question"
                    rows="5">
                </textarea>
                <p v-if="v$.question.answerDescription.$error" 
                    class="text-danger">
                    {{ v$.question.answerDescription.$errors[0].$message }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import QuizAnswer from './QuizAnswer.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, minLength, helpers } from '@vuelidate/validators';


export default {
    setup() {
        return {
            v$: useVuelidate({ $autoDirty: true })
        }
    },
    props: {
        question: {
            type: Object,
            default: {}
        },
        topics: {
            type: Array,
            default: []
        },
        questionIndex: {
            type: Number,
            default: 0
        },
        activeIndex: {
            type: Number,
            default: 0
        },
        questionsLength: {
            type: Number,
            default: 0
        }
    },

    validations(){
        return {
            question:{
                name: {
                    required: helpers.withMessage('Veuillez poser une question', required),
                    maxLength: helpers.withMessage('La question ne peux pas dépasser les 255 caractères', maxLength(255))
                },
                topic: {
                    required: helpers.withMessage('Veuillez rattacher cette question à un thème', required)
                },
                answers: {
                    required: helpers.withMessage('Veuillez ajouter des réponses possible à cette question', required),
                    maxLength: helpers.withMessage('Une question ne peut pas proposer plus de 10 réponses', maxLength(10)),
                    minLength: helpers.withMessage('Une question doit au moins proposer 2 réponses', minLength(2))
                },
                answerDescription: {
                    required: helpers.withMessage('Veuillez remplir ce champs', required),
                    maxLength: helpers.withMessage('La description ne peux pas dépasser les 1000 caractères', maxLength(1000))
                },                
            }
        }
    },

    components: {
        QuizAnswer
    },

    computed: {
        invalidAnswersList(){
            return !this.question.answers || this.question.answers.length < 2 || this.question.answers.length > 10;
        }
    },

    methods: {
        enableTooltip(id) {
            const element = document.getElementById(id)
            const tooltip = bootstrap.Tooltip.getOrCreateInstance(element);
            tooltip.enable();
        },
        deleteAnswer(id){
            if(this.question.answers.length > 2) this.question.answers.splice(id, 1);
        },
        addAnswer(){
            this.question.answers.push({
                name: "",
                valid: false
            })
        }
    }
}
</script>