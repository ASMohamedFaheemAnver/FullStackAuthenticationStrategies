import {IconNames, RouteNames} from '@constants/strings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@ui/screens/Home';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const BottomTabStack = () => {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        // Can remove all header
        headerShown: true,
      }}
      initialRouteName={RouteNames.Home}>
      <BottomTab.Screen
        options={{
          // headerShown: false,
          tabBarIcon: ({color, focused, size}) => (
            <EntypoIcon color={color} name={IconNames.home} />
          ),
        }}
        name={RouteNames.Home}
        component={Home}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabStack;
