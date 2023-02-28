import HelloWorldVue from '../components/HelloWorld.vue'
import { mount } from '@vue/test-utils'

describe('counter', () => {
  test('mount component', async () => {
    expect(HelloWorldVue).toBeTruthy()

    const wrapper = mount(HelloWorldVue, {
      props: {
        msg: 'LonesomeT0wn start',
      },
    })

    expect(wrapper.text()).toContain('0')
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.get('button').trigger('click')

    expect(wrapper.text()).toContain('1')

    await wrapper.get('button').trigger('click')

    expect(wrapper.text()).toContain('2')
  })
})
