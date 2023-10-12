import {RouteNames} from '@constants/strings';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native';
const Loading = ({navigation}) => {
  const {t} = useTranslation();
  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{name: RouteNames.BottomTabStack}],
    });
  }, []);
  return <Text>{t('Loading')}</Text>;
};

export default Loading;
