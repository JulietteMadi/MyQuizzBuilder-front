<template>
    <header>
        <div class="fixed-top blue-background">
            <nav class="navbar navbar-expand-md navbar-dark container-xl">
                <a class="navbar-brand" href="/"><span class="logo alkatra-font">My<span
                            class="my-color">Quizz</span>Builder</span></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <RouterLink class="nav-link" to="/">Accueil</RouterLink>
                        <RouterLink class="nav-link" to="/quizz">Quizz</RouterLink>
                        <RouterLink class="nav-link" to="/themes">Thématiques</RouterLink>
                        <a class="nav-link dropdown-toggle" role="button">
                            <i class="bi bi-person-circle"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/MyQuizzBuilder/connexion">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>

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
<script>
import { RouterLink } from 'vue-router';
</script>
