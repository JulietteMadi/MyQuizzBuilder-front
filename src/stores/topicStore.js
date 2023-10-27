import { defineStore } from "pinia";

export const useTopicStore = defineStore('topics', {
    state: () => {
        return {
            availableGuides: []
        }
    },

    actions: {
        updateGuidesList(guides) {
            console.log("guides")
            this.availableGuides = [];
            guides.forEach((el) => {
                this.availableGuides.push(el);
                console.log(el)
            })
        }
    }
})