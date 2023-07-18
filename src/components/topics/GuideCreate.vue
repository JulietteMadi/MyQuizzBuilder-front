<template>
    <div class="col-12 col-md-11">
        <label :for="`guideName${index}`" class="fs-6">Nom de la fiche</label>
        <input :name="`guideName${index}`" :id="`guideName${index}`" v-model="guide.name" type="text" maxlength="100"
            class="form-control mb-2" required>
        <div class="d-flex">
            <div class="col-12 col-md-6 pe-2">
                <label :for="`guideLink${index}`">Lien vers la fiche</label>
                <input :name="`guideLink${index}`" :id="`guideLink${index}`" v-model="guide.link" type="text"
                    maxlength="255" class="form-control" required>
            </div>
            <div class="col-12 col-md-6 ps-2">
                <label :for="`guideImage${index}`">Lien vers l'image d'illustration</label>
                <input class="form-control" type="file" :id="`guideImage${index}`" required>
            </div>
        </div>
    </div>
    <div class="col-12 col-md-1 align-self-center">
        <i class="bi bi-trash3-fill primary clickable-icon" style="font-size: 1.5rem; color: var(--second-dark-color);"
            @click="$emit('deleteGuide', index)" :id="'delete' + index" data-bs-toggle="tooltip"
            data-bs-custom-class="bg-tooltip" data-bs-original-title="Supprimer cette fiche pratique"
            @mouseover="enableTooltip(`delete${index}`)"></i>
    </div>
</template>
<script>
export default {
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
    methods: {
        enableTooltip(id) {
            const element = document.getElementById(id)
            const tooltip = bootstrap.Tooltip.getOrCreateInstance(element);
            tooltip.enable();
        }
    }

}
</script>