import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

//TODO decide if circles will also be buttons, call glucose values from database, make range of values for each button color
class GlucoseCircle extends Component {
    render() {
        return (
            <View style={styles.gCircle}>
                <TouchableHighlight>

                    <Text style={styles.valText}>{this.props.title}</Text>

                </TouchableHighlight>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    gCircle: {
        backgroundColor: 'orange',
        borderRadius: 60,
        borderColor: '#000000',
        borderWidth: 3,
        overflow: 'hidden',
        width: 120,
        height: 120,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
        paddingBottom: 30,

    },
    valText: {
        color: '#000000',
        fontSize: 20,
        textAlign: 'center',
    },

});

module.exports = GlucoseCircle;