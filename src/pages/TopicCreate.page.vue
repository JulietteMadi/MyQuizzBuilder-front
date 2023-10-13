<template>
    <h1>Créer un thème</h1>
    <form class="my-5" @submit.prevent="createTopic">
        <div class="outlined my-4 p-4">
            <div class="row">
                <div class="col-12">
                    <label for="name" class="fs-5">Nom du thème</label>
                    <input name="name" id="name" type="text" maxlength="255" class="form-control"
                        placeholder="Ex : recrutement" required v-model="theme.name">
                </div>
                <div class="cols-12 my-4">
                    <p>Veuillez ajouter entre 5 et 50 fiches pratiques associées à ce thème.<br>
                        Attention au choix de l’image et du nom de la fiche, ce sont les informations que les utilisateurs
                        du quizz verront !</p>
                </div>
            </div>

            <!-- List of guides -->
            <div class="row py-3 my-5 d-flex" v-for="(guide, index) in theme.guides" :key="index">
                <GuideCreate :index="index" :guide="guide" :token="token" @deleteGuide="deleteGuide" />
            </div>

            <!-- Add a guide -->
            <button class="btn secundary-button mt-2" @click="addGuide" type="button">
                <i class="bi bi-plus-circle"></i>
                Ajouter une fiche
            </button>
        </div>
        <div class="align-items-end flex-column row">
            <button class="btn primary-button mt-2 col-12 col-md-3" type="submit">
                <i class="bi bi-plus-circle"></i>
                Créer un thème
            </button>

        </div>
    </form>
</template>

<script>
import GuideCreate from '../components/topics/GuideCreate.vue';
import { useUserStore } from '../stores/userStore';
import { mapStores } from 'pinia';

export default {
    data() {
        return {
            theme: {
                name: "",
                guides: []
            },
            token: ""
        }
    },
    components: {
        GuideCreate
    },
    computed: {
        ...mapStores(useUserStore),

        invalidForm() {
            return this.theme.guides < 4;
        }
    },

    created() {
        this.addGuide();
    },

    methods: {
        addGuide() {
            this.theme.guides.push({ name: '', url: '', image: '' });
        },
        deleteGuide(index) {
            this.theme.guides.splice(index, 1);
        },
        createTopic() {
            this.$router.push({ name: "themes" })
        },
        enableTooltip(id) {
            const element = document.getElementById(id)
            const tooltip = bootstrap.Tooltip.getOrCreateInstance(element);
            tooltip.enable();
        },
        async createTopic() {
            console.log(this.theme);
            const resp = await this.$http.post('/topics', this.theme);
            if (resp.status == 204 || resp.status == 200) {
                this.$router.push({ name: 'themes' });
            } else {
                console.error(resp);
            }
        },
    }
}
</script>