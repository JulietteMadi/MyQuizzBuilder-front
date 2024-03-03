<template>
    <div class="card shadow">
        <div class="card-header quiz-header" style="height: 5rem;">
        </div>
        <div class="blue-background p-2">
            <h5 class="text-white">{{ quiz.name }}</h5>
        </div>
        <div class="p-3 row">
            <div class="col d-flex justify-content-center p-0">
                <button :id="'modifyQuiz' + quiz.id"
                @click="$emit('updateQuiz', quiz.id), disableTooltip(`modifyQuiz${quiz.id}`)"
                    class="btn secundary-button mt-2"
                    @mouseover="enableTooltip(`modifyQuiz${quiz.id}`)"
                    data-bs-toggle="tooltip"
                    data-bs-custom-class="bg-tooltip" 
                    data-bs-original-title="Modifier"
                    >
                    <i class="bi bi-pencil-square"></i>
                </button>
            </div>
            <div class="col d-flex justify-content-center p-0">
                <button :id="'cancelQuiz' + quiz.id"
                @click="$emit('deleteQuiz', quiz.id)"
                    class="btn secundary-button mt-2" 
                    data-bs-custom-class="bg-tooltip" 
                    data-bs-original-title="Supprimer"
                    data-bs-toggle="modal" 
                    data-bs-target="#warningDeleteModal"
                    >
                    <i class="bi bi-trash3-fill"
                        @mouseover="enableTooltip(`cancelQuiz${quiz.id}`)"
                        data-bs-toggle="tooltip"
                    ></i>
                </button>
            </div>
            <div class="col d-flex justify-content-center p-0">
                <button :id="'shareQuiz' + quiz.id"
                    class="btn secundary-button mt-2"
                    @mouseover="enableTooltip(`shareQuiz${quiz.id}`)"
                    data-bs-toggle="tooltip"
                    data-bs-custom-class="bg-tooltip" 
                    data-bs-original-title="Partager"
                    disabled>
                    <i class="bi bi-share-fill"></i>
                </button>
            </div>
            <div class="col d-flex justify-content-center p-0">
                <button :id="'downloadQuiz' + quiz.id"
                    class="btn secundary-button mt-2"
                    @mouseover="enableTooltip(`downloadQuiz${quiz.id}`)"   
                    data-bs-toggle="tooltip"
                    data-bs-custom-class="bg-tooltip" 
                    data-bs-original-title="Télécharger le rapport"
                    disabled>
                    <i class="bi bi-download"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        quiz: {
            type: Object,
            default: null
        }
    },
    methods: {
        enableTooltip(id) {
            const element = document.getElementById(id)
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
.quiz-header {
    background-image: url("../../assets/DefaultQuizPic.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
</style>