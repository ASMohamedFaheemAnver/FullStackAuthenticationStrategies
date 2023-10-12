import {PropTypes} from '@constants/imports';
import {useTheme} from '@theme';
import {TypographyStyles} from '@typography';
import Button from '@ui/atoms/Button';
import Icon from '@ui/atoms/Icon';
import styles from './styles';

export default function IconButton(props) {
  const {onPress, iconName, iconStyle, iconType, buttonStyle} = props;
  const {colors} = useTheme();
  return (
    <Button style={[styles.button, buttonStyle]} onPress={onPress}>
      <Icon
        style={[{color: colors.primary}, TypographyStyles.title1, iconStyle]}
        name={iconName}
        type={iconType}
      />
    </Button>
  );
}

IconButton.propTypes = {
  onPress: PropTypes.func,
  iconName: PropTypes.string,
  iconType: PropTypes.string,
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  buttonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
