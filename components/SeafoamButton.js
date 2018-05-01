import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

class SeafoamButton extends Component {
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
        backgroundColor: '#112471',
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

module.exports = SeafoamButton;
