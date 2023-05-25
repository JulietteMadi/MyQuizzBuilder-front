<template>
    <!-- Header -->
    <div class="row my-5 mx-auto">
        <div class="col-md mx-auto">
            <h1>Liste de mes quizz</h1>
        </div>
        <div class="col-md mx-auto">
            <RouterLink to="/creer-quizz">
                <button class="btn secundary-button float-md-end btn-lg" type="button">
                    <i class="bi bi-plus-circle"></i>
                    Créer un quizz
                </button>
            </RouterLink>
        </div>
    </div>
    <div class="col-12 px-2">
        <input type="text" class="form-control" id="searchQuizz" placeholder="Rechercher un quizz" v-model="searchQuizz">
    </div>

    <!-- Quizz list -->
    <div class="row my-5 mx-auto text-center">
        <div class=" col-12 col-sm-6 col-md-4 col-lg-3 py-3" v-for="quizz in filteredQuizz">
            <div class="card shadow">
                <div class="card-header" style="height: 5rem;">
                    Some image
                </div>
                <div class="blue-background p-2">
                    <h5 class="text-white">{{ quizz.name }}</h5>
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
</template>

<script>
import { RouterLink } from "vue-router";

export default {
    data() {
        return {
            allQuizz: [
                { id: 1, name: "Sensibilisation pour les recruteurs" },
                { id: 2, name: "Quizz de la journée contre la discrimination" },
                { id: 3, name: "Sensibilisation pour les artisants" },
                { id: 4, name: "RSE en grand groupe" },
                { id: 5, name: "Salon des entreprises" },
                { id: 6, name: "Quizz pôle emploi" },
                { id: 7, name: "Sensibilisation CEO - long" },
                { id: 8, name: "Sensibilisation CEO - court" },
                { id: 9, name: "Quizz intégration collaborateur" }
            ],
            searchQuizz: ""
        }
    },

    computed: {
        filteredQuizz() {
            const search = this.searchQuizz.toLowerCase();
            if (!search) {
                return this.allQuizz;
            } else {
                return this.allQuizz.filter(quizz => {
                    const name = quizz.name.toLowerCase();
                    return name.includes(search);
                });
            }
        }
    }
}
</script>