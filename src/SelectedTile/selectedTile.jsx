import React, { useState} from 'react';
import styled from 'styled-components'
import { animated, useSpring, config } from 'react-spring'
import {connect} from 'react-redux'
import { UnSelectAction, OpenModalAction, ModalNames } from '../homeTiles/reducers'
import { Grid, Guttering, CenterFlex } from '../intro/intro'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from "react-router-dom"
// import { TileButton } from '../homeTiles/homeTile'
// import {ConnectedHome} from '../homeTiles/homeContainer'
// const Page = styled(animated.div)`
//     width:100vw;
//     background: #282c34;
// `

// const SelectedColumns = styled.div`
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-items: center;
// `

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

export const SelectedTile = ({openModal, unSelectCard, title, icon})=>{
    const isDesktop = useMediaQuery({ minWidth: 992 });
    let history = useHistory();
    return <div style={{width:'100vw'}}>
        <SelectedHeader>
            <BackButton onClick={()=>{
                history.push('/cards')
                }}></BackButton>
            <div style={{textAlign:'left', marginLeft:20}}>{title} - STATISTICS - DATE</div>
        </SelectedHeader>
        <Grid >

            <Guttering render={isDesktop}/>
            <CenterFlex col={3}>
                <div style={{width:'100%', height:50}}></div>
                <CenterFlex style={{flexDirection:'row', justifyContent:'center'}}>
                    {/* <Guttering render={isDesktop}/> */}
                    <div style={{  
                    color: 'white',
                    minWidth: 300,
                    minHeight: 300,
                    borderStyle: 'solid',
                    borderWidth: 'thin'
                    }}>{icon(200)}</div>
                    {/* <Guttering render={isDesktop}/> */}
                </CenterFlex>
                <div style={{width:'100%', height:50}}></div>
                <div >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
            </CenterFlex>
            <Guttering render={isDesktop}/>
        </Grid>
    </div>
}
const mapStateToProps = (state) => ({
    title : state.SelectedTile ?  state.SelectedTile.title : '',
    icon : state.SelectedTile ? state.SelectedTile.icon : ()=>null
  })
  const mapDispatchToProps = (dispatch) => ({
    openModal:()=>dispatch(OpenModalAction(ModalNames.HOME)),
    unSelectCard: ()=>dispatch(UnSelectAction())
  })
export const SelectedTileMain = connect(
    mapStateToProps,
    mapDispatchToProps)
    (SelectedTile)