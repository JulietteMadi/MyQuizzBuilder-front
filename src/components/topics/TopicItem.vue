<template>
    <div class="card shadow">
        <div class="card-header topic-header" style="height: 5rem;">
        </div>
        <div class="red-background p-2">
            <h5 class="text-white">{{ topic.name }}</h5>
        </div>
        <div class="p-3 row">
            <div class="col d-flex justify-content-center p-0">
                <button :id="'modifyTopic' + topic.id" 
                    @click="$emit('updateTopic', topic.id, topic.name), disableTooltip(`modifyTopic${topic.id}`)"
                    class="btn primary-button mt-2"  
                    @mouseover="enableTooltip(`modifyTopic${topic.id}`)" 
                    data-bs-custom-class="bg-tooltip"
                    data-bs-original-title="Modifier"
                    data-bs-toggle="tooltip"
                >
                    <i class="bi bi-pencil-square"></i>
                </button>
            </div>
            <div class="col d-flex justify-content-center p-0">
                <button :id="'cancelTopic' + topic.id" 
                    @click="$emit('deleteTopic', topic.id)"
                    class="btn primary-button mt-2"  
                    data-bs-custom-class="bg-tooltip"
                    data-bs-original-title="Supprimer" 
                    data-bs-toggle="modal" 
                    data-bs-target="#warningModalTopic"
                   >
                    <i class="bi bi-trash3-fill" 
                        @mouseover="enableTooltip(`cancelTopic${topic.id}`)"
                        data-bs-toggle="tooltip"
                        >
                    </i>
                </button>
            </div>
            <div class="col d-flex justify-content-center p-0">
                <button :id="'shareTopic' + topic.id"
                    class="btn primary-button mt-2"
                    @mouseover="enableTooltip(`shareTopic${topic.id}`)"
                    data-bs-toggle="tooltip"
                    data-bs-custom-class="bg-tooltip" 
                    data-bs-original-title="Partager"
                    disabled>
                    <i class="bi bi-share-fill"></i>
                </button>
            </div>
            <div class="col d-flex justify-content-center p-0">
                <button :id="'adminVueTopic' + topic.id"
                    @mouseover="enableTooltip(`adminVueTopic${topic.id}`)"
                    class="btn primary-button mt-2"
                    data-bs-toggle="tooltip"
                    data-bs-custom-class="bg-tooltip"
                    data-bs-original-title="Voir la vue administrateur"
                    disabled>
                    <i class="bi bi-person-fill-gear"></i>
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