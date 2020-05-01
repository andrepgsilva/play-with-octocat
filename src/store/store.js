import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../services/services';
import { debounce } from '../helpers';

Vue.use(Vuex);

//TODO Erase content when mouse click out of the box of (search  + results) 
export default new Vuex.Store({
  state: {
    loading: false,
    repositoriesData: [],
  },

  getters: {
    repositories(state) {
      return state.repositoriesData;
    }
  },

  mutations: {
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },

    setRepositories(state, data) {
      state.repositoriesData = data;
    }
  },

  actions: {
    searchRepository(context, repositoryInput) {
      if (repositoryInput.length < 4 || context.state.loading) return;
      
      context.commit('setLoading', true);

      return new Promise((resolve, reject) => {
        debounce(() => {
          axios.get('/search/repositories?q=' + repositoryInput)
          .then(response => {
            context.commit('setLoading', false);
            context.commit('setRepositories', response.data.items);
            resolve(response);
          })
          .catch(error => {
            context.commit('setLoading', true);
            context.commit('setRepositories', []);
            console.log(error)
            reject(error)
          })
        }, 250)();
      })
    }
  },
  modules: {
  }
})
