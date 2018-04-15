import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    AppRegistry,
    TextInput,
    ScrollView,
    Picker,
    Alert,
} from 'react-native';

export default class GlucoseEdit extends Component<{}> {

    static navigationOptions = {
        title: 'Glucose Edit',
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
        headerRight: (<View></View>),
        headerTintColor: "#FFFFFF"
    };

    constructor(props) {
        super(props);

        //Getting data to pre fill text inputs and picker with the current data.
        this.key = props.navigation.state.params.gKey;
        var note = props.navigation.state.params.gNotes;
        var level = props.navigation.state.params.gLevel;
        var rType = props.navigation.state.params.rType;

        this.state = {time: '', glucoseLevel: level, readingType: rType, notes: note};
    }

    _patientValues() {
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
            firebaseApp.database().ref('Patients/' + user.uid + '/logs/' + this.key).update({
                glucoseLevel: glucoseLevel,
                readingType: readingType,
                notes: notes,
            }, this.onComplete());
        }
    }

    onComplete() {
        this.props.navigation.goBack();
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

                    <TextInput style={styles.input}
                               placeholder= {this.state.glucoseLevel}
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

                    <TextInput style={styles.input}
                               placeholder= {this.state.notes === '' ? 'Additional Notes' : this.state.notes}
                               underlineColorAndroid ={'transparent'}
                               placeholderTextColor="#CFCFCF"
                               onChangeText={(text) => this.setState({notes: text})}
                               value={this.state.notes}
                    />



                </View>

                <SeafoamButton title="Update"
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
    line:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
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