import {StyleSheet} from 'react-native';

export const FontWeights = {
  thin: '100',
  ultraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
};

export const TypographyStyles = StyleSheet.create({
  header: {
    fontSize: 34,
    fontWeight: FontWeights.regular,
  },
  title1: {
    fontSize: 28,
    fontWeight: FontWeights.regular,
  },
  title2: {
    fontSize: 22,
    fontWeight: FontWeights.regular,
  },
  title3: {
    fontSize: 20,
    fontWeight: FontWeights.regular,
  },
  headline: {
    fontSize: 17,
    fontWeight: FontWeights.regular,
  },
  body1: {
    fontSize: 17,
    fontWeight: FontWeights.regular,
  },
  body2: {
    fontSize: 14,
    fontWeight: FontWeights.regular,
  },
  callout: {
    fontSize: 17,
    fontWeight: FontWeights.regular,
  },
  subhead: {
    fontSize: 15,
    fontWeight: FontWeights.regular,
  },
  footnote: {
    fontSize: 13,
    fontWeight: FontWeights.regular,
  },
  caption1: {
    fontSize: 12,
    fontWeight: FontWeights.regular,
  },
  caption2: {
    fontSize: 11,
    fontWeight: FontWeights.regular,
  },
  overline: {
    fontSize: 10,
    fontWeight: FontWeights.regular,
  },
});
