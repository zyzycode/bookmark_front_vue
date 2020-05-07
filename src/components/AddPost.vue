<template>
    <form class="post-form"
          @submit.prevent="addPost"
          >
        <div class="form-group">
                        <textarea class="form-control mt-2" id="iframeArea" rows="3"
                                  placeholder="Iframe area"
                                  v-model="newPostIframe"></textarea>
        </div>
        <div class="row">
            <div class="form-group col">
                <input type="text" class="form-control" id="titleInput"
                       placeholder="Title"
                       v-model="newPostTitle">
            </div>
            <div class="form-group col">
                <input type="text" class="form-control" id="bodyInput"
                       placeholder="Body"
                       v-model="newPostBody">
            </div>
        </div>
        <div class="row">
            <div class="form-group col">
                <input type="text" class="form-control" id="urlInput"
                       placeholder="Url"
                       v-model="newPostUrl">
            </div>
            <div class="form-group col">
                <input type="text" class="form-control" id="imageUrlInput"
                       placeholder="Image url"
                       v-model="newPostImage_url">
            </div>
        </div>
        <button type="submit" class="btn btn-primary col">Submit</button>
    </form>
</template>

<script>
    export default {
        name: "AddPost",
        props: ['catId'],
        data: ()=>{
            return{
                newPostIframe: '',
                newPostTitle: '',
                newPostBody: '',
                newPostUrl: '',
                newPostImage_url: ''
            }
        },
        methods: {
            async addPost(){
                const catId = this.catId
                const postData = {
                    title: this.newPostTitle,
                    body: this.newPostBody,
                    url: this.newPostUrl,
                    image_url: this.newPostImage_url,
                    iframe: this.newPostIframe
                }
                await this.$store.dispatch('addPost', {catId, postData})
                this.newPostIframe = this.newPostImage_url = this.newPostUrl = this.newPostBody = this.newPostTitle = ''
                this.$emit('closeF', false);
            },
        }
    }
</script>

<style scoped>

</style>