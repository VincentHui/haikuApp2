import React, { useState} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import { animated, useSpring, config } from 'react-spring'
const ModalOverlay = styled(animated.div)`
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    overflow-y: auto;
`

const ModalRoot =({open, Component})=>{
    // console.log(Component)
    // return   &&
    const { x, opacity} = useSpring({
        x:  open ? 0 : window.innerWidth,
        opacity: open ? 1 : 0,
        config: {...config.slow, clamp:true },
        from: { x: window.innerWidth, opacity: 0},
      })   
    return <ModalOverlay style={{
            pointerEvents: open ? 'auto' : 'none',
            opacity:opacity
        }}>
         <animated.div style={{ transform: x.interpolate(x => `translate3d(${x}px,0,0)`)}}>
            {Component ? <Component/> : <div/>}
        </animated.div>
    </ModalOverlay>
}

const mapStateToProps = (state) => ({
    open : state.Modal.open,
    Component : state.Modal.component
  })
  export const Modal = connect(
    mapStateToProps)
    (ModalRoot)