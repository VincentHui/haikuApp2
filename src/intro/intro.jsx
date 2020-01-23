
 import React, { useRef, useState } from 'react';
 import { animated, useTrail, useSpring} from 'react-spring'
 import {connect} from 'react-redux'
 import styled from 'styled-components'
 import { OpenModalAction, ModalNames } from '../homeTiles/reducers'
 import { TileSpring } from '../homeTiles/homeTile'
 import { useMediaQuery } from 'react-responsive'
 // import {  Link } from 'react-router-dom'
 import { BigOleRoute, Item } from '../globalStyles'
 // import React,  from 'react'
 import { Canvas, useFrame } from 'react-three-fiber'
 import { useHistory } from "react-router-dom"
 // import { } from '../'
 
 const Desktop = ({ children }) => {
   const isDesktop = useMediaQuery({ minWidth: 992 })
   return isDesktop ? children : null
 }
 
 const Mobile = ({ children }) => {
   const isMobile = useMediaQuery({ maxWidth: 767 })
   return isMobile ? children : null
 }
 
// const IntroTile = styled(animated.div)`
//     position: absolute;
//     max-width: 300px;
//     color: white;
//     border-style: solid;
//     border-width: thin;
//     display: flex;
//     justify-content: flex-end;
//     flex-direction: column;
// `
 export const Grid= styled(animated.div)`
     display: flex;
     flex-flow: row wrap;
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

                     <div style={{ width: 300}}>
                        <Canvas style={{ height: 300}}>
                            {/* <ambientLight /> */}
                            <pointLight position={[0, 10, 0]} />
                            <BodyToOrbit position={[0, 0, 0]} />
                            <OrbitingChild position={[3,0,0]}/>
                            {/* <Thing position={[1.2, 0, 0]} /> */}
                        </Canvas>
                        <div style={{margin: 30}}>Vince is working on some stuff with you guys in north london</div>
                    </div> 
                    <div style={{margin: 30}}>
                       
                     </div>
                    <TileSpring onClick={()=>history.push("/cards")} style={{width:'100%', opacity:0}}>GO >></TileSpring>
                 </div>
             </IntroTileNonAb>

         <Guttering render={isDesktop}/>

     </BigOleRoute>
 }
 
// const Thing = (props) => {
//     const ref = useRef()
//     const [hovered, setHover] = useState(false)
//     const [active, setActive] = useState(false)
//     useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = 0.01))
//     return (
//       <mesh
//         ref={ref}
//         {...props}
//         scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
//         onClick={e => setActive(!active)}
//         onPointerOver={e => setHover(true)}
//         onPointerOut={e => setHover(false)}>
//         <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
//         <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
//       </mesh>
//     )
//   }

  const BodyToOrbit =(props)=>{
     const ref = useRef()
    // const [hovered, setHover] = useState(false)
    // const [active, setActive] = useState(false)
    useFrame((state, delta) => (ref.current.rotation.x = ref.current.rotation.y += 0.3*delta ))
     return (
       <mesh
         ref={ref}
         {...props}
        scale={[1, 1, 1]}
        >
         <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={'white'} />
       </mesh>
     )
   }
const moveOnCircle =(t)=>{
  // x = 0
  // y = 0
  const x = 2*Math.cos(t) + 0;
  const y = 3*Math.sin(t) + 0;
  return {x,y}
}
  const OrbitingChild =(props)=>{
    const ref = useRef()
    // const [angle, setAngle] = useState(0)
    let angle = 0
    // const [active, setActive] = useState(false)
    useFrame((state, delta) => {
      // console.log(ref.current)
      // setAngle((s)=>sdelta*0.3)
      angle+= delta*0.9
      const {x,y} = moveOnCircle(angle)
      // console.log(ref.current.position)
      ref.current.position.x = x
      ref.current.position.y = y
    })
 
      // ))
    return (
      <mesh
        ref={ref}
        {...props}
        scale={[0.2, 0.2, 0.2]}
        >
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={'white'} />
      </mesh>
    )
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

