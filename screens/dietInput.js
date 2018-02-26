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
} from 'react-native';

export default class dietInput extends Component<{}> {

    static navigationOptions = {
        title: "Today's Diet Input",
        headerStyle: {backgroundColor: "#FF6127"}
    };

    constructor(props) {
        super(props);
        this.state = {date: '', fruits: '', veges:'', graStar:'', prot:'', dsrt:'', water:'', sugBev:'', cofTea:''};
    }


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
                    <TextInput type="date" keyboardType={"numeric"}  style={styles.input} placeholder="Date (MMDDYY)"
                               underlineColorAndroid ={'transparent'}
                               placeholderTextColor="#000000"
                               onChangeText={(text) => this.setState({date: text})}
                               value={this.state.date}
                    />
                    </View>


                    <View style={styles.line}>
                    <Text> Fruits: </Text>
                    <TextInput type="number" keyboardType={"numeric"} style={styles.input} placeholder="Fruits"
                           underlineColorAndroid ={'transparent'}
                           placeholderTextColor="#000000"
                           onChangeText={(text) => this.setState({fruits: text})}
                           value={this.state.fruits}
                    />
                    </View>
                    <View style={styles.line}>
                    <Text> Vegetables: </Text>
                    <TextInput type="number" keyboardType={"numeric"} style={styles.input} placeholder="Vegetables"
                               underlineColorAndroid ={'transparent'}
                               placeholderTextColor="#000000"
                               onChangeText={(text) => this.setState({veges: text})}
                               value={this.state.veges}
                    />
                    </View>
                    <View style={styles.line}>
                    <Text> Grains/Starches: </Text>
                    <TextInput type="number" keyboardType={"numeric"} style={styles.input} placeholder="Grains/Starches"
                               underlineColorAndroid ={'transparent'}
                               placeholderTextColor="#000000"
                               onChangeText={(text) => this.setState({graStar: text})}
                               value={this.state.graStar}
                    />
                    </View>
                    <View style={styles.line}>
                    <Text> Protein: </Text>
                    <TextInput type="number" keyboardType={"numeric"} style={styles.input} placeholder="Protein"
                               underlineColorAndroid ={'transparent'}
                               placeholderTextColor="#000000"
                               onChangeText={(text) => this.setState({prot: text})}
                               value={this.state.prot}
                    />
                    </View>

                    <View style={styles.line}>
                    <Text> Desserts: </Text>
                    <TextInput type="number" keyboardType={"numeric"} style={styles.input} placeholder="Desserts"
                               underlineColorAndroid ={'transparent'}
                               placeholderTextColor="#000000"
                               onChangeText={(text) => this.setState({dsrt: text})}
                               value={this.state.dsrt}
                    />
                    </View>

                    <View style={styles.line}>
                    <Text> Water: </Text>
                    <TextInput type="number" keyboardType={"numeric"} style={styles.input} placeholder="Water"
                               underlineColorAndroid ={'transparent'}
                               placeholderTextColor="#000000"
                               onChangeText={(text) => this.setState({water: text})}
                               value={this.state.water}
                    />
                    </View>

                    <View style={styles.line}>
                    <Text> Sugary Beverages: </Text>
                    <TextInput type="number" keyboardType={"numeric"} style={styles.input} placeholder="Sugary Beverages"
                               underlineColorAndroid ={'transparent'}
                               placeholderTextColor="#000000"
                               onChangeText={(text) => this.setState({sugBev: text})}
                               value={this.state.sugBev}
                    />
                    </View>

                    <View style={styles.line}>
                    <Text> Coffee/Tea: </Text>
                    <TextInput type="number" keyboardType={"numeric"} style={styles.input} placeholder="Coffee/Tea"
                               underlineColorAndroid ={'transparent'}
                               placeholderTextColor="#000000"
                               onChangeText={(text) => this.setState({cofTea: text})}
                               value={this.state.cofTea}
                    />
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
    }
});