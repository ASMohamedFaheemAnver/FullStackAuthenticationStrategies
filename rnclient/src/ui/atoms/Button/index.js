import {PropTypes} from '@constants/imports';
import {TouchableOpacity} from 'react-native';

export default function Button(props) {
  const {children, onPress, style, ...rest} = props;
  return (
    <TouchableOpacity onPress={onPress} style={[style]} {...rest}>
      {children}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
