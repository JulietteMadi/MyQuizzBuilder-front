<template>
    <header>
        <div class="fixed-top blue-background">
            <nav class="navbar navbar-expand-md navbar-dark container-xl">
                <div>
                    <a class="navbar-brand" href="/">
                        <span class="logo alkatra-font">My<span class="my-color">Quizz</span>Builder</span>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
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
                                    <RouterLink class="dropdown-item" to="/MyQuizzBuilder/connexion">Action</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="#">Another action</RouterLink>
                                </li>

                                <li><a class="dropdown-item" to="#">Something else here</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router';
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
