import { defineStore } from 'pinia';

export const useUserStore = defineStore('users', {
    state: () => {
        return {
            token: '',
            userName: '',
            userEmail: ''
        }
    },

    actions: {
        resetUser() {
            this.token = ''
        }
    }
})