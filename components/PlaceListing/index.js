import { TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { HeadingText, RegularText } from "../StyledText";
import { memo } from "react";
import { ListItem } from "react-native-elements";

function PlaceListing({
  data,
  onLocationSelect
}) {
  const { navigate } = useNavigation();

  const renderPlaces = ({ item }) => {
    return (
      <ListItem bottomDivider onPress={() => onLocationSelect(item?.place_id)}>
        <ListItem.Content>
          <ListItem.Title>{item?.description}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item => item?.id)}
        renderItem={renderPlaces}
        keyboardShouldPersistTaps='handled'
      />
    </View>

  );
}
export default memo(PlaceListing)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
  },
  singlePlace: {
    paddingLeft: 30,
    paddingVertical: 15,
    // backgroundColor: '#c3c3c3',
    marginVertical: 10,
    borderRadius: 12,
    borderColor: '#c3c3c3',
    // borderWidth: 1,
    borderBottomWidth: 1
  }
})