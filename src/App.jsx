import React from 'react';
import styled from 'styled-components'
import reducer  from './reducer'
import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import {RootNavigation} from './rootNavigation'
const store = createStore(reducer, applyMiddleware(logger))
const AppParent = styled.div`
  user-select: none;
  text-align: center;
  background-color: #282c34;
  font-size: calc(10px + 2vmin);
  font-family:Roboto;  
  text-transform: uppercase;
`

function App() {
  return (
    <Provider store={store}>
      <AppParent>
        <RootNavigation/>
      </AppParent>
    </Provider>

  );
}

export default App;
