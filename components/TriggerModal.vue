<template>
  <transition name="fade" mode="out-in">
    <div v-if="isError" class="modal" :style="mainModalStyle">
      <div class="-icon">
        <svg
          style="fill: red"
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
      <div class="-info">
        <div class="-title" :style="titleStyle">
          <h2>{{ errorTitle }}</h2>
        </div>
        <p class="-message" :style="messageStyle">
          {{ errorMessage }}
        </p>
      </div>
    </div>

    <div v-if="isSuccess" class="modal" :style="mainModalStyle">
      <div class="-icon">
        <svg
          style="fill: #4bca81"
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
        >
          <title>Checkmark Circle</title>
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
            d="M352 176L217.6 336 160 272"
          />
        </svg>
      </div>
      <div class="-info">
        <div class="-title" :style="titleStyle">
          <h2>{{ successTitle }}</h2>
        </div>
        <p class="-message" :style="messageStyle">
          {{ successMessage }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalComponent',
  props: {
    isSuccess: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    // modal: {
    //   type: Boolean,
    //   default: false,
    // },
    errorMessage: {
      type: String,
      default: 'Please provide an input',
    },
    errorTitle: {
      type: String,
      default: 'Error',
    },
    successMessage: {
      type: String,
      default: 'Your download has started.',
    },
    successTitle: {
      type: String,
      default: 'Success',
    },
    timeout: {
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
      default: 99,
    },
    titleMarginTop: {
      type: Number,
      default: 0,
    },
    titleMarginRight: {
      type: Number,
      default: 0,
    },
    titleMarginBottom: {
      type: Number,
      default: 0.5,
    },
    titleMarginLeft: {
      type: Number,
      default: 0,
    },
    titleColor: {
      type: String,
      default: '000',
    },
    titleFontSize: {
      type: Number,
      default: 1.3,
    },
    messageFontColor: {
      type: String,
      default: '6d7b91',
    },
    messageFontSize: {
      type: Number,
      default: 1.2,
    },
  },
  data() {
    const position = this.floatModalRight ? 'right' : 'left'
    return {
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
      titleStyle: {
        'margin-top': this.titleMarginTop + this.generalUnit,
        'margin-right': this.titleMarginRight + this.generalUnit,
        'margin-bottom': this.titleMarginBottom + this.generalUnit,
        'margin-left': this.titleMarginLeft + this.generalUnit,
        color: `#${this.titleColor}`,
        'font-size': this.titleFontSize + this.generalUnit,
      },
      messageStyle: {
        color: `#${this.messageFontColor}`,
        'font-size': this.messageFontSize + this.generalUnit,
      },
    }
  },
  mounted() {
    setTimeout(() => {
      this.$emit('changeStat')
    }, this.timeout)
  },
  method: {},
}
</script>

<style lang="scss" scoped>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 768px) {
  .modal {
    bottom: 5em;
  }
}

/* Medium devices and desktops (landscape tablets, 768px and up) */
@media only screen and (min-width: 769px) {
  .modal {
    top: 2em;
  }
}

//Error & Modal styles
.modal {
  display: flex;
  position: absolute;

  .-icon {
    margin-right: 1em;
    svg {
      height: 2.5em;
      color: #fff;
    }
  }

  .-info {
    .-title {
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
