<template>
    <div class="modal" :id="'adminModal' + quizId" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
            <div class="modal-content text-start">
                <div class="modal-header">
                    <h2 class="modal-title">{{ quiz?.name }}</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <section class="border-bottom py-4">
                        <h4>Informations générales</h4>
                        <div class="d-flex flex-column-reverse flex-md-row justify-content-between mx-3">
                            <div class="col-12 col-md-8">
                                <p class="m-0 fw-semibold mt-2">Thèmes du quiz:</p>
                                <div v-for="(topic, index) in listOfTopics">
                                    <div class="form-check d-flex align-items-center mb-2">
                                        <input 
                                            class="form-check-input" 
                                            type="checkbox" 
                                            :id="'topicToSee' + index" 
                                            :value="topic.topicId" 
                                            v-model="checkedTopics">
                                        <label class="form-check-label ms-2" :for="'topicToSee' + index">{{ topic.name }} 
                                            <p class="fst-italic text-black-50 m-0">{{ topic.number }} réponse(s) associée(s)</p>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
                                <div class="fw-semibold mt-2">Auteur :</div>
                                <div>{{ quiz.userName }}</div>
                                <div class="fw-semibold mt-2">Nombres de questions :</div>
                                {{ quiz.questions?.length }}
                                <span v-if="checkedTopics.length !== 0">
                                    ({{ numberOfSelectedQuestions }} questions sélectionnées)
                                </span>
                            </div>
                        </div>
                    </section>
                    <section class="py-4">
                        <h4 class="pb-2">Questions du quiz:</h4>
                        <div class="mx-3" v-for="(question, index) in quiz.questions">
                            <div v-if="checkedTopics?.length === 0 || checkedTopics?.includes(question.topicId)">
                                <span class="fw-semibold">{{ index + 1 }} - {{ question.name }}</span>
                                <p class="m-0">Thème: {{ getTopicName(question.topicId) }}</p>
                                <div v-for="answer in question.answers">
                                    <i v-if="answer.valid" class="bi bi-check-circle text-success"></i>
                                    <i v-else class="bi bi-x-circle text-danger"></i>
                                    <span class="mb-0 ms-2">{{ answer.name }}</span>
                                </div>
                                <p class="mt-2 mb-4"><strong> Description de la réponse:</strong> {{ question.answerDescription }}</p>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn primary-button" data-bs-dismiss="modal">Fermer</button>
                    <button type="button" class="btn secundary-button" data-bs-dismiss="modal" @click="$emit('updateQuiz')">Modifier le quiz</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'pinia';
import { useUserStore } from '../../stores/userStore';
import { demoQuizzes } from "../../datas/quizzes.js";
import { demoTopics } from '../../datas/topics';

export default {
    data(){
        return{
            quiz: {},
            topics: [],
            checkedTopics: []
        }
    },
    props: {
        quizId:{
            type: Number,
            default:null
        }
    },

    async mounted(){
        if(import.meta.env.MODE !== "demo"){
            this.initQuiz();
            this.getAllTopics();
        } else {
            this.initDemoDatas();
        }
    },

    computed: {
        ...mapState(useUserStore, ["token"]),
        listOfTopics(){
            let topicCounts = {};

            this.quiz.questions?.forEach(question => {
                const topicId = question.topicId;
                topicCounts[topicId] = (topicCounts[topicId] || 0) + 1;
            });

            const result = Object.keys(topicCounts).map(topicId => {
                const topicIdInt = parseInt(topicId);
                const topic = this.topics.find(t => t.id === topicIdInt);
                return {
                    topicId: topicIdInt,
                    name: topic ? topic.name : "Unknown",
                    number: topicCounts[topicId]
                };
            });
            return result;
        },
        numberOfSelectedQuestions(){
            if(this.listOfTopics?.length === 0){
                return this.quiz.questions.length;
            } else {
                let count = 0;
                this.quiz.questions?.forEach(question => {
                    if(this.checkedTopics.includes(question.topicId)){
                        count++;
                    }
                })
                return count;
            }
        }
    },

    methods:{

        getTopicName(topicId) {
            const topic = this.topics.find(t => t.id === topicId);
            return topic ? topic.name : 'Unknown';
        },
        async initQuiz(){
            const headers = { 'Authorization': `Bearer ${this.token}` };
            const resp = await this.$http.get(`/quizzes/${this.quizId}`,  { headers: headers });
            if(resp.status === 204 || resp.status === 200){
                this.quiz = resp.body;
            } else {
                console.error(resp);
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

        initDemoDatas(){
            this.quiz = demoQuizzes[this.quizId - 1];
            this.topics = demoTopics;
        }
    }    
}
</script>