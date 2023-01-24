import { mount } from '@vue/test-utils'
import PeoplePage from '@/views/PeoplePage.vue'

describe('PeoplePage.vue', () => {
  it('renders People PeoplePage', () => {
    const wrapper = mount(PeoplePage)
    expect(wrapper.text()).toMatch('People page')
  })
})
