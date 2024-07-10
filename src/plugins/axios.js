import axios from 'axios';
import { useRouter } from 'vue-router';

const ACCEPTED_STATUS = [200, 201, 202, 204, 400, 401];

export default {
    install: (app) => {
        const http = axios.create({

            baseURL: import.meta.env.VITE_API_BASE_URL,
            validateStatus: (status) => {
                return ACCEPTED_STATUS.includes(status);
            }
        });
        http.interceptors.response.use((response) => {
            const status = response.status;
            const data = response.data;
            const body = data != '' ? data : null;
            return { status: status, body: body };
        }, (error) => {
            if (error.response && error.response.status === 401) {
                console.log("401");
               /*  router.push("signIn");
                this.$toast.error("toast-app", `Votre session a expiré veuillez vous reconnecter`); */

            }
            return Promise.reject(error);
        });
        app.config.globalProperties.$http = http;
    }
};
