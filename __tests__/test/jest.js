jest.unmock('../../screens/glucoseInput');

import React from 'react';
import 'react-native';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

global.React = React;
global.renderer = renderer;
global.shallow = shallow;
import glucoseInput from '../../screens/glucoseInput';

describe('glucoseInput', () => {
    let component;
    let textInput;
    const defaultState = {text: ''};

    test('renders correctly', () => {
        const snapshot = renderer.create(<glucoseInput />).toJSON();
        expect(snapshot).toMatchSnapshot();
    });

    beforeEach(() => {
        component = shallow(<glucoseInput />);
        textInput = component.find('TextInput');
    })

    //placeholder test not working yet
    /**
    it('has correct placeholder',() => {
        const expectedPH = 'Glucose Level';
        expect(textInput.props().placeholder).toEqual(expectedPH);
    })
     */

});
