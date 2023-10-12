import {BaseStyles} from '@config/styles';
import {NativeEvents} from '@constants/strings';
import {useTheme} from '@theme';
import {bracket} from '@utils';
import PropTypes from 'prop-types';
import {TextInput as RnTextInput, View} from 'react-native';
import styles from './styles';

function TextInput(props) {
  const {
    placeholder,
    secureTextEntry,
    keyboardType,
    editable,
    onChangeText,
    onChange,
    onSubmitEditing,
    value,
    containerStyle,
    textInputStyle,
    onBlur,
    textRef,
    maxLength,
    onKeyPress,
  } = props;

  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.container,
        BaseStyles.normalRadius,
        {borderColor: colors.primary, backgroundColor: colors.card},
        BaseStyles.normalBorderWidth,
        containerStyle,
      ]}>
      <RnTextInput
        ref={textRef}
        style={[
          styles.textInput,
          BaseStyles.normalPaddingLeft,
          {color: colors.text},
          textInputStyle,
        ]}
        onBlur={onBlur}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={editable}
        onChange={onChange}
        value={value}
        onChangeText={
          onChangeText ? text => onChangeText?.(text) : onChangeText
        }
        onKeyPress={onKeyPress}
        onSubmitEditing={onSubmitEditing}
        maxLength={maxLength}
      />
    </View>
  );
}
TextInput.propTypes = {
  textRef: PropTypes.object,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  editable: PropTypes.bool,
  onChangeText: PropTypes.func,
  onChange: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  maxLength: PropTypes.number,
};

export default TextInput;
