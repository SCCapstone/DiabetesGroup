import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
const DietTable = require('../components/DietTable');

import firebaseApp from './FireBaseApp';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    AppRegistry,
    ScrollView,
} from 'react-native';

export default class todaysDietPatient extends Component<{}> {

    static navigationOptions = {
        title: "Diet Logs",
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign: 'center'},
        headerTintColor: "#FFFFFF",
    };



    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={{backgroundColor:'#fffcf6'}}>

                <Text/>
                <Text/>
                <Text style={styles.login}> *KEY* </Text>
                <Text style={styles.login}>{'Fru: Fruits               Veg: Vegetables'} </Text>
                <Text style={styles.login}>{'G/S: Grains/Starches      Pro: Protein'}</Text>
                <Text style={styles.login}>{'Des: Desserts             Wat: Water'}</Text>
                <Text style={styles.login}>{'Sug: Sugary Beverages     C/T: Coffee/Tea'}</Text>

                <Text/>
                <Text/>
                <DietTable>

                </DietTable>

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffcf6',
    },

    text:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
    },

    container2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    stretched: {
        alignSelf: 'stretch',
    },

    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 10,
        marginTop: -20,
    },
    input:{
        fontSize: 16,
        backgroundColor: '#FEFDF5',
        marginBottom: 20,
        borderWidth: 1,

    },
    title: {
        fontSize: 15,
        marginBottom: 10,
        paddingBottom: 5,
        textAlign: 'center',
    },
    login: {
        textAlign: 'left',
        alignSelf: 'stretch',
        fontWeight: 'bold',
        fontSize: 14,
        color: "#000000",
    }
});