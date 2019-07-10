//client/index. js
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from '../containers/home';
import { renderRoutes } from 'react-router-config';
import {getClientStore} from '../store';
import routes from '../router';

const App = () => {
    const store = getClientStore();
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    {renderRoutes(routes)}
                </div>
            </BrowserRouter>
        </Provider>
    )
}

ReactDom.hydrate(<App />, document.getElementById('root'))
