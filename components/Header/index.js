import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { HeadingText, RegularText } from "../StyledText";

export default function Header({
  title,
  description,
  canGoBack,
  backHandler,
  screen,
}) {
  const { navigate, goBack } = useNavigation();

  return (
    <View style={{ gap: 16, justifyContent: 'center' }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          gap: 20,
        }}
      >
        {canGoBack && (
          <TouchableOpacity
            onPress={() => backHandler ? backHandler() : goBack()}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              borderWidth: 0.5,
              borderColor: "#d3d3d3",
              backgroundColor: '#fff',
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="arrow-back" size={15} color={"#000"} />
          </TouchableOpacity>
        )}
        {title && (
          <HeadingText>{title}</HeadingText>
        )}
      </View>
      {description && (
        <RegularText style={{ color: "#000", fontSize: 16 }}>
          {description}
        </RegularText>
      )}

    </View>
  );
}
