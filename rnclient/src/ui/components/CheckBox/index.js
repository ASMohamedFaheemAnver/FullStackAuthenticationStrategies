import {PropTypes} from '@constants/imports';
import {IconTypes} from '@constants/strings';
import {useTheme} from '@theme';
import {FontWeights} from '@typography';
import {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import IconButton from '../IconButton';
import TextButton from '../TextButton';
import styles from './styles';

const CheckBox = props => {
  const {defaultValue, isChecked, onToggle, text} = props;
  const {colors} = useTheme();
  const [isCheckedLocally, setIsCheckedLocally] = useState(
    defaultValue ?? false,
  );
  const isMountedRef = useRef(false);

  const onToggleLocally = () => {
    setIsCheckedLocally(preState => !preState);
  };

  useEffect(() => {
    if (isMountedRef.current) {
      if (onToggle) onToggle(isCheckedLocally);
    }
    isMountedRef.current = true;
  }, [isCheckedLocally]);

  return (
    <View style={[styles.container]}>
      <IconButton
        onPress={onToggleLocally}
        iconName={
          isChecked ?? isCheckedLocally
            ? 'check-box'
            : 'check-box-outline-blank'
        }
        iconType={IconTypes.MaterialIcons}
      />
      <TextButton
        textStyle={[{fontWeight: FontWeights.medium, color: colors.text}]}
        text={text}
        onPress={onToggleLocally}
      />
    </View>
  );
};

CheckBox.propTypes = {
  defaultValue: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default CheckBox;
