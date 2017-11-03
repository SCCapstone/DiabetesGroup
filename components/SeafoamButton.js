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
            <View style={styles.container}>
                <TouchableHighlight
                    underlayColor="rgba(253,138,94,0.2)"
                    onPress={this.props.onPress}>
                    <Text style={styles.welcome}>{this.props.title}</Text>
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
		marginBottom: 470,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,	
    },

	instruction: {
	    textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

module.exports = SeafoamButton;
