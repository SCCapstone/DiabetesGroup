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
        headerStyle: {backgroundColor: "#FF6127"}
    };

    constructor(props) {
        super(props);
        this.state = {time: '', glucoseLevel: '', readingType:'', notes:''};
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
            const {navigate} = this.props.navigation;
            navigate('PHome')
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
                                   onChangeText={(text) => this.setState({glucoseLevel: text})}
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
        backgroundColor: '#F7F1D2',
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

