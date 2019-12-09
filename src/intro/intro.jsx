import React from 'react';
import { animated, useTrail, useSpring} from 'react-spring'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { OpenModalAction, ModalNames } from '../homeTiles/reducers'
import { TileSpring } from '../homeTiles/homeTile'
import { useMediaQuery } from 'react-responsive'

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}

const IntroTile = styled(animated.div)`
    position: absolute;
    max-width: 300px;
    color: white;
    border-style: solid;
    border-width: thin;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
`
export const Grid= styled.div`
    display: flex;
    flex-flow: row wrap;
`
export const Item=styled.div`
    flex: ${props => props.col ? props.col : 1};
    color: white;
    // border-style: solid;
    // border-width: thin;
`
export const CenterFlex=styled(Item)`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
`
const config = { mass: 5, tension: 2000, friction: 350 }
export const Guttering= ({render})=>
    (render && <Item>
        <div style={{height:100}}></div>
    </Item>)
const introContent =[
    ({height,opacity, y}, onclick)=><IntroTile style={{
        opacity:opacity, 
        transform:y.interpolate(y => `translate3d(${y}px,0,0)`)}}>
        <div style={{ margin: 50, opacity:0}}>            
            <div style={ {opacity:0} }>Vince is working on some stuff</div>
            <div style={ {opacity:0} }>with you guys in north london</div>
        </div>
        <TileSpring onClick={()=>onclick()} width={'100%'} style={{width:'100%', opacity:0}}>GO ></TileSpring>
    </IntroTile>,
    ({height,opacity, y}, onclick)=><IntroTile style={{
        opacity:opacity, 
        transform:y.interpolate(y => `translate3d(${y}px,0,0)`)}}>
        <div style={{ margin: 50, opacity:0}}>            
            <div style={ {opacity:0} }>Vince is working on some stuff</div>
            <div style={ {opacity:0} }>with you guys in north london</div>
        </div>
        <TileSpring onClick={()=>onclick()} style={{width:'100%', opacity:0}}>GO ></TileSpring>
    </IntroTile>,
    ({height,opacity, y}, onclick)=><IntroTile style={{

        opacity:opacity, 
        transform:y.interpolate(y => `translate3d(${y}px,0,0)`)}}>
        <div style={{ margin: 50}}>
            <div>Vince is working on some stuff</div>
            <div style={ {opacity:0} }>with you guys in north london</div>
        </div>
        <TileSpring onClick={()=>onclick()} style={{width:'100%', opacity:0}}>GO ></TileSpring>
    </IntroTile>,
    ({height,opacity, y}, onclick)=><IntroTile style={{
        opacity:opacity, 
        transform:y.interpolate(y => `translate3d(${y}px,0,0)`)}}>
        <div style={{ margin: 50}}>            
            <div style={ {opacity:0} }>Vince is working on some stuff</div>
            <div>with you guys in north london</div>
        </div>
        <TileSpring onClick={()=>onclick()} style={{width:'100%', opacity:0}}>GO ></TileSpring>
    </IntroTile>,
    ({height,opacity, y}, onclick)=><IntroTile style={{
        opacity:opacity, 
        transform:y.interpolate(y => `translate3d(${y}px,0,0)`)}}>
        <div style={{ margin: 50, opacity:0}}>            
            <div style={ {opacity:0} }>Vince is working on some stuff</div>
            <div style={ {opacity:0} }>with you guys in north london</div>
        </div>
        <TileSpring onClick={()=>onclick()} style={{width:'100%'}}>GO ></TileSpring>
    </IntroTile>

]
const Intro =({openModal})=>{
    const isDesktop = useMediaQuery({ minWidth: 992 })
    const trail = useTrail(introContent.length, {
        config,
        delay:1000,
        opacity: 1 ,
        y:  0 ,
        roty:0,
        from: { opacity: 0, y: 200, roty:180},
      })
 
    return <div style={{width:'100vw'}}>
        <Grid style={{minHeight:'100vh'}}>
            <Guttering render={isDesktop}/>
            <CenterFlex col={3}>
                {trail.map(({...props},index)=>introContent[index](props, openModal))}
                
            </CenterFlex>
            <Guttering render={isDesktop}/>
        </Grid>
    </div>
}
const mapStateToProps = (state) => ({
    selectedTile : state.SelectedTile
  })
const mapDispatchToProps = (dispatch) => ({
    openModal:()=>dispatch(OpenModalAction(ModalNames.HOME))
  })
export const IntroMain = connect(
    mapStateToProps,
    mapDispatchToProps)
    (Intro)