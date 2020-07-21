import { ajax } from 'rxjs/ajax';
import { ajaxPost } from 'rxjs/internal/observable/dom/AjaxObservable';

const request = (url, method, body, headers) => {
  console.log(
    'httpClient.request',
    url,
    method,
    'headers:',
    headers,
    'body:',
    body,
  );
  return ajax({
    ...{
      url,
      method,
      headers,
      body,
    },
    timeout: 30000,
  });
};

const HttpClient = {
  get: (url, headers) => request(url, 'GET', null, headers),
  put: (url, body, headers) =>
    request(url, 'PUT', body, {
      'Content-Type': 'application/json',
      ...headers,
    }),
  post: (url, body, headers) =>
    ajaxPost(url, body, {
      'Content-Type': 'application/json',
      ...headers,
    }),
  delete: (url, headers) => request(url, 'DELETE', null, headers),
};

export default HttpClient;
