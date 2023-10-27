<template>
    <header>
        <div class="fixed-top blue-background">
            <nav class="navbar navbar-expand-md navbar-dark container-xl d-flex justify-content-between">
                <div>
                    <a class="navbar-brand" href="/">
                        <span class="logo alkatra-font">My<span class="my-color">Quizz</span>Builder</span>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>

                <!-- header when authenticated -->
                <div v-if="usersStore.token || usersStore.token !== ''"
                    class="collapse navbar-collapse md-d-flex justify-content-end" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <RouterLink class="nav-link" to="/">Accueil</RouterLink>
                        <RouterLink class="nav-link" to="/quiz">Quiz</RouterLink>
                        <RouterLink class="nav-link" to="/themes">Thèmes</RouterLink>
                        <div class="btn-group">
                            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                <i class="bi bi-person-circle"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <button class="dropdown-item" @click="disconnect">Se déconnecter</button>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="#">Another action</RouterLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- header when not authenticated -->
                <div v-else class="collapse navbar-collapse md-d-flex justify-content-end" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <RouterLink class="nav-link" to="/connexion">Me connecter</RouterLink>
                        <RouterLink class="nav-link" to="/creer-compte">Créer un compte</RouterLink>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useUserStore } from '../../stores/userStore';
import { mapActions, mapStores } from 'pinia';

export default {

    computed: {
        ...mapStores(useUserStore),
        ...mapActions(useUserStore, ['reset'])
    },

    methods: {
        disconnect() {
            this.usersStore.reset();
            this.$router.push({ name: 'signIn' });
        }
    }
}

</script>

<style scoped>
.logo {
    color: white;
    font-weight: 600;
    font-size: 2rem;
}

.my-color {
    color: var(--main-red-color);
}
</style>
