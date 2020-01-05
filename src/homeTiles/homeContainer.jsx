import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useTrail, animated, useSpring } from 'react-spring'
import {connect} from 'react-redux'

import { ConnectedTile, TILE_HEIGHT, TITLE_HEIGHT } from './homeTile'
import { contentDict } from './reducers'
const config = { mass: 5, tension: 1500, friction: 350 }
const HomeContainer = styled(animated.div)`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
const HomeTiles = styled(animated.div)`
    margin: 20px;
`

const Home =({tiles, y})=>{
  const [, setY] = useSpring(() => ({ y: 0 }))
  const trail = useTrail(tiles.length, {
    config,
    opacity: 1 ,
    x:  0 ,
    height: TILE_HEIGHT ,
    svgHeight: TILE_HEIGHT-TITLE_HEIGHT,
    from: { opacity: 0, x: 10, height: TILE_HEIGHT , svgHeight: TILE_HEIGHT-TITLE_HEIGHT},
  })

  useEffect(() => {
      // console.log('SELECT')
      // console.log(y)
      
      // setTimeout(function(){ 
 
      // }, 1000);
    setY({
      y: y,
      reset: true,
      from: { y: window.scrollY },
      onFrame: props => window.scroll(0, props.y)
    })

   }, []);
    return (<HomeContainer>
    {trail.map(({ x, svgHeight, ...rest }, index) => {
      const key = tiles[index].contentKey;
      const content =contentDict[key]
      return <HomeTiles
        key={key}
        style={{ ...rest, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
          <ConnectedTile 
            contentKey={key}
            title={content.title} 
            content={content.icon(svgHeight)}
            />
      </HomeTiles>
      }
    )}
    </HomeContainer>)   
  }
  
  const mapStateToProps = (state) => ({
    tiles: state.homeTiles,
    y : state.SelectedTile.yOffset
  })
  export const ConnectedHome = connect(
    mapStateToProps)
    (Home)