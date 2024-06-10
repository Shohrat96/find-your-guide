import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";
import TabNavigation from "./TabNavigation";
import { useUserStore } from "../store/useUserStore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function RootNavigation() {

  const deleteAllData = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys(); // Get all keys from AsyncStorage
      await AsyncStorage.multiRemove(allKeys); // Remove all keys

      // Display a success message or perform any other actions
      console.log('All data deleted successfully!');
    } catch (error) {
      // Handle error
      console.log('Error deleting data:', error);
    }
  };

  // Usage example
  // deleteAllData();
  const { session } = useUserStore();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        {session && session.user ? (
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        ) : (
          <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
