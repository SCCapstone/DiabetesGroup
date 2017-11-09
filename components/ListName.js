import React, {Component} from 'react';
import ReactNative from 'react-native';
const { View, Text, StyleSheet } = ReactNative;

//This is the buttons that contain the patients name and age
class ListName extends Component {
    render() {
        return (
            <View style={styles.nm}>
                <Text style={styles.nText}>{this.props.name.Name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    name: {
        textAlign: 'center',
        color: '#FF5500',
        fontSize: 22,
        fontWeight: 'bold',
//        paddingTop: 40,
//        paddingBottom: 40,
    },
    nm: {
        backgroundColor: '#BBFFB6',
        borderBottomColor: '#BBFFB6',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingTop: 14,
        paddingBottom: 14,
    },
    nText: {
        color: '#333',
        textAlign: 'center',
        fontSize: 16,
    },
});

module.exports = ListName;