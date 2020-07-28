import { ajax } from 'rxjs/ajax';
import { ajaxPost } from 'rxjs/internal/observable/dom/AjaxObservable';
import { catchError, tap } from 'rxjs/operators';
import ServiceUtils from './ServiceUtils';
import useRootNavigation from '../../utils/useRootNavigation';
import { of } from 'rxjs';

const navigation = useRootNavigation();
const request = (url, method, body, headers, params) => {
  console.log(
    'HTTPCLIENT.REQUEST',
    method,
    url,
    'headers:',
    headers,
    'body:',
    JSON.stringify(body),
    'params',
    params,
  );
  return ajax({
    ...{
      url: encodeURI(`${url}${ServiceUtils.buildParams(params)}`),
      method,
      headers,
      body,
    },
    timeout: 15000,
  }).pipe(
    catchError(e => {
      if (e.status === 401) {
        navigation.navigate('Auth', { screen: 'login' });
      }
      return of({
        response: {
          status: e.status,
          message: e.message,
          error: e.name,
          result: 'fail',
        },
        fullError: e,
      });
    }),
    tap(data => {
      console.log(
        'HTTPCLIENT.RESPONSE',
        method,
        url,
        JSON.stringify(data.response),
      );
    }),
  );
};

const HttpClient = {
  get: (url, headers, params) => request(url, 'GET', null, headers, params),
  put: (url, body, headers, params) =>
    request(
      url,
      'PUT',
      body,
      {
        'Content-Type': 'application/json',
        ...headers,
      },
      params,
    ),
  post: (url, body, headers, params) =>
    request(
      url,
      'POST',
      body,
      {
        'Content-Type': 'application/json',
        ...headers,
      },
      params,
    ),
  delete: (url, headers, params) =>
    request(url, 'DELETE', null, headers, params),
};

export default HttpClient;
