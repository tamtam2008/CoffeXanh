import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import HTML from 'react-native-render-html';
import Container from '../../../components/layout/Container';
import LazyImage from '../../../components/LazyImage';
import { BaseFontStyles, BaseStyles } from '../../../constants/BaseStyles';
import Layout from '../../../constants/Layout';
import HomeService from '../../../services/HomeService';
import Actions from './BlogDetail.actions';
import BlogDetailScreenReducer from './BlogDetail.reducer';
import Colors from '../../../constants/Colors';

const BlogDetailScreen = ({ route, navigation }) => {
  const [state, dispacth] = React.useReducer(
    BlogDetailScreenReducer.reducer,
    BlogDetailScreenReducer.initState,
  );
  const { id, title, image } = route.params;
  console.log(route.params);
  useEffect(() => {
    if (state.isRequesting) {
      HomeService.getBlogDetail(id).subscribe(
        data => {
          if (data.response.status === 200) {
            dispacth({
              type: Actions.GetData_success,
              payload: data.response.data,
            });
          } else {
            dispacth({ type: Actions.GetData_fail });
          }
        },
        e => {
          console.log('error', e);
          dispacth({ type: Actions.GetData_fail });
        },
      );
    }
  }, [id, navigation, state.isRequesting, state.title, title]);

  const htmlStyles = { p: { fontFamily: 'Roboto-Medium', color: Colors.gray } };
  return (
    <Container isLoading={state.isRequesting} isFail={state.isFail}>
      <ScrollView style={[styles.container]}>
        <LazyImage url={image} width={Layout.window.width} height={200} />
        <Text style={[BaseFontStyles.title, styles.title]}>
          {state.title || title}
        </Text>
        <HTML
          html={state.content}
          imagesMaxWidth={Layout.window.width - 32}
          containerStyle={BaseStyles.baseContainerNoShadow}
          tagsStyles={htmlStyles}
          allowFontScaling={true}
        />
      </ScrollView>
    </Container>
  );
};

export default BlogDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingHorizontal: 16,
    color: Colors.tintColor,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
});
