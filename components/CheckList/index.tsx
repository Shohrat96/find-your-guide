import { Ionicons } from "@expo/vector-icons"
import React, { Dispatch, useState } from "react"
import { StyleSheet, TouchableOpacity, ScrollView, View, Text } from "react-native"
import { ListItem } from "react-native-elements"
import { BoldMedium, BoldText, BoldTextUnderline, SecondaryText } from "../StyledText"
import { ACTIVITY_TYPES } from "../../screens/tabs/FilterScreen/activityTypesData"
import { GENDERS } from "../../screens/tabs/FilterScreen/genders"
import { LANGUAGES } from "../../screens/tabs/FilterScreen/filterData"

type CheckListType = typeof ACTIVITY_TYPES | typeof GENDERS | typeof LANGUAGES

type PropTypes = {
  selectedData: number[];
  setSelectedData: Dispatch<React.SetStateAction<number>>;
  data: CheckListType
}

export default function ({ data, selectedData, setSelectedData }: PropTypes) {
  const [showMore, setShowMore] = useState(false)
  return (
    <ScrollView style={styles.languages} >
      {
        data?.slice(0, showMore ? data?.length : 3).map(({ title, id, icon }) => (
          <ListItem
            key={id}
            containerStyle={{
              padding: 0
            }
            }
          >
            <ListItem.Content style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              {icon && (
                <View style={{ marginRight: 10 }}>
                  {icon}
                </View>
              )}
              <View style={{ flex: 1 }}>
                <ListItem.CheckBox iconRight textStyle={{
                  marginLeft: 0,
                  fontWeight: 'bold',
                  fontSize: 16,

                  fontFamily: 'SatoshiMedium'
                }}
                  checkedColor="#000"
                  onPress={() => (setSelectedData(id))}
                  checked={selectedData?.includes(id)}
                  right
                  wrapperStyle={{
                    justifyContent: 'space-between',
                    flex: 1
                  }}
                  containerStyle={{
                    backgroundColor: 'white',
                    flex: 1,
                    width: '100%',
                    paddingVertical: 10,
                    borderWidth: 0
                    // padding: 10,
                  }}
                  title={title}
                />
              </View>
            </ListItem.Content>

          </ListItem>
        ))
      }
      {
        data?.length > 3 && (
          <TouchableOpacity
            style={{ flexDirection: 'row', marginTop: 10 }}
            onPress={() => {
              setShowMore(!showMore)
            }
            }
          >
            <BoldTextUnderline>{showMore ? 'Show less' : 'Show more'} </BoldTextUnderline>
            < Ionicons name={showMore ? "chevron-up" : "chevron-down"} size={24} color="black" />
          </TouchableOpacity>
        )
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  languages: {
    flex: 1,
  }
})