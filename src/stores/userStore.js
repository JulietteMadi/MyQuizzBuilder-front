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
        },

        async tokenValidate(){
            const headers = { 'Authorization': `Bearer ${this.token}` }
            try {
                const resp = await axios.get('/items', { headers: headers });
                console.log(resp);
            } catch (error){
                console.log(error.response.status);
                if(error.response.status === 401){
                    this.resetUser;
                }
            }
        }
    }
})


