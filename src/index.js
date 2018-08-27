import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from './configureStore';
import { PersistGate } from 'redux-persist/integration/react'

const initialState = {};
const history = createHistory();
const { store, persistor } = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App/>
		</PersistGate>
	</Provider>,
	MOUNT_NODE,
);

registerServiceWorker();
