import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
const DietPicker = require('../components/DietPicker');
import firebaseApp from './FireBaseApp';
import DatePicker from 'react-native-datepicker'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    AppRegistry,
    Picker,
    TextInput,
    ScrollView,
} from 'react-native';

const pickerValues = [
    {label: "0", value: "0"},
    {label: "1", value: "1"},
    {label: "2", value: "2"},
    {label: "3", value: "3"},
    {label: "4", value: "4"},
    {label: "5", value: "5"},
    {label: "6", value: "6"},
    {label: "7", value: "7"},
    {label: "8", value: "8"},
    {label: "9", value: "9"},
    {label: "10", value: "10"},
    {label: "11", value: "11"},
    {label: "12", value: "12"},
    {label: "13", value: "13"},
    {label: "14", value: "14"},
    {label: "15", value: "15"},
    {label: "16", value: "16"},
    {label: "17", value: "17"},
    {label: "18", value: "18"},
    {label: "19", value: "19"},
    {label: "20", value: "20"},
];


export default class dietInput extends Component<{}> {

    static navigationOptions = {
        title: "Today's Diet Input",
        headerStyle: {backgroundColor: "#FF6127"}
    };

    constructor(props) {
        super(props);
        this.state = {date: '', fruits: '0', veges:'0', graStar:'0', prot:'0', dsrt:'0', water:'0', sugBev:'0', cofTea:'0'};
    }

    /*onChanged(food, text){
        let newText = '';
        let numbers = '0123456789';

        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("please enter numbers only");
            }
        }
        this.setState({ food: newText });
    }*/


    _dietValues() {
        var date = this.state.date;
        var fruits = this.state.fruits;
        var veges = this.state.veges;
        var graStar = this.state.graStar;
        var prot = this.state.prot;
        var dsrt = this.state.dsrt;
        var water = this.state.water;
        var sugBev = this.state.sugBev;
        var cofTea = this.state.cofTea;


        var user = firebaseApp.auth().currentUser;

        if(fruits < 0 | veges < 0 | graStar < 0 | prot < 0 | dsrt < 0 | water < 0 | sugBev < 0 | cofTea < 0)
        {
            alert('Please enter a valid serving amount.');
        }
        else {

            firebaseApp.database().ref('Patients/' + user.uid + '/diet/').push({
                date: date,
                fruits: fruits,
                veges: veges,
                graStar: graStar,
                prot: prot,
                dsrt: dsrt,
                water: water,
                sugBev: sugBev,
                cofTea: cofTea,
            });
            const {navigate} = this.props.navigation;
            navigate('PHome')
        }
    }





    render() {
        const readingType = this.state.readingType;
        const {navigate} = this.props.navigation;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Please Enter the Following Fields:
                    </Text>

                    <Text style={styles.title}>
                        *Input today's diet based on serving amounts.*
                    </Text>
                    <View style={styles.stretched}>


                        <View style={styles.line}>
                            <Text> Date: </Text>

                            <DatePicker
                                style={styles.input}
                                date={this.state.date}
                                mode="date"
                                placeholder="Date"
                                format="YYYY-MM-DD"
                                minDate="2017-01-01"
                                maxDate="2050-01-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                customStyles={{
                                    placeholderText:{
                                        color: '#000000',
                                        fontSize: 16,
                                    },
                                    dateTouchBody: {
                                        color: '#000000',

                                    }}}


                                onDateChange={(date) => {this.setState({date: date})}}
                            />

                        </View>

                        <Text/>

                        <View style={styles.container3}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Fruits: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    <DietPicker
                                        items={pickerValues}
                                        value={this.state.fruits}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ fruits: itemValue })}/>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Vegetables: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    <DietPicker
                                        items={pickerValues}
                                        value={this.state.veges}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ veges: itemValue })}/>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Grains/Starches: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    <DietPicker
                                        items={pickerValues}
                                        value={this.state.graStar}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ graStar: itemValue })}/>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Protein: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    <DietPicker
                                        items={pickerValues}
                                        value={this.state.prot}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ prot: itemValue })}/>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Desserts: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    <DietPicker
                                        items={pickerValues}
                                        value={this.state.dsrt}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ dsrt: itemValue })}/>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Water: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    <DietPicker
                                        items={pickerValues}
                                        value={this.state.water}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ water: itemValue })}/>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Sugary Beverages: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    <DietPicker
                                        items={pickerValues}
                                        value={this.state.sugBev}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ sugBev: itemValue })}/>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Coffee/Tea: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    <DietPicker
                                        items={pickerValues}
                                        value={this.state.cofTea}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ cofTea: itemValue })}/>
                                </View>
                            </View>

                        </View>
                    </View>
                    <SeafoamButton title="Submit"
                                   onPress = { () => this._dietValues()}
                    />


                </View>
            </ScrollView>

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
    line:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        color: '#000000',
        marginBottom: 10,
        marginTop: -20,
    },
    input:{
        fontSize: 16,
        backgroundColor: '#f1cba2',
        marginBottom: 20,
        borderWidth: 1,
        width: '60%',

    },
    title: {
        fontSize: 15,
        marginBottom: 10,
        paddingBottom: 5,
        textAlign: 'center',
    },
    container3: {
      flex:1,
    },
});