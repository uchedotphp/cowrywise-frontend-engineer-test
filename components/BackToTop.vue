<template>
  <transition name="slide-back-up">
    <button
      v-if="isVisible"
      type="button"
      :style="mainStyle"
      class="back-to-top"
      @click="handleClick"
    >
      <img
        src="./../assets/img/caret-up-outline.svg"
        :height="imgHeight"
        :alt="imgAlt"
      />
    </button>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  props: {
    imgAlt: {
      type: String,
      default: 'scroll back to top',
    },
    // icon: {
    //   type: Object,
    //   default: () => {
    //     return `./../assets/img/caret-up-outline.svg`
    //   },
    // },
    imgHeight: {
      type: [String, Number],
      default: 28,
    },
    zIndex: {
      type: Number,
      default: 99,
    },
    unit: {
      type: String,
      default: 'em',
    },
    width: {
      type: Number,
      default: 3,
    },
    height: {
      type: Number,
      default: 3,
    },
    backgroundColor: {
      type: String,
      default: 'd6e3f0',
    },
    paddingTop: {
      type: Number,
      default: 0.4,
    },
    paddingRight: {
      type: Number,
      default: 0.4,
    },
    paddingBottom: {
      type: Number,
      default: 0.4,
    },
    paddingLeft: {
      type: Number,
      default: 0.4,
    },
    borderRadius: {
      type: Number,
      default: 50,
    },
    borderRadiusPercentageUnit: {
      type: Boolean,
      default: true,
    },
    rightPosition: {
      type: Boolean,
      default: true,
    },
    rightOrLeftSpacing: {
      type: Number,
      default: 2,
    },
    boxShadow: {
      type: String,
      default: '1px 1px 2px rgba(0, 0, 0, .3)',
    },
    flowPositionFixed: {
      type: Boolean,
      default: true,
    },
    boundary: {
      type: Number,
      default: 900,
    },
  },
  data() {
    const position = this.rightPosition ? 'right' : 'left'
    return {
      isVisible: false,
      isActive: false,
      mainStyle: {
        'z-Index': this.zIndex,
        width: this.width + this.unit,
        height: this.height + this.unit,
        'box-shadow': this.boxShadow,
        'background-color': `#${this.backgroundColor}`,
        'padding-top': this.paddingTop,
        'padding-right': this.paddingRight,
        'padding-bottom': this.paddingBottom,
        'padding-left': this.paddingLeft,
        'border-radius': this.borderRadiusPercentageUnit
          ? `${this.borderRadius}%`
          : `${this.borderRadius}px`,
        position: this.flowPositionFixed ? 'fixed' : 'absolute',
        top: `calc(100vh - 5em)`,
        [position]: this.rightOrLeftSpacing + this.unit,
      },
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (window.pageYOffset > this.boundary) {
        // this.isActive = true
        this.isVisible = true
      } else {
        // this.isActive = false
        this.isVisible = false
      }
    },
    handleClick() {
      document.documentElement.scrollTop = 0
    },
  },
}
</script>

<style lang="scss" scoped>
.back-to-top {
  display: inline-block;
  border: none;
  outline: none;
  cursor: pointer;
  pointer-events: all;
  &:hover {
    background-color: #555;
  }
}

.slide-back-up-enter-active,
.slide-back-up-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-back-up-enter,
.slide-back-up-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>
