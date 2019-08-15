import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import Profile from './components/Profile';
import App from './App';

window.alert = jest.fn();

configure({ adapter: new Adapter() });

beforeAll(() => {

});

afterAll(() => {
	window.alert.mockClear();
});

describe("<App /> tests", () => {
	const container = shallow(<App />);

	it("should contain header", () => {

		expect(container.find("header > h1").exists()).toBe(true);
	});
});

describe("<Profile /> tests", () => {
	const container = shallow(<Profile history="/login" />);

	it("should render Profile", () => {
		
		expect(container.exists()).toBe(true);
	})
});