/*--------------------------------------------------------------------------------------------------------------------------------
Screen Name: DietHelp

Puropse: This screen is used by all users to help understand how diet should be input and it also shows an Indian
            Food Pyramid.

Functions Used:
    N/A

---------------------------------------------------------------------------------------------------------------------------------*/
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
    Image,
    DrawerLayoutAndroid,
    ScrollView,
} from 'react-native';

export default class DietHelp extends Component<{}> {

    static navigationOptions = {
        title: 'Diet Help',
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
    }


    render() {


        const {navigate} = this.props.navigation;
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fffcf6'}}>
                <SeafoamButton title="My Home Screen"
                               onPress={() => navigate('PHome')}/>
                <Text></Text>
                <Text></Text>
                <SeafoamButton title="My Diet"
                               onPress={() => navigate('PDiet')}/>
                <Text></Text>
                <Text></Text>
                <SeafoamButton title="My Medication"
                               onPress={() => navigate('PMed')}/>
                <Text></Text>
                <Text></Text>
                <SeafoamButton title="Settings"
                               onPress={() => navigate('Setting')}/>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <SeafoamButton title="Sign Out"
                               onPress={() => navigate('Sign')}/>
            </View>
        );
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <ScrollView>
                <View style={{flex:1}}>
                    <View style={styles.container}>
                        <View style={styles.stretched}>
                            <Text style={styles.title}>
                                Serving Sizes
                            </Text>
                            <Text style={styles.text3}>
                                *Check the Nutrition Facts for the serving sizes of the specific items you eat and drink.*    </Text>
                            <Text/>
                            <Text/>

                            <Text style={styles.text4}>
                            Serving sizes and daily calorie intake may vary by individual based on
                                age and activity. Please consult your Nutritionist for questions about your diet.
                            </Text>
                            <Text/>
                            <Text/>
                            <Text style={styles.text2} >
                                Examples of Single Servings:</Text>
                            <Text/>
                             <Text style={styles.text}>
                            Fruits: 1 Banana </Text>
                            <Text/>
                            <Text style={styles.text}>
                                Vegetables: 1/2 Cup of Broccoli </Text>
                            <Text/>
                            <Text style={styles.text}>
                                Grains/Starches: 1/2 Cup of Uncooked Rice </Text>
                            <Text/>
                            <Text style={styles.text}>
                                Protein: 3 oz of Cooked Beef </Text>
                            <Text/>
                            <Text style={styles.text}>
                                Desserts: 1/2 Cup of Ice Cream  </Text>
                            <Text/>
                            <Text style={styles.text}>
                                Water: 1 Cup (8 oz)  </Text>
                            <Text/>
                            <Text style={styles.text}>
                                Sugary Beverages: 1 Can of Soda = 1.5 servings </Text>
                            <Text/>
                            <Text style={styles.text}>
                                Coffee/Tea: 1 Cup of Coffee (6 oz) </Text>
                            <Text/>
                            <Text/>
                            <Text/>
                            <Text/>
                            <Text/>
                            <Text/>


                    </View>

                       <Text style={styles.title2}>
                           Indian Food Pyramid
                       </Text>

                    <Image style={styles.image}
                           source={require('../components/foodPyramid.png')}
                    />
                   </View>
                </View>
                </ScrollView>
            </DrawerLayoutAndroid>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fffcf6',
    },
    container3: {
        alignItems: 'center',
        backgroundColor: '#fffcf6',
    },
    box:{
        backgroundColor:'white',
    },
    footer:{
        flex: 2,
        height : 100,
        backgroundColor:'#fffcf6',
    },
    text:{
        color: 'black',
        fontSize: 18,
    },
    text2:{
        color: 'black',
        fontSize: 18,
        textDecorationLine: 'underline',
    },
    text3:{
        color: 'black',
        fontSize: 13,
        textAlign: 'center',
    },
    text4:{
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
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
        backgroundColor: '#fffcf6',
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
    title2: {
        fontSize: 20,
        paddingBottom: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        color: "black",
    },
    image: {
        flex: 2,
        aspectRatio: .75,
        resizeMode: 'contain',

    }
});