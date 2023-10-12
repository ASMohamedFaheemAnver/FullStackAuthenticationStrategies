import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  textBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textBox: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  textInput: {
    textAlign: 'center',
    // Overriding textInput initial padding
    paddingLeft: 0,
  },
});
