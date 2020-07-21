import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import CustomIcon from '../../../../../../components/CustomIcon';
import XTextBox2 from '../../../../../../components/XTextBox2';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../constants/BaseStyles';
import Colors from '../../../../../../constants/Colors';
import { FontAwesomeType, IconType } from '../../../../../../constants/Icon';
import AppActions from '../../../../../../redux/app.actions';
import styles from './OrderNotes.style';

const OrderNotes = ({ notes, updateNoteStore, updateNoteDriver }) => {
  const { t } = useTranslation();
  return (
    <View>
      <Text style={styles.title}>{t('CartScreen.OrderNotes.title')}</Text>
      <View
        style={[
          BaseStyles.baseContainer,
          BaseStyles.flexColumn,
          styles.container,
        ]}>
        <View style={[BaseStyles.flexRow]}>
          <CustomIcon
            name="sticky-note"
            type={IconType.FONTAWESOME}
            size={21}
            other={FontAwesomeType.SOLID}
            custom={{ color: Colors.tintColor }}
            // focused
          />
          <Text
            style={[
              BaseFontStyles.menuOrBody2,
              styles.lightGrayText,
              BaseStyles.ml_10,
            ]}>
            {t('CartScreen.OrderNotes.noteForStore')}
          </Text>
        </View>
        <XTextBox2
          value={notes.store}
          onChange={updateNoteStore}
          maxLength={100}
        />
      </View>
      <View
        style={[
          BaseStyles.baseContainer,
          BaseStyles.flexColumn,
          styles.container,
        ]}>
        <View style={[BaseStyles.flexRow]}>
          <CustomIcon
            name="sticky-note"
            type={IconType.FONTAWESOME}
            size={21}
            other={FontAwesomeType.SOLID}
            custom={{ color: Colors.tintColor }}
            // focused
          />
          <Text
            style={[
              BaseFontStyles.menuOrBody2,
              styles.lightGrayText,
              BaseStyles.ml_10,
            ]}>
            {t('CartScreen.OrderNotes.noteForDriver')}
          </Text>
        </View>
        <XTextBox2
          value={notes.driver}
          onChange={updateNoteDriver}
          maxLength={100}
        />
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  notes: state.cart.notes,
});

const mapDispatchToProps = {
  updateNoteDriver: note => ({
    type: AppActions.CART_UPDATE_NOTE,
    payload: { driver: note },
  }),
  updateNoteStore: note => ({
    type: AppActions.CART_UPDATE_NOTE,
    payload: { store: note },
  }),
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderNotes);
