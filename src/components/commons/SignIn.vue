<template>
    <form @submit.prevent="checkIdentifier">
        <div class="text-danger mb-2" v-if="wrongIdentifier">Ces identifiants n'existent pas dans notre base de
            donnée</div>
        <div class="mb-3">
            <label for="identifier" class="form-label">E-mail ou pseudo</label>
            <input v-model="inputs.identifier" id="identifier" type="text" class="form-control"
                :class="{ 'is-invalid': v$.inputs.identifier.$error }">
            <div id="identifierHelp" class="form-text">Renseignez votre pseudo MyQuizzBuilder ou votre email
            </div>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="inputs.password" id="password" type="password" class="form-control"
                :class="{ 'is-invalid': v$.inputs.password.$error }">
            <div id="identifierHelp" class="form-text">Veuillez renseigner votre mot de passe personnel</div>
        </div>
        <button type="submit" class="btn primary-button my-3">Me connecter</button>
    </form>
</template>

<script>
import { useUserStore } from '../../stores/userStore';
import { mapStores } from 'pinia';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, helpers } from '@vuelidate/validators';

const passwordValidator = helpers.regex(/(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[!/:()])(?!. ).{8,42}/);

export default {
    setup() {
        return {
            v$: useVuelidate({ $autoDirty: true })
        }
    },
    data() {
        return {
            wrongIdentifier: false,
            inputs: {
                identifier: "",
                password: ""
            }

        }
    },

    validations() {
        return {
            inputs: {
                identifier: { required, maxLength: maxLength(256) },
                password: { required, passwordValidator }
            }
        }
    },

    computed: {
        ...mapStores(useUserStore)
    },

    methods: {
        async checkIdentifier() {
            const valid = await this.v$.$validate();
            if (valid) {
                const body = {
                    "emailOrUsername": this.identifier,
                    "password": this.password
                }
                const resp = await this.$http.post('/sign-in', body);
                if (resp.status == 204 || resp.status == 200) {
                    this.token = await resp.body.token;
                    this.usersStore.token = this.token;
                    this.usersStore.isAuthenticated = true;
                    this.$router.push({ name: 'home' });
                } else {
                    console.error(resp);
                }
            }
        }
    }
}
</script>