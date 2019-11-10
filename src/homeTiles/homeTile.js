import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'
import {UpdateAction} from './reducers'
// import ClickNHold from './ClickNHold'
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

const TileButton = styled.button`
  height: ${TITLE_HEIGHT}px;
  width: 200px;
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

const trans = (y,s) => `rotateY(${y}deg) scale(${s})`
const InitialTile = ({title,content, flipped, toogleFlipped})=>{
  const [down,setDown] = useState(false)
  const angle = flipped ? 0 : 180
  const [clickProps, set] = useSpring(() => ({ xys: [0, 1], config: { mass: 5, tension: 400, friction: 40 } }))
  // const [scaleProp, setScale] = use
  // console.log(flipped)
  const front =  <><Content>{content}</Content><Title>{title}</Title></>
  const back = <><Content>{content}</Content><TileButton></TileButton></>
  // const heightExtra = {height: clicked? 400 : 300}
      // time={0.5}
    // onStart={()=> set({xys: [0, 0.8]})}
    // onEnd={(e, enough)=>{
    //   !enough ? setClick(!clicked) : set({xys: [0, 1.0]})
    //   enough && setClick(false)
    //   }}>
  return(
    <div 
      onClick={()=>{
        // set({xys: [angle, 1.0]})
        !flipped && toogleFlipped(true, title)
        }
      }
      onMouseDown={()=>{
        set({xys: [angle, 0.8]})
        // toogleFlipped(true, title)
        setDown(true)
      }}
      onMouseUp={()=>{
        set({xys: [angle, !flipped ? 1.1 : 1.0]})
        
      }}
      // onMouseLeave={()=>{
      //   down && set({xys: [angle, flipped ? 1.1 : 1.0]})
      //   setDown(false)
      // }}
    >
      <TileContainer 
        style={{transform: clickProps.xys.interpolate(trans)}}
        >
        <HomeTile>
          <CardFlipper toggleFlipped={()=>toogleFlipped(false, title)} flipped={flipped} front = {front} back ={back}/>
        </HomeTile>
        {/* <TileDrawer open={clicked}/> */}
      </TileContainer>
    </div>
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

// const TileDrawer =({open})=>{
//   const [Hover, setHover] = useSpring(()=> ({ width :  0, opacity: 0}))
//   open ? setHover({width: 100 , opacity: 1}) : setHover({width: 0 , opacity: 0})
//   return <Drawer style={Hover}/>
// }
