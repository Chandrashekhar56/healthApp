/* eslint-disable react-native/no-inline-styles */
import {Surface, Modal} from 'react-native-paper';
import React, {useCallback} from 'react';
import ModalHeader from './header';
import ModalFooter from './footer';
import {View} from 'react-native';

const ModalComponent = props => {
  const {
    header = {},
    footer = {},
    headerComponent: HeaderComponent,
    footerComponent: FooterComponent,
    children,
    onClose = () => {},
    visible = true,
    isDivider = false,
    isBottomDivider = false,
    modalStyle,
    isSmall,
    isNotScrollable,
    containerStyle = {},
  } = props || {};

  const {closeIconAction} = header;

  const modalCloseAction = useCallback(
    (event, reason) => {
      onClose(event, reason);
      if (closeIconAction) {
        closeIconAction();
      }
    },
    [closeIconAction, onClose],
  );

  if (!visible) {
    return null;
  }

  return (
    <Modal
      // theme={{colors: {backdrop: 'transparent'}}}
      // style={{backgroundColor: 'transparent'}}
      visible={visible}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 8,
          width: '80%',
        }}>
        <View>
          {HeaderComponent ? (
            <HeaderComponent />
          ) : (
            <ModalHeader header={header} modalCloseAction={modalCloseAction} />
          )}
        </View>
        <View>
          <View>{children}</View>
        </View>
        <View>
          {FooterComponent ? (
            <FooterComponent />
          ) : (
            <ModalFooter footer={footer} />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
