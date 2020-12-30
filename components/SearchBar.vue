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
      <div v-show="errorModal" class="modal" :style="mainModalStyle">
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
          <div class="error-title" :style="errorTitleStyle">
            <h2>{{ errorTitle }}</h2>
          </div>
          <p class="error-message" :style="errorMessageStyle">
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
    errorTimeout: {
      type: Number,
      default: 3000,
    },
    generalUnit: {
      type: String,
      default: 'em',
    },
    floatModalRight: {
      type: Boolean,
      default: true,
    },
    paddingTop: {
      type: Number,
      default: 1,
    },
    paddingRight: {
      type: Number,
      default: 1.2,
    },
    paddingBottom: {
      type: Number,
      default: 1,
    },
    paddingLeft: {
      type: Number,
      default: 1.2,
    },
    borderRadius: {
      type: Number,
      default: 0.5,
    },
    modalBackground: {
      type: String,
      default: 'fff',
    },
    rightOrLeftSpacing: {
      type: Number,
      default: 2,
    },
    boxShadow: {
      type: String,
      default: '1px 1px 2px rgba(0, 0, 0, 0.3)',
    },
    zIndex: {
      type: Number,
      default: 10,
    },
    errorTitleMarginTop: {
      type: Number,
      default: 0,
    },
    errorTitleMarginRight: {
      type: Number,
      default: 0,
    },
    errorTitleMarginBottom: {
      type: Number,
      default: 0.5,
    },
    errorTitleMarginLeft: {
      type: Number,
      default: 0,
    },
    errorTitleColor: {
      type: String,
      default: '000',
    },
    errorTitleFontSize: {
      type: Number,
      default: 1.3,
    },
    errorMessageFontColor: {
      type: String,
      default: '6d7b91',
    },
    errorMessageFontSize: {
      type: Number,
      default: 1.2,
    },
  },
  data() {
    const position = this.floatModalRight ? 'right' : 'left'
    return {
      searchStatus: 'empty',
      searchInput: this.inputValue,
      error: false,
      errorModal: false,
      mainModalStyle: {
        [position]: this.rightOrLeftSpacing + this.generalUnit,
        background: `#${this.modalBackground}`,
        'border-radius': this.borderRadius + this.generalUnit,
        'padding-top': this.paddingTop + this.generalUnit,
        'padding-right': this.paddingRight + this.generalUnit,
        'padding-bottom': this.paddingBottom + this.generalUnit,
        'padding-left': this.paddingLeft + this.generalUnit,
        'box-shadow': this.boxShadow,
        'z-index': this.zIndex,
      },
      errorTitleStyle: {
        'margin-top': this.errorTitleMarginTop + this.generalUnit,
        'margin-right': this.errorTitleMarginRight + this.generalUnit,
        'margin-bottom': this.errorTitleMarginBottom + this.generalUnit,
        'margin-left': this.errorTitleMarginLeft + this.generalUnit,
        color: `#${this.errorTitleColor}`,
        'font-size': this.errorTitleFontSize + this.generalUnit,
      },
      errorMessageStyle: {
        color: `#${this.errorMessageFontColor}`,
        'font-size': this.errorMessageFontSize + this.generalUnit,
      },
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
        }, this.errorTimeout)
      } else {
        this.searchStatus = 'fetching'
        this.$store
          .dispatch('searchPhoto', this.searchInput)
          .then((response) => {
            const listen = response
            if (listen) {
              this.$router.push({
                name: '404',
                params: {
                  searchTerm: listen.search,
                },
              })
            } else {
              this.$router.push({
                name: 'Search',
                params: {
                  Search: this.searchInput,
                },
              })
            }
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

  //Error & Modal styles
  .modal {
    bottom: 5em;
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
  display: flex;
  position: absolute;

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
        color: inherit;
        font-size: inherit;
      }
    }
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
