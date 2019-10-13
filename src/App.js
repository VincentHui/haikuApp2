import React from 'react';
import styled from 'styled-components'
import { useTrail, animated } from 'react-spring'
import { InitialTile, TILE_HEIGHT, TITLE_HEIGHT } from './homeTile'
import { AnimatedSkull } from './svg/AnimatedSkull'
import { AnimatedGhost } from './svg/AnimatedGhost'
import TransitionMenu from './transition/TransitionMenu'

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
// const animatedSkull = styled()
const titles =[{title:'FIREFLIE', icon:AnimatedSkull},
  {title:'DESCENT', icon:AnimatedGhost},
  {title:'FISH', icon:AnimatedSkull},
  {title:'SUNLIGHT', icon:AnimatedGhost},
  {title:'A RUIN', icon:AnimatedSkull},
  {title:'ROSE',icon:AnimatedSkull}]
const config = { mass: 5, tension: 2000, friction: 350 }
function App() {
  const trail = useTrail(titles.length, {
    config,
    opacity: 1 ,
    x:  0 ,
    height: TILE_HEIGHT ,
    svgHeight: TILE_HEIGHT-TITLE_HEIGHT,
    from: { opacity: 0, x: 10, height: 0 , svgHeight: 0},
  })
  return (
    <AppParent>
      <HomeContainer>
        {trail.map(({ x, height,svgHeight, ...rest }, index) => (
          <animated.div
            key={titles[index].title}
            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
              <InitialTile title={titles[index].title} 
                content={titles[index].icon(svgHeight)}
                />
          </animated.div>
        ))}
      </HomeContainer>   
    </AppParent>
    // <TransitionMenu></TransitionMenu>
  );
}
export default App;
