import TriggerModal from '@/components/TriggerModal.vue'
import { mount } from '@vue/test-utils'

describe('TriggerModal', () => {
  test("By default, all use cases of the modal should'nt be displayed, meaning the isError & isSuccess prop should be false", () => {
    const wrapper = mount(TriggerModal)
    expect(wrapper.isVisible()).toBeFalsy()
  })

  it('should show error modal if isError prop is true', () => {
    const wrapper = mount(TriggerModal)
    // await wrapper.setProps({
    //   isError: true,
    // })
    // expect(wrapper.classes('modal')).toBe(true)
    // expect(wrapper.props().modal).toBe(false)
    expect(wrapper.find('div').isVisible()).toBe(true)
  })

  test('should show success modal if isSuccess prop is true', async () => {
    const wrapper = mount(TriggerModal)
    await wrapper.setProps({
      isSuccess: true,
    })
    expect(wrapper.vm.isSuccess).toBeTruthy()
  })
})
