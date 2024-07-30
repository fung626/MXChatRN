import strings from '@localization/Localization';
import {TextStyles} from '@styles';
import {Sizes, width} from '@theme';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import SafeArea from 'react-native-safe-area';
import BottomItem from './components/BottomItem';

const ChatBottomModal = ({items, isModalVisible, onPress, onCancelPress}) => {
  //
  const [safeAreaInset, setSafeAreaInset] = useState({bottom: 0});

  useEffect(() => {
    SafeArea.getSafeAreaInsetsForRootView().then(result => {
      setSafeAreaInset({
        bottom: result.safeAreaInsets.bottom,
      });
    });
  }, []);

  return (
    <Modal
      style={{
        ...styles.modal,
        marginBottom: Sizes.margin.normal + safeAreaInset.bottom,
      }}
      isVisible={isModalVisible}
      onSwipeComplete={onCancelPress}
      swipeDirection={['down']}
      deviceWidth={width}>
      <View style={styles.container}>
        {items.map((item, index) => {
          return (
            <BottomItem
              {...item}
              key={index}
              onPress={() => {
                onPress(item);
              }}
            />
          );
        })}
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancelPress}>
          <Text style={styles.cancelText}>{strings.cancel}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

ChatBottomModal.propTypes = {
  items: PropTypes.array.isRequired,
  isModalVisible: PropTypes.bool,
  onPress: PropTypes.func,
  onCancelPress: PropTypes.func,
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    marginBottom: Sizes.margin.normal,
  },
  container: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#FFF',
    padding: Sizes.padding.normal,
    marginTop: Sizes.margin.normal,
  },
  cancelBtn: {
    alignItems: 'center',
    shadowColor: '#00000029',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  cancelText: {
    ...TextStyles.manrope.text,
    color: '#2198FA',
    width: '100%',
    textAlign: 'center',
  },
});

export default ChatBottomModal;
