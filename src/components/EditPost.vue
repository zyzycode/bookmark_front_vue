<template>
    <form class="post-form">
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
        name: "EditPost",
        props: ['post'],
        data: () => ({
            newPostIframe: '',
            newPostTitle: '',
            newPostBody: '',
            newPostUrl: '',
            newPostImage_url: ''
        }),
        mounted() {
            this.newPostIframe = this.post.iframe
            this.newPostTitle = this.post.title
            this.newPostBody = this.post.body
            this.newPostUrl = this.post.url
            this.newPostImage_url = this.post.image_url
        }
    }
</script>

<style scoped>
    form{
        min-height: 165px
    }
</style>