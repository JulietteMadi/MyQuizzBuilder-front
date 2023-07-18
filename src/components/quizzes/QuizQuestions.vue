<template>
    <!-- List of question -->
    <h3 class="accordion-header row d-flex me-0" :id="`heading${index}`">
        <div class="col-11 pe-0">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${index}`">
                Question {{ index + 1 }} <span v-if="question.name"> : {{ question.name }}</span>
            </button>
        </div>
        <div class="col-1 px-0 d-flex justify-content-center align-items-center">
            <button class="btn" data-bs-toggle="modal" data-bs-target="#warningModal" type="button">
                <i class="bi bi-trash3-fill primary clickable-icon" :id="'deleteQuestion' + index"
                    style="font-size: 1.5rem; color: var(--second-dark-color);" @click="$emit('askDeleteQuestion', index)"
                    data-bs-toggle="tooltip" data-bs-custom-class="bg-tooltip"
                    :data-bs-original-title="'Supprimer la question ' + (index + 1)"
                    @mouseover="enableTooltip(`deleteQuestion${index}`)"></i>
            </button>
        </div>
    </h3>
    <div :id="`collapse${index}`" class="accordion-collapse collapse" :class="{ show: activeIndex === index }"
        data-bs-parent="questionsList">
        <div class="accordion-body">
            <div class="row">
                <div class="col-12">
                    <label :for="`questionName${index}`" class="fs-6">Question</label>
                    <input :name="`questionName${index}`" :id="`questionName${index}`" v-model="question.name" type="text"
                        maxlength="100" class="form-control mb-2" required>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <label :for="`questionTopic${index}`">
                        Choisissez le thème de votre question :
                    </label>
                    <select class="form-select" :id="`questionTopic${index}`" :name="`questionTopic${index}`"
                        v-model="question.topic" required>
                        <option selected>Choisissez le tème de votre question</option>
                        <option value="1">RH</option>
                        <option value="2">RSE dans les grandes compagnies</option>
                        <option value="3">Recrutement éthique</option>
                    </select>
                </div>
            </div>

            <!-- List of 4 answers -->
            <div class="row mt-5">
                <div class="col-12">
                    <h3>Proposez 4 réponses puis cochez la ou les bonne(s) réponse(s) :</h3>
                </div>
                <div class="col-12 col-md-6" v-for="(answer, i) of question.answers">
                    <label :for="`answer${i}`">
                        Réponse {{ i + 1 }}
                    </label>
                    <div class="row">
                        <div class="col-11">
                            <input :name="`answer${i}-${index}`" :id="`answer${i}-${index}`" type="text" maxlength="100"
                                class="form-control mb-2" v-model="answer.name" required>
                        </div>
                        <div class="col-1">
                            <input class="form-check-input" type="checkbox" value="" :id="`checkAnswer${i}-${index}`"
                                v-model="answer.valid">
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label :for="`answerDescription${index}`" class="form-label mt-5">
                    <h3>Description de la ou les bonne(s) réponse(s)</h3>
                </label>
                <textarea class="form-control" :id="`answerDescription${index}`" :name="`answerDescription${index}`"
                    rows="5" required></textarea>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        question: {
            type: Array,
            default: []
        },
        index: {
            type: Number,
            default: 0
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