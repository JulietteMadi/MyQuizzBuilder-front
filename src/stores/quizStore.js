import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useQuizStore = defineStore('quizzes', {
    state: () => {
        return {
            quiz: useLocalStorage('quiz', {}),
            topics: useLocalStorage('topics', []),
            answersQuizResult: useLocalStorage('answersQuizresult', [])
        }
    },

    actions: {
        initAnswersQuiz(){
            for(let i = 0; i < this.quiz.questions.length; i++)
                this.answersQuizResult.push(false);
        },
        resetQuiz(){
            this.quiz = {},
            this.topics = [],
            this.answersQuizResult = []
        }
    }
})