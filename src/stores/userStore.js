import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useUserStore = defineStore('users', {
    state: () => {
        return {
            token: useLocalStorage('token', ""),
            userName: useLocalStorage('userName', ""),
            userEmail: useLocalStorage('userEmail', "")
        }
    },

    actions: {
        resetUser() {
            this.token = '';
            this.userEmail = '';
            this.userName = '';
        }
    }
})


