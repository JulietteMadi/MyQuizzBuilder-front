import { defineStore } from 'pinia';

export const useUserStore = defineStore('users', {
    state: () => {
        return {
            token: ''
        }
    },

    actions: {
        reset() {
            this.token = ''
        }
    }
})