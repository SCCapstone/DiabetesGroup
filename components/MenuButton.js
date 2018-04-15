import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    TouchableHighlight,
    Image,
} from 'react-native';

class MenuButton extends Component {
    render() {
        return (
            <View style={styles.press}>
                <TouchableHighlight
                    onPress={this.props.onPress}>
                    <Image
                        style ={styles.button}
                        source = {require('./hamburger.png')}/>
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    press: {
        overflow: 'hidden',
    },
    button: {
        height: 50,
        width: 50,
    },
});

module.exports = MenuButton;