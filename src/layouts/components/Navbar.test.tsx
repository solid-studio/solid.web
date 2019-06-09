import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Navbar } from "./Navbar";

Enzyme.configure({ adapter: new Adapter() })

const onNewConnectionClick = jest.fn()
const onNewContractInstanceClick = jest.fn()

const defaultProps = {
  onNewConnectionClick,
  onNewContractInstanceClick
}
describe("<Navbar /> component", () => {
  it("renders the navbar component", () => {
    const wrapperComponent = shallow(<Navbar {...defaultProps} />);

    expect(wrapperComponent).toBeDefined()
  })
})