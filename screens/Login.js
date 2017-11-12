import React, { Component } from 'react';

import {
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput,
    Text
} from 'react-native';

export default class Login extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <TextInput
                        placeholder={"Enter Username or Email"}
                        placeholderTextColor="#000000"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType = "email-address"
                        autoCapitalize = "none"
                        autoCorrect = {false}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder={"Enter Password"}
                        placeholderTextColor="#000000"
                        secureTextEntry
                        style={styles.input}
                        ref={(input) => this.passwordInput = input}
                    />

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BBFFB6',
        padding: 20,
        justifyContent: 'center'
    },
    input: {
        height: 55,
        fontSize: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        marginBottom: 20,
        color: '#000000',
        paddingHorizontal: 20
    },

    button: {
        backgroundColor: "#1FC97C",
        height: 50,
        paddingVertical: 15
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
});
