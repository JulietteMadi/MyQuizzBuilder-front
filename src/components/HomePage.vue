<template>
    <!-- Modal for demo -->
    <div v-if="disclaimer" class="row my-3 d-flex justify-content-center">
        <h5 class="text-center col-12">
            Bienvenue sur la démo MyQuizzBuilder !
        </h5>
        <button type="button" class="btn primary-button col-12 col-md-3" data-bs-toggle="modal" data-bs-target="#demoModal">
            Cliquez ici pour en savoir plus
        </button>
    </div>
    <div class="modal fade" id="demoModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Demo de MyQuizzBuilder</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    Ce projet est une simple démonstration. C'est pourquoi, vos interactions avec l'interface n'auront pas
                    d'effets sur celle-ci : vous pouvez créer un quizz en entier, mais en revenant sur la liste des quizz
                    vous ne le retrouverez pas. <br>
                    Je compte sur vous pour me remonter des suggesions, améliorations ou bugs !
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">J'ai compris</button>
                </div>
            </div>
        </div>
    </div>

    <h1>Mon tableau de bord</h1>
    <section class="my-5">

        <!-- My favourite quizz -->
        <h2>Mes derniers quizz</h2>
        <div class="text-center">
            <div class="row g-3">
                <div class=" col-12 col-sm-6 col-lg-3" v-for="quizz in favQuizz">
                    <div class="card shadow">
                        <div class="card-header" style="height: 5rem;">
                            Some image
                        </div>
                        <div class="red-background p-2">
                            <h5 class="text-white">{{ quizz.name }}</h5>
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
                <div class="col-12 col-sm-6 col-lg-3" v-for="topic in favTopics">
                    <div class="card shadow">
                        <div class="card-header" style="height: 5rem;">
                            Some image
                        </div>
                        <div class="blue-background p-2">
                            <h5 class="text-white">{{ topic.name }}</h5>
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
        <div class="px-4">
            <div class="row gx-5">
                <ul>
                    <li>Pseudo : Juliette</li>
                    <li>Dernière connexion : 24/05/2023 15:51</li>
                    <li>Nombre de contributions : 19</li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
    data() {
        if (import.meta.env.MODE === "demo") {
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
                ],
                disclaimer: true,
            }
        } else {
            return {
                favQuizz: [],
                favTopics: [],
                disclaimer: false,
            };
        }
    },
}
</script>

<style>
.my-gap {
    gap: 1rem;
}
</style>