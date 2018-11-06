import React from "react";
import expect from "expect";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Counter from "./components/counter";

configure({ adapter: new Adapter() });

describe("<Counter />", () => {
  it("renders three <Foo /> components", () => {
    const wrapper = shallow(<Counter />);
    // expect(wrapper.find(Foo)).to.have.lengthOf(3);
  });
});
