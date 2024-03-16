<template>
    <div>
        <section class="quiz-welcome-header text-center text-white d-flex align-items-center justify-content-center flex-column">
            <div class="filter-overlay"></div>
            <div class="content-wrapper">
                <h2 class="text-white mb-4">Vous vous apprêtez à passer le quiz :</h2>
                <h1 class="text-white">{{ quiz.name }}</h1>
                Ce quiz porte sur les thèmes suivants :
                <span v-for="(topic, index) in topics" :key="index">
                    {{ topic.name }}
                    <span v-if="index < topics.length - 1">, </span>
                </span>
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

import { mapState, mapWritableState, mapActions } from 'pinia';
import { useUserStore } from '../stores/userStore';
import { useQuizStore } from '../stores/quizStore';

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

    async mounted(){
        this.initQuiz();
        this.initAnswersQuiz();
    },

    computed: {
        ...mapState(useUserStore, ["token"]),
        ...mapWritableState(useQuizStore, ["quiz", "topics"]),
    },

    methods: {
        ...mapActions(useQuizStore, ["initAnswersQuiz"]),
        startQuiz(){
            this.$router.push({ name: 'repondreQuestion', params: { id: this.id, questionIndex: 0 } });
        },
        buildTopicsList(questionList){
            let topicsId = [];
            questionList.forEach(question => {
                if(!topicsId.includes(question.topicId)){
                    topicsId.push(question.topicId);
                }
            })
            this.initTopics({"topicIds" : topicsId});
        },
        async initQuiz(){
            const headers = { 'Authorization': `Bearer ${this.token}` };
            const resp = await this.$http.get(`/quizzes/${this.id}`,  { headers: headers });
            if(resp.status === 204 || resp.status === 200){
                this.quiz = resp.body;
                this.buildTopicsList(this.quiz.questions);
            } else {
                console.error(resp);
            }

        },
        async initTopics(topicsId){
            const headers = { 'Authorization': `Bearer ${this.token}` };
            const resp = await this.$http.post('/topics/for-quiz', topicsId, { headers: headers });
            if(resp.status === 204 || resp.status === 200){
                this.topics = resp.body;
            } else {
                console.error(resp);
            }
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
    background: rgba(0, 51, 153, 0.3); /* Couleur bleue transparente à 80% */
    z-index: 1; /* Assurez-vous que le filtre est au-dessus de l'image mais en-dessous du contenu */
}

.content-wrapper {
    max-width: 600px; /* Ajustez la largeur maximale selon vos besoins */
    margin: auto;
    position: relative;
    z-index: 2; /* Assurez-vous que le contenu est au-dessus du filtre */
}

.quiz-welcome-actions{
    position: absolute;
    top: 82vh; left: 0px;
}
</style>, mapActions
