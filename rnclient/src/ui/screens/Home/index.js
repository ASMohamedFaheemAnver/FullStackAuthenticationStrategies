import Text from '@ui/atoms/Text';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import GoogleSignIn from '../google/GoogleSignIn';

const Home = () => {
  const {t} = useTranslation();

  return (
    <View>
      <GoogleSignIn />
    </View>
  );
};

export default Home;
