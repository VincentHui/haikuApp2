import React, { useState} from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'
import { FlipAction, SelectAction, UnSelectAction, OpenModalAction, ModalNames } from './reducers'
import {SelectedTileMain} from '../SelectedTile/selectedTile'
import {string_to_slug} from './reducers'
import { useHistory } from "react-router-dom"
export const TILE_HEIGHT = 250;
export const TILE_WIDTH = 150;
export const TITLE_HEIGHT = 50;

const OuterContainer = styled.div`
  height: ${TILE_HEIGHT}px;
  width: ${TILE_WIDTH}px;

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
  height:200px;
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

export const TileButton = styled(animated.div)`
  height: ${TITLE_HEIGHT}px;
  width: ${TILE_WIDTH}px;
  background-color: white;
  color: black;
  line-height: 50px;
  font-size: calc(10px + 2vmin);
  border-top: thin solid white;
  text-align: center;
  vertical-align: middle;
`

const TileWithSpring = ({onClick,children})=>{
  const [MouseScale, setMouseScale] = useState(1.0)
  const { transform } = useSpring({
    transform: `perspective(600px) scale(${MouseScale})`,
    config: { mass: 5, tension: 500, friction: 60 }
  })

  const inputFunctions = titlePress(
    (ev) => {ev.stopPropagation(); onClick()}, 
    (ev) => {ev.stopPropagation(); setMouseScale(1.3)}, 
    (ev) => {ev.stopPropagation(); setMouseScale(1.0)})
  return <TileButton {...inputFunctions} style={{width:"100%", transform:transform}}>{children}</TileButton>
}

export const TileSpring = styled(TileWithSpring)`
width:100%
`

const titlePress = ( click=(ev)=>{}, held=(ev)=>{}, released=(ev)=>{})=>{
    return {
      onMouseDown: held,
      onMouseUp: released,
      onMouseLeave: released,
      onClick: click,
      onTouchStart: held,
      onTouchEnd: released
  };
}

const Back = ({content, setScale, flipped, setSelect})=> {
  const inputFunctions = titlePress(
    (ev) => {ev.stopPropagation(); setSelect()}, 
    (ev) => {ev.stopPropagation(); setScale(1.3)}, 
    (ev) => {ev.stopPropagation(); setScale(1.0)})
  return(<>
  <Content>
    {content}
  </Content>
  <TileButton 
    {...inputFunctions}
    style={{pointerEvents:flipped? 'auto': 'none'}}>GO >></TileButton>
</>)}

const InitialTile = ({title,contentKey,content,selectCard,tile,toogleFlipped, flipped})=>{
  // const SelectedScale = Selected ===null ? 0 : Selected.title === title ? 0.15 : -0.10;
  let history = useHistory();
  const [hover,toggleHover] = useState(false)
  const [MouseScale, setMouseScale] = useState(1.0)
  const inputFunctions = titlePress(() => toogleFlipped(!flipped,contentKey), () => setMouseScale(0.7), () => {setMouseScale(1.0); toggleHover(false)})
  const { transform, opacity, TileHeight } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg) scale(${MouseScale + (flipped ? 0.1 : -0.1) + (hover ? 0.1: 0.0)})`,
    TileHeight : flipped ? TILE_HEIGHT : 0, 
    config: { mass: 5, tension: 500, friction: 60 }
  })
  const front =  <><Content>{content}</Content><Title>{title}</Title></>
  
  return(
    <OuterContainer {...inputFunctions} onMouseEnter={()=>{toggleHover(true)}}>
      <TileContainer>
        <HomeTile style={{ height: TileHeight.interpolate(h => TILE_HEIGHT -h),
           opacity: opacity.interpolate(o => 1 - o), transform }}>
          {front}
        </HomeTile>
        <HomeTile style={{ height:TileHeight, opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`) }}>
          <Back 
            content={content} 
            setScale={setMouseScale} 
            flipped={flipped} 
            setSelect={()=>{
              selectCard(contentKey, window.pageYOffset)
              history.push('/selected')
              }}/>
        </HomeTile>
      </TileContainer>
    </OuterContainer>
   )  
}
const mapStateToProps = (state, props) => ({
  tile: state.homeTiles.filter(tile=>tile.contentKey===props.contentKey)[0],
  Selected : state.SelectedTile,
  flipped: state.homeTiles.filter(tile=>tile.contentKey===props.contentKey)[0].flipped,
})
const mapDispatchToProps = (dispatch) => ({
  toogleFlipped: (flipped, key) => dispatch(FlipAction(flipped, key)),
  selectCard: (toSelect, yOffset) => dispatch(SelectAction(toSelect,yOffset)),
  unSelectCard: ()=>dispatch(UnSelectAction()),
})
export const ConnectedTile = connect(
  mapStateToProps,
  mapDispatchToProps)
  (InitialTile)

