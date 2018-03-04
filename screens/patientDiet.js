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

    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        var userID = firebaseApp.auth().currentUser.uid;
        this.itemsRef = firebaseApp.database().ref('Patients/' + userID + '/diet/');
        this.state = {diet: [{name:'f', value: '0'}, {name:'v', value:'0'},{ name:
                    'g', value:'0'}, {name:'p', value:'0'}, {name:'d', value:'0'}, {name:'w', value:'0'},{ name:'s', value:'0'}, {name:'c', value:'0'}], fruits1: [], veges1: [], graStar1: [], prot1: [], dsrt1: [], water1: [], sugBev1: [], cofTea1: [],
            fruits: '', veges: '', graStar: '', prot: '', dsrt: '', water: '', sugBev:'', cofTea: '',nSuggestions: ''};

        this.myRef = firebaseApp.database().ref('Patients/' + userID);
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

    updateItems(myRef) {
        myRef.on('value', (snapshot) => {
            var sugg = snapshot.val().nSuggestions;
            this.setState({nSuggestions: sugg});
        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
        this.updateItems(this.myRef);
    }

    componentWillMount() {
        this.listenForItems(this.itemsRef);
    }

    componentWillUnmount(){
        this.itemsRef.off();
        this.myRef.off();
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
                        <Text style={styles.text}>{this.state.nSuggestions} </Text>
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