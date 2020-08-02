import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../../../components/layout/Container';
import Colors from '../../../constants/Colors';
import { FontAwesomeType, IconType } from '../../../constants/Icon';
import SettingHeader from './components/SettingHeader';
import SettingItem from './components/SettingItem';
import SettingMenuConfig from './SettingMenu.config';
import styles from './SettingMenu.style';
import SessionUtils from '../../../session/SessionUtils';

const SettingMenuScreen = (props) => {
  const { t } = useTranslation();
  console.log(
    'SessionUtils.session()?.isLogin ',
    SessionUtils.session()?.isLogin,
  );
  return (
    <Container
      isRequesting={props.isRequesting}
      contentStyle={styles.container}>
      <SettingHeader />
      {SettingMenuConfig.menuList
        .filter(
          (item) =>
            item.isAuthRequired === SessionUtils.session()?.isLogin ||
            !item.isAuthRequired,
        )
        .map((item, key) => (
          <SettingItem
            key={key}
            icon={item.icon}
            style={[styles.item]}
            title={t(item.title)}
            onPress={item.action}
          />
        ))}
      {SessionUtils.session().isLogin && (
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
            SessionUtils.logout();
          }}
        />
      )}
    </Container>
  );
};

export default SettingMenuScreen;
