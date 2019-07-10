// server/utils.js
import routers from '../router'
import { renderToString } from 'react-dom/server';
//重要是要用到StaticRouter
import { StaticRouter, Route } from 'react-router-dom'; 
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import React from 'react'

export const render = (store, req) => {
  //构建服务端的路由
  const content = renderToString(
    <Provider store={store}>
        <StaticRouter location={req.path} >
            <div>
                {renderRoutes(routers)}
            </div>
        </StaticRouter>
    </Provider>
  );
  return `
    <html>
      <head>
        <title>ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.context = {
            state: ${JSON.stringify(store.getState())}
          }
        </script>
        <script src="/index.js"></script>
      </body>
    </html>
  `
}
