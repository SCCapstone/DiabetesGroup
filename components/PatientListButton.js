import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

class PatientListButton extends Component {
    render() {
        return (
            <View style={styles.press}>
                <TouchableHighlight
                    underlayColor="#CD7800"
                    onPress={this.props.onPress}>
                    <Text style={styles.pressText}>{this.props.title}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    press: {
        backgroundColor: '#FFA627',
        borderColor: '#000000',
        overflow: 'hidden',
        borderRadius: 12,
        borderWidth: 3,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 20,

    },
    pressText: {
        color: '#000000',
        fontSize: 16,
        textAlign: 'center',
    },
});

module.exports = PatientListButton;