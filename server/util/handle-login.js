import express from 'express';
import axios from 'axios';

const Router = express.Router();
const baseUrl = 'http://cnodejs.org/api/v1';

Router.post('/login', (req, res, next) => {
  axios
    .post(`${baseUrl}/accesstoken`, {
      accesstoken: req.body.accessToken
    })
    .then((resp) => {
      if (resp.status === 200 && resp.data.sucess) {
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: resp.body.loginname,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url
        };
        res.json({
          sucess: true,
          data: resp.data
        });
      }
    })
    .catch((err) => {
      if (err.response) {
        res.json({
          sucess: false,
          data: err.response
        });
      } else {
        next(err);
      }
    });
});

export default Router;
