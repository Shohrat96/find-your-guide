import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/Header";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { RegularText } from "../../components/StyledText";
import { supabase } from "../../lib/supabase";
import { useState } from "react";
import useSupabaseAuth from "../../hooks/useSupabaseAuth";


export default function SignUpScreen() {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUpWithEmail } = useSupabaseAuth()

  const handleSignUp = async () => {
    setLoading(true)
    try {
      const { error, data: { session } } = await signUpWithEmail(email, password)
      if (error) Alert.alert(error.message)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <StatusBar style="dark" />
        <Header
          title="Sign up"
          description="Fill in the fields below to create an account"
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

          <View style={styles.inputView}>
            <Input
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Re-enter your password"
              label="Confirm Password"
              isPassword
            />
          </View>
        </View>
      </View>
      <View style={styles.bottomView}>
        <Button
          title="Sign up"
          onPress={handleSignUp}
          isLoading={loading}
        />
        <TouchableOpacity onPress={() => navigate("Login")}>
          <RegularText>Already have an account? Head to login</RegularText>
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