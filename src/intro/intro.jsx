import React from 'react';
import { animated, useTrail, useSpring} from 'react-spring'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { OpenModalAction, ModalNames } from '../homeTiles/reducers'
import { TileSpring } from '../homeTiles/homeTile'
import { useMediaQuery } from 'react-responsive'
import {  Link } from 'react-router-dom'
import {BigOleRoute} from '../App'
import { useHistory } from "react-router-dom"

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
    // justify-content: center;
    flex-direction: column;
    // align-items: center;
`

const IntroTileNonAb = styled(animated.div)`
    flex: 2;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 400px;
`
const config = { mass: 5, tension: 2000, friction: 350 }
export const Guttering= ({render})=>
    (render && <Item>
        <div style={{height:100}}></div>
    </Item>)

const Intro =({openModal})=>{
    const isDesktop = useMediaQuery({ minWidth: 992 })
    let history = useHistory();
    return <BigOleRoute >

        <Guttering render={isDesktop}/>
            <IntroTileNonAb>
                <div style={{ color: 'white',borderStyle: 'solid',borderWidth: 'thin'}}>
                    <div style={{margin: 30}}>
                        <div style={{margin: 'auto'}}>Vince is working on some stuff</div>
                        <div style={{margin: 'auto'}}>with you guys in north london</div>
                    </div>

                    <TileSpring onClick={()=>history.push("/cards")} style={{width:'100%', opacity:0}}>GO ></TileSpring>
                </div>

            </IntroTileNonAb>
        <Guttering render={isDesktop}/>

    </BigOleRoute>
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