<template>
    <form @submit.prevent="checkIdentifier">
        <div class="text-danger mb-2" v-if="wrongIdentifier">Ces identifiants n'existent pas dans notre base de
            donnée</div>
        <div class="mb-3">
            <label for="pseudo" class="form-label">E-mail ou pseudo</label>
            <input type="text" class="form-control" id="pseudo" v-model="identifier" required>
            <div id="pseudoHelp" class="form-text">Votre futur pseudo doit être unique
            </div>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">E-mail ou pseudo</label>
            <input type="text" class="form-control" id="email" v-model="identifier" required>
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
        checkIdentifier() {
            console.log("Submit")
        }
    }
}
</script>