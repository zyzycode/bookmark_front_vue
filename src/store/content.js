import axios from 'axios'
import Vue from 'vue'


export default {
    state: {
        categories: [],
        posts: {}
    },
    actions: {
        async fetchCategories({commit}) {
            axios.get('/category').then((response) => {
                commit('updateCategories', response.data)
            })
        },
        async addCategory({commit}, name) {
            axios.post('/category', {
                name: name
            }).then((response) => {
                commit('createCategory', response.data)
            })
        },
        async deleteCategory({commit}, {catId}) {
            axios.delete(`/category/${catId}`).then((response) => {
                commit('deleteCategory', catId)
            })
        },
        async editCategory({commit}, {catId, name}){
            axios.put(`/category/${catId}`, {
                name
            }).then((response) =>{
                commit('changeCategory', {name, catId})
            })
        },
        async fetchPosts({commit}, catId){
            axios.get(`/category/${catId}/post`).then((response) => {
                const postsNew = response.data
                commit('updatePosts', {postsNew, catId})
            })
        },
        async addPost({commit}, {catId, postData}){
            axios.post(`/category/${catId}/post`, postData).then((response) => {
                const postNew = response.data
                commit('createPost', {catId , postNew})
            })
        },
        async deletePost({commit}, {postId, catId}){
            axios.delete(`/category/${catId}/post/${postId}`).then((response) => {
                commit('deletePost', {catId, postId})
            })
        },
        async editPost({commit}, {catId, postId, newPost}){
            axios.put(`/category/${catId}/post/${postId}`, newPost).then((response) =>{
                commit('changePost', {newPost, postId})
            })
        },

    },
    mutations: {
        updateCategories(state, categories){
            categories = categories.map(cat => ({...cat, postsIds: []}))
            state.categories = categories
        },
        createCategory(state, category){
            state.categories.unshift(category)
        },
        deleteCategory(state, catId){
            state.categories = state.categories.filter(cat => cat.id!==catId)
        },
        changeCategory(state, {name, catId}){
            const index = state.categories.findIndex(cat => cat.id === catId)
            state.categories[index].name = name
        },
        updatePosts(state, {catId, postsNew}){
            const newPosts = postsNew.reduce((empty, item) => (empty[item.id] = item, empty),{})
            const postIds = postsNew.map(post=>post.id)

            const index = state.categories.findIndex(cat => cat.id === catId)
            Vue.set(state.categories[index], 'postsIds', postIds)

            postIds.forEach( key => {
                Vue.set(state.posts, key, newPosts[key])
            })
            console.log(state.posts)
        },
        createPost(state, {catId, postNew}){
            const postId = postNew.id
            const index = state.categories.findIndex(cat => cat.id === catId)
            state.categories[index].postsIds.unshift(postId)
            Vue.set(state.posts, postId, postNew)
            console.log(state.posts)
        },
        deletePost(state, {catId, postId}){
            const index = state.categories.findIndex(cat => cat.id === catId)
            state.categories[index].postsIds = state.categories[index].postsIds.filter(item => item !== postId)
            Vue.delete(state.posts, postId)
        },
        changePost(state, {newPost, postId}){
            Vue.set(state.posts, postId, newPost)
        }
    },
    getters: {
        allCategories(state) {
            return state.categories
        },
        getPostById: (state) => (postId) => {
            return state.posts[postId]
        }
    },
}