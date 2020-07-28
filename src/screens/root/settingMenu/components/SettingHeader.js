import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-svg';
import { connect } from 'react-redux';
import CustomIcon from '../../../../components/CustomIcon';
import { BaseFontStyles, BaseStyles } from '../../../../constants/BaseStyles';
import Colors from '../../../../constants/Colors';
import { FontAwesomeType, IconType } from '../../../../constants/Icon';
import XIconButton from '../../../../components/XIconButton';
import { Badge } from 'react-native-elements';

const SettingHeader = ({ userInfo, phone, isNew }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={[BaseStyles.flexRow, BaseStyles.alignItemsCenter]}>
        <View style={[styles.avatarContainer, BaseStyles.boxWithShadow]}>
          {userInfo?.avatar ? (
            <Image style={styles.avatar} source={{ url: userInfo?.avatar }} />
          ) : (
            <CustomIcon
              type={IconType.FONTAWESOME}
              size={64}
              name="user-circle"
              focused={true}
              other={FontAwesomeType.SOLID}
              custom={{ style: BaseStyles.textShadow }}
            />
          )}
        </View>
        <View style={styles.userInfoContainer}>
          <View style={BaseStyles.flexRow}>
            <Text style={[BaseFontStyles.title, BaseStyles.greenColor]}>
              {userInfo?.name || phone}
            </Text>
          </View>
          <Text style={BaseFontStyles.caption}>
            {t(userInfo?.role ? `role.${userInfo?.role}` : 'role.staff')}
          </Text>
        </View>
      </View>
      <View>
        <XIconButton
          icon={{
            name: 'bell',
            iconType: IconType.FONTAWESOME,
            size: 24,
            other: FontAwesomeType.SOLID,
          }}
          color={isNew > 0 ? Colors.tintColor : Colors.gray}
        />
        {isNew > 0 && (
          <Badge
            value={isNew}
            status={'error'}
            containerStyle={styles.notify}
          />
        )}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  const { auth, notify } = state;
  return {
    phone: auth?.phone,
    isNew: notify?.isNew,
  };
};
export default connect(mapStateToProps, null)(SettingHeader);

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...BaseStyles.baseContainerWithoutTopBottomPadding,
    paddingTop: 10,
    paddingBottom: 10,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    color: Colors.tintColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
  userInfoContainer: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  point: {
    alignItems: 'center',
  },
  loginBtn: {
    width: 150,
  },
});
