import {BaseStyles} from '@config/styles';
import {PropTypes} from '@constants/imports';
import {KeyboardTypes, NativeEvents} from '@constants/strings';
import {useTheme} from '@theme';
import {FontWeights, TypographyStyles} from '@typography';
import TextInput from '@ui/atoms/TextInput';
import {bracket} from '@utils';
import {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './styles';

// Need to decide code length
export default function VerificationCode(props) {
  const {containerStyle, onChange} = props;
  const {colors} = useTheme();
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const [verificationCode, setVerificationCode] = useState({
    code0: '',
    code1: '',
    code2: '',
    code3: '',
  });

  useEffect(() => {
    if (onChange) onChange(Object.values(verificationCode).join(''));
  }, [verificationCode]);

  useEffect(() => {
    // refs?.[0]?.current?.focus();
  }, []);

  return (
    <View style={[styles.textBoxContainer, containerStyle]}>
      <TextInput
        textRef={refs[0]}
        onChangeText={text => {
          setVerificationCode(prevState => ({...prevState, code0: text}));
          if (text) {
            refs?.[1]?.current.focus();
          }
        }}
        containerStyle={[
          {
            borderColor: colors.primary,
            backgroundColor: colors.card,
            color: colors.text,
            fontWeight: FontWeights.black,
          },
          styles.textBox,
          BaseStyles.normalRadius,
          BaseStyles.normalBorderWidth,
          TypographyStyles.body1,
        ]}
        maxLength={1}
        textInputStyle={[styles.textInput]}
        keyboardType={KeyboardTypes.numeric}
      />
      <TextInput
        textRef={refs[1]}
        onChangeText={text => {
          setVerificationCode(prevState => ({...prevState, code1: text}));
          if (text) {
            refs?.[2]?.current.focus();
          } else {
            refs?.[0]?.current.focus();
          }
        }}
        containerStyle={[
          {
            borderColor: colors.primary,
            backgroundColor: colors.card,
            color: colors.text,
            fontWeight: FontWeights.black,
          },
          styles.textBox,
          BaseStyles.normalRadius,
          BaseStyles.normalBorderWidth,
          TypographyStyles.body1,
        ]}
        maxLength={1}
        onKeyPress={({nativeEvent}) => {
          if (
            bracket(nativeEvent.key === NativeEvents.Backspace) &&
            !verificationCode.code1
          ) {
            refs?.[0]?.current.focus();
          }
        }}
        textInputStyle={[styles.textInput]}
        keyboardType={KeyboardTypes.numeric}
      />
      <TextInput
        textRef={refs[2]}
        onChangeText={text => {
          setVerificationCode(prevState => ({...prevState, code2: text}));
          if (text) {
            refs?.[3]?.current.focus();
          } else {
            refs?.[1]?.current.focus();
          }
        }}
        containerStyle={[
          {
            borderColor: colors.primary,
            backgroundColor: colors.card,
            color: colors.text,
            fontWeight: FontWeights.black,
          },
          styles.textBox,
          BaseStyles.normalRadius,
          BaseStyles.normalBorderWidth,
          TypographyStyles.body1,
        ]}
        maxLength={1}
        onKeyPress={({nativeEvent}) => {
          if (
            bracket(nativeEvent.key === NativeEvents.Backspace) &&
            !verificationCode.code2
          ) {
            refs?.[1]?.current.focus();
          }
        }}
        textInputStyle={[styles.textInput]}
        keyboardType={KeyboardTypes.numeric}
      />
      <TextInput
        textRef={refs[3]}
        onChangeText={text => {
          setVerificationCode(prevState => ({...prevState, code3: text}));
          if (text) {
            // refs?.[3]?.current.blur();
          } else {
            refs?.[2]?.current.focus();
          }
        }}
        containerStyle={[
          {
            borderColor: colors.primary,
            backgroundColor: colors.card,
            color: colors.text,
            fontWeight: FontWeights.black,
          },
          styles.textBox,
          BaseStyles.normalRadius,
          BaseStyles.normalBorderWidth,
          TypographyStyles.body1,
        ]}
        maxLength={1}
        onKeyPress={({nativeEvent}) => {
          if (
            bracket(nativeEvent.key === NativeEvents.Backspace) &&
            !verificationCode.code3
          ) {
            refs?.[2]?.current.focus();
          }
        }}
        textInputStyle={[styles.textInput]}
        keyboardType={KeyboardTypes.numeric}
      />
    </View>
  );
}

VerificationCode.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
};
