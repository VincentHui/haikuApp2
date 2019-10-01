import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'
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
  margin: 20px
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
  const [props, set] = useSpring(() => ({ xys: [0, 1], config: { mass: 5, tension: 400, friction: 40 } }))
  const testPress = useLongPress(
    ()=>setClick(false), 
    500, 
  ()=> {set({ xys: [0, 0.8]}); setClick(!clicked)},
  ()=> set({ xys: [0, clicked ? 1.1 : 1.0]}))
  return(
       <HomeTile style={{height, transform: props.xys.interpolate(trans) }} 
        {...testPress}
      >
        <Content>{content}</Content>
        <Title>{title}</Title>
      </HomeTile>
   )
}


