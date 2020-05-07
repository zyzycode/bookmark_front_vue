<template>
    <div class="container">
        <form @submit.prevent="createCategorySubmit" class="mb-3 mt-4">
            <div>
                <input type="text" class="form-control" id="catName" placeholder="Category name"
                       v-model="categoryName">
                <button type="submit" class="btn btn-secondary btn-block">Create New Category</button>
            </div>
        </form>

        <div class="row row-cols-1">
            <Category
                    v-for="cat in categories"
                    :key="cat.id"
                    v-bind:cat="cat"
            />
        </div>

        <Modal v-if="showModal" v-scroll-lock="showModal"/>

    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    import Category from "./components/Category";
    import Modal from "./components/Modal";

    export default {
        data: function () {
            return {
                categoryName: '',
            }
        },
        components: {Category, Modal},
        methods: {
        async createCategorySubmit() {
                await this.$store.dispatch('addCategory', this.categoryName)
                this.categoryName = ''
            },
        },
        computed: {
            ...mapGetters({
                categories: 'allCategories',
                showModal: 'getShowModal'
            }),
        },
        async mounted() {
            await this.$store.dispatch('fetchCategories')
        },

    }
</script>

<style>
    @import 'style/bootstrap.min.css';

</style>
