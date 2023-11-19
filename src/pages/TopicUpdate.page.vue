<template>
    <h1>Modifier le thème "{{ topic.name }}"</h1>
    <form class="my-5" @submit.prevent="updateTopic">
        <div class="outlined my-4 p-4">
            <div class="row">
                <div class="col-12">
                    <label for="name" class="fs-5">Nom du thème</label>
                    <input name="name" id="name" type="text" class="form-control" placeholder="Ex : recrutement"
                        v-model="topic.name" :class="{ 'is-invalid': v$.topic.name.$error }">
                </div>
                <div class="cols-12 my-4">
                    <p>Veuillez ajouter entre 5 et 50 fiches pratiques associées à ce thème.<br>
                        Attention au choix de l’image et du nom de la fiche, ce sont les informations que les utilisateurs
                        du quizz verront !</p>
                </div>
            </div>
            <!-- List of guides -->
            <div class="row py-3 my-5 d-flex" v-for="(guide, index) in topic.guides" :key="index">
                <GuideItem :index="index" :guide="guide" :availableGuides="availableGuides" :allGuides="allGuides"
                    @deleteGuide="deleteGuide" @updateGuidesList="updateAvailableGuides" />
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
import GuideItem from '../components/topics/GuideItem.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, minLength } from '@vuelidate/validators';
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '../stores/userStore';


export default {
    setup() {
        return {
            route: useRoute(),
            v$: useVuelidate({ $autoDirty: true })
        }
    },

    data() {
        if (import.meta.env.MODE === "demo") {
            return {
                id: this.route.params.id,
                topic: {
                    name: this.route.params.name,
                    guides: [
                        { name: "Savoir quand former un collaborateur", url: "www.majrh.fr/savoir-quand-former", image: "www.temp.fr" },
                        { name: "Discriminations : les biais en recrutement", url: "www.majrh.fr/discrimination-biais-recrutement", image: "www.temp.fr" }
                    ]
                },
                allGuides: [
                    { name: "Former les cadres supérieurs", url: "www.majrh.fr/former-cadres-superieurs", image: "www.temp.fr" },
                    { name: "Savoir quand former un collaborateur", url: "www.majrh.fr/savoir-quand-former", image: "www.temp.fr" },
                    { name: "Discriminations : les biais en recrutement", url: "www.majrh.fr/discrimination-biais-recrutement", image: "www.temp.fr" },
                    { name: "Onboarding en 5 étapes", url: "www.majrh.fr/onboarding-5-etapes", image: "www.temp.fr" }
                ],
                availableGuides: [
                    { name: "Former les cadres supérieurs", url: "www.majrh.fr/former-cadres-superieurs", image: "www.temp.fr" },
                    { name: "Savoir quand former un collaborateur", url: "www.majrh.fr/savoir-quand-former", image: "www.temp.fr" },
                    { name: "Discriminations : les biais en recrutement", url: "www.majrh.fr/discrimination-biais-recrutement", image: "www.temp.fr" },
                    { name: "Onboarding en 5 étapes", url: "www.majrh.fr/onboarding-5-etapes", image: "www.temp.fr" }
                ]
            }
        } else {
            return {
                id: this.route.params.id,
                topic: {},
                allGuides: [],
                availableGuides: []
            }
        }

    },

    validations() {
        return {
            topic: {
                name: { required, maxLength: maxLength(100) },
                guides: { required, maxLength: maxLength(50), minLength: minLength(5) }
            }
        }
    },

    components: {
        GuideItem
    },

    computed: {
        ...mapState(useUserStore, ["token"]),
        invalidForm() {
            return this.topic.guides < 4 || !this.guide.name;
        }
    },

    created() {
        if (import.meta.env.MODE !== "demo") this.initGuides();
    },

    methods: {
        ...mapActions(useUserStore, ["resetUser"]),
        addGuide() {
            this.updateAvailableGuides();
            this.topic.guides.push({ name: '', url: '', image: '' });
        },
        deleteGuide(index) {
            this.topic.guides.splice(index, 1);
            this.updateAvailableGuides();
        },
        updateAvailableGuides() {
            this.availableGuides = [];
            const guidesUrl = this.topic.guides.map(guide => guide.url);
            const newAvailableGuides = this.allGuides.filter(guide => !guidesUrl.includes(guide.url));
            newAvailableGuides.forEach(guide => {
                this.availableGuides.push(guide)
            })
        },
        guidesFormat() {
            this.topic.guides.forEach(guide => {
                if (!guide.id) {
                    const tmp = this.allGuides.filter(el => guide.url === el.url);
                    guide.id = tmp[0].id;
                };
                if (guide.noUpdate) {
                    delete guide.name;
                    delete guide.url;
                    delete guide.image;
                };
                delete guide.noUpdate;
            })
        },
        async initTopic() {
            const headers = { 'Authorization': `Bearer ${this.token}` };
            const resp = await this.$http.get(`/topics/${this.id}`, { headers: headers });
            if (resp.status === 204 || resp.status === 200) {
                this.topic = resp.body;
                this.topic.guides.forEach(el => {
                    el.noUpdate = true;
                });
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
        },

        async updateTopic() {
            const valid = await this.v$.$validate();
            if (valid) {
                if (import.meta.env.MODE !== "demo") {
                    this.guidesFormat();
                    const headers = { 'Authorization': `Bearer ${this.token}` }
                    const resp = await this.$http.put(`/topics/${this.id}`, this.topic, { headers: headers });
                    if (resp.status === 204 || resp.status === 200) {
                        this.$toast.success("toast-app", `Le guide ${this.topic.name} a bien été modifié`);
                        this.$router.push({ name: 'themes' });
                    } else {
                        this.$toast.error("toast-app", "Les informations de votre thème ne sont pas valides");
                    }
                } else {
                    this.$toast.success("toast-app", `Le guide ${this.topic.name} a bien été modifié`);
                    this.$router.push({ name: 'themes' });
                }
            } else {
                this.$toast.error("toast-app", "Les informations de votre thème ne sont pas valides");
            }

        }
    }
}
</script>