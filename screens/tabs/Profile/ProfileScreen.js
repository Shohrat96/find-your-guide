import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import useSupabaseAuth from "../../../hooks/useSupabaseAuth";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  const { getUserProfile, signOut } = useSupabaseAuth();

  async function handleGetProfile() {
    setLoading(true);

    try {
      const { data, error, status } = await getUserProfile();

      if (error && status !== 406) {
        setLoading(false);
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setFullName(data.full_name);
        setAvatarUrl(data.avatar_url);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header
        title="Profile"
        description="View your profile below"
        canGoBack
        screen="Home"
      />

      <View style={styles.inputContainer}>
        <Input
          value={username}
          onChangeText={() => { }}
          label="Username"
          disabled
        />
        <Input
          value={fullName}
          onChangeText={() => { }}
          label="Full name"
          disabled
        />
        <Button
          title="Edit profile"
          onPress={() => navigate("EditProfile")}
          isLoading={loading}
        />
        <Button
          variant="destructive"
          title="Sign out"
          icon={<Ionicons name="log-out-outline" size={20} color={"#fff"} />}
          onPress={() => handleSignOut()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  inputContainer: {
    marginTop: 40,
    gap: 20
  }
})