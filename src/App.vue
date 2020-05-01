<template>
  <div class="h-screen" id="main">
    <div class="h-full flex justify-center">
      <div class="w-full flex flex-col justify-center">
        <h1 
          class="md:text-5xl text-gray-700 text-center" 
          :class="{ 'mt-300': repositories.length }"
        >
          Search a Github Repository
        </h1>
        <div class="repository-search-block flex justify-center mt-5">
          <div 
            class="flex flex-col sm:w-full w-full p-2 lg:w-1/2"
            v-click-outside="toggleRepositoryResultsBlock"
          >
            <input
              class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
              type="text"
              placeholder="Search a repository..."
              @input="searchRepository"
              v-model="repositoryInput"
            />
            <ul 
              class="repository-options bb-light-grayish-blue"
              v-if="isActive"
            >
              <li class="bb-light-grayish-blue" v-for="repository in repositories" :key="repository.id">
                <div class="flex flex-col bg-white p-6">
                  <span class="capitalize text-gray-900">{{ repository.name }}</span>
                  <span class="mt-2 text-gray-700">{{ repository.description }}</span>
                  <div class="flex justify-between">
                    <div class="flex no-wrap items-center mt-1">
                      <github-icon class="mt-1"></github-icon>

                      <a :href="repository.html_url" class="mt-2 ml-1 text-gray-700">
                        Github Page
                      </a>
                    </div>
                    <div class="flex no-wrap items-center mt-1">
                      <github-star class="github-star"></github-star>
                      <span class="stargazers-count ml-1">{{ repository.stargazers_count }}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GithubIcon from './components/icons/GithubIcon';
import GithubStar from './components/icons/GithubStar';

export default {
  name: "App",

  components: {
    'github-icon': GithubIcon,
    'github-star': GithubStar,
  },

  data() {
    return {
      repositoryInput: '',
      isActive: false,
    }
  },

  watch: {
    repositoryInput(value) {
      if (value.length == '') {
        this.$store.commit('setRepositories', []);
      }
    }
  },

  computed: {
    repositories() {
      return this.$store.getters.repositories;
    }
  },

  methods: {
    searchRepository() {
      this.$store.dispatch('searchRepository', this.repositoryInput)
      .then(() => {
        this.isActive = true;
      })
      .catch(error => {
        this.isActive = false;
        console.log(error)
      });
    },

    toggleRepositoryResultsBlock() {
      if (! this.repositories.length) return;

      if (this.isActive) {
        this.repositoryInput = '';
        this.isActive = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  #main {
    background-color: #f7fafc;
  }

  ul.repository-options {
    max-height: 300px;
    overflow: auto;
    scrollbar-color: #4a5568 transparent;
    scrollbar-width: thin;
  }

  .bb-light-grayish-blue {
    border-bottom: 1px solid #e2e8f0;
  }

  .stargazers-count {
    margin-top: 3px;
  }

  .github-star {
    fill: #f6e05e;
  }

  .mt-300 {
    margin-top: 300px;
  }
</style>
