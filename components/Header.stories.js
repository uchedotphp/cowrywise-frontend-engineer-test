import AppHeader from '@/components/AppHeader.vue'

export default {
  title: 'Layouts/AppHeader',
}

export const header = () => ({
  components: { AppHeader },
  template: '<AppHeader />',
})

header.story = {
  name: 'Header Layout',
}
