import { defineStore } from "pinia";

export const useGuideStore = defineStore('guides', {
    state: () => {
        return {
            availableGuides: [],
            guidesNameList: [],
            guidesUrlList: [],
            guides: []
        }
    },

    actions: {
        updateAvailableGuidesList(usedGuides) {
            this.availableGuides = [];
            const guidesNames = usedGuides.map(guide => guide.name);
            const newAvailableGuides = this.guides.filter(guide => !guidesNames.includes(guide.name));
            newAvailableGuides.forEach((el) => {
                this.availableGuides.push(el);
            })
        },
        buildGuidesLists(guides) {
            this.guidesNameList = guides.map(guide => guide.name);
            this.guidesUrlList = guides.map(guide => guide.url);
            this.guides = guides;
        }
    }
})