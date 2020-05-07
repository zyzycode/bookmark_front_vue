import Vue from 'vue'
import Vuex from 'vuex'
import content from "./content";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showModal: false,
    image_url: '',
  },
  actions: {

  },
  mutations: {
    modalChange(state, {url}){
      state.showModal = !state.showModal
      state.image_url = url
    },
    closeModal(state) {
      state.showModal = false
    }
  },
  getters: {
    getShowModal(state){
      return state.showModal
    },
    getImageUrl(state){
      return state.image_url
    },
  },
  modules: {
    content
  }
})
