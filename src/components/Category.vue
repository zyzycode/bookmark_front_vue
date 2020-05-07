<template>
    <div class="col mb-2">
        <div class="category-container">
            <form class="category-left col"
                  @submit.prevent="changeName">
                <button class="svg-button mr-1" type="button"
                        @click="rename=!rename">
                    <svg class="pan" aria-hidden="false" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M20.1039 9.58997L20.8239 8.87097C22.3929 7.30197 22.3929 4.74797 20.8239 3.17797C19.2549 1.60897 16.6999 1.60897 15.1309 3.17797L14.4119 3.89797L20.1039 9.58997ZM12.9966 5.30896L4.42847 13.8795L10.1214 19.5709L18.6896 11.0003L12.9966 5.30896ZM3.24398 21.968L8.39998 20.68L3.31998 15.6L2.03098 20.756C1.94598 21.096 2.04598 21.457 2.29398 21.705C2.54198 21.953 2.90298 22.052 3.24398 21.968Z"></path>
                    </svg>
                </button>
                <div class="category-name"
                     v-if="rename">
                    {{cat.name}}
                </div>
                <div class="change-name"
                     v-else>
                    <input class="name-input" type="text"
                           v-model="name"
                           v-focus
                    >
                    <button class="svg-button check-name"
                            type="submit">
                        <svg aria-hidden="false" width="32" height="24" viewBox="0 0 18 18">
                            <g fill="none" fill-rule="evenodd">
                                <polyline stroke="#ffffff" stroke-width="2" points="3.5 9.5 7 13 15 5">
                                </polyline>
                            </g>
                        </svg>
                    </button>
                </div>
            </form>
            <div class="category-center ">
                <button @click.prevent="getPosts" class="svg-button">
                    <svg class="check-mark" viewBox="0 0 24 24"
                         v-if="!postsOpen">
                        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
                              d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path>
                    </svg>
                    <svg class="cross" viewBox="0 0 28 28" fill="none"
                         v-if="postsOpen">
                        <path d="M3.06066 0.93934C2.47487 0.353553 1.52513 0.353553 0.93934 0.93934C0.353553 1.52513 0.353553 2.47487 0.93934 3.06066L3.06066 0.93934ZM24.9393 27.0607C25.5251 27.6464 26.4749 27.6464 27.0607 27.0607C27.6464 26.4749 27.6464 25.5251 27.0607 24.9393L24.9393 27.0607ZM27.0607 3.06066C27.6464 2.47487 27.6464 1.52513 27.0607 0.93934C26.4749 0.353553 25.5251 0.353553 24.9393 0.93934L27.0607 3.06066ZM0.93934 24.9393C0.353553 25.5251 0.353553 26.4749 0.93934 27.0607C1.52513 27.6464 2.47487 27.6464 3.06066 27.0607L0.93934 24.9393ZM0.93934 3.06066L24.9393 27.0607L27.0607 24.9393L3.06066 0.93934L0.93934 3.06066ZM24.9393 0.93934L0.93934 24.9393L3.06066 27.0607L27.0607 3.06066L24.9393 0.93934Z"/>
                    </svg>
                </button>
            </div>
            <div class="category-right col">
                <button class="btn btn-info svg-button mr-3"
                        @click="showForm"
                >Add new</button>
                <form @submit.prevent="deleteCategory">
                    <input type="text" placeholder="del" class="form-control-sm del-input mr-1"
                           v-model="delText"
                           :class="{invalid: ($v.delText.$dirty && !$v.delText.required) || ($v.delText.$dirty && !$v.delText.sameAs)}"
                    >
                    <button type="submit" class="svg-button">
                        <svg class="basket" aria-hidden="false" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
                            <path fill="currentColor"
                                  d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
        <div class="invalid-text mr-3">
            <small v-if="$v.delText.$dirty && !$v.delText.required">Поле не должно быть пустым. </small>
            <small v-if="$v.delText.$dirty && !$v.delText.sameAs">Введите del.</small>
        </div>

        <AddPost
                v-if="formOpen"
                v-bind:catId="cat.id"
                @closeF="closeForm"
        />

        <div class="posts">
            <Post
                    v-for="(postId, index) in cat.postsIds"
                    v-if="postsOpen"
                    :key="index"
                    v-bind:postId="postId"
            />
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import {required, sameAs} from 'vuelidate/lib/validators'
    import Post from "./Post";
    import AddPost from "./AddPost";

    export default {
        name: "Category",
        props: ['cat'],
        components: {Post, AddPost},
        data: function () {
            return {
                name: this.cat.name,
                id: this.cat.id,
                delText: '',
                delPattern: 'del',
                postsOpen: false,
                formOpen: false,
                rename: true,
            }
        },
        validations: {
            delText: {
                required,
                sameAs: sameAs('delPattern')
            }
        },
        computed: {
            ...mapActions([
                'delCategory',
            ])
        },
        methods: {
            async deleteCategory() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return
                }
                const catId = this.cat.id
                await this.$store.dispatch('deleteCategory', {catId})
            },
            async changeName() {
                let catId = this.id
                let name = this.name
                await this.$store.dispatch('editCategory', {catId, name})
                this.rename = true
            },
            async getPosts() {
                let catId = this.cat.id
                await this.$store.dispatch('fetchPosts', catId)
                this.postsOpen = !this.postsOpen
                this.formOpen = false
            },
            showForm(){
                this.formOpen = !this.formOpen
            },
            closeForm(){
              this.formOpen = false
            }

        },

    }
</script>

<style scoped>
    .category-container {
        border-radius: 4px;
        background-color: #7A8288;
        height: 45px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .category-container:hover {
        background-color: #3A3F44;
    }

    .category-left {
        overflow: auto;
        display: flex;
        align-items: center;
    }

    .change-name {
        display: flex;
        align-items: center;
    }

    .check-name svg:hover {
        color: black;
        fill: #272B30;
    }

    .category-name {
        font-size: 22px;
    }

    .name-input {
        outline: none;
        background-color: #7a8287;
        font-style: italic;
        color: white;
        border: none;
        font-size: 22px;
        border-radius: 4px;
    }

    .category-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .category-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .del-input {
        width: 45px;
    }

    .basket {
        color: #ee5f5b;
        width: 27px;
        min-height: 27px;
    }

    .basket:hover {
        color: #921d17;
    }

    .pan {
        width: 20px;
        height: 20px;
        /*padding-right: 30px;*/
    }

    .pan:hover {
        color: #272B30;
    }

    .check-mark {
        width: 30px;
        height: 30px;
    }

    .check-mark:hover {
        color: #272B30;
    }

    .cross {
        width: 30px;
        height: 30px;
        fill: white;
    }

    .cross:hover {
        fill: #272B30;
    }

    .svg-button {
        padding: 0;
        border: none;
        font: inherit;
        color: inherit;
        background-color: transparent;
        cursor: pointer;
        outline: 0;
    }

    .invalid-text {
        text-align: end;
        color: #ee5f5b;
    }

    .invalid-text small {
        display: block;
    }

    .invalid {
        border-color: #ee5f5b;
    }




</style>