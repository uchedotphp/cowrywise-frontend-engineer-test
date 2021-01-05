<template>
  <div>
    <transition name="fade" mode="out-in">
      <div
        v-show="searchStatus == 'empty'"
        :class="['box-input', error ? 'error-border' : '']"
      >
        <input
          v-model="searchInput"
          autofocus
          :placeholder="placeHolder"
          @keyup.enter="startSearch"
          @blur="error = false"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
        >
          <title>Search</title>
          <path
            d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
            fill="none"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="32"
            d="M338.29 338.29L448 448"
          />
        </svg>
        <div class="suggestion-container">
          <div
            v-for="pastSearch in searchQueries"
            :key="pastSearch"
            class="suggestion-bubbles"
          >
            {{ pastSearch }}
          </div>
        </div>
      </div>
    </transition>

    <!-- Searching Results -->
    <transition name="fade" mode="out-in">
      <div v-show="searchStatus == 'fetching'" class="searching">
        <p>
          Searching for <span>"{{ searchInput }}"</span>
        </p>
      </div>
    </transition>
    <!-- end of Searchin Result -->

    <!-- Searched Result -->
    <transition name="fade" mode="out-in">
      <div v-show="searchStatus == 'completed'" class="searched-result">
        <p>
          Search Results for
          <span>"{{ searchInput }}"</span>
        </p>
        <button @click="resetSearch">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon"
            viewBox="0 0 512 512"
          >
            <title>Clear search</title>
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              fill="none"
              stroke="currentColor"
              stroke-miterlimit="10"
              stroke-width="32"
            />
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M320 320L192 192M192 320l128-128"
            />
          </svg>
        </button>
      </div>
    </transition>
    <!-- end of Searched Result -->
    <Modals
      v-if="errorModal"
      :is-error="true"
      @changeStat="errorModal = false"
    />
  </div>
</template>

<script>
import Modals from '@/components/TriggerModal.vue'
export default {
  name: 'SearchBarComponent',
  components: {
    Modals,
  },
  props: {
    placeHolder: {
      type: String,
      default: 'Search for photo',
    },
    inputValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchStatus: 'empty',
      searchInput: this.inputValue,
      error: false,
      errorModal: false,
      searchQueries: [],
    }
  },
  watch: {
    searchInput(newValue) {
      if (newValue.length) {
        this.error = false
        if (localStorage.getItem('recentSearchTerm') !== null) {
          const array = JSON.parse(localStorage.getItem('recentSearchTerm'))
          console.log('the array', array)
          this.searchQueries = array.filter((el) => el === this.searchInput)
          console.log('input', this.searchQueries)
        }
      }
    },
  },
  methods: {
    startSearch() {
      if (this.searchInput.length < 1) {
        this.error = true
        this.errorModal = true
      } else {
        this.searchStatus = 'fetching'
        // this.searchQueries.push(this.searchInput)
        this.$store
          .dispatch('searchPhoto', this.searchInput)
          .then((response) => {
            this.searchQueries = []
            const listen = response
            if (listen) {
              this.$router.push({
                name: '404',
                params: {
                  searchTerm: listen.search,
                },
              })
              console.log('hi search error')
            }
            // else {
            //   this.$router.push({
            //     name: 'Search',
            //     params: {
            //       Search: this.searchInput,
            //     },
            //   })
            // }
          })
          .finally(() => (this.searchStatus = 'completed'))
      }
    },
    resetSearch() {
      this.searchStatus = 'empty'
      this.searchInput = ''
    },
  },
}
</script>

<style lang="scss" scoped>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 768px) {
  .box-input {
    margin: auto;
    position: relative;
    max-width: 1536px;
    input {
      width: 100%;
      padding: 1em 3em;
      font-size: 1.5em;
      border-radius: 0.5em;
      border: none;
      box-shadow: 0 0 5px #bbb8b8;
    }
    input:focus {
      outline: none;
    }
    ::placeholder {
      color: var(--svg-and-others);
    }
    svg {
      position: absolute;
      color: var(--svg-and-others);
      top: 1.7em;
      left: 2em;
      height: 1.5em;
    }
  }

  // searching
  .searching {
    margin: auto;
    max-width: 1536px;
    font-size: 2em;
    p {
      color: #293b5b;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        color: #6d7b91;
      }
    }
  }

  // searched-result
  .searched-result {
    margin: auto;
    max-width: 1536px;
    // background: red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2em;
    p {
      color: #293b5b;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        color: #6d7b91;
      }
    }
    button {
      border: none;
      background: transparent;
      &:focus {
        outline: none;
      }
      svg {
        height: 2em;
      }
    }
  }
}

/* Medium devices and desktops (landscape tablets, 768px and up) */
@media only screen and (min-width: 769px) {
  .box-input {
    margin: auto;
    position: relative;
    max-width: 1536px;
    input {
      width: 100%;
      padding: 1.2em 4.5em;
      font-size: 1.5em;
      border-radius: 0.5em;
      border: none;
      box-shadow: 0 0 5px #bbb8b8;
    }
    input:focus {
      outline: none;
    }
    ::placeholder {
      color: var(--svg-and-others);
    }
    svg {
      color: var(--svg-and-others);
      position: absolute;
      top: 1.9em;
      left: 2em;
      height: 1.5em;
    }

    .suggestion-container {
      margin-top: 1em;

      .suggestion-bubbles {
        background: #f5f5f5;
        padding: 0.5em 1em;
        margin-right: 0.5em;
        display: inline-block;
        border-radius: 15px;
        cursor: pointer;
        &:hover {
          background: #fff;
        }
      }
    }
  }

  // searching
  .searching {
    margin: auto;
    max-width: 1536px;
    font-size: 2em;
    p {
      color: #293b5b;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        color: #6d7b91;
      }
    }
  }

  // searched-result
  .searched-result {
    margin: auto;
    max-width: 1536px;
    // background: red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2em;
    p {
      color: #293b5b;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        color: #6d7b91;
      }
    }
    button {
      border: none;
      background: transparent;
      &:focus {
        outline: none;
      }
      svg {
        height: 2em;
      }
    }
  }
}

.error-border {
  border: 2px solid red;
  border-radius: 0.8em;
  svg,
  ::placeholder {
    color: red;
  }
}

/* Transition styles */
.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-leave-to {
  opacity: 0;
}
</style>
