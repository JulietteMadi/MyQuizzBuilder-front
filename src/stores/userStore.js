import { defineStore } from 'pinia';

export const useUserStore = defineStore('users', {
    state: () => {
        return {
            token: '',
            isAuthenticated: false
        }
    },

    actions: {
        reset() {
            this.token = '';
            this.isAuthenticated = false;
        }
    }
})