import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CustomActivityIndicator from '../ActivityIndicator';
import { useNavigation } from '@react-navigation/native';

export default class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    }
    this._renderItem = this._renderItem.bind(this)
  }

  get pagination() {
    const { activeIndex } = this.state;
    const { imageData } = this.props

    return (
      <Pagination
        dotsLength={imageData?.length}
        activeDotIndex={activeIndex}
        containerStyle={{
          // backgroundColor: '#000',
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: '#fff'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  _renderItem({ item, index }) {
    const { navigate } = this.props
    return (
      <TouchableWithoutFeedback onPress={navigate && (() => navigate())}>
        <View style={{
          height: this.props.height || 320,
        }}>
          <Image
            resizeMode="cover"
            style={{
              width: '100%',
              height: this.props.height || 320,
              borderRadius: 12,
              ...this.props.style
            }}
            source={{ uri: item }}
            placeholderStyle={{ flex: 1, width: '100%' }}
            PlaceholderContent={<CustomActivityIndicator size="small" />}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const windowWidth = Dimensions.get('window').width;

    return (
      <View style={{
        position: 'relative',
        alignItems: 'center',
      }}>
        <Carousel
          layout={"default"}
          ref={ref => this.carousel = ref}
          data={this.props.imageData}
          sliderWidth={this.props?.sliderWidth || windowWidth - 40}
          itemWidth={this.props?.itemWidth || windowWidth - 40}
          renderItem={this._renderItem}
          onSnapToItem={index => this.setState({ activeIndex: index })}
        />
        <View style={{
          position: 'absolute',
          bottom: 0,
        }}>
          {this.pagination}
        </View>
      </View>
    );
  }
}