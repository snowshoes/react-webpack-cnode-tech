import axios from 'axios';
import queryString from 'query-string';

const baseUrl = 'http://cnodejs.org/api/v1';

export default (req, res) => {
  // const { path, session, query, method } = req;
  // const { user } = session;
  // const { needAccessToken } = query;
  // const { accessToken } = user;
  const { path } = req;
  const user = req.session.user || {
  };
  const { needAccessToken } = req.query;

  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    });
  }

  const query = Object.assign({
  }, req.query, {
    accesstoken: needAccessToken && req.method === 'GET' ? user.accessToken : ''
  });
  if (query.needAccessToken) delete query.needAccessToken;

  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    // without querystring.stringify()
    // {'accesstoken': 'xxx'}
    // with then format will be
    // 'accesstoken=xxxx', will be accepted by
    // 'Content-Type': 'application/x-www-form-urlencoded'
    data: queryString.stringify(Object.assign({
    }, req.body, {
      accesstoken:
          needAccessToken && req.method === 'POST' ? user.accessToken : ''
    })),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then((resp) => {
      if (resp.status === 200) {
        res.send(resp.data);
      } else {
        res.status(resp.status).send(resp.data);
      }
    })
    .catch((err) => {
      if (err.response) {
        res.status(500).send(err.response.data);
      } else {
        res.status(500).send({
          success: false,
          msg: 'Unknown error'
        });
      }
    });
};
