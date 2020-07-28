import React from 'react';
import Container from '../../../components/layout/Container';
import SessionUtils from '../../../session/SessionUtils';
import WebView from 'react-native-webview';
import { ActivityIndicator } from 'react-native';

const HelpScreen = ({}) => {
  const { pathHelpLink } = SessionUtils.config();
  return (
    <Container scrollEnabled={false}>
      <WebView
        originWhitelist={['*']}
        source={{
          uri: pathHelpLink,
        }}
        containerStyle={{
          flex: 1,
        }}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        allowUniversalAccessFromFileURLs={true}
        useWebKit={true}
        thirdPartyCookiesEnabled={true}
        allowsInlineMediaPlayback={true}
        allowsLinkPreview={true}
      />
    </Container>
  );
};

export default HelpScreen;
