import { StyleSheet, Platform } from 'react-native';
import Colors from './Colors';

const baseContainerWithoutPadding = {
  backgroundColor: Colors.layoutBGColor,
};

const baseContainerWithoutTopBottomPadding = {
  ...baseContainerWithoutPadding,
  paddingLeft: 16,
  paddingRight: 16,
};

const boxWithShadow = {
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    },
    android: {
      elevation: 3,
    },
  }),
  shadowOffset: {
    width: 0,
    height: 1,
  },
};

export const BaseStyles = StyleSheet.create({
  baseContainer: {
    ...baseContainerWithoutTopBottomPadding,
    ...boxWithShadow,
    paddingVertical: 16,
    borderRadius: 5,
  },
  baseContainer2: {
    ...baseContainerWithoutTopBottomPadding,
    ...boxWithShadow,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  baseContainerNoShadow: {
    ...baseContainerWithoutTopBottomPadding,
    padding: 16,
  },
  baseContainerWithoutPadding: {
    ...baseContainerWithoutPadding,
    ...boxWithShadow,
    borderRadius: 5,
  },
  baseContainerWithoutTopBottomPadding: {
    ...baseContainerWithoutTopBottomPadding,
    ...boxWithShadow,
  },
  boxWithShadow,
  boxWithShadow2: {
    ...boxWithShadow,
    borderTopWidth: 1 / 3,
    borderTopColor: 'rgb(224, 224, 224)',
    elevation: 2,

    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowColor: 'red',
  },
  greenColor: { color: Colors.tintColor },
  baseContent: {
    // flex: 1,
    // backgroundColor: Colors.backgroundColor,
    // color: Colors.gray,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
  },
  baseContentNoBackground: {
    flex: 1,
    color: Colors.gray,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  mt_10: {
    marginTop: 10,
  },
  mt_16: {
    marginTop: 16,
  },
  mt_24: {
    marginTop: 24,
  },
  mb_10: {
    marginBottom: 10,
  },
  mb_5: {
    marginBottom: 5,
  },
  mb_16: {
    marginBottom: 16,
  },
  mb_24: {
    marginBottom: 24,
  },
  ml_5: {
    marginLeft: 5,
  },
  ml_10: {
    marginLeft: 10,
  },
  ml_16: {
    marginLeft: 16,
  },
  mr_5: {
    marginRight: 5,
  },
  mr_10: {
    marginRight: 10,
  },
  mr_16: {
    marginRight: 16,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  alignItems: {
    alignItems: 'center',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  w50percent: {
    width: '50%',
  },
  textShadow: {
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3.84,
    textShadowColor: 'rgba(0,0,0,0.25)',
  },
  alignTextRight: {
    textAlign: 'right',
  },
  itemsCenterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: Colors.lightGray,
  },
});

const robotoFontStyle = {
  regular: { fontWeight: '400' }, //normal
  medium: { fontWeight: '500' }, //medium
  bold: { fontWeight: '700' }, //bold
};

const baseFontSize = 14;
export const BaseFontStyles = StyleSheet.create({
  headline: {
    fontFamily: 'Roboto-Medium',
    fontSize: baseFontSize + 6,
    color: Colors.gray,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: baseFontSize + 4,
    color: Colors.gray,
  },
  subHeader: {
    fontFamily: 'Roboto-Regular',
    ...robotoFontStyle.regular,
    fontSize: baseFontSize + 2,
    color: Colors.gray,
  },
  body1: {
    fontFamily: 'Roboto-Regular',
    fontSize: baseFontSize,
    color: Colors.gray,
  },
  menuOrBody2: {
    fontFamily: 'Roboto-Medium',
    fontSize: baseFontSize,
    color: Colors.gray,
  },
  caption: {
    fontFamily: 'Roboto-Regular',
    fontSize: baseFontSize - 2,
    color: Colors.gray,
  },
});
