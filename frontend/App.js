import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import About from './screens/About';
import Home from './screens/Home';
import PredictLoan from './screens/PredictLoan';


export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Predict Loan" component={PredictLoan} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

