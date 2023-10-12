import {useGetAllComments} from '@graphql/actions/comment/queries';
import {changeLanguage} from '@redux/slices/applicationSlice';
import Text from '@ui/atoms/Text';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
const Home = () => {
  const {t} = useTranslation();
  const counter = useSelector(state => state.counter);
  const application = useSelector(state => state.application);
  const dispatch = useDispatch();

  // Defining useQuery will sperm server on every state change
  const [getItem, {data, error, refetch}] = useGetAllComments();
  if (data) {
    console.log({data, error});
  }
  useEffect(() => {
    dispatch(changeLanguage('spanish'));
    getItem();
  }, [getItem]);
  console.log({count: counter.count, application});
  return <Text>{t('Home')}</Text>;
};

export default Home;
