import {PropTypes} from '@constants/imports';
import {BaseColors} from '@theme/colors/baseColors';
import {invokeIfFunction} from '@utils';
import {useTranslation} from 'react-i18next';
import Modal, {
  ModalButton,
  ModalFooter,
  ModalTitle,
  ScaleAnimation,
} from 'react-native-modals';

const DialogBox = props => {
  const {t} = useTranslation();
  const {
    title,
    leftText,
    rightText,
    showDialog,
    onRightPress,
    onLeftPress,
    onHideDialog,
    children,
  } = props;

  return (
    <Modal
      onTouchOutside={() => {
        onHideDialog();
      }}
      width={0.9}
      visible={showDialog}
      onSwipeOut={() => onHideDialog()}
      modalAnimation={new ScaleAnimation()}
      onHardwareBackPress={() => {
        onHideDialog();
        return true;
      }}
      modalTitle={title && <ModalTitle title={title} hasTitleBar={false} />}
      footer={
        <ModalFooter>
          <ModalButton
            text={leftText ?? t('Cancel')}
            bordered
            onPress={() => {
              onLeftPress?.();
              onHideDialog();
            }}
          />
          <ModalButton
            textStyle={{color: BaseColors.greenColor}}
            text={rightText ?? t('Confirm')}
            bordered
            onPress={async () => {
              onRightPress?.();
              onHideDialog();
            }}
          />
        </ModalFooter>
      }>
      {children}
    </Modal>
  );
};

DialogBox.propTypes = {
  title: PropTypes.string,
  leftText: PropTypes.string,
  rightText: PropTypes.string,
  showDialog: PropTypes.bool.isRequired,
  onHideDialog: PropTypes.func.isRequired,
  onLeftPress: PropTypes.func,
  onRightPress: PropTypes.func,
};

export default DialogBox;
