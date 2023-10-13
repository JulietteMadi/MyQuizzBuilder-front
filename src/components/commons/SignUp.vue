<template>
    <form @submit.prevent="checkIdentifier">
        <div class="text-danger mb-2" v-if="wrongIdentifier">Ces identifiants n'existent pas dans notre base de
            donnée</div>
        <div class="mb-3">
            <label for="pseudo" class="form-label">Pseudo</label>
            <input type="text" class="form-control" id="pseudo" v-model="pseudo" required>
            <div id="pseudoHelp" class="form-text">Votre futur pseudo doit être unique
            </div>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="text" class="form-control" id="email" v-model="email" required>
            <div id="emailHelp" class="form-text">Renseignez votre adresse mail professionnelle ou personnelle
            </div>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" required>
            <div id="identifierHelp" class="form-text">Il doit contenir plus de 7 caractères, dont majuscules, chiffres et
                caractères spéciaux parmi !%/</div>
        </div>
        <button type="submit" class="btn primary-button my-3">Créer mon compte</button>
    </form>
</template>
<script>
export default {
    data() {
        return {
            wrongIdentifier: false,
            pseudo: "",
            email: "",
            password: ""
        }
    },

    methods: {
        async checkIdentifier() {
            const body = {
                "email": this.email,
                "name": this.pseudo,
                "password": this.password
            }
            const resp = await this.$http.post('/sign-up', body);
            if (resp.status == 204 || resp.status == 200) {
                this.$router.push({ name: 'signIn' });
            } else {
                console.error(resp);
            }
        }
    }
}
</script>