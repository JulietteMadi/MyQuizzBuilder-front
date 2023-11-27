<template>
    <h1>Créer un thème</h1>
    <form class="my-5" @submit.prevent="createTopic">
        <div class="outlined my-4 p-4">
            <div class="row">
                <div class="col-12">
                    <label for="name" class="fs-5">Nom du thème</label>
                    <input name="name" id="name" type="text" class="form-control" placeholder="Ex : recrutement"
                        v-model="topic.name" :class="{ 'is-invalid': v$.topic.name.$error }">
                    <p v-if="v$.topic.name.$error" class="text-danger">{{ v$.topic.name.$errors[0].$message }}</p>
                </div>
                <div class="cols-12 my-4">
                    <p>Veuillez ajouter entre 5 et 50 fiches pratiques associées à ce thème.<br>
                        Attention au choix de l’image et du nom de la fiche, ce sont les informations que les utilisateurs
                        du quizz verront !</p>
                </div>
            </div>
            <!-- List of guides -->
            <p v-if="v$.topic.guides.$error" class="text-danger">{{ v$.topic.guides.$errors[0].$message }}</p>
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
        <div class="align-items-end flex-column px-2 row">
            <button class="btn primary-button mt-2 col-12 col-md-3" type="submit" :disabled="invalidForm">
                <i class="bi bi-plus-circle"></i>
                Créer un thème
            </button>

        </div>
    </form>
</template>

<script>
import GuideItem from '../components/topics/GuideItem.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, minLength, helpers } from '@vuelidate/validators';
import { useUserStore } from '../stores/userStore';
import { mapState } from 'pinia';

export default {
    setup() {
        return {
            v$: useVuelidate({ $autoDirty: true })
        }
    },
    data() {
        if (import.meta.env.MODE === "demo") {
            return {
                topic: {
                    name: "",
                    guides: []
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
                topic: {
                    name: "",
                    guides: []
                },
                allGuides: [],
                availableGuides: []
            }
        }

    },

    validations() {
        return {
            topic: {
                name: {
                    required: helpers.withMessage('Veuillez renseigner un nom pour ce thème', required),
                    maxLength: helpers.withMessage('Le nom du thème ne peut âs dépasser 100 caractères', maxLength(100))
                },
                guides: {
                    required: helpers.withMessage('Veuillez ajouter des fiches pratiques à ce thème', required),
                    maxLength: helpers.withMessage('Ce thème ne peut pas contenir plus de 50 fiches pratiques', maxLength(50)),
                    minLength: helpers.withMessage('Ce thème doit contenir au moins 5 fiches pratiques', minLength(3))
                }
            }
        }
    },

    components: {
        GuideItem
    },


    computed: {
        ...mapState(useUserStore, ["token"]),
        invalidForm() {
            return this.topic.guides.length < 5 || !this.topic.name;
        },
    },

    created() {
        if (import.meta.env.MODE !== "demo") this.initGuides();
        this.addGuide();
    },

    methods: {
        addGuide() {
            this.updateAvailableGuides();
            this.topic.guides.push({ name: '', url: '', image: '' });
        },
        deleteGuide(index) {
            this.topic.guides.splice(index, 1);
            this.updateAvailableGuides();
        },
        enableTooltip(id) {
            const element = document.getElementById(id)
            const tooltip = bootstrap.Tooltip.getOrCreateInstance(element);
            tooltip.enable();
        },
        updateAvailableGuides() {
            this.availableGuides = [];
            const guidesUrl = this.topic.guides.map(guide => guide.url);
            const newAvailableGuides = this.allGuides.filter(guide => !guidesUrl.includes(guide.url));
            newAvailableGuides.forEach(guide => {
                this.availableGuides.push(guide);
            })
        },
        guidesFormat() {
            this.topic.guides.forEach(guide => {
                if (guide.id) {
                    delete guide.url;
                }
                if (guide.id && guide.noUpdate) {
                    delete guide.name;
                    delete guide.image;
                } 
                delete guide.noUpdate;
            })
        },
        async createTopic() {
            const valid = await this.v$.$validate();
            if (valid) {
                    this.guidesFormat();
                    const headers = { 'Authorization': `Bearer ${this.token}` }
                    const resp = await this.$http.post('/topics', this.topic, { headers: headers });
                    if (resp.status == 204 || resp.status == 200) {
                        this.$toast.success("toast-app", `Le guide ${this.topic.name} a bien été créé`);
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
            const headers = { 'Authorization': `Bearer ${this.token}` }
            const resp = await this.$http.get('/guides', { headers: headers });
            if (resp.status === 204 || resp.status === 200) {
                this.allGuides = resp.body;
                this.availableGuides = resp.body;
            } else {
                console.error(resp);
            }
        }
    }
}
</script>