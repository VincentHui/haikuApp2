import React from 'react';
import { animated, useTrail } from 'react-spring'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { OpenModalAction, ModalNames } from '../homeTiles/reducers'
import { TileButton } from '../homeTiles/homeTile'
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
    margin-top: 100px
    height: 300px;
    width: 500px;
    color: white;
    border-style: solid;
    border-width: thin;
    display: flex;
    justify-content: center;
    flex-direction: column;
`
const Grid= styled.div`
    display: flex;
    flex-flow: row wrap;
`
const Item=styled.div`
    flex: ${props => props.col ? props.col : 1};
    color: white;
    // border-style: solid;
    // border-width: thin;
`
const CenterFlex=styled(Item)`
    display: flex;
    justify-content: center;
    flex-direction: row;
`
const config = { mass: 5, tension: 2000, friction: 350 }
const Guttering= ({render})=>
    (render && <Item>
        <div style={{height:100}}></div>
    </Item>)

const Intro =({openModal})=>{
    const isDesktop = useMediaQuery({ minWidth: 992 })
    const trail = useTrail(9, {
        config,
        opacity: 1 ,
        y:  0 ,
        height: 300 ,
        from: { opacity: 0, y: 500, height: 0},
      })
    return <div style={{width:'100vw'}}>
        {/* <div style={{flexGrow:1}}/> */}
        {/* <IntroTile style={{flexGrow:2}}/>
        <Desktop>Desktop or laptop</Desktop>
        <Tablet>Tablet</Tablet>
        <Mobile>Mobile</Mobile> */}
        <Grid style={{minHeight:'100vh'}}>
            <Guttering render={isDesktop}/>
            <CenterFlex col={3}>
                {trail.map(({height, opacity, y},index)=>
                <IntroTile key={index} style={{
                    height:height, 
                    opacity:opacity, 
                    transform:y.interpolate(y => `translate3d(${y}px,0,0)`)}}>
                    <div style={{height:300}}>Vince is working on some shit with you guys in north london</div>
                    <TileButton onClick={()=>openModal()} style={{width:'100%'}}>GO ></TileButton>
                </IntroTile>)}
                {/* <IntroTile>
                    <div style={{height:300}}>Vince is working on some shit with you guys in north london</div>
                    <TileButton onClick={()=>openModal()} style={{width:'100%'}}>GO ></TileButton>
                </IntroTile>
                <IntroTile>
                    <div style={{height:300}}>Vince is working on some shit with you guys in north london</div>
                    <TileButton onClick={()=>openModal()} style={{width:'100%'}}>GO ></TileButton>
                </IntroTile> */}
            </CenterFlex>
            <Guttering render={isDesktop}/>
        </Grid>
        {/* <Default>Not mobile (desktop or laptop or tablet)</Default> */}
        {/* <div style={{flexGrow:1}}/> */}
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