import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

const MyBottomModal = props => {
  const { isModalVisible } = props;

  return (
    <>
      <Modal isVisible={isModalVisible}>
        <View style={styles.container}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
    </>
  );
};

MyBottomModal.propTypes = {
  isModalVisible: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: { width: '100%', borderRadius: 12, backgroundColor: '#fff' },
});

export default MyBottomModal;
