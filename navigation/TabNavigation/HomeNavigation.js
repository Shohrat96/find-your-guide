import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import FilterScreen from "../../screens/tabs/FilterScreen";
import HomeScreen from "../../screens/tabs/HomeScreen";
import SearchLocationScreen from "../../screens/tabs/SearchLocation";
import SingleUserScreen from "../../screens/tabs/UserScreen";

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalTransition,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",

      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SearchLocationScreen" component={SearchLocationScreen} />
      <Stack.Screen options={{ gestureEnabled: false, tabBarVisile: false }} name="UserScreen" component={SingleUserScreen} />
    </Stack.Navigator>
  );
}
