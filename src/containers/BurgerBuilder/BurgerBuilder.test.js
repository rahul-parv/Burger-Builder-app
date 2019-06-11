import React from 'react';
import { shallow } from 'enzyme';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

describe('<BurgerBuilder />', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}} />);
    });

    it('should render build controls when recieve ings', () => {
        wrapper.setProps({ings: { salad:0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});