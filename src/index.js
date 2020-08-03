import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import reducer  from './reducer'
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
const migrations = {
    0: (state) => {
      // migration clear out device state
      return {
        ...reducer 
      }
    },
    1: (state) => {
      // migration to keep only device state
      return {
        ...state
      }
    }
  }
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    migrate: createMigrate(migrations)
  }

  const persistConfigDebug = {
    key: 'root',
    version: 0,
    storage,
    migrate: createMigrate(migrations)
  }
  
const persistedReducer = persistReducer(persistConfig, reducer)
  

// import {RootNavigation} from './rootNavigation'
// const store = createStore(reducer, applyMiddleware(logger))
let store = createStore(persistedReducer, applyMiddleware(logger))
  let persistor = persistStore(store)
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
,
    document.getElementById('root'),
  )
  