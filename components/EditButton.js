import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

class EditButton extends Component {
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
        borderRadius: 4,
        borderColor: '#000000',
        overflow: 'hidden',
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 2,
        paddingBottom: 2,

    },
    pressText: {
        color: '#000000',
        fontSize: 14,
        textAlign: 'center',
    },
});

module.exports = EditButton;