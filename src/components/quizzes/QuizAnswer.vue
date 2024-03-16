<template>
    <label :for="`answer${index}`">
        Réponse {{ answerIndex + 1 }}
    </label>
    <div class="row mb-2">
        <div class="input-group">
            <input :name="`answer${questionIndex}-${answerIndex}`" :id="`answer${questionIndex}-${answerIndex}`" type="text"
                class="form-control" v-model="answer.name">
            <div class="input-group-text" :class="{ 'bg-success': answer.valid }">
                <label :for="`checkAnswer${questionIndex}-${answerIndex}`">
                    <i :id="'checkAnswerIcon' + questionIndex + answerIndex"
                        @mouseover="enableTooltip('checkAnswerIcon' + questionIndex + answerIndex)"
                        class="bi bi-check-lg clickable-icon" 
                        :class="{'text-white': answer.valid}" 
                        data-bs-toggle="tooltip" 
                        data-bs-custom-class="bg-tooltip"
                        :data-bs-original-title="tooltipMessage"
                    ></i>
                </label>
            </div>
            <div class="input-group-text" :class="{'bg-danger': !deleteDisabled}">
                <i :id="'deleteAnswer' + questionIndex + answerIndex"
                    @click="$emit('deleteAnswer', questionIndex), disableTooltip(`deleteAnswer${questionIndex}${answerIndex}`)"
                    @mouseover="enableTooltip(`deleteAnswer${questionIndex}${answerIndex}`, deleteDisabled)"
                    class="bi bi-trash3-fill primary" 
                    :class="{'clickable-icon text-white': !deleteDisabled}"
                    style="color: var(--second-dark-color)" 
                    data-bs-toggle="tooltip" 
                    data-bs-custom-class="bg-tooltip"
                    data-bs-original-title="Supprimer la réponse"
                ></i>
            </div>
        </div>
        <input class="form-check-input invisible" type="checkbox" value="" :id="`checkAnswer${questionIndex}-${answerIndex}`"
                v-model="answer.valid">
        <p v-if="v$.answer.name.$error" 
            class="text-danger">
            {{ v$.answer.name.$errors[0].$message }}
        </p>
    </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, minLength, helpers } from '@vuelidate/validators';

export default {
    setup() {
        return {
            v$: useVuelidate({ $autoDirty: true })
        }
    },
    props: {
        answer: {
            type : Object,
            default: {}
        },
        questionIndex: {
            type: Number
        },
        answerIndex: {
            type: Number
        },
        answersLength: {
            type: Number
        }
    },

    validations(){
        return {
            answer:{
                name: {
                    required: helpers.withMessage('Veuillez décrire la réponse', required),
                    maxLength: helpers.withMessage('La réponse ne peut pas dépasser 255 caractères', maxLength(255))
                }
            }
        }
    },

    computed:{
        deleteDisabled(){
            return this.answersLength <= 2;
        },
        tooltipMessage(){
            if(this.answer.valid){
                return "Passer la réponse en non-valide"
            } else {
                return "Passer la réponse en valide"
            }
        }
    },
    methods: {
        enableTooltip(id, disabled) {
            if(!disabled){
                const element = document.getElementById(id);
                const tooltip = bootstrap.Tooltip.getOrCreateInstance(element);
                tooltip.enable();
            }
        },
        disableTooltip(id) {
            const element = document.getElementById(id);
            const tooltip = bootstrap.Tooltip.getOrCreateInstance(element);
            tooltip.dispose();
        }
    }
}
</script>