import React, { useState, useEffect} from 'react';
import styled from 'styled-components'
import { animated, useTrail } from 'react-spring'
import {connect} from 'react-redux'
import { UnSelectAction, OpenModalAction, ModalNames } from '../homeTiles/reducers'
import { Grid, Guttering } from '../intro/intro'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from "react-router-dom"
import { CenterFlex } from '../globalStyles'

const SelectedHeader = styled.div`
    color: white;
    height: 50px;
    width: 100%;
    border-bottom: thin solid white;
    display: flex;
    align-items: flex-start;
    justify-items: center;
    flex-direction: row;
`
const BackButton = styled.div`
    width:100px;
    height:100%;
    background-color: white;
    color: black;
`

const config = { mass: 5, tension: 900, friction: 150 }

export const SelectedTile = ({title, content})=>{
    const trail = useTrail(content.length, {
        config,
        opacity: 1 ,
        x:  0 ,
        rotY: 0,
        from: { rotY: 180,opacity: 0, x: 30 , roty : 180},
    })
    useEffect(() => {
        // console.log('SELECT')
        window.scrollTo(0, 0)
     }, []);
    // const isDesktop = useMediaQuery({ minWidth: 750 });
    let history = useHistory();
    return <div style={{width:'100vw'}}>
        <SelectedHeader>
            <BackButton onClick={()=>{
                history.push('/cards')
            }}>{'<<'}</BackButton>
            <div style={{textAlign:'left', marginLeft:20}}>{title} - STATISTICS - DATE</div>
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
const mapStateToProps = (state) => ({
    // title : state.SelectedTile ?  state.SelectedTile.title : '',
    // icon :  ()=>null,
    // description :  'A WHITE BARROW DANCING',
    content : state.SelectedTile.selected ?  state.SelectedTile.selected.content : [],
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