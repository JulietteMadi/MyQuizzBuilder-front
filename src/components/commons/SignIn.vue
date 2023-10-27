<template>
    <form @submit.prevent="checkIdentifier">
        <div class="text-danger mb-2" v-if="wrongIdentifier">Ces identifiants n'existent pas dans notre base de
            donnée</div>
        <div class="mb-3">
            <label for="identifier" class="form-label">E-mail ou pseudo</label>
            <input v-model="inputs.identifier" id="identifier" type="text" class="form-control">
            <div id="identifierHelp" class="form-text">Renseignez votre pseudo MyQuizzBuilder ou votre email
            </div>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="inputs.password" id="password" type="password" class="form-control">
            <div id="identifierHelp" class="form-text">Veuillez renseigner votre mot de passe personnel</div>
        </div>
        <button type="submit" class="btn primary-button my-3">Me connecter</button>
    </form>
</template>

<script>
import { useUserStore } from '../../stores/userStore';
import { mapStores } from 'pinia';

export default {
    data() {
        return {
            wrongIdentifier: false,
            inputs: {
                identifier: "",
                password: ""
            }

        }
    },

    computed: {
        ...mapStores(useUserStore)
    },

    methods: {
        async checkIdentifier() {
            const body = {
                "emailOrUsername": this.inputs.identifier,
                "password": this.inputs.password
            }
            const resp = await this.$http.post('/sign-in', body);
            if (resp.status == 204 || resp.status == 200) {
                this.token = await resp.body.token;
                this.usersStore.token = this.token;
                console.log(resp.body);
                this.$router.push({ name: 'home' });
                this.$toast.success("toast-app", 'Vous êtes bien connecté')
            } else {
                console.error(resp);
                this.$toast.error("toast-app", 'Les informations ne sont pas valides');
            }
        }
    }
}
</script>