import {PropTypes} from '@constants/imports';
import {MediaTypes} from '@constants/strings';
import Avatar from '@ui/atoms/Avatar';
import Button from '@ui/atoms/Button';
import {useState} from 'react';
import * as DImagePicker from 'react-native-image-picker';
import styles from './styles';

const ImagePicker = props => {
  const {onImagePick, imageStyle, defaultImageUri} = props;
  const [imageUri, setImageUri] = useState(null);
  const onPickPress = () => {
    DImagePicker.launchImageLibrary(
      {
        selectionLimit: 1,
        MediaTypes: MediaTypes.photo,
      },
      response => {
        console.log({invoker: ImagePicker.name, response});
        if (response?.assets?.length) {
          onImagePick(
            response?.assets?.[0].uri,
            response?.assets?.[0].fileName,
            response?.assets?.[0].type,
          );
          setImageUri(response?.assets?.[0].uri);
        }
      },
    );
  };
  return (
    <Button onPress={onPickPress}>
      <Avatar
        imageUri={imageUri ?? defaultImageUri}
        imageStyle={[styles.image, imageStyle]}
      />
    </Button>
  );
};

ImagePicker.propTypes = {
  onImagePick: PropTypes.func,
  imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  defaultImageUri: PropTypes.string,
};

export default ImagePicker;
