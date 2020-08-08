// import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld'

let wrapper = null

beforeEach(() => {
  wrapper = shallowMount(HelloWorld)
})
afterEach(() => {
  wrapper.destroy()
})

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    expect(wrapper.find('.hello h1').text())
      .toEqual('Welcome to Your Vue.js App')
  })
})
