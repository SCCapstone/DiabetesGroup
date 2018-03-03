import { AppRegistry } from 'react-native';
import { Text } from 'react-native';
import React from 'react';
import App from './App';
import PatientList from './screens/PatientList';
import UserSelect from './screens/UserSelect';
import PatientSignIn from './screens/PatientSignIn';
import NutritionistSignIn from './screens/NutritionistSignIn';
import createNewUser from './screens/createNewUser';
import patientHome from './screens/patientHome';
import glucoseInput from './screens/glucoseInput';
import patientMedication from './screens/patientMedication';
import patientDiet from './screens/patientDiet';
import SignOut from './screens/SignOut';
import todaysDietPatient from './screens/todaysDietPatient';
import dietInput from './screens/dietInput';
import NPHome from './screens/NutritionistPHome';
import ClinicianPHome from './screens/ClinicianPHome';
import ClinicianSignIn from './screens/ClinicianSignIn';
import ClinicianPList from './screens/ClinicianPList';

import Settings from './screens/Settings';



import {StackNavigator,} from 'react-navigation';
import {DrawerNavigator,} from 'react-navigation';
import NewPatientInfo from "./screens/NewPatientInfo";

//This is going to be the apps main navigator
const AppNavigator = StackNavigator({
        User: {screen: UserSelect},
        PSign: {screen: PatientSignIn},
        NewPatient: {screen: NewPatientInfo},
        Setting: {screen: Settings},
        NSign: {screen: NutritionistSignIn},
        NewUser: {screen: createNewUser},
        PList: {
            screen: PatientList,
            navigationOptions: ({navigation}) => ({
                headerStyle: {backgroundColor: '#FF6127'},
                title: 'Nutritionist Home Screen',
                headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
            })
        },
        PHome: {
            screen: patientHome,
            navigationOptions: ({navigation}) => ({
                headerStyle: {backgroundColor: '#FF6127'},
                title: 'Home Screen',
                headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
            })
        },
        GInput: {screen: glucoseInput},
        PMed: {screen: patientMedication},
        PDiet: {screen: patientDiet},
        Sign: {screen: SignOut},
        TDiet: {screen: todaysDietPatient},
        DInput: {screen: dietInput},
        NPHome: {screen: NPHome},
		CSign: {screen: ClinicianSignIn},
		CPHome: {screen: ClinicianPHome},
		CPList: {
            screen: ClinicianPList,
            navigationOptions: ({navigation}) => ({
                headerStyle: {backgroundColor: '#FF6127'},
                title: 'Clinician Home Screen',
                headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
            })
        },
    },
    {

        initialRouteName: 'User'

    }
);

const DrawerStack = DrawerNavigator({
        GInput: {screen: glucoseInput},
        PMed: {screen: patientMedication},
        Setting:{screen: Settings},
        Plist: {screen: PatientList},
        Sign: {screen: SignOut},
        Stack: {
            screen: AppNavigator,
            navigationOptions: ({navigation}) => ({
                drawerLockMode: 'locked-closed',
                drawerLabel: () => null
            })
        },
    },
    {
        drawerPosition: 'left',
        initialRouteName: 'Stack'

    }
);


AppRegistry.registerComponent('DiabetesGroup', () => DrawerStack);
