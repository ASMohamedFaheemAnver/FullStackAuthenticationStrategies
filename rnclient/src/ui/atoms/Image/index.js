import {PropTypes} from '@constants/imports';
import {useEffect} from 'react';
import {Image as RNImage} from 'react-native';
import styles from './styles';

export default function Image(props) {
  const {source, imageUri, prefetchImageUri, style, onLoadEnd} = props;
  useEffect(() => {
    if (imageUri && prefetchImageUri) {
      RNImage.prefetch(imageUri);
      console.log({prefetchingImageUri: imageUri});
    }
  }, [imageUri]);
  return (
    <RNImage
      onLoadEnd={onLoadEnd}
      style={[styles.defaultImage, style]}
      resizeMode="contain"
      source={source ?? {uri: imageUri}}
    />
  );
}

Image.propTypes = {
  imageUri: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  source: PropTypes.number,
  onLoadEnd: PropTypes.func,
  prefetchImageUri: PropTypes.bool,
};
