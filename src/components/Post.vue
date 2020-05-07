<template>
        <form class="post-container mb-1" @submit.prevent="editPost">
            <div class="post" v-if="!edit" ref="post">
                <div class="text-content">
                    <h4 ref="postTitle">{{title}}</h4>
                    <p ref="postBody">{{body}}</p>
                    <h5 ref="postUrl">
                        <a :href="url" target="_blank">{{url}}</a>
                    </h5>
                </div>

                <div class="media-content">
                    <div class="image " @click="showModal(image_url)">
                        <img :src="image_url">
                    </div>
                    <div v-html="iframe" class="iframe"></div>
                </div>
            </div>

            <div class="post" v-else :style="{height: this.$refs.post.clientHeight + 'px'}">
                <div class="text-content">
                    <textarea v-model="title"
                              type="text"
                              class="post-input input-title"
                              :style="{height: this.$refs.postTitle.clientHeight + 'px'}"
                    ></textarea>
                    <textarea v-model="body" type="text" class="post-input input-body"
                              :style="{height: this.$refs.postBody.clientHeight + 'px'}"></textarea>
                    <textarea v-model="url" type="text" class="post-input input-url"
                              :style="{height: this.$refs.postUrl.clientHeight + 'px'}"></textarea>
                </div>
                <div class="media-content">
                    <textarea type="text" v-model="image_url" class="post-input input-image"></textarea>
                    <textarea type="text" v-model="iframe" class="post-input input-iframe"></textarea>
                </div>
            </div>

            <div class="button-container">
                <button class="btn btn-info btn-sm" @click.prevent="openEdit">
                    Edit
                </button>
                <button v-if="edit" class="btn btn-success btn-sm" type="submit">submit</button>
                <button class="btn btn-danger btn-sm" @click.prevent="deletePost">
                    delete
                </button>
            </div>
        </form>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Post",
        props: ['postId'],
        data: () => ({
            edit: false,
            titleData: '',
            bodyData: '',
            urlData: '',
            imageData: '',
            iframeData: '',
        }),
        computed: {
            ...mapGetters([
                'getPostById',
            ]),
            post: function () {
                return this.getPostById(this.postId)
            },
            title: {
                get(){
                    this.titleData = this.getPostById(this.postId).title
                    return this.getPostById(this.postId).title
                },
                set(val){
                    this.titleData = val
                }
            },
            body: {
                get(){
                    this.bodyData = this.getPostById(this.postId).body
                    return this.getPostById(this.postId).body
                },
                set(val){
                    this.bodyData = val
                }
            },
            url: {
                get(){
                    this.urlData = this.getPostById(this.postId).url
                    return this.getPostById(this.postId).url
                },
                set(val){
                    this.urlData = val
                }
            },
            image_url: {
                get(){
                    this.imageData = this.getPostById(this.postId).image_url
                    return this.getPostById(this.postId).image_url
                },
                set(val){
                    this.imageData = val
                }
            },
            iframe: {
                get(){
                    this.iframeData = this.getPostById(this.postId).iframe
                    return this.getPostById(this.postId).iframe
                },
                set(val){
                    this.iframeData = val
                }
            },
        },
        methods: {
            showModal(url) {
                this.$store.commit('modalChange', {url})
            },
            openEdit() {
                this.edit = !this.edit
            },
            async deletePost() {
                await this.$store.dispatch('deletePost', {
                    postId: this.post.id,
                    catId: this.post.category_id,
                })
            },
            async editPost(){
                const newPost = {
                    title: this.titleData,
                    body: this.bodyData,
                    url: this.urlData,
                    image_url: this.imageData,
                    iframe: this.iframeData,
                    id: this.post.id,
                    category_id: this.post.category_id
                }
                const postId = this.post.id
                const catId = this.post.category_id
                await this.$store.dispatch('editPost', {catId, postId, newPost})
                this.edit = false
            }
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    li {
        list-style-type: none;
    }

    .post-input {
        outline: none;
        background-color: #7a8287;
        font-style: italic;
        color: white;
        border: none;
        border-radius: 5px;
        margin: 3px;
        min-height: 27px;
    }
    .input-title{}
    .input-body{}
    .input-url{}
    .input-image{
        height: 165px;
        width: 47%;
    }
    .input-iframe{
        height: 165px;
        width: 47%;
     }

    .post-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-left: 5px;
        margin-right: 5px;
        background-color: #00000057;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        padding: 3px;
    }

    .button-container {
        padding-top: 3px;
        /*align-self: flex-end;*/
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .button-container button {
        width: 80px;
    }

    .post {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-grow: 1;
        width: 100%;
        min-height: 165px;
    }

    .text-content {
        overflow-wrap: break-word;
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .media-content{
        display: flex;
        flex-wrap: wrap;
        width: 50%;
        justify-content: space-around;
    }

    .iframe {
        max-width: 50%;
        min-width: 0;
        height: 165px;
        margin: auto;
    }

    .iframe iframe {
        max-width: 100%;
        height: 165px;
    }

    .image {
        width: 50%;
        height: 165px;
        display: flex;
        align-items: center;
        margin: auto;
        padding-right: 5px;
        padding-left: 5px;
    }

    .image img {
        max-height: 165px;
        max-width: 100%;
        transition: 0.5s;
        display: block;
        margin: 0 auto;
    }


</style>