import {PropTypes} from '@constants/imports';
import {BaseColors} from '@theme/colors/baseColors';
import {Image} from 'react-native';
import styles from './styles';

export default function Avatar(props) {
  const {imageUri, imageStyle} = props;
  return (
    <Image
      style={[
        styles.defaultAvatar,
        {backgroundColor: BaseColors.grayColor},
        imageStyle,
      ]}
      source={{uri: imageUri}}
    />
  );
}

Avatar.propTypes = {
  imageUri: PropTypes.string,
  imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
