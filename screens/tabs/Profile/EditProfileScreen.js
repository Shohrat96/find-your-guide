import { TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { NavigationProp, useNavigation } from "@react-navigation/native";


export default function EditProfileScreen() {
  const { navigate } = useNavigation();


  return (
    <View>
      <Text>Edit Profile Screen</Text>
    </View>
  );
}