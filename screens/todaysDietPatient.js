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
        headerStyle: {backgroundColor: "#FF6127"}
    };



    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={{backgroundColor:'#F7F1D2'}}>

                <Text/>
                <Text/>
                <Text> *KEY* </Text>
                <Text>{'Fru: Fruits     Veg: Vegetables'} </Text>
                <Text>{'G/S: Grains/Starches    Pro: Protein'}</Text>
                <Text>{'Des: Desserts   Wat: Water'}</Text>
                <Text>{'Sug: Sugary Beverages   C/T: Coffee/Tea'}</Text>



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
        backgroundColor: '#F7F1D2',
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
    }
});