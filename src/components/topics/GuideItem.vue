<template>
    <!-- Warning update modal -->
    <div class="modal fade" :id="'warningModalGuide' + index" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-danger" id="labelModal">Attention</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    Si vous change le nom ou l'image de <b>{{ guide.name }}</b>, ces changements seront effectifs dans tous
                    les
                    autres thèmes qui incluent cette fiche pratique.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">J'ai compris</button>
                </div>
            </div>
        </div>
    </div>
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
        <div v-else class="input-group">
            <input :id="`guideName${index}`" v-model="guide.name" class="form-control" :disabled="!updateGuide">
            <button class="btn primary-button" type="button">
                <i v-if="updateGuide" class="bi bi-save " style="color: white;"
                    @click="disableTooltip('saveGuide' + index), updateGuide = false, $emit('updateGuidesList')"
                    :id="'saveGuide' + index" data-bs-toggle="tooltip" data-bs-custom-class="bg-tooltip"
                    data-bs-original-title="Enregistrer cette fiche pratique"
                    @mouseover="enableTooltip(`saveGuide${index}`)"></i>
                <span v-else data-bs-toggle="modal" :data-bs-target="'#warningModalGuide' + index">
                    <i class="bi bi-pencil-square " style="color: white;"
                        @click="disableTooltip('updateGuide' + index), updateGuide = true, setUpdateGuide()"
                        :id="'updateGuide' + index" data-bs-toggle="tooltip" data-bs-custom-class="bg-tooltip"
                        data-bs-original-title="Modifier cette fiche pratique"
                        @mouseover="enableTooltip(`updateGuide${index}`)"></i>
                </span>

            </button>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-8 px-0 pe-md-3">
                    <label :for="`guideUrl${index}`">Lien vers la fiche</label>
                    <input :name="`guideUrl${index}`" :id="`guideUrl${index}`" v-model="guide.url" type="text"
                        maxlength="255" class="form-control" disabled>
                </div>
                <div class="col-12 col-md-4 px-0">
                    <label :for="`guideImage${index}`">Lien vers l'image d'illustration</label>
                    <input class="form-control" type="text" :id="`guideImage${index}`" v-model="guide.image"
                        :disabled="!updateGuide">
                </div>
            </div>
        </div>
    </div>

    <!-- Inputs to create a new guide -->
    <div class="col-12 col-md-11" v-else>
        <label :for="`guideName${index}`" class="fs-6">Nom de la fiche</label>
        <input :name="`guideName${index}`" :id="`guideName${index}`" v-model="guide.name" type="text" maxlength="100"
            class="form-control mb-2" :class="{ 'is-invalid': v$.guide.name.$error }">
        <p v-if="v$.guide.name.$error" class="text-danger">Ce champs est obligatoire et doit contenir entre 3 et 100
            caractères</p>
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-8 px-0 pe-md-3">
                    <label :for="`guideUrl${index}`">Lien vers la fiche</label>
                    <input :name="`guideUrl${index}`" :id="`guideUrl${index}`" v-model="guide.url" type="text"
                        maxlength="255" class="form-control" :class="{ 'is-invalid': v$.guide.url.$error }">
                    <p v-if="v$.guide.url.$error" class="text-danger">L'url est obligatoire et doit corresondre au site
                        majrh.fr</p>
                </div>
                <div class="col-12 col-md-4 px-0">
                    <label :for="`guideImage${index}`">Lien vers l'image d'illustration</label>
                    <input class="form-control" type="text" :id="`guideImage${index}`" v-model="guide.image" required>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 col-md-1 d-flex align-items-center justify-content-center flex-column">
        <i v-if="oldGuide" class="bi bi-arrow-left-right primary clickable-icon"
            style="font-size: 1.5rem; color: var(--second-dark-color);" @click="resetGuide()" :id="'change' + index"
            data-bs-toggle="tooltip" data-bs-custom-class="bg-tooltip"
            data-bs-original-title="Choisir une autre fiche pratique" @mouseover="enableTooltip(`change${index}`)"></i>
        <i class="bi bi-trash3-fill primary clickable-icon" style="font-size: 1.5rem; color: var(--second-dark-color);"
            @click="$emit('deleteGuide', index)" :id="'delete' + index" data-bs-toggle="tooltip"
            data-bs-custom-class="bg-tooltip" data-bs-original-title="Retirer cette fiche pratique"
            @mouseover="enableTooltip(`delete${index}`)"></i>
    </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';

const urlValidator = (value) => value.includes('majrh.fr')

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
            updateGuide: false
        }
    },

    validations() {
        return {
            guide: {
                name: {
                    required: required,
                    minLength: minLength(5),
                    maxLength: maxLength(100)
                },
                url: {
                    required: required,
                    minLength: minLength(5),
                    maxLength: maxLength(100),
                    urlValidator: urlValidator
                }
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
        },
        availableGuides: {
            type: Array,
            default: null
        },
        allGuides: {
            type: Object,
            default: null
        }
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
            this.guide.noUpdate = true;
            this.chosenGuideName = "";
            this.updateGuide = false;
            this.$emit('updateGuidesList');
        },
        disableTooltip(id) {
            const element = document.getElementById(id);
            const tooltip = bootstrap.Tooltip.getOrCreateInstance(element);
            tooltip.dispose();
        },
        setUpdateGuide() {
            this.guide.noUpdate = false;
        }
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