import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/Header";
import { useUserStore } from "../../store/useUserStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { RegularText } from "../../components/StyledText";
import useSupabaseAuth from "../../hooks/useSupabaseAuth";
import { useState } from "react";


export default function LoginScreen() {
  const { navigate } = useNavigation();
  const { signInWithEmail } = useSupabaseAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { session, setSession, setUser } = useUserStore();


  async function handleLogin() {
    setLoading(true);
    try {
      const { data, error } = await signInWithEmail(email, password);
      if (error) {
        setLoading(false);
      }

      if (data.user === null || data.session === null) {
        setLoading(false);
      }

      if (data.session && data.user) {
        setSession(data.session);
        setUser(data.user);
        setLoading(false);

      }
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <StatusBar style="dark" />
        <Header
          title="Login"
          description="Fill in the fields below to log in"
          canGoBack
          screen="Welcome"
        />
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email address"
              label="Email"
            />
          </View>
          <View style={styles.inputView}>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              label="Password"
              isPassword
            />
          </View>
        </View>
      </View>
      <View style={styles.bottomView}>
        <Button
          title="Log in"
          onPress={handleLogin}
          isLoading={loading}
        />
        <TouchableOpacity onPress={() => navigate("Signup")}>
          <RegularText>Don't have an account? Create one now</RegularText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between'
  },
  inputContainer: {
    marginTop: 40,
    gap: 20
  },
  inputView: {
    gap: 4
  },
  bottomView: {
    alignItems: 'center',
    gap: 8
  }
})