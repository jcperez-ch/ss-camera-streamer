import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as ReactDom from 'react-dom';

import { AppState, reducer } from '../store';
import { App } from './components/App/index';
import { configureAgent } from './agent';
import './reset.scss';

declare const initialState: AppState;

const store = createStore(
    reducer,
    initialState,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);
configureAgent(store);

ReactDom.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('app'),
);
