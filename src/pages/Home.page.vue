<template>
    <!-- Warning delete modal -->
    <div class="modal fade" id="warningModalTopic" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-danger" id="labelModal">Êtes-vous sûr.e de vouloir supprimer ce
                        thème ?</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    Cette action est irréversible, et vous perdrez tout le thème :
                    <b v-if="topicToDelete">{{ topicToDelete.name }}</b>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                        @click="deleteTopic(topicToDelete.id)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>

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
                    d'effets sur celle-ci : vous pouvez créer un quiz en entier, mais en revenant sur la liste des quiz
                    vous ne le retrouverez pas. <br>
                    Je compte sur vous pour me remonter des suggestions ou améliorations !
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">J'ai compris</button>
                </div>
            </div>
        </div>
    </div>

    <h1>Mon tableau de bord</h1>
    <section class="my-5">

        <!-- My profile -->
        <section class="my-5">
            <h2>Mon profil</h2>
            <div class="px-4">
                <div class="row gx-5">
                    <ul>
                        <li>Pseudo : {{ userName }}</li>
                        <li>Mail : {{ userEmail }}</li>
                        <li>Dernière connexion : 24/05/2023 15:51</li>
                        <li>Nombre de contributions : 19</li>
                    </ul>
                </div>
            </div>
        </section>
        <!-- My favourite quiz -->
        <h2>Mes derniers quiz</h2>
        <div class="text-center">
            <div class="row g-3">
                <div class=" col-12 col-sm-6 col-lg-3" v-for="(quiz, index) in lastQuizzes">
                    <QuizItem :quizName="quiz.name" :index="index.toString()" />
                </div>
            </div>
        </div>
        <RouterLink to="/quiz">
            <button class="btn secundary-button mt-4" type="button">
                <i class="bi bi-plus-circle"></i>
                Voir tous mes quiz
            </button>
        </RouterLink>
    </section>

    <!-- My favorite Topics -->
    <section class="my-5">
        <h2>Mes derniers thèmes</h2>
        <div class="text-center">
            <div class="row g-3">
                <div class="col-12 col-sm-6 col-lg-3" v-for="(topic, index) in lastTopics">
                    <TopicItem :topic="topic" :index="index.toString()" @deleteTopic="askDeleteTopic"
                        @updateTopic="updateTopic" />
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
</template>

<script>
import { RouterLink } from "vue-router";
import QuizItem from "../components/quizzes/QuizItem.vue"
import TopicItem from "../components/topics/TopicItem.vue"
import { useUserStore } from '../stores/userStore';
import { mapState } from 'pinia';

export default {
    data() {
        if (import.meta.env.MODE === "demo") {
            return {
                lastQuizzes: [
                    { id: 1, name: "Recrutement" },
                    { id: 2, name: "Onboarding" },
                    { id: 3, name: "Sensibilisation" },
                    { id: 4, name: "RSE en grand groupe" }
                ],
                lastTopics: [
                    { id: 1, name: "RH" },
                    { id: 2, name: "Administratif" },
                    { id: 3, name: "Travailleurs étrangers" },
                    { id: 4, name: "Inclusion managériale" }
                ],
                disclaimer: true,
                topicToDelete: {}
            }
        } else {
            return {
                lastQuizzes: [
                    { id: 1, name: "Recrutement" },
                    { id: 2, name: "Onboarding" },
                    { id: 3, name: "Sensibilisation" },
                    { id: 4, name: "RSE en grand groupe" }
                ],
                lastTopics: [],
                disclaimer: false,
                topicToDelete: {}
            };
        }
    },
    components: {
        QuizItem,
        TopicItem
    },

    mounted() {
        if (import.meta.env.MODE !== "demo") this.getAllTopics();
    },

    computed: {
        ...mapState(useUserStore, ["token", "userEmail", "userName"]),
    },

    methods: {
        reduceArrayLength(array) {
            array.splice(0, array.length - 4);
            array.reverse();
        },
        askDeleteTopic(index) {
            this.topicToDelete = this.lastTopics.find(topic => topic.id === index);
        },
        updateTopic(id, name) {
            this.$router.push({ name: 'modifierTheme', params: { id: id, name: name } })
        },

        async getAllTopics() {
            const headers = { 'Authorization': `Bearer ${this.token}` }
            const resp = await this.$http.get('/topics', { headers: headers });
            if (resp.status == 200 || resp.status == 204) {
                this.lastTopics = resp.body;
                if (this.lastTopics.length > 3) this.reduceArrayLength(this.lastTopics);
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
                    this.$toast.success("toast-app", `Le thème ${this.topicToDelete.name} a bien été supprimé`)
                } else {
                    console.error(error)
                    this.$toast.error("toast-app", `Un problème est survenu à la suppression du thème ${this.topicToDelete.name}`)
                }
            } else {
                const indexToDelete = this.lastTopics.findIndex(topic => topic.id === id);
                this.lastTopics.splice(indexToDelete, 1);
                this.$toast.success("toast-app", `Le thème ${this.topicToDelete.name} a bien été supprimé`);
            }
        }
    }
}
</script>

<style>
.my-gap {
    gap: 1rem;
}
</style>