import ChatScreen from "../../screens/tabs/ChatScreen";
import SearchLocationScreen from "../../screens/tabs/SearchLocation";
import HomeNavigation from "./HomeNavigation";
import ProfileNavigation from "./ProfileNavigation";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function TabNavigation() {

  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "UserScreen") {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getTabBarVisibility(route)
        return ({
          headerShown: false,
          tabBarStyle: {
            height: 70,
            display: routeName ? 'flex' : 'none'
          },
          tabBarItemStyle: {
            paddingVertical: 10,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            }
            if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            if (route.name === 'Chat') {
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
        })
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigation} />
      <Tab.Screen options={{
        tabBarStyle: {
          display: 'none'
        }
      }} name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
}
