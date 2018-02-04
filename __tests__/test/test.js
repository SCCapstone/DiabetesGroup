import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { shallow } from 'enzyme';

global.React = React;
global.expect = chai.expect;
global.sinon = sinon;
global.shallow = shallow;
import glucoseInput from '../screens/glucoseInput';

describe('glucoseInput', function() {
    let component;
    let textInput;
    const defaultState= { text : ''};

    beforeEach(function(){
        component = shallow(<glucoseInput >/);
        textInput = component.find('TextInput');
    });

    it('renders placeholder correctly, function() {
                var expectedPlaceholder = 'Glucose Level';
                expect(textInput).to.have.length(1);
                expect(textInput.props().placeholder).to.eql(expectedPlaceholder);
            });
});