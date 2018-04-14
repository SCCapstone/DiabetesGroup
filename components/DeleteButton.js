import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

class DeleteButton extends Component {
    render() {
        return (
            <View style={styles.press}>
                <TouchableOpacity
                    onPress={this.props.onPress}>
                    <Text style={styles.pressText}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    press: {
        backgroundColor: '#e60000',
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
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
});

module.exports = DeleteButton;
