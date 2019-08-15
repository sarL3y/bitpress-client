import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import App from './App';
import Profile from './components/Profile';
import Register from './components/Register';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

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

describe("<Register /> tests", () => {
	const container = shallow(<Register history="/login" />);

	it("should render Register", () => {
		
		expect(container.exists()).toBe(true);
	})
});

describe("<Login /> tests", () => {
	const container = shallow(<Login history="/login" />);

	it("should render Login", () => {
		
		expect(container.exists()).toBe(true);
	})
});

describe("<HomePage /> tests", () => {
	const container = shallow(<HomePage history="/login" />);

	it("should render HomePage", () => {
		
		expect(container.exists()).toBe(true);
	})
});

describe("<Dashboard /> tests", () => {
	const container = shallow(<Dashboard history="/login" />);

	it("should render Dashboard", () => {
		
		expect(container.exists()).toBe(true);
	})
});

describe("<Navbar /> tests", () => {
	const container = shallow(<Navbar />);

	it("should render Navbar", () => {

		expect(container.exists()).toBe(true);
	})
})