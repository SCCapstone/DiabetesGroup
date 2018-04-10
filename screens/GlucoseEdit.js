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
        headerTitleStyle: {color: "#FFFFFF", textAlign: 'center'},
        headerTintColor: "#FFFFFF",
    };

    constructor(props) {
        super(props);

        //Getting data to pre fill text inputs and picker with the current data.
        this.key = props.navigation.state.params.gKey;
        var note = props.navigation.state.params.gNotes;
        var OGdata = props.navigation.state.params.gData;
        var level = OGdata.splice(0, 1).toString();
        var rType = OGdata.splice(0, 1).toString();

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

    _deleteButtonEvent() {
        Alert.alert(
            'Log Deletion',
            'Are you sure you want to delete this glucose log?',
            [
                {text: 'Cancel'},
                {text: 'Yes', onPress: () => this.deleteLog()},
            ]
        )
    }

    deleteLog() {
        var userID = firebaseApp.auth().currentUser.uid;
        var ref = firebaseApp.database().ref('Patients/' + userID + '/logs/' + this.key);
        ref.remove(this.onComplete());
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
                <Text></Text>
                <Text></Text>
                <SeafoamButton style={{marginTop: 40}} title="Delete"
                    onPress = { () => this._deleteButtonEvent()}
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
        backgroundColor: '#fefbea',
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