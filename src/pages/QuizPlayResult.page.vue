<template>
    <section class="text-center">
        <h1 class="m-5 px-5">Félicitations, vous avez obtenu un score de {{ score }}% de bonnes réponses !</h1>
        <p>Vous avez été particulièrement à l’aise sur le thème Culture générale. En revanche vous avez été moins performant sur le thème {{ lastTopics.topicWithBadScore.name }} ...
        N'hésitez pas à consulter nos fiches pratiques pour en savoir plus sur ce sujet !</p>
        <h2 class="py-3">En savoir plus sur le thème {{ lastTopics.topicWithBadScore.name }} :</h2>
        <div class="row mb-5">
            <div class="col-12 col-sm-6 col-lg-3" v-for="(guide, index) in lastTopics.topicWithBadScore.guides">
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
        }
    },
    components: {
        GuideResultItem
    },

    computed: {
        ...mapState(useQuizStore, ["answersQuizResult", "topics", "currentQuiz", "lastTopics", "lastQuiz", "lastAnswers"]),
        allGuidesOutOfBadTopic(){
            let allGuides = [];
            this.lastTopics.otherTopics.forEach(topic => {
                topic.guides.forEach(guide => {
                    allGuides.push(guide)
;               })
            })
            return allGuides;
        },
        payload(){
            let payload = {};
            if(Object.keys(this.currentQuiz).length === 0){
                payload = {
                    "answersResults" : this.lastAnswers 
                }
            } else {
                payload = {
                    "answersResults" : this.answersQuizResult 
                }
            }
            return payload;
        }
    },

    async mounted(){
        this.initResultsQuiz();
    },

    methods: {
        ...mapActions(useQuizStore,["resetQuiz"]),
        async initResultsQuiz(){
            let quizId = 0;
            Object.keys(this.currentQuiz).length === 0 ? quizId = this.lastQuiz.id : quizId = this.currentQuiz.id;
            const resp = await this.$http.post(`/quizzes/${quizId}/play-quiz`, this.payload);
            if(resp.status === 204 || resp.status === 200){
                this.score = resp.body.percentage;
                this.resetQuiz(resp.body.topicId);
                console.log(this.score);
            } else {
                console.error(resp);
            }
        }
    }
}
</script>