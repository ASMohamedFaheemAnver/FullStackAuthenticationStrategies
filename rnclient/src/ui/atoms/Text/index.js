import {useTheme} from '@theme';
import PropTypes from 'prop-types';
import {Text as RnText} from 'react-native';

function Text(props) {
  const {colors} = useTheme();
  const {children, style, ...rest} = props;
  return (
    <RnText style={[style, {color: colors.text}]} {...rest}>
      {children}
    </RnText>
  );
}

Text.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Text;
