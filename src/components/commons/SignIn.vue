<template>
    <section class="container-xl">
        <div class="row py-5 d-flex justify-content-center">
            <div class="col-12 col-lg-6">
                <h1>Me connecter</h1>
                <form @submit.prevent="checkIdentifier">
                    <div class="text-danger mb-2" v-if="wrongIdentifier">Ces identifiants n'existent pas dans notre base de
                        donnée</div>
                    <div class="mb-3">
                        <label for="identifier" class="form-label">E-mail ou pseudo</label>
                        <input type="text" class="form-control" id="identifier" v-model="identifier">
                        <div id="identifierHelp" class="form-text">Renseignez votre pseudo MyQuizzBuilder ou votre email
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" v-model="password">
                        <div id="identifierHelp" class="form-text">Veuillez renseigner votre mot de passe personnel</div>
                    </div>
                    <button type="submit" class="btn primary-button my-3">Me connecter</button>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            wrongIdentifier: false,
            identifier: "",
            password: ""
        }
    },

    methods: {
        checkIdentifier() {
            if (this.identifier === "AdminDemo" && this.password === "MyQuizzBuilder") {
                this.$router.push("/")
            } else {
                this.wrongIdentifier = true;
            }
        }
    }
}
</script>