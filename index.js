import { AppRegistry } from 'react-native';
import App from './App';
import PatientList from './screens/PatientList';
import UserSelect from './screens/UserSelect';
import PatientSignIn from './screens/PatientSignIn';
import NutritionistSignIn from './screens/NutritionistSignIn';
import createNewUser from './screens/createNewUser';

import {StackNavigator,} from 'react-navigation';

//This is going to be the apps main navigator
const AppNavigator = StackNavigator({
        User: {screen: UserSelect},
        PSign: {screen: PatientSignIn},
        NSign: {screen: NutritionistSignIn},
        NewUser: {screen: createNewUser},
        PList: {screen: PatientList}
    },
    {
        initialRouteName: 'PList'
    }
);

AppRegistry.registerComponent('DiabetesGroup', () => AppNavigator);
