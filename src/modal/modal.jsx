import React, { useState} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import { animated, useSpring, config } from 'react-spring'
import {ConnectedHome} from '../homeTiles/homeContainer'
import {SelectedTileMain} from '../SelectedTile/selectedTile'
import {IntroMain} from '../intro/intro'
import { ModalNames } from '../homeTiles/reducers'
const ModalOverlay = styled(animated.div)`
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    overflow-y: auto;
`

const ModalChild = ({children, open})=>{
    const { x, opacity} = useSpring({
        x:  open ? 0 : -window.innerWidth,
        opacity: open ? 1 : 0,
        config: {...config.slow, clamp:true },
        from: { x: window.innerWidth, opacity: 0},
      })   
    return <animated.div style={{
        pointerEvents:open? 'auto': 'none',
        opacity:opacity, 
        transform: x.interpolate(x => `translate3d(${x}px,0,0)`)}}>
        {children}
    </animated.div>
}
const Modals=[
    {name:ModalNames.SELECTED, toRender:()=><SelectedTileMain/>},
    {name:ModalNames.HOME, toRender:()=><ConnectedHome/>},
    {name:ModalNames.INTRO, toRender:()=><IntroMain/>}]
const ModalSwitch = ({modalName})=>
    <>
        {Modals.map(obj=>
            <ModalOverlay key={obj.name} style={{pointerEvents:modalName===obj.name ? 'auto':'none'}}>
                <ModalChild open={modalName===obj.name}>
                    <obj.toRender/>
                </ModalChild>
            </ModalOverlay>
            )}
    </>
    

const ModalRoot =({modalName})=>{
    return <ModalSwitch modalName={modalName}/>

}

const mapStateToProps = (state) => ({
    modalName : state.Modal.name
  })
  export const Modal = connect(
    mapStateToProps)
    (ModalRoot)