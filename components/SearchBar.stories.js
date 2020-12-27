import SearchBar from '@/components/SearchBar.vue'
import { withKnobs, text } from '@storybook/addon-knobs'
// import { action } from '@storybook/addon-knobs'

export default {
  title: 'Components/Search bar',
  decorators: [withKnobs],
}

export const searchbar = () => ({
  components: { SearchBar },
  props: {
    errorTitle: {
      default: text('Error Title', 'Error'),
    },
    errorMessage: {
      default: text('Error Message', 'Please provide an input'),
    },
    placeHolder: {
      default: text('Place Holder', 'Search for photo'),
    },
  },
  // argTypes: { onClick: { action: 'clicked' } },
  template:
    // '<SearchBar placeHolder="oya search me" :errorMessage=errorMessage :errorTitle=errorTitle />',
    '<SearchBar :placeHolder="placeHolder" :errorMessage=errorMessage :errorTitle=errorTitle />',
})

searchbar.story = {
  name: 'Searchbox',
}
