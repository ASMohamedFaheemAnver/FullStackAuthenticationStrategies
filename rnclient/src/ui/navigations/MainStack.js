import {RouteNames} from '@constants/strings';
import Loading from '@ui/screens/Loading';
import BottomTabStack from './BottomTabStack';

const {createStackNavigator} = require('@react-navigation/stack');

const MainStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={RouteNames.Loading}>
      <Stack.Screen name={RouteNames.Loading} component={Loading} />
      <Stack.Screen
        // Child stack will show header info
        options={{headerShown: false}}
        name={RouteNames.BottomTabStack}
        component={BottomTabStack}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
