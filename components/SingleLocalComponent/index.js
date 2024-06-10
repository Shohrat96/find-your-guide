import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { memo } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { generateUserPhotoUls } from "../../lib/helpers/generateUserPhotoUrls"
import MyCarousel from "../Carousel";
import { BoldText, TitleText, SecondaryText, ExtraBoldText } from "../StyledText";
import { useNavigation } from "@react-navigation/native";

const SingleLocalComponent = ({ local }) => {
  const { navigate } = useNavigation()

  return (
    <View>
      <MyCarousel
        navigate={() => navigate("UserScreen", { userId: local?.id })}
        imageData={generateUserPhotoUls(local?.photos)} />

      <TouchableWithoutFeedback onPress={() => {
        navigate("UserScreen", { userId: local?.id })
      }}>
        <View>
          <View style={styles.descriptionContainer}>
            <View style={styles.description}>
              <View style={styles.firstname}>
                <TitleText>{local?.name ?? 'No name'}</TitleText>
              </View>
              <View style={styles.location}>
                <SecondaryText>{local?.location?.name ?? ''}</SecondaryText>
              </View>
              <View style={styles.pricePerHour}>
                <ExtraBoldText>${local?.priceInfo?.fullPrice}/h</ExtraBoldText>
              </View>
            </View>
            <View style={styles.ratingAndReview}>
              <View style={styles.rating}>
                <Ionicons name="star" size={22} color="#FFC000" />
                <BoldText>{local?.avgRating?.toFixed(1)}</BoldText>
              </View>
              <View style={styles.review}>
                <SecondaryText>{local?.reviewCount} reviews</SecondaryText>
              </View>
              {/* <View style={styles.break} /> */}

            </View>
          </View>
          <View style={styles.shortDescText}>
            <FontAwesome6 name="quote-left" size={14} color="#d3d3d3" />
            <View style={{ alignSelf: 'center', paddingVertical: 4 }}>
              <SecondaryText>
                {local?.shortDescription?.length > 100 ? `${local?.shortDescription?.substr(0, 100)}...` : local?.shortDescription}
              </SecondaryText>
            </View>
            <FontAwesome6 style={{ alignSelf: 'flex-end' }} name="quote-right" size={14} color="#d3d3d3" />
            <View style={styles.divider} />
          </View>
        </View>
      </TouchableWithoutFeedback>


    </View>
  )
}

export default memo(SingleLocalComponent)

const styles = StyleSheet.create({
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  firstname: {
    lineHeight: 24
  },
  description: {
  },
  ratingAndReview: {
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#d3d3d3',
    marginTop: 10,
    width: '100%',
    alignSelf: 'center',
  },
  shortDescText: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
})