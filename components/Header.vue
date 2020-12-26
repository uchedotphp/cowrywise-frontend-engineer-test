<template>
  <header class="container">
    <SearchBar />
  </header>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
export default {
  name: 'HeaderComponent',
  components: {
    SearchBar,
  },
}
</script>

<style lang="scss" scoped>
header {
  background: var(--gray);
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 768px) {
  .container {
    padding: 2em 2em;
  }
}
/* Medium devices and desktops (landscape tablets, 768px and up) */
@media only screen and (min-width: 769px) {
  .container {
    padding: 8.4em 0em;
  }
}
</style>
