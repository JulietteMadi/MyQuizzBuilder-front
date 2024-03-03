<template>
    <!-- Warning delete modal -->
    <DeleteDialog :dialogMessage="deleteDialogMessage" @deleteItem="deleteTopic" />

    <!-- Header -->
    <div class="row my-5 mx-auto">
        <div class="col-md mx-auto">
            <h1>Liste de mes thèmes</h1>
        </div>
        <div class="col-md mx-auto">
            <RouterLink to="/creer-theme">
                <button class="btn secundary-button float-md-end btn-lg" type="button">
                    <i class="bi bi-plus-circle"></i>
                    Créer un thème
                </button>
            </RouterLink>
        </div>
        <div class="col-12 p-2 mt-5 input-group">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
            <input type="text" class="form-control" id="searchTopic" placeholder="Rechercher un thème"
                v-model="searchTopic">
        </div>
    </div>
    <!-- TopicList -->
    <div class="row my-5 mx-auto text-center">
        <div class=" col-12 col-sm-6 col-md-4 col-lg-3 py-3" v-for="(topic, index) in filteredTopics" :key="topic.id">
            <TopicItem :topic="topic" :index="index.toString()" @deleteTopic="askDeleteTopic" @updateTopic="updateTopic" />
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { mapState } from 'pinia';
import TopicItem from '../components/topics/TopicItem.vue';
import DeleteDialog from '../components/commons/DeleteDialog.vue';

export default {
    data() {
        if (import.meta.env.MODE === "demo") {
            return {
                allTopics: [
                    { id: 1, name: "Recrutement" },
                    { id: 2, name: "Onboarding" },
                    { id: 3, name: "Sensibilisation" },
                    { id: 4, name: "RSE en grand groupe" },
                    { id: 5, name: "Jeunes entrepreneurs" },
                    { id: 6, name: "Parité en entreprise" },
                    { id: 7, name: "Formations internes" },
                    { id: 8, name: "Rédaction de fiche emploi" },
                    { id: 9, name: "Sélectionner les CV" }
                ],
                searchTopic: "",
                topicToDelete: {}
            };
        } else {
            return {
                allTopics: [],
                searchTopic: "",
                topicToDelete: {},
                deleteDialogMessage: {}
            };
        }
    },



    components: {
        TopicItem, 
        DeleteDialog
    },

    computed: {
        ...mapState(useUserStore, ["token"]),

        filteredTopics() {
            const search = this.searchTopic.toLowerCase();
            return this.allTopics.filter(topic => {
                const name = topic.name.toLowerCase();
                return name.includes(search);
            });
        }
    },

    async mounted() {
        if (import.meta.env.MODE !== "demo") {await this.getAllTopics();}

    },
    methods: {
        askDeleteTopic(index) {
            this.topicToDelete = this.allTopics.find(topic => topic.id === index);
            this.deleteDialogMessage = {
                indexDelete: this.topicToDelete.id,
                title: `Êtes vous sûr-e de vouloir supprimer ce thème ?`,
                body: "Cette action est irréversible, et vous supprimerez définitivement le thème: " + this.topicToDelete.name,
            }
        },
        updateTopic(id, name) {
            this.$router.push({ name: 'modifierTheme', params: { id: id, name: name } })
        },
        async getAllTopics() {
            const headers = { 'Authorization': `Bearer ${this.token}` }
            const resp = await this.$http.get('/topics', { headers: headers });
            if (resp.status == 200 || resp.status == 204) {
                this.allTopics = resp.body;
            } else {
                console.error(resp);
            }
        },
        async deleteTopic(id) {
            if (import.meta.env.MODE !== "demo") {
                const headers = { 'Authorization': `Bearer ${this.token}` }
                const resp = await this.$http.delete(`/topics/${id}`, { headers: headers });
                if (resp.status === 204 || resp.status === 200) {
                    await this.getAllTopics();
                    this.$toast.success("toast-app", `Le thème ${this.topicToDelete.name} a bien été supprimé`);
                } else {
                    console.error(error)
                    this.$toast.error("toast-app", `Un problème est survenu à la suppression du thème ${this.topicToDelete.name}`);
                }
            } else {
                const indexToDelete = this.allTopics.findIndex(topic => topic.id === id);
                this.allTopics.splice(indexToDelete, 1);
                this.$toast.success("toast-app", `Le thème ${this.topicToDelete.name} a bien été supprimé`)
            }

        }
    }
}
</script>