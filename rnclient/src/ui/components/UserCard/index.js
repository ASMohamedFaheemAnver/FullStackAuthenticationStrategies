import {BaseStyles} from '@config/styles';
import {PropTypes} from '@constants/imports';
import {IconTypes} from '@constants/strings';
import {useTheme} from '@theme';
import {BaseColors} from '@theme/colors/baseColors';
import Avatar from '@ui/atoms/Avatar';
import Icon from '@ui/atoms/Icon';
import Text from '@ui/atoms/Text';
import {View} from 'react-native';
import styles from './styles';

export default function UserCard(props) {
  const {imageUri, userName, phoneNumber} = props;
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.defaultUserCard,
        BaseStyles.normalPadding,
        BaseStyles.normalRadius,
        {
          backgroundColor: colors.card,
          borderColor: BaseColors.lightGrayColor,
        },
        BaseStyles.normalBorderWidth,
      ]}>
      <Avatar imageUri={imageUri} />
      <View style={[styles.defaultUserInfo, BaseStyles.normalMarginLeft]}>
        <Text textStyle={[BaseStyles.normalMarginBottom]}>{userName}</Text>
        <Text>{phoneNumber}</Text>
      </View>
      <Icon
        type={IconTypes.SimpleLineIcons}
        color={colors.primary}
        // color={BaseColors.grayColor}
        name="options"
      />
    </View>
  );
}

UserCard.propTypes = {
  imageUri: PropTypes.string,
  userName: PropTypes.string,
  phoneNumber: PropTypes.string,
};
