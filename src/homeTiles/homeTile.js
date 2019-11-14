import React, { useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'
import {UpdateAction} from './reducers'
// import ClickNHold from './ClickNHold'
export const TILE_HEIGHT = 250;
export const TILE_WIDTH = 150;
export const TITLE_HEIGHT = 50;

const OuterContainer = styled.div`
  height: ${TILE_HEIGHT}px;
  width: ${TILE_WIDTH}px;
  margin: 20px
`
const HomeTile = styled(animated.div)`
  pointer-events: none;
  position: absolute;
  width: ${TILE_WIDTH}px;
  color: white;
  border-style: solid;
  border-width: thin;
  display: flex;
  justify-content: center;
  flex-direction: column;

`

const TileContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
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

const TileButton = styled.button`
  height: ${TITLE_HEIGHT}px;
  width: ${TILE_WIDTH}px;
  line-height: 50px;
  border-top: thin solid white;
  text-align: center;
  vertical-align: middle;
`

// export function useLongPress(callback = () => {}, ms = 300, 
//   down = ()=>{ }, up = () => {}) {
//   const [startLongPress, setStartLongPress] = useState(false);

//   useEffect(() => {
//     let timerId;
//     if (startLongPress) {
//       timerId = setTimeout(callback, ms);
//     } else {
//       clearTimeout(timerId);
//     }

//     return () => {
//       clearTimeout(timerId);
//     };
//   }, [startLongPress]);

//   return {
//     onMouseDown: () => {setStartLongPress(true); down()},
//     onMouseUp: () => {setStartLongPress(false); up()},
//     onMouseLeave: () => {setStartLongPress(false);up()},
//     // onTouchStart: () => setStartLongPress(true),
//     // onTouchEnd: () => setStartLongPress(false),
//   };
// }

const titlePress = (click=()=>{}, held=()=>{}, released=()=>{})=>{
    return {
      onMouseDown: ()=>held(),
      onMouseUp: ()=>released(),
      onMouseLeave: ()=>released(),
      onClick: ()=>click(),
      onTouchStart: () => held(),
      onTouchEnd: () => released(),
  };
}

const InitialTile = ({title,content})=>{
  const [flipped,toogleFlipped] = useState(false)
  const [MouseScale, setMouseScale] = useState(1)
  const inputFunctions = titlePress(() => toogleFlipped(!flipped), () => setMouseScale(0.7), () => setMouseScale(1.0))
  const { transform, opacity, height, scale } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg) scale(${MouseScale})`,
    height : flipped ? TILE_HEIGHT : 0,
    scale : flipped ? 1 : 1,
    config: { mass: 5, tension: 500, friction: 60 }
  })
  const front =  <><Content>{content}</Content><Title>{title}</Title></>
  const back = <><Content>{content}</Content><TileButton style={{pointerEvents:'auto'}}></TileButton></>
  return(
    <OuterContainer {...inputFunctions}>
      <TileContainer>
        <HomeTile style={{ height: height.interpolate(h => TILE_HEIGHT -h),
           opacity: opacity.interpolate(o => 1 - o), transform }}>
          {front}
        </HomeTile>
        <HomeTile style={{ height, opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`) }}>
          {back}
        </HomeTile>
      </TileContainer>
    </OuterContainer>
   )  
}
const mapStateToProps = (state, props) => ({
  flipped: state.filter(tile=>tile.title===props.title)[0].flipped
})
const mapDispatchToProps = (dispatch) => ({
  toogleFlipped: (flipped,title) => dispatch(UpdateAction(flipped, title))
})
export const ConnectedTile = connect(
  mapStateToProps,
  mapDispatchToProps)
  (InitialTile)

const CardFlipper = ({flipped, front, back, toggleFlipped})=>{
  // const trans2 = (y,s) => `rotateY(${y}deg)`
  // const [RotateProps, set] = useSpring(() => ({ xys: [20, 1], config: { mass: 5, tension: 400, friction: 40 } }))
  // flipped ? set({xys:[180,0]}) : set({xys:[0,0]})
  console.log(flipped)
  return flipped ? <div onClick={()=>flipped && toggleFlipped()}>{back}</div> : <div >{front}</div>
}
// const Card = () => {
//   const [flipped, set] = useState(false)
//   const { transform, opacity } = useSpring({
//     opacity: flipped ? 1 : 0,
//     transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
//     config: { mass: 5, tension: 500, friction: 80 }
//   })
//   return (
//     <div onClick={() => set(state => !state)}>
//       <Content style={{ opacity: opacity.interpolate(o => 1 - o), transform }} />
//       <Content style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }} />
//     </div>
//   )
// }
// const TileDrawer =({open})=>{
//   const [Hover, setHover] = useSpring(()=> ({ width :  0, opacity: 0}))
//   open ? setHover({width: 100 , opacity: 1}) : setHover({width: 0 , opacity: 0})
//   return <Drawer style={Hover}/>
// }
