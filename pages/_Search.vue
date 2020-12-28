<template>
  <main v-if="photos" class="photo-crib-container">
    <transition-group name="slide-fade" mode="out-in">
      <PhotoCard
        v-for="photo in photos"
        :key="photo.id"
        :photo-details="photo"
        :class="['grid-item']"
      />
    </transition-group>
  </main>
</template>

<script>
import PhotoCard from '@/components/PhotoCard.vue'

export default {
  name: 'SearchPage',
  components: {
    PhotoCard,
  },
  props: {
    Search: String,
  },
  data() {
    return {
      //   networkStatus: false,
    }
  },
  computed: {
    photos() {
      return this.$store.getters.searchedPhotos
    },
  },
}
</script>

<style lang="scss" scoped>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 768px) {
  .photo-crib-container {
    display: grid;

    .grid-item {
      padding-bottom: 3.5714em;
    }
  }
}

/* Medium devices and desktops (landscape tablets, 769px and up) */
@media only screen and (min-width: 769px) {
  .photo-crib-container {
    column-gap: 30px;
    column-fill: initial;
    column-count: 3;

    .grid-item {
      margin-bottom: 30px;
      display: inline-block;
      vertical-align: top;
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
</style>
