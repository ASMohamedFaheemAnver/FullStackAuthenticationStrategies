import {IconTypes} from '@constants/strings';
import PropTypes from 'prop-types';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

export default function Icon(props) {
  const {style, type, ...rest} = props;

  const iconProps = {style: [style], ...rest};

  if (type == IconTypes.Ionicons) {
    return <IonIcon {...iconProps} />;
  } else if (type == IconTypes.EvilIcons) {
    return <EvilIcon {...iconProps} />;
  } else if (type == IconTypes.SimpleLineIcons) {
    return <SimpleLineIcon {...iconProps} />;
  } else if (type == IconTypes.Feather) {
    return <FeatherIcon {...iconProps} />;
  } else if (type == IconTypes.MaterialIcons) {
    return <MaterialIcon {...iconProps} />;
  }
  return <FontAwesome5Icon {...iconProps} />;
}

Icon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.number,
};
