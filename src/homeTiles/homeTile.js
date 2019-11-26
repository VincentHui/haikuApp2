import React, { useState} from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'
import { UpdateAction, SelectAction, UnSelectAction, SelectedTile } from './reducers'
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
  font-size: calc(10px + 2vmin);
  border-top: thin solid white;
  text-align: center;
  vertical-align: middle;
`

const titlePress = ( click=(ev)=>{}, held=(ev)=>{}, released=(ev)=>{})=>{
    return {
      onMouseDown: (ev)=>held(ev),
      onMouseUp: (ev)=>released(ev),
      onMouseLeave: (ev)=>released(ev),
      onClick: (ev)=>click(ev),
      onTouchStart: (ev) => held(ev),
      onTouchEnd: (ev) => released(ev),
  };
}

const Back = ({content, setScale, flipped, setSelect})=> {
  const inputFunctions = titlePress(
    (ev) => {ev.stopPropagation(); setSelect()}, 
    (ev) => {ev.stopPropagation(); setScale(1.05)}, 
    (ev) => {ev.stopPropagation(); setScale(1.0)})
  return(<>
  <Content>
    {content}
  </Content>
  <TileButton 
    {...inputFunctions}
    style={{pointerEvents:flipped? 'auto': 'none'}}>GO >></TileButton>
</>)}

const InitialTile = ({title,content,selectCard,unSelectCard,tile,SelectedTile})=>{
  const SelectedScale = SelectedTile ===null ? 0 : SelectedTile.title === title ? 0.4 : -0.5;
  const [flipped,toogleFlipped] = useState(false)
  const [MouseScale, setMouseScale] = useState(1.0)
  const inputFunctions = titlePress(() => toogleFlipped(!flipped), () => setMouseScale(0.7), () => setMouseScale(1.0))
  const { transform, opacity, TileHeight } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg) scale(${MouseScale + SelectedScale})`,
    TileHeight : flipped ? TILE_HEIGHT : 0, 
    config: { mass: 5, tension: 500, friction: 60 }
  })
  const front =  <><Content>{content}</Content><Title>{title}</Title></>
  
  return(
    <OuterContainer {...inputFunctions}>
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
            setSelect={()=>SelectedTile===null ? selectCard(tile) : unSelectCard() }/>
        </HomeTile>
      </TileContainer>
    </OuterContainer>
   )  
}
const mapStateToProps = (state, props) => ({
  tile: state.homeTiles.filter(tile=>tile.title===props.title)[0],
  SelectedTile : state.SelectedTile
})
const mapDispatchToProps = (dispatch) => ({
  toogleFlipped: (flipped,title) => dispatch(UpdateAction(flipped, title)),
  selectCard: (toSelect) => dispatch(SelectAction(toSelect)),
  unSelectCard: ()=>dispatch(UnSelectAction())
})
export const ConnectedTile = connect(
  mapStateToProps,
  mapDispatchToProps)
  (InitialTile)

