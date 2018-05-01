/*--------------------------------------------------------------------------------------------------------------------------------
Screen Name: glucoseInput

Puropse: This screen is used by patients to input their glucose level, reading type, and an optional note.

Functions Used:
    _patientValues(): Checks to ensure glucose level is a number between 30 and 600 and pushes the log to Firebase.
    checkNumberInput(text): Checks to make sure glucose level input is only a number otherwise it is erased from the
                                input box.

---------------------------------------------------------------------------------------------------------------------------------*/
import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
import moment from 'moment';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    AppRegistry,
    TouchableOpacity,
    ScrollView,
    Picker,
} from 'react-native';

export default class glucoseInput extends Component<{}> {

    static navigationOptions = {
        title: 'Glucose Input',
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
        headerRight: (<View></View>),
        headerTintColor: "#FFFFFF"
    };

    constructor(props) {
        super(props);
        this.isInputValid = false;
        this.state = {time: '', glucoseLevel: '', readingType:'', notes:'',};
    }


    _patientValues() {
        var time = moment().format("MM/DD/YYYY, LT");
        var glucoseLevel = this.state.glucoseLevel;
        var readingType = this.state.readingType;
        var notes = this.state.notes;
        var user = firebaseApp.auth().currentUser;

        if(glucoseLevel < 30 || glucoseLevel > 600)
        {
            alert('Please enter a valid glucose level.');
        }
        else if(readingType === "")
        {
            alert('Please select a valid reading type.');
        }else
        {
            firebaseApp.database().ref('Patients/' + user.uid + '/logs/').push({
                time: time,
                glucoseLevel: glucoseLevel,
                readingType: readingType,
                notes: notes,
            });
            this.props.navigation.goBack();
        }
    }

    checkNumberInput(text) {
        var newText = '';
        var numbers = '0123456789';
        if(text.length < 1){
            this.setState({ glucoseLevel: '' });
        }
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }else {
                alert('Please only enter in numbers')
            }
            this.setState({ glucoseLevel: newText });
        }
    }

    render() {
        return (

                <View style={styles.container}>
                    <View style={styles.stretched}>
                        <Text style={styles.title}>
                            Enter the following fields:
                        </Text>

                        <TextInput style={styles.input} placeholder="Glucose Level"
                                   underlineColorAndroid ={'transparent'}
                                   placeholderTextColor="#CFCFCF"
                                   keyboardType = 'numeric'
                                   onChangeText={(text) => this.checkNumberInput(text)}
                                   maxLength={3}
                                   value={this.state.glucoseLevel}
                        />
                        <Text style={styles.instructions}>
                            mg/dL
                        </Text>

                        <Picker
                            selectedValue={this.state.readingType}
                            onValueChange={(itemValue) => this.setState({readingType: itemValue})}>
                            <Picker.Item label="Reading Type" value="Reading Type"/>
                            <Picker.Item label="Fasting" value="Fasting" />
                            <Picker.Item label="Post-Meal" value="Post-Meal" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>

                        <TextInput style={styles.input} placeholder="Additional Notes"
                                   underlineColorAndroid ={'transparent'}
                                   placeholderTextColor="#CFCFCF"
                                   onChangeText={(text) => this.setState({notes: text})}
                                   value={this.state.notes}
                        />



                    </View>
                    <SeafoamButton title="Submit"
                    onPress = { () => this._patientValues()}
                    />

                </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 55,
        paddingRight: 55,
        backgroundColor: '#fffcf6',
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
        backgroundColor: '#ffffff',
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

