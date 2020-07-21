import Actions from './Home.actions';
import i18n from '../../../languages/i18n.config';

export default {
  initState: {
    isRequesting: true,
    isFail: false,
    blogs: [],
    banner: [],
  },
  reducer: (state, { type, payload }) => {
    switch (type) {
      case Actions.GetData_request: {
        return {
          ...state,
          isRequesting: true,
          isFail: false,
        };
      }
      case Actions.GetData_success: {
        const newState = {
          ...state,
          isRequesting: false,
          isFail: false,
          blogs: payload.blogs.map(blog => ({
            ...blog,
            thumb: payload.pathPhoto + '/' + blog.thumb,
          })),
          banner: payload.banner.map(b => ({
            photo: `${payload.pathPhotoBanner}/${
              i18n.language === 'vi-VN' ? b.photoVi : b.photoEn
            }`,
            thumb: `${payload.pathPhotoBanner}/${
              i18n.language === 'vi-VN' ? b.thumbVi : b.thumbEn
            }`,
            link: b.link,
          })),
        };
        // console.log(newState);
        return newState;
      }
      case Actions.GetData_fail: {
        return {
          ...state,
          isRequesting: false,
          isFail: true,
        };
      }
      default:
        return state;
    }
  },
};
