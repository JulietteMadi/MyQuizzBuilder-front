import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import axios from 'axios';

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


