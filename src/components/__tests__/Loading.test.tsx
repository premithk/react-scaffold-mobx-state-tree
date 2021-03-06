import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Loading from '../Loading';

Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides)
  const wrapper = Enzyme.shallow(<Loading {...props} />)
  return {
    props,
    wrapper
  }
}

describe('Loading Component', () => {
  // Minimal component test confirms component rendered
  it("can render", () => {
    const { wrapper } = setup({});
    expect(wrapper.exists()).toBe(true);
  })

  it("matches the snapshot", () => {
    const { wrapper } = setup({});
    expect(wrapper).toMatchSnapshot();
  })

  it("will display error message", () => {
    const { wrapper } = setup({error:true});
    expect(wrapper.find('.error').length).toBe(1);
    expect(wrapper.find('.loading').length).toBe(0);
    expect(wrapper.find('.timeout').length).toBe(0);
  })

  it("will display loading message", () => {
    const { wrapper } = setup({pastDelay:true});
    expect(wrapper.find('.loading').length).toBe(1);
    expect(wrapper.find('.error').length).toBe(0);
    expect(wrapper.find('.timeout').length).toBe(0);
  })

  it("will display timeout message", () => {
    const { wrapper } = setup({timedOut:true});
    expect(wrapper.find('.timeout').length).toBe(1);
    expect(wrapper.find('.loading').length).toBe(0);
    expect(wrapper.find('.error').length).toBe(0);
  })
})