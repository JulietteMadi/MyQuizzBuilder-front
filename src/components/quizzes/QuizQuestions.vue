<template>
    <!-- List of question -->
    <h3 class="accordion-header row d-flex me-0" :id="`heading${questionIndex}`">
        <div class="col-11 pe-0">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${questionIndex}`">
                Question {{ questionIndex + 1 }} <span v-if="question.name"> : {{ question.name }}</span>
            </button>
        </div>
        <div class="col-1 px-0 d-flex justify-content-center align-items-center">
            <button class="btn" data-bs-toggle="modal" data-bs-target="#warningModal" type="button">
                <i class="bi bi-trash3-fill primary clickable-icon" :id="'deleteQuestion' + questionIndex"
                    style="font-size: 1.5rem; color: var(--second-dark-color);" @click="$emit('askDeleteQuestion', questionIndex)"
                    data-bs-toggle="tooltip" data-bs-custom-class="bg-tooltip"
                    :data-bs-original-title="'Supprimer la question ' + (questionIndex + 1)"
                    @mouseover="enableTooltip(`deleteQuestion${questionIndex}`)"></i>
            </button>
        </div>
    </h3>
    <div :id="`collapse${questionIndex}`" class="accordion-collapse collapse" :class="{ show: activeIndex === questionIndex }"
        data-bs-parent="#questionsList">
        <div class="accordion-body">
            <div class="row">
                <div class="col-12">
                    <label :for="`questionName${questionIndex}`" class="fs-6">Question</label>
                    <input :name="`questionName${questionIndex}`" :id="`questionName${questionIndex}`" v-model="question.name" type="text" class="form-control mb-2">
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <label :for="`questionTopic${questionIndex}`">
                        Choisissez le thème de votre question :
                    </label>
                    <select class="form-select" :id="`questionTopic${questionIndex}`" :name="`questionTopic${questionIndex}`"
                        v-model="question.topic">
                        <option v-for="(topic, index) of topics">{{topic.name}}</option>
                    </select>
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
                        <span v-if="question.answers.length < 10">
                            <i class="bi bi-plus-circle me-3"></i>
                            Ajouter une proposition de réponse
                        </span>
                        <span v-else>
                            Vous ne pouvez pas proposer plus de 10 réponses
                        </span>
                    </button>
                </div>
            </div>

            <div>
                <label :for="`answerDescription${questionIndex}`" class="form-label mt-5">
                    <h3>Description de la ou les bonne(s) réponse(s)</h3>
                </label>
                <textarea class="form-control" :id="`answerDescription${questionIndex}`" :name="`answerDescription${questionIndex}`"
                    rows="5"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import QuizAnswer from './QuizAnswer.vue';


export default {
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
        }
    },

    components: {
        QuizAnswer
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