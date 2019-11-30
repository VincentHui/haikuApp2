import React from 'react';
import { animated, useSpring, config } from 'react-spring'
// import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'

import {ConnectedHome} from './homeTiles/homeContainer'
import {SelectedTile} from './SelectedTile/selectedTile'
import {Modal} from './modal/modal'
import styled from 'styled-components'

const RootContainer = styled(animated.div)`
    // width:200vw;
    display:flex;
    flex-direction:column;
`

export const RootNavigation = ()=>{
    const { x, opacity} = useSpring({
        x:  0 ,
        opacity: 1,
        config: {...config.slow, clamp:true },
        from: { x: -300, opacity: 0},
        onRest:()=>console.log('REST')
      })
    return(
        
        <RootContainer
            style={{opacity:opacity, transform: x.interpolate(x => `translate3d(${x}px,0,0)`)}}>
            <ConnectedHome />
            <Modal/>
        </RootContainer>
    )
}