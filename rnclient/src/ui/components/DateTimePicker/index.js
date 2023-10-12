import {BaseStyles} from '@config/styles';
import {PropTypes} from '@constants/imports';
import {
  DateTimeFormats,
  DateTimeInitialValues,
  KeyboardTypes,
} from '@constants/strings';
import TextInput from '@ui/atoms/TextInput';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import IconButton from '../IconButton';
import styles from './styles';

const DateTimePicker = props => {
  const {t} = useTranslation();
  const {onDateTimeChange} = props;
  const [{year, month, date, isDatePickerVisible}, setDateTimeData] = useState({
    year: null,
    month: null,
    date: null,
    isDatePickerVisible: false,
  });

  const getDateTime = (year, month, date) => {
    return moment(
      [
        +year || DateTimeInitialValues.year,
        +month || DateTimeInitialValues.month,
        +date || DateTimeInitialValues.date,
      ].join('/'),
      DateTimeFormats.yearMonthDate,
    ).toDate();
  };

  useEffect(() => {
    onDateTimeChange(getDateTime(year, month, date));
  }, [year, month, date]);

  const showDateTimePicker = () => {
    setDateTimeData(prevDateTime => ({
      ...prevDateTime,
      isDatePickerVisible: true,
    }));
  };

  const onCancel = () => {
    setDateTimeData(prevDateTime => ({
      ...prevDateTime,
      isDatePickerVisible: false,
    }));
  };

  const onConfirm = date => {
    const momentDate = moment(date);
    setDateTimeData({
      year: momentDate.year(),
      month: momentDate.month() + 1,
      date: momentDate.date(),
      isDatePickerVisible: false,
    });
  };

  return (
    <View style={[styles.container]}>
      <TextInput
        placeholder={t('YYYY')}
        containerStyle={[styles.dateContainer, BaseStyles.normalMarginRight]}
        onChangeText={text =>
          setDateTimeData(prevDateTime => ({...prevDateTime, year: text}))
        }
        value={year?.toString()}
        keyboardType={KeyboardTypes.numeric}
        maxLength={4}
      />
      <TextInput
        placeholder={t('MM')}
        containerStyle={[styles.dateContainer, BaseStyles.normalMarginRight]}
        onChangeText={text =>
          setDateTimeData(prevDateTime => ({...prevDateTime, month: text}))
        }
        value={month?.toString()}
        keyboardType={KeyboardTypes.numeric}
        maxLength={2}
      />
      <TextInput
        placeholder={t('DD')}
        containerStyle={[styles.dateContainer, BaseStyles.normalMarginRight]}
        onChangeText={text =>
          setDateTimeData(prevDateTime => ({...prevDateTime, date: text}))
        }
        value={date?.toString()}
        keyboardType={KeyboardTypes.numeric}
        maxLength={2}
      />
      <IconButton iconName="calendar-alt" onPress={showDateTimePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        onConfirm={onConfirm}
        onCancel={onCancel}
        date={getDateTime(year, month, date)}
        negativeButtonLabel={t('CANCEL')}
        positiveButtonLabel={t('OK')}
      />
    </View>
  );
};

DateTimePicker.propTypes = {
  onDateTimeChange: PropTypes.func,
};

export default DateTimePicker;
