<template>
    <section v-if="loading" class="text-center mt-5 pt-5">
        <div class="spinner-border spin-color" role="status">
        </div>
    </section>
    <section v-else class="text-center">
        <h1 class="m-5 px-5">Félicitations, vous avez obtenu un score de {{ score }}% de bonnes réponses !</h1>
        <p>Vous avez été particulièrement à l’aise sur le thème Culture générale. 
        En revanche vous avez été moins performant sur le thème {{ lastQuizTopicsResults.topicWithBadScore.name }} ...
        N'hésitez pas à consulter nos fiches pratiques pour en savoir plus sur ce sujet !</p>
        <h2 class="py-3">En savoir plus sur le thème {{ lastQuizTopicsResults.topicWithBadScore.name }} :</h2>
        <div class="row mb-5">
            <div class="col-12 col-sm-6 col-lg-3" v-for="(guide, index) in lastQuizTopicsResults.topicWithBadScore.guides">
                <GuideResultItem :guide="guide">
                </GuideResultItem>
            </div>
        </div>
        <h2 class="p-3">Voir les autres fiches pratiques liées à ce quiz :</h2>
        <div class="row mb-5">
            <div class="col-12 col-sm-6 col-lg-3" v-for="(guide, index) in allGuidesOutOfBadTopic">
                <GuideResultItem :guide="guide"></GuideResultItem>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useQuizStore } from '../stores/quizStore';
import GuideResultItem from '../components/topics/GuideResultItem.vue';

export default {
    data(){
        return {
            score : 0,
            loading: false
        }
    },
    components: {
        GuideResultItem
    },

    computed: {
        ...mapState(useQuizStore, ["currentResultArray", "currentQuiz", "lastQuizTopicsResults", "lastPlayedQuiz", "lastQuizResultsArray"]),
        allGuidesOutOfBadTopic(){
            let allGuides = [];
            this.lastQuizTopicsResults.otherTopics.forEach(topic => {
                topic.guides.forEach(guide => {
                    allGuides.push(guide);
;               })
            })
            return allGuides;
        },
        payload(){
            let payload = {};
            if(Object.keys(this.currentQuiz).length === 0){
                payload = {
                    "quizId" : this.lastPlayedQuiz.id,
                    "answersResults" : this.lastQuizResultsArray 
                }
            } else {
                payload = {
                    "quizId" : this.currentQuiz.id,
                    "answersResults" : this.currentResultArray 
                }
            }
            return payload;
        }
    },

    async mounted(){
        if(import.meta.env.MODE !== "demo") {
            this.initResultsQuiz();
        } else {
            this.initDemoDatas();
        }
        
    },

    methods: {
        ...mapActions(useQuizStore,["resetQuiz"]),
        async initResultsQuiz(){
            this.loading = true;
            const quizId = Object.keys(this.currentQuiz).length === 0 
                ? this.lastPlayedQuiz.id 
                : this.currentQuiz.id;
            const resp = await this.$http.post(`/quizzes/${quizId}/play-quiz`, this.payload);
            this.loading = false;
            if(resp.status === 204 || resp.status === 200){
                this.score = resp.body.percentage;
                this.resetQuiz(resp.body.topicId);
            } else {
                console.error(resp);
            }
        },

        initDemoDatas(){
            const answersResult = Object.keys(this.currentQuiz).length === 0 
                ? this.lastQuizResultsArray
                : this.currentResultArray;
            let grade = 0;
            answersResult.forEach(e => {
                if(e){
                    grade ++;
                }
            })
            this.score = Math.round((grade / answersResult.length) * 100);

            const topicId = Object.keys(this.currentQuiz).length === 0 
                ? this.lastPlayedQuiz.questions[0].topicId
                : this.currentQuiz.questions[0].topicId;
            this.resetQuiz(topicId);
        }
    }
}
</script>
<style>
.spin-color{
    color: var(--main-blue-color);
}
</style>