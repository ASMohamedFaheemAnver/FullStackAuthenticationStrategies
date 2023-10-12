import Text from '@ui/atoms/Text';
import {useTranslation} from 'react-i18next';

const Home = () => {
  const {t} = useTranslation();

  return <Text>{t('Home')}</Text>;
};

export default Home;
