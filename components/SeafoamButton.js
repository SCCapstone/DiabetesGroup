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
            <View style={styles.action}>
                <TouchableHighlight
                    underlayColor={constants.actionColor}
                    onPress={this.props.onPress}>
                    <Text style={styles.actionText}>{this.props.title}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1FC97C',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

module.exports = SeafoamButton;