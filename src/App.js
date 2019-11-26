import React from 'react';
import styled from 'styled-components'
import {connect} from 'react-redux'
import {SelectedTile} from './SelectedTile/selectedTile' 
import { useTrail, animated, useSpring } from 'react-spring'
import { ConnectedTile, TILE_HEIGHT, TITLE_HEIGHT } from './homeTiles/homeTile'
import reducer  from './reducer'
import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger'
import { Provider } from 'react-redux'
const store = createStore(reducer, applyMiddleware(logger))
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
const Nav = {
  HOME:'HOME',
  SELECTED:'SELECTED'
}

const config = { mass: 5, tension: 2000, friction: 350 }
function App() {
  const { x} = useSpring({
    x:  0 ,
    config: { mass: 10, tension: 500, friction: 250 },
    from: { x: -300}
  })
  return (
    <Provider store={store}>
      <AppParent>
        <animated.div
          style={{transform: x.interpolate(x => `translate3d(${x}px,0,0)`)}}>
          <ConnectedHome />
        </animated.div>
        <animated.div>
          <SelectedTile />
        </animated.div>
      </AppParent>
    </Provider>

  );
}

const Home =({tiles, selectedTile})=>{
  const trail = useTrail(tiles.length, {
    config,
    opacity: 1 ,
    x:  0 ,
    height: TILE_HEIGHT ,
    svgHeight: TILE_HEIGHT-TITLE_HEIGHT,
    from: { opacity: 0, x: 10, height: 0 , svgHeight: 0},
  })

  return (<HomeContainer>
  {trail.map(({ x, svgHeight, ...rest }, index) => (
    <animated.div
      key={tiles[index].title}
      style={{ ...rest, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
        <ConnectedTile 
          title={tiles[index].title} 
          content={tiles[index].icon(svgHeight)}
          />
    </animated.div>
  ))}
  </HomeContainer>)   
}

const mapStateToProps = (state) => ({
  tiles: state.homeTiles,
  selectedTile : state.SelectedTile
})
const ConnectedHome = connect(
  mapStateToProps)
  (Home)
export default App;
