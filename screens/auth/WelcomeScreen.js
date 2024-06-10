import { TouchableOpacity, View, Text, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { HeadingText } from "../../components/StyledText";
import styled from "styled-components/native";

import { NavigationProp, useNavigation } from "@react-navigation/native";


export default function WelcomeScreen() {
  const { navigate } = useNavigation();


  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("../../assets/images/hero.jpg")}
        style={styles.imageBackGround}
        imageStyle={{ opacity: 0.8 }}
      >
        <SafeAreaView style={styles.safeAreaStyles}>
          <View style={styles.textContainer}>
            <Heading>Welcome to FindYourGuide</Heading>
            <TouchableOpacity onPress={() => navigate("Login")} style={styles.buttonContainer}>
              <Ionicons name="arrow-forward" size={25} color="#000" />
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBackGround: {
    backgroundColor: "rgba(0, 0, 0, 1)",
    flex: 1
  },
  safeAreaStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 60,
    gap: 16,
    paddingHorizontal: 20
  },
  headingText: {
    fontSize: 34,
    color: '#fff'
  },
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const Heading = styled(HeadingText)`
  font-size: 34px;
  color: #fff;
  text-align: center
`;