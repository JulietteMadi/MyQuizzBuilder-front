<template>
    <!-- Toggle buttons to chose to create a new guide or use an old one -->
    <div class="btn-group col-12" role="group">
        <input type="radio" class="btn-check" :name="`guideOption${index}`" :id="`guideOption${index}1`" autocomplete="off"
            @click="activateOldGuide" checked>
        <label class="btn btn-outline" :for="`guideOption${index}1`">Utiliser une fiche pre-existante</label>
        <input type="radio" class="btn-check" :name="`guideOption${index}`" :id="`guideOption${index}2`" autocomplete="off"
            @click="activateNewGuide">
        <label class="btn btn-outline" :for="`guideOption${index}2`">Créer une nouvelle fiche pratique</label>
    </div>

    <!-- Inputs to use an old guide -->
    <div class="col-12 col-md-11" v-if="oldGuide">
        <label :for="`chosenGuideName${index}`" class="form-label required col-12">Nom de la fiche</label>
        <select v-if="!guide.url" v-model="chosenGuideName" :id="`chosenGuideName${index}`" :name="`guideName${index}`"
            class="form-select" @change="updateGuideInfo" :class="{ 'is-invalid': v$.guide.name.$error }">
            <option v-for="(guide, index) in availableGuides" :key="index">
                {{ guide.name }}
            </option>
        </select>
        <input v-else :id="`guideName${index}`" v-model="guide.name" class="form-control" disabled>
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-8 px-0 pe-md-3">
                    <label :for="`guideUrl${index}`">Lien vers la fiche</label>
                    <input :name="`guideUrl${index}`" :id="`guideUrl${index}`" v-model="guide.url" type="text"
                        maxlength="255" class="form-control" disabled>
                </div>
                <div class="col-12 col-md-4 px-0">
                    <label :for="`guideImage${index}`">Lien vers l'image d'illustration</label>
                    <input class="form-control" type="text" :id="`guideImage${index}`" v-model="guide.image" disabled>
                </div>
            </div>
        </div>
    </div>

    <!-- Inputs to create a new guide -->
    <div class="col-12 col-md-11" v-else>
        <label :for="`guideName${index}`" class="fs-6">Nom de la fiche</label>
        <input :name="`guideName${index}`" :id="`guideName${index}`" v-model="guide.name" type="text" maxlength="100"
            class="form-control mb-2" :class="{ 'is-invalid': v$.guide.name.$error }">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-8 px-0 pe-md-3">
                    <label :for="`guideUrl${index}`">Lien vers la fiche</label>
                    <input :name="`guideUrl${index}`" :id="`guideUrl${index}`" v-model="guide.url" type="text"
                        maxlength="255" class="form-control" :class="{ 'is-invalid': v$.guide.url.$error }">
                </div>
                <div class="col-12 col-md-4 px-0">
                    <label :for="`guideImage${index}`">Lien vers l'image d'illustration</label>
                    <input class="form-control" type="text" :id="`guideImage${index}`" v-model="guide.image" required>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 col-md-1 align-self-center d-flex justify-content-center">
        <i class="bi bi-trash3-fill primary clickable-icon" style="font-size: 1.5rem; color: var(--second-dark-color);"
            @click="$emit('deleteGuide', index)" :id="'delete' + index" data-bs-toggle="tooltip"
            data-bs-custom-class="bg-tooltip" data-bs-original-title="Retirer cette fiche pratique"
            @mouseover="enableTooltip(`delete${index}`)"></i>
    </div>
</template>
<script>
import { useUserStore } from '../../stores/userStore';
import { useTopicStore } from '../../stores/topicStore';
import { mapStores, mapState } from 'pinia';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, minLength } from '@vuelidate/validators';

export default {
    setup() {
        return {
            v$: useVuelidate({ $autoDirty: true })
        }
    },

    data() {
        return {
            chosenGuideName: "",
            oldGuide: true,
            validGuidesList: true,
        }
    },

    validations() {
        return {
            guide: {
                name: { required, maxLength: maxLength(100), minLength: minLength(3) },
                url: { required, maxLength: maxLength(255) }
            },
        }
    },

    props: {
        index: {
            type: Number,
            default: null
        },
        guide: {
            type: Object,
            default: null
        }
    },

    computed: {
        ...mapStores(useUserStore),
        ...mapState(useTopicStore, ["availableGuides"])
    },

    methods: {
        activateOldGuide() {
            this.oldGuide = true;
            this.resetGuide();
        },
        activateNewGuide() {
            this.oldGuide = false;
            this.resetGuide();
        },
        enableTooltip(id) {
            const element = document.getElementById(id);
            const tooltip = bootstrap.Tooltip.getOrCreateInstance(element);
            tooltip.enable();
        },
        updateGuideInfo() {
            const selectedGuide = this.availableGuides.find((g) => g.name === this.chosenGuideName);
            if (selectedGuide) {
                this.guide.name = selectedGuide.name
                this.guide.url = selectedGuide.url;
                this.guide.image = selectedGuide.image;
            }
        },
        resetGuide() {
            this.guide.url = "";
            this.guide.name = "";
            this.guide.image = "";
        },
    }

}
</script>
<style>
.btn-check:checked+label {
    outline: 0.1px var(--main-blue-color) solid !important;
    background-color: var(--main-blue-color) !important;
    color: white !important;
    border-width: 0px;
}

.btn-check:not(:checked)+label {
    outline: 0.1px var(--main-blue-color) solid !important;
    color: var(--main-blue-color) !important;
}

.btn-check:hover:not(:checked)+label {
    outline: 0.1px #0066B2 solid !important;
    background-color: #0066B2 !important;
    color: white !important;
}
</style>