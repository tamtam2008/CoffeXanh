import * as React from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Container from '../../../components/layout/Container';
import Colors from '../../../constants/Colors';
import Blogs from './components/Blogs/Blogs';
import CarouselComponent from './components/Carousel/Carousel';
import Header from './components/Header';
import TopButtons from './components/TopButtons/TopButtons';
import Controller from './Home.controller';
import HomeScreenReducer from './Home.reducer';

function HomeScreen() {
  const [state, dispacth] = React.useReducer(
    HomeScreenReducer.reducer,
    HomeScreenReducer.initState,
  );
  React.useEffect(() => {
    if (state.isRequesting) {
      Controller.getData(dispacth);
    }
    return () => {
      Controller.clearAll();
    };
  }, [state.isRequesting]);

  const onRefresh = React.useCallback(() => {
    Controller.getData(dispacth);
  }, []);

  return (
    <Container>
      <Header />
      <ScrollView
        contentContainerStyle={[styles.contentContainer]}
        refreshControl={
          <RefreshControl
            refreshing={state.isRequesting}
            onRefresh={onRefresh}
          />
        }>
        <TopButtons />
        <Container isLoading={state.isRequesting}>
          <CarouselComponent data={state.banner} />
          <Blogs data={state.blogs} />
        </Container>
      </ScrollView>
    </Container>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  contentContainer: {
    paddingVertical: 16,
  },
});
