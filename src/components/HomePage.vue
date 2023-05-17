<template>
    <h1>Mon tableau de bord</h1>
    <section class="my-5">

        <!-- My favourite quizz -->
        <h2>Mes derniers quizz</h2>
        <div class="text-center">
            <div class="row g-3">
                <div class=" col-12 col-sm-6 col-md-3" v-for="quizz in favQuizz">
                    <div class="card shadow">
                        <div class="card-header" style="height: 5rem;">
                            Some image
                        </div>
                        <div class="red-background p-2">
                            <h4 class="text-white">{{ quizz.name }}</h4>
                        </div>
                        <div class="p-3 row">
                            <div class="col d-flex justify-content-center p-0">
                                <button class="btn primary-button mt-2">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                            </div>
                            <div class="col d-flex justify-content-center p-0">
                                <button class="btn primary-button mt-2">
                                    <i class="bi bi-trash3-fill"></i>
                                </button>
                            </div>
                            <div class="col d-flex justify-content-center p-0">
                                <button class="btn primary-button mt-2">
                                    <i class="bi bi-eye"></i>
                                </button>
                            </div>
                            <div class="col d-flex justify-content-center p-0">
                                <button class="btn primary-button mt-2">
                                    <i class="bi bi-link-45deg"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <RouterLink to="/quizz">
            <button class="btn secundary-button mt-4" type="button">
                <i class="bi bi-plus-circle"></i>
                Voir tous mes quizz
            </button>
        </RouterLink>
    </section>

    <!-- My favorite Topics -->
    <section class="my-5">
        <h2>Mes derniers thèmes</h2>
        <div class="text-center">
            <div class="row g-3">
                <div class="col-12 col-sm-6 col-md-3" v-for="topic in favTopics">
                    <div class="card shadow">
                        <div class="card-header" style="height: 5rem;">
                            Some image
                        </div>
                        <div class="blue-background p-2">
                            <h4 class="text-white">{{ topic.name }}</h4>
                        </div>
                        <div class="p-3 row">
                            <div class="col d-flex justify-content-center p-0">
                                <button class="btn secundary-button mt-2">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                            </div>
                            <div class="col d-flex justify-content-center p-0">
                                <button class="btn secundary-button mt-2">
                                    <i class="bi bi-trash3-fill"></i>
                                </button>
                            </div>
                            <div class="col d-flex justify-content-center p-0">
                                <button class="btn secundary-button mt-2">
                                    <i class="bi bi-eye"></i>
                                </button>
                            </div>
                            <div class="col d-flex justify-content-center p-0">
                                <button class="btn secundary-button mt-2">
                                    <i class="bi bi-link-45deg"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <RouterLink to="/themes">
            <button class="btn secundary-button mt-4" type="button">
                <i class="bi bi-plus-circle"></i>
                Voir tous mes thèmes
            </button>
        </RouterLink>
    </section>

    <!-- My profile -->
    <section class="my-5">
        <h2>Mon profil</h2>
        <div class="px-4 text-center">
            <div class="row gx-5">
                <div class="col">
                    <div class="p-3 border bg-light">Custom column padding</div>
                </div>
                <div class="col">
                    <div class="p-3 border bg-light">Custom column padding</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
    data() {
        return {
            favQuizz: [
                { id: 1, name: "Recrutement" },
                { id: 2, name: "Onboarding" },
                { id: 3, name: "Sensibilisation" },
                { id: 4, name: "RSE en grand groupe" }
            ],
            favTopics: [
                { id: 1, name: "RH" },
                { id: 2, name: "Administratif" },
                { id: 3, name: "Travailleurs étrangers" },
                { id: 4, name: "Inclusion managériale" }
            ]
        }
    }
}
</script>

<style>
.my-gap {
    gap: 1rem;
}
</style>