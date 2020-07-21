import { StyleSheet } from 'react-native';
import { BaseStyles } from '../../../../constants/BaseStyles';
import Colors from '../../../../constants/Colors';
import { normalize } from '../../../../constants/Layout';

const avatarMargin = normalize(132 / 2);

export default StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  container: {
    padding: 16,
  },
  borderRadius: {
    borderRadius: 5,
  },
  shortInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: avatarMargin + 10,
    position: 'relative',
    marginTop: avatarMargin,
  },
  avatar: {
    position: 'absolute',
    top: -avatarMargin,
  },
  avatarImage: {
    borderRadius: 500,
    ...BaseStyles.boxWithShadow,
  },
  pointContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointText: {
    color: Colors.tintColor,
  },
  avatarEditBtnContainer: {
    position: 'absolute',
    bottom: 5,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  row: {
    marginBottom: 10,
  },
  facebookContainer: {
    alignItems: 'baseline',
  },
  editButton: {
    alignItems: 'flex-end',
  },
});
