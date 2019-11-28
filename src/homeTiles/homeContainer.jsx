import React, { useState} from 'react'
import styled from 'styled-components'
import { useTrail, animated } from 'react-spring'
import {connect} from 'react-redux'
import { ConnectedTile, TILE_HEIGHT, TITLE_HEIGHT } from './homeTile'
const config = { mass: 5, tension: 2000, friction: 350 }
const HomeContainer = styled.div`
  min-height: 100vh;
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
const HomeTiles = styled(animated.div)`
    margin: 20px;
`
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
      <HomeTiles
        key={tiles[index].title}
        style={{ ...rest, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
          <ConnectedTile 
            title={tiles[index].title} 
            content={tiles[index].icon(svgHeight)}
            />
      </HomeTiles>
    ))}
    </HomeContainer>)   
  }
  
  const mapStateToProps = (state) => ({
    tiles: state.homeTiles,
    selectedTile : state.SelectedTile
  })
  export const ConnectedHome = connect(
    mapStateToProps)
    (Home)