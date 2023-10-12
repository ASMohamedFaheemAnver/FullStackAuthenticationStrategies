import TextInput from '@ui/atoms/TextInput';
import PropTypes from 'prop-types';
import {Controller} from 'react-hook-form';

function YupTextInput(props) {
  const {control, name} = props;

  return (
    <Controller
      control={control}
      render={({field: {onChange, onBlur, value}}) => {
        return (
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
        );
      }}
      name={name}
    />
  );
}
YupTextInput.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

YupTextInput.defaultProps = {};

export default YupTextInput;
