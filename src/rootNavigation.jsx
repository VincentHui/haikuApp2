import React from 'react';
import { animated, useSpring } from 'react-spring'
import {ConnectedHome} from './homeTiles/homeContainer'
import {SelectedTile} from './SelectedTile/selectedTile'

export const RootNavigation = ()=>{
    const { x} = useSpring({
        x:  0 ,
        config: { mass: 10, tension: 500, friction: 250 },
        from: { x: -300}
      })
    return(
        <animated.div 
            style={{width:'200vw', transform: x.interpolate(x => `translate3d(${x}px,0,0)`)}}>
            <ConnectedHome />
            {/* <SelectedTile /> */}
        </animated.div>
    )
}