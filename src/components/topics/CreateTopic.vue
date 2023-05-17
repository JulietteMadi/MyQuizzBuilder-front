<template>
    <h1>Créer un thème</h1>
    <form class="my-5">
        <div class="outlined my-4 p-4">
            <div class="row">
                <div class="col-12">
                    <label for="name" class="fs-5">Nom du thème</label>
                    <input name="name" id="name" type="text" maxlength="255" class="form-control"
                        placeholder="Ex : recrutement">
                </div>
                <div class="cols-12 my-4">
                    <p>Veuillez ajouter entre 5 et 50 fiches pratiques associées à ce thème.<br>
                        Attention au choix de l’image et du nom de la fiche, ce sont les informations que les utilisateurs
                        du
                        quizz verront !</p>
                </div>
            </div>

            <!-- List of guides -->
            <div class="row my-5 d-flex" v-for="(guide, index) in theme.guides" :key="index">
                <div class="col-12 col-md-11">
                    <label :for="`guideName${index}`" class="fs-6">Nom de la fiche</label>
                    <input :name="`guideName${index}`" :id="`guideName${index}`" v-model="guide.name" type="text"
                        maxlength="100" class="form-control mb-2">
                    <div class="d-flex">
                        <div class="col-6 pe-2">
                            <label :for="`guideLink${index}`">Lien vers la fiche</label>
                            <input :name="`guideLink${index}`" :id="`guideLink${index}`" v-model="guide.link" type="text"
                                maxlength="255" class="form-control">
                        </div>
                        <div class="col-6 ps-2">
                            <label :for="`guideImage${index}`">Lien vers l'image d'illustration</label>
                            <input class="form-control" type="file" :id="`guideImage${index}`">
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-1 align-self-center">
                    <i class="bi bi-trash3-fill primary clickable-icon"
                        style="font-size: 1.5rem; color: var(--second-dark-color);" @click="deleteGuide(index)"
                        data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top"></i>
                </div>
            </div>

            <!-- Add a guide -->
            <button class="btn secundary-button mt-2" @click="addGuide" type="button">
                <i class="bi bi-plus-circle"></i>
                Ajouter une fiche
            </button>
        </div>
        <div class="align-items-end flex-column row">
            <RouterLink to="/themes">
                <button class="btn primary-button mt-2 col-12 col-md-3" type="submit" :disabled="theme.guides.length < 5">
                    <i class="bi bi-plus-circle"></i>
                    Créer un thème
                </button>
            </RouterLink>
        </div>
    </form>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
    data() {
        return {
            theme: {
                name: "",
                guides: []
            }
        }
    },

    computed: {
        invalidForm() {
            return this.theme.guides < 4;
        }
    },

    methods: {
        addGuide() {
            this.theme.guides.push({ name: '', link: '', image: '' });
        },
        deleteGuide(index) {
            this.theme.guides.splice(index, 1);
        }
    }
}
</script>