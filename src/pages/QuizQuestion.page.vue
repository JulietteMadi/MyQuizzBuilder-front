<template>
    {{ answersQuizResult }}
    <h1 class="text-center my-5">{{ question.name }}</h1>
    <div class="row g-3" v-if="finalResultQuestion === null">
        <div v-for="(answer, index) of question.answers" class="col-6 form-check">
            <label 
                :for="`answer${index}`" 
                class="w-100 form-check-label card card-answer-available p-5 m-2 text-center fs-5"
                :class="{'card-shadow-selected': answersGiven[index]}">
                    {{ answer.name }}
            </label>
            <input
                v-model="answersGiven[index]"
                :id="`answer${index}`"
                type="checkbox"
                class="form-check-input invisible"
            >
        </div>
        <div v-if="countAnswersSelected === 0" class="text-center">Veuillez sélectionner au moins une réponse</div>
        <div v-else class="text-center">Vous avez sélectionné {{ countAnswersSelected }} réponse(s)</div>
        <button class="btn primary-button col-12" :disabled="countAnswersSelected === 0" @click="checkQuestionAnswers">
            Je valide mes réponses
        </button>
    </div>
    <section v-else class="text-center">
        <h2 v-if="finalResultQuestion" >Bien joué !</h2>
        <h2 v-else >Pas tout à fait...</h2>
        <div class="my-2">
            <i class="bi bi-check-circle-fill text-success"></i> La ou les bonne(s) réponse(s) étai(ent) :
            <span v-for="(answer, index) in question.answers"><span v-if="answer.valid">{{ answer.name }}</span></span>
        </div>
        <div class="my-2">
            <i class="bi bi-x-circle-fill text-danger"></i> La ou les mauvaise(s) réponse(s) étai(ent) :
            <span v-for="(answer, index) in question.answers">
                <span v-if="!answer.valid">{{ answer.name }}
                    <span v-if="index < question.answers.length -1"> - </span>
                </span>
            </span>
        </div>
        <h4 class="mt-4">Explications</h4>
        <p>{{ question.answerDescription }}</p>
        <button class="btn primary-button col-12 my-3" @click="nextQuestion">
            <span v-if="index < question.answers.length">Passer à la question suivante</span>
            <span v-else>Voir les résultats de mon quizz !</span>
        </button>
    </section>
</template>
<script>
import { useRoute } from 'vue-router';
import { mapState, mapActions, mapWritableState } from 'pinia';
import { useQuizStore } from '../stores/quizStore';

export default {
    setup(){
        return {
            route: useRoute()
        }
    },
    data(){
        return {
            id: this.route.params.id,
            questionIndex: parseInt(this.route.params.questionIndex),
            answersGiven: [],
            finalResultQuestion: null
        }
    },

    mounted() {
        this.initAnswersGiven();
    },
    computed: {
        ...mapState(useQuizStore, ["quiz"]),
        ...mapWritableState(useQuizStore, ["answersQuizResult"]),
        question(){
            return this.quiz.questions[this.questionIndex];
        },
        countAnswersSelected(){
            let count = 0;
            this.answersGiven.forEach((answer) => {
                if(answer === true) { count++};
            })
            return count;
        }
        
    },

    methods:{
        ...mapActions(useQuizStore, ["resetQuiz"]),
        initAnswersGiven(){
            for(let i=0; i < this.question.answers.length; i++){
                const tmp = false;
                this.answersGiven.push(tmp);
            }
        },
        checkQuestionAnswers(){
            let finalResult = true;
            for(let i = 0; i < this.answersGiven.length; i++){
                if(this.answersGiven[i] !== this.question.answers[i].valid){finalResult = false}
            }
            this.finalResultQuestion = finalResult;
            if(finalResult){
                this.answersQuizResult[this.questionIndex] = true;
            }
        },
        resetDataForNextQuestion(){
            this.questionIndex++;
            this.answersGiven = [];
            this.initAnswersGiven();
            this.finalResultQuestion = null;
        },
        nextQuestion(){
            if( this.questionIndex === this.quiz.questions.length - 1){
                console.log("end of quiz")
            } else {
                this.$router.push({ name: 'repondreQuestion', params: { id: this.id, questionIndex: this.questionIndex + 1 } });
                this.resetDataForNextQuestion();
            }
        }
    }
}
</script>
<style>
.card-answer-available:hover{
    cursor: pointer;
}

.card-answer-available{
    box-shadow: 2px 3px 15px rgba(84, 98, 111, 0.3);

}

.card-shadow-selected{
    color: var(--second-blue-color);
    font-weight: bold;
    box-shadow: 2px 2px 18px var(--second-blue-color);
}
</style>, mapActions, mapWritableState, mapWritableStateuseQuizStore, , mapActionsuseQuizStore, 