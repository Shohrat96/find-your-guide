import { View, StyleSheet, Text, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Avatar, Divider, Image, Rating } from 'react-native-elements';
import useFetchData from "../../../hooks/useFetchData";
import { EXPO_PUBLIC_LOCALS_URL } from "@env"
import { generateUserPhotoUls } from "../../../lib/helpers/generateUserPhotoUrls";
import CustomActivityIndicator from "../../../components/ActivityIndicator";
import CustomCarousel from '../../../components/Carousel'
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { TitleText, SecondaryText, BoldText, RegularText, BoldTextUnderline } from "../../../components/StyledText";
import { ACTIVITY_TYPES } from "../FilterScreen/activityTypesData";
import React from "react";

const SingleUserScreen = ({ route }) => {
  const { userId } = route?.params;
  const { data: user, isLoading, error } = useFetchData(`${EXPO_PUBLIC_LOCALS_URL}/${userId}`)
  const { navigate, goBack } = useNavigation();

  console.log('url: ', `${EXPO_PUBLIC_LOCALS_URL}/${userId}`)

  if (isLoading) return <CustomActivityIndicator />

  if (user) {
    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Header
            canGoBack
            backHandler={() => goBack()}
          />
        </View>
        <ScrollView>
          <View style={styles.imageContainer}>
            <CustomCarousel
              imageData={generateUserPhotoUls(user?.photos)}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width}
              height={Dimensions.get('window').width}
              style={{ borderRadius: 0 }}
            />
          </View>

          <View style={styles.userInfoContainer}>
            <View style={styles.nameLocRating}>
              <View style={styles.nameAndLocation}>
                <TitleText>{user?.name}</TitleText>
                <SecondaryText>{user?.location?.name}</SecondaryText>
              </View>
              <View style={styles.rating}>
                <Rating
                  imageSize={24}
                  readonly
                  fractions={1}
                  startingValue={user?.avgRating}
                  style={styles.ratingStyles} />
              </View>
            </View>

            <Divider style={{ marginVertical: 20 }} />

            <View style={styles.shortDescText}>
              <SecondaryText>
                {user?.shortDescription?.trim()}
              </SecondaryText>
            </View>
            <Divider style={{ marginVertical: 20 }} />

            <View style={[styles.infoItem, styles.willShowYouContent]}>
              <BoldText>I will show you</BoldText>
              <RegularText>{user?.tourDescription?.trim()}</RegularText>
            </View>
            <Divider style={{ marginVertical: 20 }} />

            <View style={[styles.infoItem, styles.aboutMe]}>
              <BoldText>About me</BoldText>
              <RegularText>{user?.aboutMe?.trim()}</RegularText>
            </View>
            <Divider style={{ marginVertical: 20 }} />

            <View style={[styles.infoItem, styles.languages]}>
              <BoldText>Languages</BoldText>
              <RegularText>{user?.languages?.map(item => item[0]?.toUpperCase() + item?.substr(1)).join(', ')}</RegularText>
            </View>
            <Divider style={{ marginVertical: 20 }} />

            <View style={[styles.infoItem, styles.activities]}>
              <BoldText>Activities</BoldText>
              <View style={styles.activitiesContainer}>
                {user?.activities?.map(item => {
                  const match = ACTIVITY_TYPES?.find(act => act?.slug === item);
                  return (
                    <View key={item} style={{ flexDirection: 'row', gap: 8 }}>
                      {match?.icon}
                      <RegularText>
                        {match?.title}
                      </RegularText>
                    </View>
                  )
                })}
              </View>

            </View>
            <Divider style={{ marginVertical: 20 }} />

            <View style={[styles.infoItem, styles.reviews]}>
              <BoldText>Reviews</BoldText>
              <View style={styles.reviewsContainer}>
                {user?.reviews?.map((review, idx, reviews) => {
                  return (
                    <React.Fragment key={review?.id}>
                      <View style={{ flexDirection: 'row', gap: 16 }}>
                        <Avatar size={50} rounded source={{ uri: generateUserPhotoUls([review?.user?.profilePhoto])[0] }} />
                        <View style={{ paddingRight: 20, gap: 4, alignItems: 'flex-start', maxWidth: (Dimensions.get('window').width - 86) }}>
                          <BoldText>{review?.user?.name}</BoldText>
                          {
                            review?.content && (
                              <View>
                                <RegularText>{review?.content?.trim()}</RegularText>
                              </View>
                            )
                          }
                          <View style={{ marginTop: 4 }}>
                            <Rating
                              imageSize={16}
                              readonly
                              fractions={1}
                              startingValue={review?.rate}
                            />
                          </View>
                        </View>
                      </View>

                      {/* Check if not the last item for adding bottom divider */}
                      {
                        idx !== reviews?.length - 1 && (
                          <Divider style={{ marginVertical: 20 }} />
                        )
                      }
                    </React.Fragment>
                  )
                })}
              </View>
            </View>


          </View>
        </ScrollView>


        <View style={styles.actionsWrapper}>
          <View style={styles.priceInfo}>
            <BoldTextUnderline>$5/h</BoldTextUnderline>
          </View>
          <TouchableOpacity style={styles.applyBtn} onPress={() => navigate("Chat")}>
            <BoldText style={{ color: '#fff' }}>Contact</BoldText>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  return (
    <View style={styles.notFound}>
      <Text>Data Not Found</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    position: 'absolute',
    zIndex: 1000,
    top: 45,
    left: 20
  },
  imageContainer: {
    width: '100%',
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userInfoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  nameLocRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nameAndLocation: {

  },
  rating: {
  },
  ratingStyles: {

  },
  shortDescText: {

  },
  willShowYouContent: {

  },
  aboutMe: {

  },
  languages: {

  },
  activitiesContainer: {
    gap: 8
  },
  infoItem: {
    gap: 8
  },
  actionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 0.5,
    borderTopColor: '#d3d3d3',
    marginTop: 'auto',
    bottom: 0,
    left: 0,
    width: Dimensions.get('window').width,
    // shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    shadowColor: '#52006A',
  },
  priceInfo: {

  },
  applyBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  }
})

export default SingleUserScreen