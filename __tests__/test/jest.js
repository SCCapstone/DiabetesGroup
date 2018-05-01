jest.unmock('../../screens/glucoseInput');

import React from 'react';
import 'react-native';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

//global.React = React;
//global.renderer = renderer;
//global.shallow = shallow;
import glucoseInput from '../../screens/glucoseInput';
import MedicationInput from '../../screens/NmedicationInput';
import SeafoamButton from '../../components/SeafoamButton';
import MessengerButton from '../../components/MessengerButton';
import HelpButton from '../../components/HelpButton';
//import GlucoseLogTable from '../../components/GlucoseLogTable';

describe('glucoseInput', () => {
    let component;
    let textInput;
    const defaultState = {text: ''};

    /*test('Medication Input Screen renders correctly', () => {
        const snapshot = renderer.create(<MedicationInput />).toJSON();
        expect(snapshot).toMatchSnapshot();
    });*/

    test('Glucose Input Screen renders correctly', () => {
        const snapshot = renderer.create(<glucoseInput />).toJSON();
        expect(snapshot).toMatchSnapshot();
    });
    test('HelpButton component works', () => {
        expect(typeof HelpButton).toEqual('function');
    });
    test('SeafoamButton component works', () => {
        expect(typeof SeafoamButton).toEqual('function');
    });
    test('MessengerButton component works', () => {
        expect(typeof MessengerButton).toEqual('function');
    });
    test('GlucoseInput component works', () => {
        expect(typeof glucoseInput).toEqual('function');
    });
    /*test('renders the TextInput component', () => {
        const tree = renderer
            .create(<TextInput/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });*/

    /*beforeEach(() => {
        component = shallow(<glucoseInput />);
        textInput = component.find('TextInput');
    });*/

    //placeholder test not working yet

    /*test('has correct placeholder',() => {
        component = shallow(<glucoseInput />);
        textInput = component.find('TextInput');
        const expectedPH = 'Glucose Level';
        /!*const wrapper = mount(<glucoseInput/>);
        expect(wrapper.find)*!/
        expect(textInput.props().placeholder).to.eql(expectedPH);
    })*/


});
