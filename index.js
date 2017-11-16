import { AppRegistry } from 'react-native';
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


import {StackNavigator,} from 'react-navigation';

//This is going to be the apps main navigator
const AppNavigator = StackNavigator({
        User: {screen: UserSelect},
        PSign: {screen: PatientSignIn},
        NSign: {screen: NutritionistSignIn},
        NewUser: {screen: createNewUser},
        PList: {screen: PatientList},
        PHome: {screen: patientHome},
        GInput: {screen: glucoseInput},
        PMed: {screen: patientMedication},
        PDiet: {screen: patientDiet}
    },
    {
        initialRouteName: 'User'
    }
);

AppRegistry.registerComponent('DiabetesGroup', () => AppNavigator);
