import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Picker,
} from 'react-native';

class DietPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }
    render(){
        return (
            <Picker
                selectedValue={this.props.value}
                onValueChange={this.props.onValueChange}
            >
                {this.props.items.map((i, index) => (
                    <Picker.Item key={index} label={i.label} value={i.value} />
                ))}
            </Picker>
        );
    }
}


module.exports = DietPicker;