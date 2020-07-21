enum Actions {
  countDown,
  renew,
}

export { Actions };

const TIME_DELAY = 60 * 2; //60 secs

export default {
  initState: {
    count: TIME_DELAY,
  },
  reducer: (state: any, { type }: any) => {
    switch (type) {
      case Actions.countDown: {
        return {
          count: state.count - 1,
        };
      }
      case Actions.renew: {
        return { count: TIME_DELAY };
      }
      default:
        return state;
    }
  },
};
