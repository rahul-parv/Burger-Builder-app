import React from 'react';
import { shallow } from 'enzyme';

import NavigationItem from './NavigationItem/NavigationItem'
import NavigationItems from './NavigationItems'
const props = {
    isAuthenticated: true
}

describe('<NavigationItems />', () => {
    afterAll(() => {
        props=null;
        wrapper=null;
        NavigationItem=null;
        NavigationItems=null;
    });

    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render 2 routes Elem if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 routes if authenticated', () => {
        wrapper.setProps(props);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should an exact logout button', () => {
        wrapper.setProps(props);
        expect(wrapper.contains(<NavigationItem link="/logout" > Logout </NavigationItem>)).toEqual(true);
    });

    // it('should match snapshot', () => {
    //     expect(wrapper).toMatchSnapshot();
    // });
});