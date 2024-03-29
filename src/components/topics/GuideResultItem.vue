<template>
    <div class="card shadow my-2 card-style" @click="openGuide(this.guide.url)">
        <div class="card-header guide-header" style="height: 6rem;">
        </div>
        <div class="p-3">
            <h5 class="text-white">{{ guide.name }}</h5>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        guide: {
            type: Object,
            default: null
        }
    },

    methods: {
        openGuide(url){
            window.open(url, '_blank');
        }
    }
}
</script>
<style>
    .guide-header {
        background-image: url("../../assets/DefaultTopicPic.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }

    .card-style {
        background-color: var(--main-red-color);
        border-radius: 3%;
        border: 1px solid lightgray;
    }

    .card-style:hover {
        cursor: pointer;
        transform: translate(1px, 1px);
    }

</style>