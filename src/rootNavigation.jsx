import React from 'react';
import { animated, useSpring, config } from 'react-spring'
import {connect} from 'react-redux'
// import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'

import {ConnectedHome} from './homeTiles/homeContainer'
// import {SelectedTile} from './SelectedTile/selectedTile'
import {Modal} from './modal/modal'
import styled from 'styled-components'

const RootContainer = styled(animated.div)`
    // width:200vw;
    display:flex;
    flex-direction:column;
`

export const NavContainer = ({selectedTile})=>{
    const { x, opacity} = useSpring({
        x:  selectedTile===null ? 0 : -window.innerWidth,
        opacity: selectedTile===null ? 1 : 0,
        config: {...config.slow, clamp:true },
        from: { x: -window.innerWidth, opacity: 0},
      })
    return(
        <>
        <RootContainer
            style={{opacity:opacity, transform: x.interpolate(x => `translate3d(${x}px,0,0)`)}}>
            <ConnectedHome />
        </RootContainer>
        <Modal/>
        </>
    )
}
const mapStateToProps = (state) => ({
    selectedTile : state.SelectedTile
  })
export const RootNavigation = connect(
    mapStateToProps)
    (NavContainer)