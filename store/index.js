export const state = () => ({
  photos: [],
  search: [],
  recentSearchTerm: [],
})

export const mutations = {
  SET_RANDOM_PHOTOS(state, payload) {
    state.photos = payload
  },
  SET_PHOTO_SEARCH(state, payload) {
    // state.search = payload.results
    state.photos = payload.results

    if (localStorage.getItem('recentSearchTerm') === null) {
      const recentSearchTerm = []
      recentSearchTerm.push(payload.searchTerm)
      localStorage.setItem('recentSearchTerm', JSON.stringify(recentSearchTerm))
    } else {
      const recentSearchTerm = JSON.parse(
        localStorage.getItem('recentSearchTerm')
      )
      recentSearchTerm.push(payload.searchTerm)
      const cleanDuplicates = [...new Set(recentSearchTerm)]
      localStorage.setItem('recentSearchTerm', JSON.stringify(cleanDuplicates))
      this.recentSearchTerm = cleanDuplicates
    }
  },
}

export const actions = {
  async getRandomPhotos({ commit }) {
    await this.$axios
      .$get(`/photos/?client_id=${process.env.NUXT_ENV_ACCESS_KEY}`)
      .then((response) => {
        commit('SET_RANDOM_PHOTOS', response)
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('one', error.response.data)
          console.log('two', error.response.status)
          console.log('three', error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('four', error.request)
          //   commit('SET_NETWORK_ERROR', true)
        } else {
          // Something happened in setting up the request that triggered an Error
          //   commit('SET_NETWORK_ERROR', true)
        }
        console.log('six', error.config)
      })
  },

  async searchPhoto({ commit }, payload) {
    return await this.$axios
      .$get(
        `/search/photos?client_id=${process.env.NUXT_ENV_ACCESS_KEY}&query=${payload}`
      )
      .then((response) => {
        // console.log('the search:', response, 'and the payload:', payload)
        if (response.total) {
          commit('SET_PHOTO_SEARCH', {
            results: response.results,
            searchTerm: payload,
          })
        } else {
          return {
            message: 'Not Found',
            search: payload,
          }
        }
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
          //   commit('SET_NETWORK_ERROR', true)
        }
        console.log(error.config)
      })
  },
}

export const getters = {
  getRandomPhotos: (state) => state.photos,
  searchedPhotos: (state) => state.search,
  recentSearchTerm: (state) => state.recentSearchTerm,
  networkStatus: (state) => state.networkError,
}
