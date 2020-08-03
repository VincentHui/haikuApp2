import React, { useState, useEffect} from 'react';
import styled from 'styled-components'
import { animated, useTrail } from 'react-spring'
import {connect} from 'react-redux'
import { UnSelectAction, OpenModalAction, ModalNames } from '../homeTiles/reducers'
import { Grid, Guttering } from '../intro/intro'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from "react-router-dom"
import { CenterFlex } from '../globalStyles'
import { Route } from 'react-router-dom'
import { contentDict } from '../homeTiles/reducers'
import {
    useRouteMatch,
    useParams,
    useLocation
  } from "react-router-dom";
const SelectedHeader = styled.div`
    color: white;
    height: 40px;
    width: 100%;
    border-bottom: thin solid white;
    display: flex;
    align-items: flex-start;
    justify-items: center;
    flex-direction: row;
    position: sticky;
    top:0;
    background-color: #282c34;
    z-index: 1
`
const BackButton = styled.div`
    width:100px;
    height:100%;
    background-color: white;
    color: black;
`

const config = { mass: 5, tension: 900, friction: 150 }

const SelectedTile = ()=>{
    let { key } = useParams();
    const content = contentDict[key].content
    const title = contentDict[key].title
    // console.log(content)
    let trail = useTrail(content.length, {
        config,
        opacity: 1 ,
        x:  0 ,
        rotY: 0,
        from: { rotY: 180,opacity: 0, x: 30 , roty : 180},
    })
    useEffect(() => {
        window.scrollTo(0, 0)
     }, []);
    let history = useHistory();
    return <div style={{width:'100vw'}}>
        <SelectedHeader>
            <BackButton style={{
                textAlign: 'center',
                fontSize:20,
                verticalAlign: 'middle',
                lineHeight: '40px'}} 
                onClick={()=>{
                history.push('/cards')
            }}>{'<<'}</BackButton>
            <div style={{textAlign:'left', marginLeft:20, lineHeight: '40px'}}>cards >{title}</div>
        </SelectedHeader>
        <Grid style={{ marginLeft:15, marginRight:15}}>
            <CenterFlex col={2}>
                {trail.map(({x,rotY,...rest}, index) =>{
                    return <animated.div style={{
                        ...rest,
                        transform: x.interpolate(x => `translate3d(${x}vw,0,0)`)
                        }} 
                        key={index}>{content[index]}</animated.div>
                })}
                <div style={{width:'100%', height:50}}></div>
            </CenterFlex>
        </Grid>
    </div>
}
// function routedTile ({title, content}){
//     // let match = useRouteMatch()
//     // return (<Route path={`/selected/${'title-slug'}`}>
//     return <SelectedTile title={title} content={content}/>}
//     //  </Route>) 

const mapStateToProps = (state) => ({
    // title : state.SelectedTile.selected ?  state.SelectedTile.selected : '',
    // content : state.SelectedTile.selected ? contentDict[state.SelectedTile.selected].content : [],
    y : state.SelectedTile.yOffset
  })
  const mapDispatchToProps = (dispatch) => ({
    openModal:()=>dispatch(OpenModalAction(ModalNames.HOME)),
    unSelectCard: ()=>dispatch(UnSelectAction())
  })
export const SelectedTileMain = connect(
    mapStateToProps,
    mapDispatchToProps)
    (SelectedTile)