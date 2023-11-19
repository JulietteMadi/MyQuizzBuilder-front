<template>
    <form v-if="demo" @submit.prevent="checkDemo">
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
    <form v-else @submit.prevent="checkIdentifier">
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
import { mapWritableState } from 'pinia';

export default {
    data() {
        if (import.meta.env.MODE === "demo") {
            return {
                demo: true,
                wrongIdentifier: false,
                inputs: {
                    identifier: "",
                    password: ""
                }

            }
        } else {
            return {
                demo: false,
                wrongIdentifier: false,
                inputs: {
                    identifier: "",
                    password: ""
                }

            }
        }
    },

    computed: {
        ...mapWritableState(useUserStore, ["token", "userEmail", "userName"]),
    },

    methods: {
        checkDemo() {
            if (this.inputs.identifier === "toto@mqb.fr" && this.inputs.password === "letmein") {
                this.token = "toto";
                this.userName = "Toto";
                this.userEmail = "toto@mqb.fr";
                this.$router.push({ name: 'home' });
                this.$toast.success("toast-app", `Vous êtes bien connecté en tant que Toto`)
            } else {
                this.wrongIdentifier = true
            }
        },
        async checkIdentifier() {
            const body = {
                "emailOrUsername": this.inputs.identifier,
                "password": this.inputs.password
            }
            const resp = await this.$http.post('/sign-in', body);
            if (resp.status == 204 || resp.status == 200) {
                const body = await resp.body;
                this.token = body.token;
                this.userName = body.userName;
                this.userEmail = body.userEmail;
                this.$router.push({ name: 'home' });
                this.$toast.success("toast-app", `Vous êtes bien connecté en tant que ${body.userName}`)
            } else {
                console.error(resp);
                this.$toast.error("toast-app", 'Les informations ne sont pas valides');
            }
        }
    }
}
</script>