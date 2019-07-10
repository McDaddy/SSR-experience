// server/index.js
import express from 'express';
import React from 'react';
import { matchRoutes } from 'react-router-config';
import {render} from './utils';
import {getStore} from '../store';
import routes from '../router';
import proxy from 'express-http-proxy';

const app = express();
app.use(express.static('public'));

app.use('/api', proxy('http://localhost:4000', {
  proxyReqPathResolver: function(req) {
    return '/api'+req.url
  }
}));

app.get('*', function (req, res) {
  const store = getStore();
  // 根据路由的路径，来往store里面加数据
  const matchedRoutes = matchRoutes(routes, req.path);
  const promises = [];
  
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      const promise = new Promise((resolve, reject) => {
        item.route.loadData(store).then(resolve).catch(resolve);
      })
      promises.push(promise);
    };
  });
  Promise.all(promises).then(() => {
    let context = {css: []};
    const html = render(store, routes, req, context);

    if(context.action === 'REPLACE') {
      res.redirect(301, context.url);
    } else if(context.NotFound) {
      res.status(404);
      res.send(html);
    } else {
      res.send(html);
    }
  })
})
app.listen(3001, () => {
  console.log('listen:3001')
})

