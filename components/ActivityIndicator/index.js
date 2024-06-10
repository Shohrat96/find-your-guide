import { ActivityIndicator, View, StyleSheet, Dimensions } from "react-native"


const CustomActivityIndicator = ({ size }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="red" size={size || "large"} />
    </View>
  )
}

export default CustomActivityIndicator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: '100%'
  }
})