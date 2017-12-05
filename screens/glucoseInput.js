import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
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

    static navigationOptions = {title: 'Glucose Input',};
    constructor(props) {
        super(props);

        this.state = {date: '', time: '', glucoseLevel: '', readingType:'', notes:''};
    }


    _patientValues() {

        var date = this.state.date;
        var time = this.state.time;
        var glucoseLevel = this.state.glucoseLevel;
        var readingType = this.state.readingType;
        var notes = this.state.notes;
        var user = firebaseApp.auth().currentUser;

        firebaseApp.database().ref('users/' + user.uid + '/logs/').push({
            glucoseLevel: glucoseLevel,
            readingType: readingType,
            notes: notes,
        });

        if(glucoseLevel < 50 || glucoseLevel > 220)
        {
            alert('Please enter a valid glucose level.');
        }
        else if((readingType.includes('Reading Type', 0)))
        {
            alert('Please select a valid reading type.');
        }

        else {
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

                        <TextInput style={styles.input} placeholder="Date"
                                       underlineColorAndroid ={'transparent'}
                                       onChangeText={(text) => this.setState({date: text})}
                                       value={this.state.date}
                        />



                        <TextInput style={styles.input} placeholder="Time"
                                   keyboardType='numeric'
                                   underlineColorAndroid ={'transparent'}
                                   onChangeText={(text) => this.setState({time: text})}
                                   value={this.state.time}
                        />


                        <TextInput style={styles.input} placeholder="Glucose Level"
                                   underlineColorAndroid ={'transparent'}
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

                        <Text></Text>

                        <TextInput style={styles.input} placeholder="Additional Notes"
                                   underlineColorAndroid ={'transparent'}
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
        height: 40,
        marginBottom: 20,
        alignSelf: 'stretch',
        color: "#000000",
        borderColor: "#000000",
        borderWidth: 1,

    },
    title: {
        fontSize: 15,
        marginBottom: 10,
        paddingBottom: 5,
        textAlign: 'center',
    }
});

