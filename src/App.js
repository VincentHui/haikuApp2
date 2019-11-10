import React from 'react';
import styled from 'styled-components'
import {connect} from 'react-redux'
import { useTrail, animated } from 'react-spring'
import { ConnectedTile, TILE_HEIGHT, TITLE_HEIGHT } from './homeTiles/homeTile'
// import { createStore } from 'redux-react'
import { homeTiles, UpdateAction } from '../src/homeTiles/reducers'
import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger'
import { Provider } from 'react-redux'
// import TransitionMenu from './transition/TransitionMenu'
const store = createStore(homeTiles, applyMiddleware(logger))
const AppParent = styled.div`
  user-select: none;
  text-align: center;
  background-color: #282c34;
  font-size: calc(10px + 2vmin);
  font-family:Roboto;
  text-transform: uppercase;
`
const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const tiles = store.getState()
// store.dispatch(UpdateAction(true, 'FIREFLY'));
const config = { mass: 5, tension: 2000, friction: 350 }
function App() {

  return (
    <Provider store={store}>
      <AppParent>
        <ConnectedHome />
      </AppParent>
    </Provider>

  );
}

const Home =({tiles})=>{
  const trail = useTrail(tiles.length, {
    config,
    opacity: 1 ,
    x:  0 ,
    height: TILE_HEIGHT ,
    svgHeight: TILE_HEIGHT-TITLE_HEIGHT,
    from: { opacity: 0, x: 10, height: 0 , svgHeight: 0},
  })

  return (<HomeContainer>
  {trail.map(({ x, height,svgHeight, ...rest }, index) => (
    <animated.div
      key={tiles[index].title}
      style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
        <ConnectedTile title={tiles[index].title} 
          content={tiles[index].icon(svgHeight)}
          />
    </animated.div>
  ))}
  </HomeContainer>)   
}

const mapStateToProps = (state) => ({
  tiles: state
})
const ConnectedHome = connect(
  mapStateToProps)
  (Home)
export default App;
