import Header from '@/components/Header.vue'

export default {
  title: 'Layouts/Header',
}

export const header = () => ({
  components: { Header },
  template: '<Header />',
})

header.story = {
  name: 'Header Layout',
}
