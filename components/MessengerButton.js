import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    TouchableHighlight,
    Image,
} from 'react-native';

class MessengerButton extends Component {
    render() {
        return (
            <View style={styles.press}>
                <TouchableHighlight
                    onPress={this.props.onPress}>
                    <Image
                        source = {require('./MessengerB.png')}/>
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    press: {
        overflow: 'hidden',
    },
});

module.exports = MessengerButton;
