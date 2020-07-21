import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Container from '../../../components/layout/Container';
import Colors from '../../../constants/Colors';
import { FontAwesomeType, IconType } from '../../../constants/Icon';
import AppActions from '../../../redux/app.actions';
import SettingHeader from './components/SettingHeader';
import SettingItem from './components/SettingItem';
import SettingMenuConfig from './SettingMenu.config';
import styles from './SettingMenu.style';

const SettingMenuScreen = props => {
  const { t } = useTranslation();
  return (
    <Container isRequesting={props.isRequesting}>
      <ScrollView contentContainerStyle={styles.container}>
        <SettingHeader />
        {SettingMenuConfig.menuList
          .filter(
            item =>
              item.isAuthRequired === props.isLogin || !item.isAuthRequired,
          )
          .map((item, key) => (
            <SettingItem
              key={key}
              icon={item.icon}
              style={[styles.item]}
              title={t(item.title)}
              titleStyle={[styles.item]}
              onPress={item.action}
            />
          ))}
        {props.isLogin && (
          <SettingItem
            icon={{
              name: 'sign-out-alt',
              type: IconType.FONTAWESOME,
              other: FontAwesomeType.SOLID,
              color: Colors.red,
            }}
            style={[styles.item, styles.logout]}
            title={t('SettingMenu.logout')}
            titleStyle={[styles.logout]}
            onPress={() => {
              props.logout();
            }}
          />
        )}
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = state => {
  const { auth } = state;
  return { isLogin: auth.isLogin };
};

const mapDispatchToProps = {
  logout: () => ({ type: AppActions.LOGOUT }),
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingMenuScreen);
