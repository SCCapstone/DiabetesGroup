import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

class SeafoamButton extends Component {
    render() {
        return (
            <View style={styles.press}>
                <TouchableHighlight
                    underlayColor="#008D4D"
                    onPress={this.props.onPress}>
                    <Text style={styles.pressText}>{this.props.title}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    press: {
        backgroundColor: '#1FC97C',
        borderRadius: 12,
        borderColor: '#000000',
        overflow: 'hidden',
        borderWidth: 3,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,

    },
    pressText: {
        color: '#000000',
        fontSize: 16,
        textAlign: 'center',
    },
});

module.exports = SeafoamButton;
