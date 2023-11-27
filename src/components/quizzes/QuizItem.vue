<template>
    <div class="card shadow">
        <div class="card-header quiz-header" style="height: 5rem;">
        </div>
        <div class="blue-background p-2">
            <h5 class="text-white">{{ quizName }}</h5>
        </div>
        <div class="p-3 row">
            <div class="col d-flex justify-content-center p-0">
                <button :id="'modifyQuiz' + index"
                    class="btn secundary-button mt-2"
                    @mouseover="enableTooltip(`modifyQuiz${index}`)"
                    data-bs-toggle="tooltip"
                    data-bs-custom-class="bg-tooltip" 
                    data-bs-original-title="Modifier"
                    disabled>
                    <i class="bi bi-pencil-square"></i>
                </button>
            </div>
            <div class="col d-flex justify-content-center p-0">
                <button :id="'cancelQuiz' + index"
                    class="btn secundary-button mt-2" 
                    @mouseover="enableTooltip(`cancelQuiz${index}`)"
                    data-bs-toggle="tooltip"
                    data-bs-custom-class="bg-tooltip" 
                    data-bs-original-title="Supprimer"
                    disabled>
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </div>
            <div class="col d-flex justify-content-center p-0">
                <button :id="'shareQuiz' + index"
                    class="btn secundary-button mt-2"
                    @mouseover="enableTooltip(`shareQuiz${index}`)"
                    data-bs-toggle="tooltip"
                    data-bs-custom-class="bg-tooltip" 
                    data-bs-original-title="Partager"
                    disabled>
                    <i class="bi bi-share-fill"></i>
                </button>
            </div>
            <div class="col d-flex justify-content-center p-0">
                <button :id="'downloadQuiz' + index"
                    class="btn secundary-button mt-2"
                    @mouseover="enableTooltip(`downloadQuiz${index}`)"   
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
        quizName: {
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
.quiz-header {
    background-image: url("../../assets/DefaultQuizPic.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
</style>