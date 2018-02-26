import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
import moment from 'moment';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    AppRegistry
} from 'react-native';

export default class patientDiet extends Component<{}> {

    static navigationOptions = {
        title: 'My Diet',
        headerStyle: {backgroundColor: "#FF6127"}
    };



    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.stretched}>
                    <Text style={styles.title}>
                        Average Daily Diet
                    </Text>

                    <Text style={styles.instructions}>
                      *Averages are based on the last 7 days of patient input.*
                    </Text>


                    <View style={styles.line}>
                        <Text style={styles.text}> {"Fruits:   " + 2 + "  serving(s)" } </Text>
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}> {"Vegetables:   " + 2 + "  serving(s)" } </Text>
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}> {"Grains/Starches:   " + 2 + "  serving(s)" } </Text>

                    </View>
                    <View style={styles.line}>
                        <Text style={styles.text}> {"Protein:   " + 2 + "  serving(s)" } </Text>

                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}> {"Desserts:   " + 2 + "  serving(s)" } </Text>

                    </View>

                    <View>
                        <Text style={styles.text}> Beverages: </Text>

                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}> {"   Water:   " + 2 + "  serving(s)" } </Text>

                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}> {"   Sugary:   " + 2 + "  serving(s)" } </Text>

                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}> {"   Coffee/Tea:   " + 2 + "  serving(s)" } </Text>

                    </View>


                </View>
                <Text/>

                <SeafoamButton title="Diet Logs"
                               onPress = { () => navigate('TDiet')}
                />
                <Text/>
                <SeafoamButton title="Update Today's Diet"
                               onPress = { () => navigate('DInput')}
                />
                <Text/>
            </View>
                <View style={styles.footer}>
                    <Text style={styles.title}>
                        Nutritionist's Suggestions
                    </Text>

                    <View style={styles.box}>
                        <Text style={styles.text}> You Should Eat More Fruits </Text>
                    </View>

                </View>

            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {

        alignItems: 'center',
        backgroundColor: '#F7F1D2',
    },

    box:{

        backgroundColor:'white',

        },
    footer:{
        flex: 2,
        height : 100,
        backgroundColor:'#f1cba2',
    },

    text:{
        color: 'black',
        fontSize: 18,
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
        fontSize: 20,
        marginBottom: 10,
        paddingBottom: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        color: "black",
    }
});