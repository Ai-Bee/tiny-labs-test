// import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import welcomeForm from '@/components/welcomeForm'

let wrapper = null

beforeEach(() => {
  
})
afterEach(() => {
  wrapper.destroy()
})

describe('welcomeForm.vue', () => {
  it('should render correct contents', () => {
    wrapper = shallowMount(welcomeForm)
    expect(wrapper.find('button').text())
      .toEqual('Continue')
  })
})
