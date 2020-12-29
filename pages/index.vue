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

  <main v-else class="photo-crib-container">
    <transition-group name="slide-fade" mode="out-in">
      <LoadingShimmer v-for="n in 9" :key="n" :class="['grid-item']" />
    </transition-group>
  </main>
</template>

<script>
import PhotoCard from '@/components/PhotoCard.vue'
import LoadingShimmer from '@/components/LoadingShimmer.vue'
export default {
  components: {
    PhotoCard,
    LoadingShimmer,
  },
  data() {
    return {
      networkStatus: false,
      isLoading: true,
    }
  },
  computed: {
    photos() {
      return this.$store.getters.getRandomPhotos
    },
  },
  watch: {
    networkStatus(newValue) {
      if (newValue) {
        this.$router.push({
          name: 'NetworkError',
        })
      }
    },
  },
  mounted() {
    let imageLoaded = 0
    for (const imageSrc of this.photos) {
      const img = new Image()
      img.src = imageSrc

      img.onload = () => {
        imageLoaded++

        if (imageLoaded === this.photos.length) {
          this.isLoading = false
        }
      }
    }
  },
  created() {
    this.$store
      .dispatch('getRandomPhotos')
      .then(() => {
        this.networkStatus = this.$store.state.networkError
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>

<style lang="scss" scoped>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 768px) {
  .photo-crib-container {
    display: grid;
    // grid-row-gap: 3.5714em;
    // margin-bottom: 2em;

    .grid-item {
      padding-bottom: 3.5714em;
    }
  }
}

/* Medium devices and desktops (landscape tablets, 769px and up) */
@media only screen and (min-width: 769px) {
  .photo-crib-container {
    column-gap: 3.5714em;
    column-fill: initial;
    column-count: 3;

    .grid-item {
      margin-bottom: 2.1429em;
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
