import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LazyImage from '../../../../components/LazyImage';
import PointIcon from '../../../../components/PointIcon';
import CustomIcon from '../../../../components/CustomIcon';
import XIconButton from '../../../../components/XIconButton';
import { BaseFontStyles, BaseStyles } from '../../../../constants/BaseStyles';
import Colors from '../../../../constants/Colors';
import { FontAwesomeType, IconType } from '../../../../constants/Icon';
import { normalize } from '../../../../constants/Layout';
import styles from './AccountInfo.style';

// enableScreens();

const AccountInfoScreen = props => {
  const { avatar, userInfo, phone } = props;
  const { t } = useTranslation();
  return (
    <ScrollView style={[styles.flexContainer]}>
      <View style={[styles.flexContainer, styles.container]}>
        <Grid>
          <Row>
            <Col
              style={[
                BaseStyles.baseContainer2,
                styles.shortInfo,
                styles.borderRadius,
              ]}>
              <View style={[styles.avatar]}>
                {avatar.url ? (
                  <LazyImage
                    url={avatar.url}
                    headers={avatar.headers || {}}
                    height={normalize(132)}
                    width={normalize(132)}
                    style={styles.avatarImage}
                  />
                ) : (
                  <CustomIcon
                    name="user-circle"
                    type={IconType.FONTAWESOME}
                    size={normalize(132)}
                    focused
                    other={FontAwesomeType.SOLID}
                    custom={{ style: BaseStyles.textShadow }}
                  />
                )}
                <View
                  style={[
                    BaseStyles.boxWithShadow,
                    styles.avatarEditBtnContainer,
                  ]}>
                  <XIconButton
                    icon={{
                      name: 'edit',
                      type: IconType.FONTAWESOME,
                      size: 19,
                    }}
                    onPress={changeAvatarAction}
                  />
                </View>
              </View>
              <Row style={[styles.row]}>
                <Text style={[BaseFontStyles.headline]}>{userInfo.name}</Text>
              </Row>
              <Row style={[styles.row]}>
                <Text style={[BaseFontStyles.body1]}>
                  {t(userInfo.rank ? `rank.${userInfo.rank}` : 'rank.NC')}
                </Text>
              </Row>
              <Row style={[BaseStyles.flexRow, styles.pointContainer]}>
                <Text style={[BaseFontStyles.body1, styles.pointText]}>
                  {`${userInfo.point} `}
                </Text>
                <PointIcon size={16} focused />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col
              style={[
                BaseStyles.baseContainer2,
                BaseStyles.mt_10,
                styles.borderRadius,
              ]}>
              <Row style={[styles.row]}>
                <Col size={9}>
                  <Text style={[BaseFontStyles.title]}>
                    {t('AccountInfoScreen.userInfo')}
                  </Text>
                </Col>
                <Col size={1}>
                  <XIconButton
                    icon={{
                      name: 'edit',
                      type: IconType.FONTAWESOME,
                      size: 19,
                    }}
                    onPress={() =>
                      props.navigation.navigate('accountInfoUpdate')
                    }
                    style={styles.editButton}
                  />
                </Col>
              </Row>
              <Row style={[styles.row]}>
                <Col>
                  <Row>
                    <Text style={[BaseFontStyles.caption, BaseStyles.label]}>
                      {t('AccountInfoScreen.name')}
                    </Text>
                  </Row>
                  <Row>
                    <Text style={[BaseFontStyles.body1]}>{userInfo.name}</Text>
                  </Row>
                </Col>
              </Row>
              <Row style={[styles.row]}>
                <Col>
                  <Row>
                    <Col>
                      <Row>
                        <Text
                          style={[BaseFontStyles.caption, BaseStyles.label]}>
                          {t('AccountInfoScreen.dob')}
                        </Text>
                      </Row>
                      <Row>
                        <Text style={[BaseFontStyles.body1]}>
                          {addFormatDate(userInfo.dob)}
                        </Text>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Text style={[BaseFontStyles.caption, BaseStyles.label]}>
                    {t('AccountInfoScreen.sex')}
                  </Text>
                  <Text style={[BaseFontStyles.body1]}>
                    {t(`sex.${userInfo.sex}`)}
                  </Text>
                </Col>
              </Row>
              <Row style={[styles.row]}>
                <Col>
                  <Row>
                    <Text style={[BaseFontStyles.caption, BaseStyles.label]}>
                      {t('AccountInfoScreen.phone')}
                    </Text>
                  </Row>
                  <Row>
                    <Text style={[BaseFontStyles.body1]}>{phone}</Text>
                  </Row>
                </Col>
              </Row>
              <Row style={[styles.row]}>
                <Col>
                  <Row style={styles.facebookContainer}>
                    <Text style={[BaseFontStyles.caption, BaseStyles.label]}>
                      {t('AccountInfoScreen.link')}
                    </Text>
                    <CustomIcon
                      name="facebook"
                      size={19}
                      custom={{
                        color: Colors.facebook,
                        style: BaseStyles.ml_10,
                      }}
                      focused
                    />
                  </Row>
                </Col>
                <Col>
                  <Text
                    onPress={!userInfo.linkedFb ? linkWithFbAction : null}
                    style={[
                      BaseFontStyles.body1,
                      BaseStyles.alignTextRight,
                      !userInfo.linkedFb ? { color: Colors.tintColor } : null,
                    ]}>
                    {t(
                      userInfo.linkedFb
                        ? 'AccountInfoScreen.linked'
                        : 'AccountInfoScreen.notLinked',
                    )}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </View>
    </ScrollView>
  );
};

const addFormatDate = timeStamp => {
  const date = new Date(timeStamp);
  const addZeroIfNeed = number => (number > 9 ? number : `0${number}`);
  return `${addZeroIfNeed(date.getDate())}/${addZeroIfNeed(
    date.getMonth() + 1,
  )}/${date.getFullYear()}`;
};

const changeAvatarAction = () => {
  alert('change avatar!');
};
const linkWithFbAction = () => {
  alert('link fb');
};

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  phone: state.auth.phone,
  avatar: { url: state.auth.userInfo.avatar },
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountInfoScreen);
