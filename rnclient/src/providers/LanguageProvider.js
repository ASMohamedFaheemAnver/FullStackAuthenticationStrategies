import {Languages} from '@constants/strings';
import {resources} from '@langs';
import i18n from 'i18next';
import {useEffect, useState} from 'react';
import {initReactI18next} from 'react-i18next';

// Initialize language and render child component
const LanguageProvider = ({children, loading}) => {
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);
  useEffect(() => {
    i18n
      .use(initReactI18next)
      .init({
        lng: Languages.english,
        fallbackLng: Languages.english,
        compatibilityJSON: 'v3',
        interpolation: {
          escapeValue: false,
        },
        resources: resources,
      })
      .then(_ => {
        setIsLanguageLoaded(true);
      })
      .catch(error => {
        console.log({error});
      });
  }, []);
  if (!isLanguageLoaded) return loading;
  return children;
};

export default LanguageProvider;
