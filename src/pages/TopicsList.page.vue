<template>
    <!-- Heander -->
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
        <div class="col-12 p-2 mt-2">
            <input type="text" class="form-control" id="searchTopic" placeholder="Rechercher un thème"
                v-model="searchTopic">
        </div>
    </div>

    <!-- TopicList -->
    <div class="row my-5 mx-auto text-center">
        <div class=" col-12 col-sm-6 col-md-4 col-lg-3 py-3" v-for="(topic, index) in filteredTopics">
            <TopicItem :topicName="topic.name" :index="index.toString()" />
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import TopicItem from '../components/topics/TopicItem.vue'

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
            };
        } else {
            return {
                allTopics: [],
                searchTopic: ""
            };
        }
    },
    components: {
        TopicItem
    },
    computed: {
        filteredTopics() {
            const search = this.searchTopic.toLowerCase();
            if (!search) {
                return this.allTopics;
            } else {
                return this.allTopics.filter(topic => {
                    const name = topic.name.toLowerCase();
                    return name.includes(search);
                });
            }
        }
    }
}
</script>