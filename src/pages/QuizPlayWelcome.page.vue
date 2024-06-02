<template>
    <div>
        <section v-if="currentQuiz.questions" class="quiz-welcome-header text-center text-white d-flex align-items-center justify-content-center flex-column">
            <div class="filter-overlay"></div>
            <div class="content-wrapper">
                <h2 class="text-white mb-4">Vous vous apprêtez à passer le quiz :</h2>
                <h1 class="text-white">{{ currentQuiz.name }}</h1>
                Ce quiz porte sur les thèmes suivants :
                <span v-for="(topic, index) in topicsOfCurrentQuiz" :key="index">
                    <li>{{ topic.name }}</li>
                </span>
                <div class="mt-4">
                    <i class="bi bi-list-check mx-2"></i> {{ currentQuiz.questions.length }} questions
                </div>
                <div>
                    <i class="bi bi-hourglass-split mx-2"></i>{{ currentQuiz.questions.length }} min pour passer ce quiz
                </div>
            </div>
        </section>
        <section class="quiz-welcome-actions d-flex justify-content-center w-100">
            <button class="btn secundary-button mt-2 d-flex flex-row align-items-center py-2 px-3" @click="startQuiz" type="button">
                <div class="fs-3 me-2">C'est parti !</div>
                <i class="bi bi-play-circle-fill"></i>
            </button>
        </section>
    </div>
</template>
<script>
import { useRoute } from 'vue-router';
import { mapWritableState, mapActions } from 'pinia';
import { useQuizStore } from '../stores/quizStore';
import { demoQuizzes } from '../datas/quizzes';
import { demoTopics } from '../datas/topics';

export default {
    setup(){
        return {
            route: useRoute()
        }
    },

    data(){
        return {
            id: this.route.params.id
        }
    },

    async created(){
        if(import.meta.env.MODE !== "demo"){
            this.initQuiz();
        } else {
            this.initDemoDatas();
        }
        
    },

    computed: {
        ...mapWritableState(useQuizStore, ["currentQuiz", "topicsOfCurrentQuiz"]),
    },

    methods: {
        ...mapActions(useQuizStore, ["initAnswersQuiz"]),
        startQuiz(){
            this.$router.push({ name: 'answerQuestion', params: { id: this.id, questionIndex: 0 } });
        },
        buildTopicsList(questionList){
            let topicsId = [];
            questionList.forEach(question => {
                if(!topicsId.includes(question.topicId)){
                    topicsId.push(question.topicId);
                }
            })
            return topicsId;
        },
        async initQuiz(){
            const resp = await this.$http.get(`/quizzes/${this.id}`);
            if(resp.status === 204 || resp.status === 200){
                this.currentQuiz = resp.body;
                this.initAnswersQuiz();
                const topicsId = this.buildTopicsList(this.currentQuiz.questions);
                this.initTopics({"topicIds" : topicsId});
            } else {
                console.error(resp);
            }

        },
        async initTopics(topicsId){
            const resp = await this.$http.post('/topics/play-quiz', topicsId);
            if(resp.status === 204 || resp.status === 200){
                this.topicsOfCurrentQuiz = resp.body;
            } else {
                console.error(resp);
            }
        },
        initDemoDatas(){
            this.currentQuiz = demoQuizzes[this.id -1];
            const topicsId = this.buildTopicsList(this.currentQuiz.questions);
            this.topicsOfCurrentQuiz = [];
            topicsId.forEach(id => {
                if(!this.topicsOfCurrentQuiz.includes(id - 1)){
                    this.topicsOfCurrentQuiz.push(demoTopics[id -1]);
                }  
            })
        }
    }
}
</script>
<style>
.quiz-welcome-header{
    width: 100vw;
    height: 65vh;
    background-image: url("../assets/MQB-Paysage.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: 10vh; left: 0px;
}

.filter-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 51, 153, 0.3);
    z-index: 1; 
}

.content-wrapper {
    max-width: 600px;
    margin: auto;
    position: relative;
    z-index: 2;
}

.quiz-welcome-actions{
    position: absolute;
    top: 82vh; left: 0px;
}
</style>, mapActions
