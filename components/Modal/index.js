import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Modal, StyleSheet, View, Dimensions } from 'react-native';
import Header from '../Header';


export default function ({ isVisible, setIsVisible, children, headerTitle, actions }) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(false);
      }}>
      <View style={styles.centeredView}>
        <StatusBar style="dark" />
        <Header
          title={headerTitle}
          canGoBack
          backHandler={() => setIsVisible(false)}
        />
        <View style={styles.modalView}>
          {children}

        </View>

      </View>
      {actions && (
        <View style={styles.actionsWrapper}>
          {actions()}
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: 20
  },
  modalView: {
    flex: 1,
    marginTop: 16
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
    width: Dimensions.get('window').width
  },
});

