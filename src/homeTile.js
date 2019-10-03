import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'
import ClickNHold from './ClickNHold'
export const TILE_HEIGHT = 300;
export const TITLE_HEIGHT = 50;
const HomeTile = styled(animated.div)`
  width: 200px;
  color: white;
  border-style: solid;
  border-width: thin;
  display: flex;
  justify-content: center;
  flex-direction: column;

`

const TileContainer = styled(animated.div)`
  display: flex;
  margin: 20px
`

const Drawer = styled(animated.div)`
  color: white;
  width: 0px;
  height: 50px;
  border-style: solid;
  border-width: thin;
`

const Content =styled.div`
  flex-grow: 3;
`

const Title = styled.div`
  height: ${TITLE_HEIGHT}px;
  line-height: 50px;
  border-top: thin solid white;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select:none;
  -khtml-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  -o-user-select:none;
  user-select:none;
`
export function useLongPress(callback = () => {}, ms = 300, 
  down = ()=>{ }, up = () => {}) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [startLongPress]);

  return {
    onMouseDown: () => {setStartLongPress(true); down()},
    onMouseUp: () => {setStartLongPress(false); up()},
    onMouseLeave: () => {setStartLongPress(false);up()},
    // onTouchStart: () => setStartLongPress(true),
    // onTouchEnd: () => setStartLongPress(false),
  };
}

const trans = (y,s) => `rotateY(${y}deg) scale(${s})`
export const InitialTile = (title,content, height)=>{
  const [clicked,setClick] = useState(false)
  const [clickProps, set] = useSpring(() => ({ xys: [0, 1], config: { mass: 5, tension: 400, friction: 40 } }))
  clicked ? set({xys:[0,1.1]}) : set({xys:[0,1]})
  return(
    <ClickNHold
    time={0.5}
    onStart={()=> set({xys: [0, 0.8]})}
    onEnd={(e, enough)=>{
      !enough ? setClick(!clicked) : set({xys: [0, 1.0]})
      enough && setClick(false)
      }}>
      <TileContainer 
        style={{height, transform: clickProps.xys.interpolate(trans) }}
        >
        <HomeTile>
          <Content>{content}</Content>
          <Title>{title}</Title>
        </HomeTile>
        <TileDrawer open={clicked}/>
      </TileContainer>
    </ClickNHold>
   )
}

const TileDrawer =({open})=>{
  const [Hover, setHover] = useSpring(()=> ({ width :  0, opacity: 0}))
  open ? setHover({width: 100 , opacity: 1}) : setHover({width: 0 , opacity: 0})
  return <Drawer style={Hover}/>
}
