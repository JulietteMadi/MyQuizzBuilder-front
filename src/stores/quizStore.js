import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useQuizStore = defineStore('quizzes', {
    state: () => {
        return {
            currentQuiz: useLocalStorage('currentQuiz', {}),
            topics: useLocalStorage('topics', []),
            answersQuizResult: useLocalStorage('answersQuizresult', []),
            lastQuiz:useLocalStorage('lastQuiz', {}),
            lastTopics: useLocalStorage('lastTopics', {topicWithBadScore: {}, otherTopics: []}),
            lastAnswers: useLocalStorage('lastAnswers', [])
        }
    },

    actions: {
        initAnswersQuiz(){
            this.resetAnswersQuiz();
            for(let i = 0; i < this.currentQuiz.questions.length; i++)
                this.answersQuizResult.push(null);
        },

        resetAnswersQuiz(){
            this.answersQuizResult = [];
        },

        resetQuiz(topicId){
            if(Object.keys(this.currentQuiz).length !== 0){
                this.lastQuiz = {...this.currentQuiz};
                this.buildTopicsListById(topicId);
                this.lastAnswers = [...this.answersQuizResult];
            };
            this.currentQuiz = {}
            this.topics = [],
            this.answersQuizResult = []
        },

        buildTopicsListById(topicId){
            this.lastTopics = {
                topicWithBadScore: {},
                otherTopics: []
            }
            this.topics.forEach(topic => {
                if(topicId === topic.id){
                    this.lastTopics.topicWithBadScore = topic
                } else {
                    this.lastTopics.otherTopics.push(topic)
                }
            })
        },
    }
})