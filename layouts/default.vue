<template>
  <div>
    <HeaderComponent />
    <Nuxt />
    <BackToTop />
  </div>
</template>

<script>
import HeaderComponent from '@/components/AppHeader.vue'
import BackToTop from '@/components/BackToTop.vue'
export default {
  components: {
    HeaderComponent,
    BackToTop,
  },
}
</script>

<style></style>
