<template>
  <div>
    <transition name="fade" mode="out-in">
      <div
        v-show="searchStatus == 'empty'"
        :class="['box-input', error ? 'error-border' : '']"
      >
        <input
          v-model="searchInput"
          :placeholder="placeHolder"
          @keyup.enter="startSearch"
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

    <!-- modal alert -->
    <transition name="fade" mode="out-in">
      <div v-show="errorModal" class="modal">
        <div class="error-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon"
            viewBox="0 0 512 512"
          >
            <title>Close Circle</title>
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
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
        </div>
        <div class="error-info">
          <div class="error-title">
            <h2>{{ errorTitle }}</h2>
          </div>
          <p class="error-message">
            {{ errorMessage }}
          </p>
        </div>
      </div>
    </transition>
    <!-- end of modal alert -->
  </div>
</template>

<script>
export default {
  name: 'SearchBarComponent',
  props: {
    placeHolder: {
      type: String,
      default: 'Search for photo',
    },
    inputValue: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: 'Please provide an input',
    },
    errorTitle: {
      type: String,
      default: 'Error',
    },
  },
  data() {
    return {
      searchStatus: 'empty',
      searchInput: this.inputValue,
      error: false,
      errorModal: false,
    }
  },
  watch: {
    searchInput(newValue) {
      if (newValue.length) {
        this.error = false
      }
    },
  },
  methods: {
    startSearch() {
      if (this.searchInput.length < 1) {
        this.error = true
        this.errorModal = true
        setTimeout(() => {
          this.errorModal = false
        }, 3000)
      } else {
        this.searchStatus = 'fetching'
        this.$store
          .dispatch('searchPhoto', this.searchInput)
          .then((response) => {
            this.searchStatus = 'completed'
            if (response === 'Not Found') {
              // this.$router.push({
              //   name: '404',
              //   params: {
              //     resource: 'photo',
              //   },
              // })
              console.log('hi')
            } else {
              // this.$router.push({
              //   name: 'Search',
              //   params: {
              //     collection: this.searchInput,
              //   },
              // })
            }
          })
      }
    },
    resetSearch() {
      this.searchStatus = 'empty'
      this.searchInput = ''
      // this.$router.push({
      //   name: 'Home',
      // })
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

  //Error & Modal styles
  .modal {
    bottom: 2em;
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

  //Error & Modal styles
  .modal {
    top: 2em;
  }
}

// All device size styles for this component
//Error & Modal styles
.error-border {
  border: 2px solid red;
  border-radius: 0.8em;
  svg,
  ::placeholder {
    color: red;
  }
}

.modal {
  margin-right: 1em;
  display: flex;
  background: #fff;
  position: absolute;
  right: 0;
  border-radius: 0.5em;
  padding: 1em 1.2em;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .error-icon {
    margin-right: 1em;
    svg {
      height: 2.5em;
      fill: red;
      color: #fff;
    }
  }

  .error-info {
    .error-title {
      margin-bottom: 0.5em;

      h2 {
        color: #000;
        font-size: 1.3em;
      }
    }

    .error-message {
      color: #6d7b91;
    }
  }
}

/* Transition styles */
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

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
