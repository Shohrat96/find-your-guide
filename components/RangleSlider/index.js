import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomLabel from './CustomLabel';

export default function ({ priceRange, setSelectedData }) {
  // const [multiSliderValue, setMultiSliderValue] = React.useState([0, 100]);
  const windowWidth = Dimensions.get('window').width;

  // const multiSliderValuesChange = values => setMultiSliderValue(values);

  return (
    <View>
      <View style={styles.sliderOne}>
        <Text style={styles.text}>${priceRange[0]} </Text>
        <Text style={styles.text}>${priceRange[1]}</Text>
      </View>
      <View style={{
        alignItems: 'center'
      }}>
        <MultiSlider
          values={[priceRange[0], priceRange[1]]}
          sliderLength={windowWidth - 70}
          onValuesChange={setSelectedData}
          min={0}
          max={100}
          step={1}
          pressedMarkerStyle={{
            width: 34,
            height: 34,
            borderRadius: 17
          }}
          allowOverlap
          customLabel={() => <CustomLabel />}
          selectedStyle={{
            backgroundColor: '#000'
          }}
          markerStyle={{
            backgroundColor: 'white',
            borderColor: '#d3d3d3',
            borderWidth: 0.5,
            width: 30,
            height: 30,
            borderRadius: 15
          }}
          smoothSnapped
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    alignSelf: 'center',
    // paddingVertical: 20,
  },
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})