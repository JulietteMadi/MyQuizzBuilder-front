<template>
    <div class="card shadow">
        <div class="card-header topic-header" style="height: 5rem;">
        </div>
        <div class="red-background p-2">
            <h5 class="text-white">{{ topicName }}</h5>
        </div>
        <div class="p-3 row">
            <div class="col d-flex justify-content-center p-0">
                <button class="btn primary-button mt-2" :id="'modifyTopic' + index" data-bs-toggle="tooltip"
                    data-bs-custom-class="bg-tooltip" data-bs-original-title="Modifier"
                    @mouseover="enableTooltip(`modifyTopic${index}`)">
                    <i class="bi bi-pencil-square"></i>
                </button>
            </div>
            <div class="col d-flex justify-content-center p-0">
                <button class="btn primary-button mt-2" :id="'cancelTopic' + index" data-bs-toggle="tooltip"
                    data-bs-custom-class="bg-tooltip" data-bs-original-title="Supprimer"
                    @mouseover="enableTooltip(`cancelTopic${index}`)">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </div>
            <div class="col d-flex justify-content-center p-0">
                <button class="btn primary-button mt-2" :id="'shareTopic' + index" data-bs-toggle="tooltip"
                    data-bs-custom-class="bg-tooltip" data-bs-original-title="Partager"
                    @mouseover="enableTooltip(`shareTopic${index}`)">
                    <i class="bi bi-share-fill"></i>
                </button>
            </div>
            <div class="col d-flex justify-content-center p-0">
                <button class="btn primary-button mt-2" :id="'downloadTopic' + index" data-bs-toggle="tooltip"
                    data-bs-custom-class="bg-tooltip" data-bs-original-title="Télécharger le rapport"
                    @mouseover="enableTooltip(`downloadTopic${index}`)">
                    <i class="bi bi-download"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        topicName: {
            type: String,
            default: null
        },
        index: {
            type: String,
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
<style>
.topic-header {
    background-image: url("../../assets/DefaultTopicPic.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
</style>