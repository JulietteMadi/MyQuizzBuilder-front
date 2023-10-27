<template>
    <h1>Modifier le thème "{{ topic.name }}"</h1>
    {{ availableGuides }}
    <form class="my-5" @submit.prevent="createTopic">
        <div class="outlined my-4 p-4">
            <div class="row">
                <div class="col-12">
                    <label for="name" class="fs-5">Nom du thème</label>
                    <input name="name" id="name" type="text" class="form-control" placeholder="Ex : recrutement"
                        v-model="topic.name">
                </div>
                <div class="cols-12 my-4">
                    <p>Veuillez ajouter entre 5 et 50 fiches pratiques associées à ce thème.<br>
                        Attention au choix de l’image et du nom de la fiche, ce sont les informations que les utilisateurs
                        du quizz verront !</p>
                </div>
            </div>

            <!-- List of guides -->
            <div class="row py-3 my-5 d-flex" v-for="(guide, index) in topic.guides" :key="index">
                <GuideCreate :index="index" :guide="guide" :availableGuides="availableGuides" @deleteGuide="deleteGuide" />
            </div>

            <!-- Add a guide -->
            <button class="btn secundary-button mt-2" @click="addGuide" type="button">
                <i class="bi bi-plus-circle"></i>
                Ajouter une fiche
            </button>
        </div>
        <div class="align-items-end flex-column row">
            <button class="btn primary-button mt-2 col-12 col-md-3" type="submit">
                <i class="bi bi-pencil-square"></i>
                Modifier le thème
            </button>

        </div>
    </form>
</template>

<script>
import { useRoute } from 'vue-router'
import GuideCreate from '../components/topics/GuideCreate.vue';
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '../stores/userStore';
import { useTopicStore } from '../stores/topicStore';

export default {
    setup() {
        return {
            route: useRoute()
        }
    },
    data() {
        return {
            id: this.route.params.id,
            topic: {
                name: "",
                guides: []
            },
            allGuides: []
        }
    },

    components: {
        GuideCreate
    },

    computed: {
        ...mapState(useUserStore, ["token"]),
        ...mapState(useTopicStore, ["availableGuides"]),
        invalidForm() {
            return this.topic.guides < 4 || !this.guide.name;
        }
    },

    created() {
        this.initGuides();
    },

    methods: {
        ...mapActions(useTopicStore, ['updateGuidesList']),
        updateAvailableGuides() {
            const guidesNames = this.topic.guides.map(guide => guide.name);
            const newAvailableGuides = this.allGuides.filter(guide => !guidesNames.includes(guide.name));
            this.updateGuidesList(newAvailableGuides);
        },

        async initTopic() {
            const headers = { 'Authorization': `Bearer ${this.token}` };
            const resp = await this.$http.get(`/topics/${this.id}`, { headers: headers });
            if (resp.status === 204 || resp.status === 200) {
                console.log(resp.body)
                this.topic.name = resp.body.name;
                this.topic.guides = resp.body.guides;
                this.updateAvailableGuides();
            } else {
                console.error(resp);
                this.$router.push({ name: 'topics' });
                this.$toast.error("toast-app", "Une erreur est survenue")
            }
        },

        async initGuides() {
            const headers = { 'Authorization': `Bearer ${this.token}` }
            const resp = await this.$http.get('/guides', { headers: headers });
            if (resp.status === 204 || resp.status === 200) {
                this.allGuides = resp.body;
                await this.initTopic();
            } else {
                console.error(resp);
                this.$router.push({ name: 'topics' });
                this.$toast.error("toast-app", "Une erreur est survenue");
            }
        }
    }
}
</script>