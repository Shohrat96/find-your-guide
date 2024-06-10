import { TouchableOpacity, View, Text, Keyboard } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useRef, useEffect } from "react";

export default function ({
  placeholder,
  value,
  onChangeText,
  navigateOnPress,
  defaultFocus
}) {
  const { navigate } = useNavigation();
  const inputRef = useRef(null)

  useEffect(() => {
    if (defaultFocus) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        ref={inputRef}
        readOnly={navigateOnPress}
        placeholder={placeholder}
        containerStyle={{
          flex: 1,
          height: 36,
          padding: 0,
          marginRight: 12,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderRadius: 24
        }}
        inputStyle={{
          fontFamily: 'SatoshiRegular',
        }}
        inputContainerStyle={{
          height: '100%',
          backgroundColor: '#e3e3e3',
          borderRadius: 12
        }}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
