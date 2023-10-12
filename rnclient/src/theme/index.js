import {BlueTheme} from './blueTheme';
import {GreenTheme} from './greenTheme';
import {OrangeTheme} from './orangeTheme';
import {PinkTheme} from './pinkTheme';
import {YellowTheme} from './yellowTheme';

export const ThemeSupport = [
  OrangeTheme,
  PinkTheme,
  BlueTheme,
  GreenTheme,
  YellowTheme,
];

// Hook which returns colors and theme data
export const useTheme = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const forceDark = useSelector(state => state.application.force_dark);
  // const themeStorage = useSelector(state => state.application.theme);
  // const theme = ThemeSupport.find(
  //   item => item.theme === (themeStorage ?? BlueTheme.theme),
  // );
  // if (forceDark || isDarkMode) {
  //   return {theme: theme.dark, colors: theme.dark.colors};
  // }
  // return {theme: theme.light, colors: theme.light.colors};
  return {theme: BlueTheme.light, colors: BlueTheme.light.colors};
};
