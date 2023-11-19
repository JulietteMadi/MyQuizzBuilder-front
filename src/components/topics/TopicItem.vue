<template>
    <div class="card shadow">
        <div class="card-header topic-header" style="height: 5rem;">
        </div>
        <div class="red-background p-2">
            <h5 class="text-white">{{ topic.name }}</h5>
        </div>
        <div class="p-3 row">
            <div class="col d-flex justify-content-center p-0">
                <button class="btn primary-button mt-2" :id="'modifyTopic' + topic.id" data-bs-custom-class="bg-tooltip"
                    data-bs-original-title="Modifier"
                    @click="$emit('updateTopic', topic.id, topic.name), disableTooltip(`modifyTopic${topic.id}`)">
                    <i class="bi bi-pencil-square" data-bs-toggle="tooltip"
                        @mouseover="enableTooltip(`modifyTopic${topic.id}`)"></i>
                </button>
            </div>
            <div class="col d-flex justify-content-center p-0">
                <button class="btn primary-button mt-2" :id="'cancelTopic' + topic.id" data-bs-custom-class="bg-tooltip"
                    data-bs-original-title="Supprimer" data-bs-toggle="modal" data-bs-target="#warningModalTopic"
                    @click="$emit('deleteTopic', topic.id)">
                    <i class="bi bi-trash3-fill" data-bs-toggle="tooltip"
                        @mouseover="enableTooltip(`cancelTopic${topic.id}`)"></i>
                </button>
            </div>
            <div class="col d-flex justify-content-center p-0">
                <button class="btn primary-button mt-2" :id="'shareTopic' + topic.id" data-bs-toggle="tooltip"
                    data-bs-custom-class="bg-tooltip" data-bs-original-title="Partager"
                    @mouseover="enableTooltip(`shareTopic${topic.id}`)" disabled>
                    <i class="bi bi-share-fill"></i>
                </button>
            </div>
            <div class="col d-flex justify-content-center p-0">
                <button class="btn primary-button mt-2" :id="'downloadTopic' + topic.id" data-bs-toggle="tooltip"
                    data-bs-custom-class="bg-tooltip" data-bs-original-title="Télécharger le rapport"
                    @mouseover="enableTooltip(`downloadTopic${topic.id}`)" disabled>
                    <i class="bi bi-download"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        topic: {
            type: Object,
            default: null
        },
        index: {
            type: String,
            default: null
        }
    },

    methods: {
        enableTooltip(id) {
            const element = document.getElementById(id);
            const tooltip = bootstrap.Tooltip.getOrCreateInstance(element);
            tooltip.enable();
        },
        disableTooltip(id) {
            const element = document.getElementById(id);
            const tooltip = bootstrap.Tooltip.getOrCreateInstance(element);
            tooltip.dispose();
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