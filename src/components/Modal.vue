<template>
    <div class="my-modal"
         @click="closeModal">
        <div class="my-modal-child">
            <img v-if="getImageUrl" :src="getImageUrl" alt="">
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Modal",
        methods: {
            closeModal(){
                this.$store.commit('closeModal', false)
            },
        },
        computed: {
            ...mapGetters([
                'getImageUrl',
            ]),
        }
    }
</script>

<style scoped>
    img {
        display: block;
        background-size: cover;
        max-width: 700px;
        max-height: 800px;
        position: center;
    }
    .my-modal{
        background-color: rgba(0,0,0,0.9);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9;
    }
    .my-modal-child{
        position: fixed;
        top: 50%;
        /*bottom: 0;*/
        left: 50%;
        /*right: 0;*/
        padding: 20px;
        background-color: #7A8288;
        border-radius: 4px;
        z-index: 10;
        /*max-width: 800px;*/
        /*max-height: 800px;*/
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    /*div img {*/
    /*    max-height: 600px;*/
    /*}*/
</style>