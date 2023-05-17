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
                        <a class="nav-link" href="/">Accueil</a>
                        <a class="nav-link" href="/quizz">Quizz</a>
                        <a class="nav-link" href="/themes">Thématiques</a>
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