<template>
    <h1>Créer un thème</h1>
    <form class="my-5" @submit.prevent="createTopic">
        <div class="outlined my-4 p-4">
            <div class="row">
                <div class="col-12">
                    <label for="name" class="fs-5">Nom du thème</label>
                    <input name="name" id="name" type="text" class="form-control" placeholder="Ex : recrutement"
                        v-model="theme.name" :class="{ 'is-invalid': v$.theme.name.$error }">
                </div>
                <div class="cols-12 my-4">
                    <p>Veuillez ajouter entre 5 et 50 fiches pratiques associées à ce thème.<br>
                        Attention au choix de l’image et du nom de la fiche, ce sont les informations que les utilisateurs
                        du quizz verront !</p>
                </div>
            </div>

            <!-- List of guides -->
            <div class="row py-3 my-5 d-flex" v-for="(guide, index) in theme.guides" :key="index">
                <GuideCreate :index="index" :guide="guide" :availableGuides="availableGuides" @deleteGuide="deleteGuide" />
            </div>

            <!-- Add a guide -->
            <button class="btn secundary-button mt-2" @click="addGuide" type="button">
                <i class="bi bi-plus-circle"></i>
                Ajouter une fiche
            </button>
        </div>
        <div class="align-items-end flex-column row">
            <button class="btn primary-button mt-2 col-12 col-md-3" type="submit" :disabled="invalidForm">
                <i class="bi bi-plus-circle"></i>
                Créer un thème
            </button>

        </div>
    </form>
</template>

<script>
import GuideCreate from '../components/topics/GuideCreate.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, minLength } from '@vuelidate/validators';
import { useUserStore } from '../stores/userStore';
import { useTopicStore } from '../stores/topicStore';
import { mapStores, mapActions } from 'pinia';

export default {
    setup() {
        return {
            v$: useVuelidate({ $autoDirty: true })
        }
    },
    data() {
        return {
            theme: {
                name: "",
                guides: []
            },
            allGuides: [],
            availableGuides: []
        }
    },

    validations() {
        return {
            theme: {
                name: { required, maxLength: maxLength(100) },
                guides: { required, maxLength: maxLength(50), minLength: minLength(5) }
            }
        }
    },

    components: {
        GuideCreate
    },


    computed: {
        ...mapStores(useUserStore, useTopicStore),
        invalidForm() {
            return this.theme.guides < 4 || !this.theme.name;
        },
    },

    created() {
        this.initGuides();
        this.addGuide();
    },

    methods: {
        ...mapActions(useTopicStore, ['updateGuidesList']),
        addGuide() {
            this.updateAvailableGuides();
            this.theme.guides.push({ name: '', url: '', image: '' });
        },
        deleteGuide(index) {
            this.theme.guides.splice(index, 1);
            this.updateAvailableGuides();
        },
        createTopic() {
            this.$router.push({ name: "themes" })
        },
        enableTooltip(id) {
            const element = document.getElementById(id)
            const tooltip = bootstrap.Tooltip.getOrCreateInstance(element);
            tooltip.enable();
        },
        updateAvailableGuides() {
            const guidesNames = this.theme.guides.map(guide => guide.name);
            const newAvailableGuides = this.allGuides.filter(guide => !guidesNames.includes(guide.name));
            console.log(typeof guidesNames);
            this.updateGuidesList(newAvailableGuides)
        },
        async createTopic() {
            const valid = await this.v$.$validate();
            console.log(valid);
            if (valid) {
                const headers = { 'Authorization': `Bearer ${this.usersStore.token}` }
                const resp = await this.$http.post('/topics', this.theme, { headers: headers });
                if (resp.status == 204 || resp.status == 200) {
                    this.$toast.success("toast-app", `Le guide ${this.theme.name} a bien été créé`);
                    this.$router.push({ name: 'themes' });
                } else {
                    console.error(resp);
                    this.$toast.error("toast-app", "Un problème est survenu à la création de ce thème");
                }
            } else {
                this.$toast.error("toast-app", "Les informations de votre thème ne sont pas valides");
            }
        },
        async initGuides() {
            const headers = { 'Authorization': `Bearer ${this.usersStore.token}` }
            const resp = await this.$http.get('/guides', { headers: headers });
            if (resp.status === 204 || resp.status === 200) {
                this.allGuides = resp.body;
                this.updateGuidesList(resp.body);
            } else {
                console.error(resp);
            }
        }
    }
}
</script>