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
    AppRegistry,
    DrawerLayoutAndroid,
    TouchableOpacity,
} from 'react-native';

export default class ClinicianPDiet extends Component<{}> {

    static navigationOptions = {
        title: 'Patient Diet',
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
        headerRight: (<View></View>),
        headerTintColor: "#FFFFFF"
    };

    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        var userID = props.navigation.state.params.ID;
        this.itemsRef = firebaseApp.database().ref('Patients/' + userID + '/diet/');
        this.nSuggRef = firebaseApp.database().ref('Patients/' + userID);
        this.state = {user: userID, diet: [{name:'f', value: '0'}, {name:'v', value:'0'},{ name:
                    'g', value:'0'}, {name:'p', value:'0'}, {name:'d', value:'0'}, {name:'w', value:'0'},{ name:'s', value:'0'}, {name:'c', value:'0'}], fruits1: [], veges1: [], graStar1: [], prot1: [], dsrt1: [], water1: [], sugBev1: [], cofTea1: [],
            fruits: '', veges: '', graStar: '', prot: '', dsrt: '', water: '', sugBev:'', cofTea: '',nSuggestions: ''};

        //this.state = {nSuggestions: ''};


    }


    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var afruits= [];
            var aveges= [];
            var agraStar= [];
            var aprot= [];
            var adsrt= [];
            var awater= [];
            var asugBev= [];
            var acofTea= [];
            snap.forEach((child) => {
                afruits.push(parseInt(child.val().fruits));
                aveges.push(parseInt(child.val().veges));
                agraStar.push(parseInt(child.val().graStar));
                aprot.push(parseInt(child.val().prot));
                adsrt.push(parseInt(child.val().dsrt));
                awater.push(parseInt(child.val().water));
                asugBev.push(parseInt(child.val().sugBev));
                acofTea.push(parseInt(child.val().cofTea));

            });
            this.setState({fruits1: afruits, veges1: aveges, graStar1: agraStar, prot1: aprot, dsrt1: adsrt, water1: awater, sugBev1: asugBev, cofTea1: acofTea });
            var items = this.averageDiet();
            this.setState({diet: items});
        });
    }

    updateItems(nSuggRef) {
        nSuggRef.on('value', (snapshot) => {
            var sugg = snapshot.val().nSuggestions;
            this.setState({nSuggestions: sugg});
        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
        this.updateItems(this.nSuggRef);
    }

    componentWillMount() {
        this.listenForItems(this.itemsRef);
    }

    componentWillUnmount(){
        this.itemsRef.off();
        this.nSuggRef.off();
    }

    keyExtractor = (item) => item.id;

    averageDiet = () => {
        console.log(this.state.fruits1.length);
        afruits = this.state.fruits1;
        aveges = this.state.veges1;
        agraStar = this.state.graStar1;
        aprot = this.state.prot1;
        adsrt = this.state.dsrt1;
        awater = this.state.water1;
        asugBev = this.state.sugBev1;
        acofTea = this.state.cofTea1;
        var items = [];
        var  favg = 0;
        var  vavg = 0;
        var  gavg = 0;
        var  pavg = 0;
        var  davg = 0;
        var  wavg = 0;
        var  savg = 0;
        var  cavg = 0;

        var dCount = 0;

        if (afruits.length > 7){
            dCount = 7;
        }
        else if (afruits.length == 0)
        {
            dCount = 0;}
        else{
            dCount = afruits.length;}


        for(i = 0; i < dCount; i++) {
            favg += afruits[i];
            vavg += aveges[i];
            gavg += agraStar[i];
            pavg += aprot[i];
            davg += adsrt[i];
            wavg += awater[i];
            savg += asugBev[i];
            cavg += acofTea[i];
        }

        favg = favg/dCount;
        vavg = vavg/dCount;
        gavg = gavg/dCount;
        pavg = pavg/dCount;
        davg = davg/dCount;
        wavg = wavg/dCount;
        savg = savg/dCount;
        cavg = cavg/dCount;

        favg = this.rounding1(favg, 2);
        vavg = this.rounding1(vavg, 2);
        gavg = this.rounding1(gavg, 2);
        pavg = this.rounding1(pavg, 2);
        davg = this.rounding1(davg, 2);
        wavg = this.rounding1(wavg, 2);
        savg = this.rounding1(savg, 2);
        cavg = this.rounding1(cavg, 2);

        items.push(
            {name:'f', value: favg},
            {name:'v', value: vavg},
            {name:'g', value: gavg},
            {name:'p', value: pavg},
            {name:'d', value: davg},
            {name:'w', value: wavg},
            {name:'s', value: savg},
            {name:'c', value: cavg},

        );


        return items;
    };

    rounding1(number, precision) {
        var shift = function (number, precision, reverseShift) {
            if (reverseShift) {
                precision = -precision;
            }
            var numArray = ("" + number).split("e");
            return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
        };
        return shift(Math.round(shift(number, precision, false)), precision, true);
    };


    render() {


        const {navigate} = this.props.navigation;
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fefbea'}}>
                <View style={{height: 50, width: 300, backgroundColor: '#112471'}}>
                    <Text style={{alignSelf: "center", fontSize: 30, color: '#FFFFFF'}}>Hello!
                    </Text>
                </View>
                <View style={{height: 30, width: 300, backgroundColor: '#fefbea'}}/>

                <TouchableOpacity style={styles.sideButton}
                                  onPress={() => navigate('CPList')}>
                    <Text style={styles.sideText}>Home</Text>
                </TouchableOpacity>

                <View style={{height: 30, width: 300, backgroundColor: '#fefbea'}}/>

                <TouchableOpacity style={styles.sideButton}
                                  onPress={() => navigate('DHelp')}>
                    <Text style={styles.sideText}>Diet Help</Text>
                </TouchableOpacity>

                <View style={{height: 190, width: 300, backgroundColor: '#fefbea'}}/>

                <TouchableOpacity style={styles.sideButton}
                                  onPress={() => navigate('NutritionistSetting')}>
                    <Text style={styles.sideText}>Settings</Text>
                </TouchableOpacity>

                <View style={{height: 190, width: 300, backgroundColor: '#fefbea'}}/>

                <TouchableOpacity style={styles.sideButton}
                                  onPress={() => navigate('Sign')}>
                    <Text style={styles.sideText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        );
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
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
                                <Text style={styles.text}> {"Fruits:   " + this.state.diet.find(o => o.name === "f").value + "  serving(s)" } </Text>
                            </View>

                            <View style={styles.line}>
                                <Text style={styles.text}> {"Vegetables:   " + this.state.diet.find(o => o.name === "v").value + "  serving(s)" } </Text>
                            </View>

                            <View style={styles.line}>
                                <Text style={styles.text}> {"Grains/Starches:   " + this.state.diet.find(o => o.name === "g").value + "  serving(s)" } </Text>

                            </View>
                            <View style={styles.line}>
                                <Text style={styles.text}> {"Protein:   " + this.state.diet.find(o => o.name === "p").value + "  serving(s)" } </Text>

                            </View>

                            <View style={styles.line}>
                                <Text style={styles.text}> {"Desserts:   " + this.state.diet.find(o => o.name === "d").value + "  serving(s)" } </Text>

                            </View>

                            <View>
                                <Text style={styles.text}> Beverages: </Text>

                            </View>

                            <View style={styles.line}>
                                <Text style={styles.text}> {"   Water:   " + this.state.diet.find(o => o.name === "w").value + "  serving(s)" } </Text>

                            </View>

                            <View style={styles.line}>
                                <Text style={styles.text}> {"   Sugary:   " + this.state.diet.find(o => o.name === "s").value + "  serving(s)" } </Text>

                            </View>

                            <View style={styles.line}>
                                <Text style={styles.text}> {"   Coffee/Tea:   " + this.state.diet.find(o => o.name === "c").value + "  serving(s)" } </Text>

                            </View>

                            <Text/>
                            <Text/>
                            <Text/>



                        </View>
                        <Text/>



                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.title}>
                            Nutritionist's Suggestions
                        </Text>
                        <View style={styles.box}>
                            <Text style={styles.text}>{this.state.nSuggestions} </Text>
                        </View>
                    </View>
                </View>

            </DrawerLayoutAndroid>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fffcf6',
    },
    box:{
        backgroundColor:'white',
    },
    footer:{
        flex: 2,
        height : 100,
        backgroundColor:'#fff9ea',
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
    },
    sideButton: {
        width: 280,
        height: 40,
        backgroundColor: '#112471',
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: '#000000'
    },

    sideText: {
        fontSize: 25,
        color: '#fefbea',
        alignSelf: 'center'
    },
});