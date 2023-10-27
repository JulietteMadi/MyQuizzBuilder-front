<template>
    <form novalidate @submit.prevent="checkIdentifier">
        <div class="mb-3">
            <label for="pseudo" class="form-label">Pseudo</label>
            <input type="text" class="form-control" id="pseudo" v-model="pseudo"
                :class="{ 'is-invalid': v$.pseudo.$error }">
            <div id="pseudoHelp" class="form-text">Votre futur pseudo doit être unique
            </div>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="text" class="form-control" id="email" v-model="email" :class="{ 'is-invalid': v$.email.$error }">
            <div id="emailHelp" class="form-text">Renseignez votre adresse mail professionnelle ou personnelle
            </div>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password"
                :class="{ 'is-invalid': v$.password.$error }">
            <div id="identifierHelp" class="form-text">Il doit contenir plus de 8 caractères, par exemple Rantanplan31!
            </div>
        </div>
        <button type="submit" class="btn primary-button my-3">Créer mon compte</button>
    </form>
</template>
<script>
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, minLength, helpers, email } from '@vuelidate/validators';

const passwordValidator = helpers.regex(/(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[!$*])(?!. ).{8,42}/);

export default {
    setup() {
        return {
            v$: useVuelidate({ $autoDirty: true })
        }
    },
    data() {
        return {
            pseudo: "",
            email: "",
            password: ""
        }
    },

    validations() {
        return {
            pseudo: { required, minLength: minLength(4), maxLength: maxLength(20) },
            email: { required, email },
            password: { required, passwordValidator }
        }
    },

    methods: {
        async checkIdentifier() {
            const valid = await this.v$.$validate();
            if (valid) {
                const body = {
                    "email": this.email,
                    "name": this.pseudo,
                    "password": this.password
                }
                const resp = await this.$http.post('/sign-up', body);
                if (resp.status == 204 || resp.status == 200) {
                    this.$router.push({ name: 'signIn' });
                    this.$toast.success('Votre compte a bien été créé')
                } else {
                    console.error(resp);
                    this.$toast.error("toast-app", 'Un problème est survenu à la création de votre compte');
                }
            }
            else {
                this.$toast.error("toast-app", 'Les informations ne sont pas valides');
            }
        }
    }
}
</script>