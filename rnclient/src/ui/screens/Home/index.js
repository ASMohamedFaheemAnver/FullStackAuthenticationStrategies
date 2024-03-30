import Text from '@ui/atoms/Text';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import GoogleSignIn from '../google/GoogleSignIn';
import PhoneSignIn from '../phone/PhoneSignIn';

const Home = () => {
  const {t} = useTranslation();

  return (
    <View>
      {false && <GoogleSignIn />}
      {true && <PhoneSignIn />}
    </View>
  );
};

export default Home;
