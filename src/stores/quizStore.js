import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useQuizStore = defineStore('quizzes', {
    state: () => {
        return {
            currentQuiz: useLocalStorage('currentQuiz', null),
            topicsOfCurrentQuiz: useLocalStorage('topicsOfCurrentQuiz', []),
            currentResultArray: useLocalStorage('currentResultArray', []),
            lastPlayedQuiz:useLocalStorage('lastPlayedQuiz', {}),
            lastQuizTopicsResults: useLocalStorage('lastQuizTopicsResults', {topicWithBadScore: {}, otherTopics: []}),
            lastQuizResultsArray: useLocalStorage('lastQuizResultsArray', [])
        }
    },

    actions: {
        initAnswersQuiz(){
            this.resetAnswersQuiz();
            for(let i = 0; i < this.currentQuiz.questions.length; i++)
                this.currentResultArray.push(null);
        },

        resetAnswersQuiz(){
            this.currentResultArray = [];
        },

        resetQuiz(topicId){
            if(Object.keys(this.currentQuiz).length !== 0){
                this.lastPlayedQuiz = {...this.currentQuiz};
                this.buildTopicsListById(topicId);
                this.lastQuizResultsArray = [...this.currentResultArray];
            };
            this.currentQuiz = {}
            this.topicsOfCurrentQuiz = [],
            this.currentResultArray = []
        },

        buildTopicsListById(topicId){
            this.lastQuizTopicsResults = {
                topicWithBadScore: {},
                otherTopics: []
            }
            console.log(this.topicsOfCurrentQuiz);
            this.topicsOfCurrentQuiz.forEach(topic => {
                if(topicId === topic.id){
                    this.lastQuizTopicsResults.topicWithBadScore = topic;
                } else {
                    this.lastQuizTopicsResults.otherTopics.push(topic);
                }
            })
        },
    }
})



